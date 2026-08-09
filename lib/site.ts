export function siteUrl(): string {
  return process.env.SITE_URL || "https://damiowolabi.com";
}

// Hardcoded fallback (not just an .env.example default) so owner
// notifications still reach someone even if LEAD_NOTIFY_EMAIL/
// PAYMENT_NOTIFY_EMAIL never get set on the production host.
export function notifyEmail(): string {
  return process.env.LEAD_NOTIFY_EMAIL || "hello@damiowolabi.com";
}

export function paymentNotifyEmail(): string {
  return process.env.PAYMENT_NOTIFY_EMAIL || notifyEmail();
}
