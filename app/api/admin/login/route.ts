import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, checkAdminPassword, createSessionCookieValue } from "@/lib/admin/auth";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp } from "@/lib/security/clientIp";
import { sendAdminLoginLockoutAlert } from "@/lib/admin/alerts";

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`admin-login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);

  if (!rate.allowed) {
    console.warn(`[admin/login] rate limited: ${ip}`);
    if (rate.justExceeded) {
      void sendAdminLoginLockoutAlert(ip, LOGIN_LIMIT);
    }
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    console.warn(`[admin/login] failed attempt from ${ip}`);
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
