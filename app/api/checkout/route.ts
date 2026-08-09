import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProduct } from "@/lib/payments/products";
import { createPayment } from "@/lib/payments/store";
import { initiateCheckout } from "@/lib/payments/novac";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp } from "@/lib/security/clientIp";
import { isReasonableLength, isValidEmail, MAX_NAME_LENGTH, MAX_PHONE_LENGTH } from "@/lib/security/validate";
import { looksLikeBot } from "@/lib/security/antiSpam";

const CHECKOUT_LIMIT = 10;
const CHECKOUT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`checkout:${ip}`, CHECKOUT_LIMIT, CHECKOUT_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: {
    productId?: string;
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    formRenderedAt?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Unlike the waitlist/leads endpoints, there's no harmless fake success to
  // hand a bot here (it would need a real Novac redirect URL), so this just
  // rejects outright rather than faking one.
  if (looksLikeBot({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
    console.warn("[api/checkout] likely bot submission rejected");
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  const { productId, name, email, phone } = body;

  if (!productId || !name || !email) {
    return NextResponse.json(
      { error: "productId, name and email are required" },
      { status: 400 }
    );
  }

  if (!isReasonableLength(name, MAX_NAME_LENGTH)) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (phone && !isReasonableLength(phone, MAX_PHONE_LENGTH)) {
    return NextResponse.json({ error: "Phone number is too long" }, { status: 400 });
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
