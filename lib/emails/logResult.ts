// Resend's SDK does not throw on API-level failures (bad recipient, domain
// not verified, etc) — it returns { data, error }. Worse, the SDK's own
// console.error for this is gated behind `NODE_ENV !== "production"`, so on
// a production `next start` those failures are otherwise completely silent.
// Every send() call site should route its result through this so a failed
// send is at least visible in the server logs.
export function logResendResult(context: string, result: { error?: { message?: string } | null }): boolean {
  if (result?.error) {
    console.error(`[${context}] Resend send failed:`, result.error.message || result.error);
    return false;
  }
  return true;
}
