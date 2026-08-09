import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from "@/lib/admin/auth";
import { getAllPayments } from "@/lib/payments/store";
import { buildPaymentsWorkbook } from "@/lib/admin/export";

export async function GET(request: NextRequest) {
  if (!isValidSessionCookieValue(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A plain top-level navigation (a clicked link) can carry the session
  // cookie under SameSite=Lax, but can't set a custom header — only a
  // same-origin fetch() can. Requiring this header means the export can
  // only be triggered from our own dashboard's JS, not a link someone
  // tricks the admin into clicking.
  if (request.headers.get("x-admin-export") !== "1") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const records = await getAllPayments();
  const buffer = await buildPaymentsWorkbook(records);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="payments-${date}.xlsx"`,
    },
  });
}
