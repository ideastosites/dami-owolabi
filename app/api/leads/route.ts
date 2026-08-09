import { NextRequest, NextResponse } from "next/server";
import { sendLeadConfirmation, sendLeadOwnerNotification } from "@/lib/leads/emails";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp } from "@/lib/security/clientIp";
import {
  isReasonableLength,
  isValidEmail,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_TEXT_FIELD_LENGTH,
} from "@/lib/security/validate";
import { looksLikeBot } from "@/lib/security/antiSpam";

const LEAD_LIMIT = 5;
const LEAD_WINDOW_MS = 10 * 60 * 1000;

const ALLOWED_SOURCES = new Set([
  "Contact Page",
  "Strategic Advisory",
  "Speaking & Keynotes",
  "Corporate Training",
]);

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`leads:${ip}`, LEAD_LIMIT, LEAD_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: {
    source?: string;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    preferredDate?: string;
    preferredTime?: string;
    website?: string;
    formRenderedAt?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (looksLikeBot({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
    console.warn("[api/leads] likely bot submission rejected silently");
    return NextResponse.json({ ok: true });
  }

  const { source, name, email, phone, message, preferredDate, preferredTime } = body;

  if (!source || !ALLOWED_SOURCES.has(source)) {
    return NextResponse.json({ error: "Unknown source" }, { status: 400 });
  }
  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
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
  if (!isReasonableLength(message, MAX_TEXT_FIELD_LENGTH)) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const lead = { source, name, email, phone, message, preferredDate, preferredTime };

  await Promise.all([
    sendLeadOwnerNotification(lead).catch((err) => console.error("[api/leads] owner email failed", err)),
    sendLeadConfirmation(lead).catch((err) => console.error("[api/leads] confirmation email failed", err)),
  ]);

  return NextResponse.json({ ok: true });
}
