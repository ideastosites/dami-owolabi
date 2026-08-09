import { Resend } from "resend";
import type { WaitlistRecord } from "./store";
import { PALETTE, buildEmailShell, escapeHtml } from "@/lib/emails/shell";
import { logResendResult } from "@/lib/emails/logResult";
import { notifyEmail } from "@/lib/site";

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[waitlist/emails] RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(key);
}

export async function sendWaitlistConfirmation(record: WaitlistRecord): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const firstName = escapeHtml(record.customerName.split(" ")[0] || record.customerName);

  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${firstName},</p>
    <p style="margin:0 0 14px;">
      You're on the waitlist for <strong>${escapeHtml(record.courseTitle)}</strong>.
      We will reach out as soon as a date is confirmed, along with payment and
      onboarding details.
    </p>
    <p style="margin:0;">
      If you have any question or clarification in the meantime, just reply to this email.
    </p>
  `;

  const result = await resend.emails.send({
    from: `Dami Owolabi <${from}>`,
    to: record.customerEmail,
    subject: `You're on the waitlist — ${record.courseTitle}`,
    html: buildEmailShell({
      previewText: `You're on the waitlist for ${record.courseTitle}.`,
      eyebrow: "Waitlist Confirmed",
      heading: `You're on the list for ${record.courseTitle}`,
      bodyHtml,
    }),
  });
  logResendResult("waitlist/emails:confirmation", result);
}

export async function sendWaitlistOwnerNotification(record: WaitlistRecord): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const to = notifyEmail();

  const bodyHtml = `
    <p style="margin:0 0 18px;">
      <strong>${escapeHtml(record.customerName)}</strong> joined the waitlist for
      <strong>${escapeHtml(record.courseTitle)}</strong>.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:${PALETTE.text};">
      <tr>
        <td style="padding:3px 0; color:${PALETTE.textMuted}; width:60px;">Email</td>
        <td style="padding:3px 0;">${escapeHtml(record.customerEmail)}</td>
      </tr>
      <tr>
        <td style="padding:3px 0; color:${PALETTE.textMuted};">Phone</td>
        <td style="padding:3px 0;">${escapeHtml(record.customerPhone || "—")}</td>
      </tr>
      <tr>
        <td style="padding:3px 0; color:${PALETTE.textMuted};">Location</td>
        <td style="padding:3px 0;">${escapeHtml(record.location || "—")}</td>
      </tr>
    </table>
  `;

  const result = await resend.emails.send({
    from: `Site Waitlist <${from}>`,
    to,
    subject: `[Waitlist] ${record.courseTitle} — ${record.customerName}`,
    html: buildEmailShell({
      previewText: `${record.customerName} joined the waitlist for ${record.courseTitle}.`,
      eyebrow: "New Waitlist Signup",
      heading: record.courseTitle,
      bodyHtml,
    }),
  });
  logResendResult("waitlist/emails:ownerNotification", result);
}
