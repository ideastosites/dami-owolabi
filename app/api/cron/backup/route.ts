import { NextRequest, NextResponse } from "next/server";
import { sendDataBackupEmail } from "@/lib/admin/backup";

// Intended to be hit once a day by a cPanel Cron Job:
//   curl -s "https://damiowolabi.com/api/cron/backup?secret=$CRON_SECRET"
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await sendDataBackupEmail();
  return NextResponse.json(result);
}
