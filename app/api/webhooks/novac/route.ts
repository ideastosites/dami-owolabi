import { NextRequest, NextResponse } from "next/server";
import { confirmPayment } from "@/lib/payments/confirmPayment";

const DEFAULT_ALLOWED_IP = "18.233.137.110";

function extractClientIp(request: NextRequest): string | null {
  // Novac's only integrity control is source-IP allowlisting (no signature
  // header). x-forwarded-for is set by whatever reverse proxy sits in front
  // of the app (cPanel/Passenger, Vercel, etc.) — take the first hop, which
  // is the original client as seen by the proxy chain closest to the internet.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

export async function POST(request: NextRequest) {
  const allowedIp = process.env.NOVAC_WEBHOOK_ALLOWED_IP || DEFAULT_ALLOWED_IP;
  const bypassIpCheck = process.env.NOVAC_WEBHOOK_ALLOW_ANY_IP === "true";

  if (!bypassIpCheck) {
    const clientIp = extractClientIp(request);
    if (clientIp !== allowedIp) {
      console.warn(`[webhooks/novac] rejected webhook from untrusted IP: ${clientIp}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
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
