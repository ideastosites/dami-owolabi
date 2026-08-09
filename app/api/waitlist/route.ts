import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/waitlist/store";
import { sendWaitlistConfirmation, sendWaitlistOwnerNotification } from "@/lib/waitlist/emails";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp } from "@/lib/security/clientIp";
import {
  isReasonableLength,
  isValidEmail,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_LOCATION_LENGTH,
} from "@/lib/security/validate";
import { looksLikeBot } from "@/lib/security/antiSpam";

// Tighter than checkout — this is the endpoint that can be used to email an
// arbitrary address without any payment attached, so it's the more
// attractive one to abuse for spam.
const WAITLIST_LIMIT = 5;
const WAITLIST_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`waitlist:${ip}`, WAITLIST_LIMIT, WAITLIST_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: {
    courseId?: string;
    courseTitle?: string;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    formRenderedAt?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Bots get a fake success — telling them "blocked" just teaches the script
  // to route around the check next time.
  if (looksLikeBot({ honeypot: body.website, formRenderedAt: body.formRenderedAt })) {
    console.warn("[api/waitlist] likely bot submission rejected silently");
    return NextResponse.json({ ok: true });
  }

  const { courseId, courseTitle, name, email, phone, location } = body;

  if (!courseId || !courseTitle || !name || !email) {
    return NextResponse.json(
      { error: "courseId, courseTitle, name and email are required" },
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
  if (location && !isReasonableLength(location, MAX_LOCATION_LENGTH)) {
    return NextResponse.json({ error: "Location is too long" }, { status: 400 });
  }

  const record = await addWaitlistEntry({
    courseId,
    courseTitle,
    customerName: name,
    customerEmail: email,
    customerPhone: phone || "",
    location: location || "",
    createdAt: new Date().toISOString(),
  });

  await Promise.all([
    sendWaitlistConfirmation(record).catch((err) =>
      console.error("[api/waitlist] payer email failed", err)
    ),
    sendWaitlistOwnerNotification(record).catch((err) =>
      console.error("[api/waitlist] owner email failed", err)
    ),
  ]);

  return NextResponse.json({ ok: true });
}
