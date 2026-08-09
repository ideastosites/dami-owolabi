import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from "@/lib/admin/auth";
import { getAllPayments } from "@/lib/payments/store";
import { getAllWaitlistEntries } from "@/lib/waitlist/store";

export async function GET(request: NextRequest) {
  if (!isValidSessionCookieValue(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // See app/api/admin/export/payments/route.ts for why this header is required.
  if (request.headers.get("x-admin-export") !== "1") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [payments, waitlist] = await Promise.all([getAllPayments(), getAllWaitlistEntries()]);
  const date = new Date().toISOString().slice(0, 10);

  return NextResponse.json(
    { exportedAt: new Date().toISOString(), payments, waitlist },
    { headers: { "Content-Disposition": `attachment; filename="backup-${date}.json"` } }
  );
}
