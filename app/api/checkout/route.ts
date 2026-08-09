import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProduct } from "@/lib/payments/products";
import { createPayment } from "@/lib/payments/store";
import { initiateCheckout } from "@/lib/payments/novac";

export async function POST(request: NextRequest) {
  let body: {
    productId?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId, name, email, phone } = body;

  if (!productId || !name || !email) {
    return NextResponse.json(
      { error: "productId, name and email are required" },
      { status: 400 }
    );
  }

  const product = getProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown productId" }, { status: 400 });
  }

  const transactionReference = `DAMI-${randomUUID()}`;
  const origin = new URL(request.url).origin;
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ") || firstName;

  await createPayment({
    transactionReference,
    productId: product.id,
    productName: product.name,
    amount: product.amount,
    currency: product.currency,
    customerName: name,
    customerEmail: email,
    customerPhone: phone || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  try {
    const result = await initiateCheckout({
      transactionReference,
      amount: product.amount,
      currency: product.currency,
      redirectUrl: `${origin}/pay/return`,
      customer: { email, firstName, lastName, phoneNumber: phone },
      paymentDescription: product.name,
      logoUrl: `${origin}/Main_Logo_Dark.png`,
    });

    return NextResponse.json({
      transactionReference: result.transactionReference,
      paymentRedirectUrl: result.paymentRedirectUrl,
    });
  } catch (err) {
    console.error("[api/checkout] Novac initiate failed", err);
    return NextResponse.json(
      { error: "Unable to start checkout right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
