import { Resend } from "resend";
import type { PaymentRecord } from "./store";
import { PALETTE, buildEmailShell, escapeHtml, fieldPill } from "@/lib/emails/shell";
import { logResendResult } from "@/lib/emails/logResult";
import { paymentNotifyEmail } from "@/lib/site";

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[payments/emails] RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(key);
}

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export async function sendPayerConfirmation(record: PaymentRecord): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const firstName = escapeHtml(record.customerName.split(" ")[0] || record.customerName);

  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${firstName},</p>
    <p style="margin:0 0 14px;">
      Your payment of
      <strong style="color:${PALETTE.teal};">${formatNaira(record.amount)}</strong>
      for <strong>${escapeHtml(record.productName)}</strong> has been received.
    </p>
    <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:${PALETTE.textMuted};">
      Reference
    </p>
    ${fieldPill(record.transactionReference)}
    <p style="margin:0;">
      We will reach out with onboarding details shortly. If you have any question or
      clarification in the meantime, just reply to this email.
    </p>
  `;

  const result = await resend.emails.send({
    from: `Dami Owolabi <${from}>`,
    to: record.customerEmail,
    subject: `You're confirmed — ${record.productName}`,
    html: buildEmailShell({
      previewText: `Your payment of ${formatNaira(record.amount)} for ${record.productName} has been received.`,
      eyebrow: "Payment Confirmed",
      heading: `You're booked in for ${record.productName}`,
      bodyHtml,
    }),
  });
  logResendResult("payments/emails:payerConfirmation", result);
}

export async function sendOwnerNotification(record: PaymentRecord): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const to = paymentNotifyEmail();

  const bodyHtml = `
    <p style="margin:0 0 18px;">
      <strong>${escapeHtml(record.customerName)}</strong> just paid
      <strong style="color:${PALETTE.teal};">${formatNaira(record.amount)}</strong>
      for <strong>${escapeHtml(record.productName)}</strong>.
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
    </table>
    <p style="margin:16px 0 4px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:${PALETTE.textMuted};">
      Reference
    </p>
    ${fieldPill(record.transactionReference)}
  `;

  const result = await resend.emails.send({
    from: `Site Payments <${from}>`,
    to,
    subject: `[Payment] ${record.productName} — ${formatNaira(record.amount)} from ${record.customerName}`,
    html: buildEmailShell({
      previewText: `${record.customerName} just paid ${formatNaira(record.amount)} for ${record.productName}.`,
      eyebrow: "New Payment",
      heading: `${formatNaira(record.amount)} received`,
      bodyHtml,
    }),
  });
  logResendResult("payments/emails:ownerNotification", result);
}
