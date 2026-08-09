import { NextRequest, NextResponse } from "next/server";
import { findStalePending } from "@/lib/payments/store";
import { confirmPayment } from "@/lib/payments/confirmPayment";

// Intended to be hit by a cPanel Cron Job (curl) every 15-30 minutes:
//   curl -s "https://damiowolabi.com/api/cron/reconcile?secret=$CRON_SECRET"
// Safety net for payments where the webhook never arrives (customer closes
// the tab before Novac's redirect, request dropped, etc).
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const stale = await findStalePending(10);
  const results = await Promise.allSettled(
    stale.map((record) => confirmPayment(record.transactionReference))
  );

  const checked = results.length;
  const resolved = results.filter(
    (r) => r.status === "fulfilled" && r.value?.status === "paid"
  ).length;

  return NextResponse.json({ checked, resolved });
}
