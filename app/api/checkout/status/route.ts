import { NextRequest, NextResponse } from "next/server";
import { confirmPayment } from "@/lib/payments/confirmPayment";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("ref");
  if (!reference) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  try {
    const record = await confirmPayment(reference);
    if (!record) {
      return NextResponse.json({ error: "Unknown transaction reference" }, { status: 404 });
    }
    return NextResponse.json({
      status: record.status,
      productName: record.productName,
      amount: record.amount,
      currency: record.currency,
    });
  } catch (err) {
    console.error("[api/checkout/status] confirmPayment failed", err);
    return NextResponse.json({ error: "Could not check status right now" }, { status: 502 });
  }
}
