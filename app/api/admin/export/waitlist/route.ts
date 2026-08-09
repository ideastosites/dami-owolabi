import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from "@/lib/admin/auth";
import { getAllWaitlistEntries } from "@/lib/waitlist/store";
import { buildWaitlistWorkbook } from "@/lib/admin/export";

export async function GET(request: NextRequest) {
  if (!isValidSessionCookieValue(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // See app/api/admin/export/payments/route.ts for why this header is required.
  if (request.headers.get("x-admin-export") !== "1") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const records = await getAllWaitlistEntries();
  const buffer = await buildWaitlistWorkbook(records);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="waitlist-${date}.xlsx"`,
    },
  });
}
