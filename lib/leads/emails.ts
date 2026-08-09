import { Resend } from "resend";
import { PALETTE, buildEmailShell, escapeHtml } from "@/lib/emails/shell";
import { logResendResult } from "@/lib/emails/logResult";
import { notifyEmail } from "@/lib/site";

export type Lead = {
  source: string; // "Contact Page" | "Strategic Advisory" | "Speaking & Keynotes" | "Corporate Training"
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
};

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[leads/emails] RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(key);
}

export async function sendLeadOwnerNotification(lead: Lead): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const to = notifyEmail();

  const detailRows = [
    ["Type", lead.source],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ...(lead.preferredDate ? [["Preferred date", lead.preferredDate]] : []),
    ...(lead.preferredTime ? [["Preferred time", lead.preferredTime]] : []),
  ];

  const bodyHtml = `
    <p style="margin:0 0 18px;">
      <strong>${escapeHtml(lead.name)}</strong> just sent an inquiry about
      <strong>${escapeHtml(lead.source)}</strong>.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:${PALETTE.text}; margin-bottom:16px;">
      ${detailRows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:3px 0; color:${PALETTE.textMuted}; width:110px;">${escapeHtml(k)}</td><td style="padding:3px 0;">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:${PALETTE.textMuted};">
      Message
    </p>
    <p style="margin:0; white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
  `;

  const result = await resend.emails.send({
    from: `Site Leads <${from}>`,
    to,
    replyTo: lead.email,
    subject: `[Inquiry: ${lead.source}] ${lead.name}`,
    html: buildEmailShell({
      previewText: `${lead.name} sent an inquiry about ${lead.source}.`,
      eyebrow: "New Inquiry",
      heading: lead.source,
      bodyHtml,
    }),
  });
  logResendResult("leads/emails:ownerNotification", result);
}

export async function sendLeadConfirmation(lead: Lead): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const firstName = escapeHtml(lead.name.split(" ")[0] || lead.name);

  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${firstName},</p>
    <p style="margin:0 0 14px;">
      Thanks for reaching out about <strong>${escapeHtml(lead.source)}</strong> —
      your message has been received and we will get back to you shortly.
    </p>
    <p style="margin:0;">
      If you have any question or clarification in the meantime, just reply to this email.
    </p>
  `;

  const result = await resend.emails.send({
    from: `Dami Owolabi <${from}>`,
    to: lead.email,
    subject: "Thanks for reaching out",
    html: buildEmailShell({
      previewText: "Your message has been received.",
      eyebrow: "Message Received",
      heading: "Thanks for reaching out",
      bodyHtml,
    }),
  });
  logResendResult("leads/emails:confirmation", result);
}
