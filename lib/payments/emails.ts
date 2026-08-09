import { Resend } from "resend";
import type { PaymentRecord } from "./store";

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

  await resend.emails.send({
    from: `Dami Owolabi <${from}>`,
    to: record.customerEmail,
    subject: `You're confirmed — ${record.productName}`,
    html: `
      <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A;">
        <p>Hi ${escapeHtml(record.customerName.split(" ")[0] || record.customerName)},</p>
        <p>Your payment of <strong>${formatNaira(record.amount)}</strong> for
          <strong>${escapeHtml(record.productName)}</strong> has been received.</p>
        <p>Reference: <code>${escapeHtml(record.transactionReference)}</code></p>
        <p>Dami will personally reach out with onboarding details shortly. If anything is
          urgent in the meantime, just reply to this email.</p>
      </div>
    `,
  });
}

export async function sendOwnerNotification(record: PaymentRecord): Promise<void> {
  const resend = client();
  if (!resend) return;

  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.PAYMENT_NOTIFY_EMAIL || process.env.LEAD_NOTIFY_EMAIL;
  if (!to) {
    console.warn("[payments/emails] No PAYMENT_NOTIFY_EMAIL/LEAD_NOTIFY_EMAIL set — skipping owner notification");
    return;
  }

  await resend.emails.send({
    from: `Site Payments <${from}>`,
    to,
    subject: `New payment: ${record.productName} — ${formatNaira(record.amount)}`,
    html: `
      <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A;">
        <p><strong>${escapeHtml(record.customerName)}</strong> just paid
          <strong>${formatNaira(record.amount)}</strong> for
          <strong>${escapeHtml(record.productName)}</strong>.</p>
        <p>Email: ${escapeHtml(record.customerEmail)}<br/>
          Phone: ${escapeHtml(record.customerPhone || "—")}<br/>
          Reference: <code>${escapeHtml(record.transactionReference)}</code></p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
