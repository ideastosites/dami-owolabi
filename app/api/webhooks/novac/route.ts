import { NextRequest, NextResponse } from "next/server";
import { confirmPayment } from "@/lib/payments/confirmPayment";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp } from "@/lib/security/clientIp";

const DEFAULT_ALLOWED_IP = "18.233.137.110";

// Generous — Novac itself retries 3x at 5s intervals on a non-200, so this
// exists purely to cap abuse if the IP check below is ever defeated, not to
// throttle legitimate traffic.
const WEBHOOK_LIMIT = 30;
const WEBHOOK_WINDOW_MS = 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const rate = checkRateLimit(`webhook:${ip}`, WEBHOOK_LIMIT, WEBHOOK_WINDOW_MS);
  if (!rate.allowed) {
    console.warn(`[webhooks/novac] rate limited: ${ip}`);
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  const allowedIp = process.env.NOVAC_WEBHOOK_ALLOWED_IP || DEFAULT_ALLOWED_IP;
  const bypassIpCheck = process.env.NOVAC_WEBHOOK_ALLOW_ANY_IP === "true";

  if (!bypassIpCheck && ip !== allowedIp) {
    console.warn(`[webhooks/novac] rejected webhook from untrusted IP: ${ip}`);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: { data?: { transactionReference?: string }; notify?: string; notifyType?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const reference = payload?.data?.transactionReference;
  if (!reference) {
    // Acknowledge with 200 so Novac doesn't retry a payload we can never process.
    return NextResponse.json({ received: true });
  }

  try {
    // Never trust payload.notifyType directly — re-verify server-to-server.
    await confirmPayment(reference);
  } catch (err) {
    console.error("[webhooks/novac] confirmPayment failed", err);
    // Still 200: Novac retries on non-200, and we'd rather rely on the
    // reconciliation cron than get hammered with retries for a bug on our side.
  }

  return NextResponse.json({ received: true });
}
