import { Resend } from "resend";
import { buildEmailShell, escapeHtml } from "@/lib/emails/shell";
import { logResendResult } from "@/lib/emails/logResult";
import { notifyEmail } from "@/lib/site";

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendAdminLoginLockoutAlert(ip: string, attempts: number): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const to = notifyEmail();

  try {
    const result = await resend.emails.send({
      from: `Site Security <${from}>`,
      to,
      subject: "[Security] Repeated failed admin login attempts",
      html: buildEmailShell({
        previewText: "Multiple incorrect admin password attempts were just blocked.",
        eyebrow: "Security Alert",
        heading: "Repeated failed admin login attempts",
        bodyHtml: `
          <p style="margin:0 0 14px;">
            <strong>${attempts}</strong> incorrect password attempts against
            <code>/admin</code> were just blocked from IP <strong>${escapeHtml(ip)}</strong>.
          </p>
          <p style="margin:0;">
            If this wasn't you, no action is needed right now — the attempts were rate-limited.
            If it keeps happening, consider changing the admin password.
          </p>
        `,
      }),
    });
    logResendResult("admin/alerts:lockout", result);
  } catch (err) {
    console.error("[admin/alerts] failed to send lockout alert", err);
  }
}
