type PostJsonResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type Options = {
  timeoutMs?: number;
  retries?: number;
  onRetry?: () => void;
};

// Wraps a POST + JSON parse with a bounded timeout and a single automatic
// retry for infra-layer failures (timeout, network error, 5xx) — this host
// is a single-core shared-hosting box, and the checkout endpoint has shown
// transient blips under load that resolve on a second attempt seconds
// later. A real 4xx from the server (validation, rate limit) is a decision
// already made and is never retried.
export async function postJsonWithRetry<T>(
  url: string,
  body: unknown,
  { timeoutMs = 20000, retries = 1, onRetry }: Options = {}
): Promise<PostJsonResult<T>> {
  let lastError: PostJsonResult<T> = { ok: false, error: "Something went wrong. Please try again." };

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const data = await res.json().catch(() => null);

      if (res.ok && data !== null) {
        return { ok: true, data: data as T };
      }

      if (res.ok) {
        // 2xx with an unparseable body — an infra-layer response (error
        // page) rather than our API, worth retrying.
        lastError = { ok: false, error: "Unexpected response from the server. Please try again." };
      } else if (res.status >= 500) {
        lastError = {
          ok: false,
          error: (data && data.error) || "The payment service is temporarily unavailable.",
        };
      } else {
        // A real client-side error (validation, rate limit) — the server
        // has already decided, retrying won't change that.
        return {
          ok: false,
          error: (data && data.error) || "Something went wrong. Please try again.",
        };
      }
    } catch (err) {
      clearTimeout(timer);
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      lastError = {
        ok: false,
        error: isAbort
          ? "The request timed out. Please try again."
          : "Could not reach the payment service. Please try again.",
      };
    }

    if (attempt < retries) onRetry?.();
  }

  return lastError;
}
