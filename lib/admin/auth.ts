import { createHash, createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

export function createSessionCookieValue(): string {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

// Constant-time comparisons throughout — this gates access to customer PII,
// so timing side-channels on the password or session signature matter here
// in a way they don't for the rest of the app.
export function isValidSessionCookieValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const dot = value.indexOf(".");
  if (dot === -1) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expectedSig = sign(payload);

  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export function checkAdminPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(real).digest();
  return timingSafeEqual(a, b);
}
