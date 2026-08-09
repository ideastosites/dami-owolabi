import { NextRequest } from "next/server";

// Trusts x-forwarded-for/x-real-ip as set by whatever reverse proxy sits in
// front of the app (cPanel/Passenger, or similar). This is a "best effort
// for rate limiting" identifier, not a security boundary on its own — see
// the webhook route for why IP alone is never trusted for anything more
// sensitive than throttling.
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
