import { Resend } from "resend";
import { getAllPayments } from "@/lib/payments/store";
import { getAllWaitlistEntries } from "@/lib/waitlist/store";
import { logResendResult } from "@/lib/emails/logResult";
import { notifyEmail } from "@/lib/site";

// The only copy of "who paid you and who's waiting" lives in two JSON files
// on this one server's disk. This mails a dated copy off-server so a bad
// deploy or a disk problem doesn't mean losing the customer/revenue record
// outright. Meant to be called daily by a cPanel Cron Job.
export async function sendDataBackupEmail(): Promise<{ sent: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "RESEND_API_KEY not set" };
  const to = notifyEmail();

  const resend = new Resend(key);
  const [payments, waitlist] = await Promise.all([getAllPayments(), getAllWaitlistEntries()]);
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const date = new Date().toISOString().slice(0, 10);

  const result = await resend.emails.send({
    from: `Site Backups <${from}>`,
    to,
    subject: `[Backup] ${date}`,
    html: `
      <div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#0A0A0A;">
        <p>Attached: today's payments (${payments.length}) and waitlist (${waitlist.length}) records.</p>
        <p>Keep this email — it's the only copy of this data outside the server.</p>
      </div>
    `,
    attachments: [
      { filename: `payments-${date}.json`, content: Buffer.from(JSON.stringify(payments, null, 2)) },
      { filename: `waitlist-${date}.json`, content: Buffer.from(JSON.stringify(waitlist, null, 2)) },
    ],
  });

  const ok = logResendResult("admin/backup", result);
  return ok ? { sent: true } : { sent: false, reason: result.error?.message || "Resend API error" };
}
