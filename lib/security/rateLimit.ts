// In-memory fixed-window rate limiter. Deliberately not backed by Redis or
// any external store — this app runs as a single always-on Node process on
// cPanel (not serverless, where in-memory state wouldn't survive between
// invocations), so a Map in module scope is both correct and the simplest
// thing that works here.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Bounds memory growth from IPs that only ever show up once — without this,
// a slow trickle of unique attackers/bots would leak entries forever.
const MAX_TRACKED_KEYS = 5000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  // True only on the single request that pushed the key over the limit —
  // useful for firing a lockout alert once per window instead of once per
  // blocked request.
  justExceeded: boolean;
};

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      // Cheap eviction under pressure: drop anything already expired.
      for (const [k, v] of buckets) {
        if (v.resetAt <= now) buckets.delete(k);
      }
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0, justExceeded: false };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
      justExceeded: existing.count === limit + 1,
    };
  }

  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0, justExceeded: false };
}
