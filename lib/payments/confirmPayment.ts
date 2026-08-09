import { findPayment, updatePayment, type PaymentRecord } from "./store";
import { verifyTransaction } from "./novac";
import { sendOwnerNotification, sendPayerConfirmation } from "./emails";

// Single source of truth for "did this payment actually go through".
// Called from the webhook, the return-page status poll, and the
// reconciliation cron — always safe to call repeatedly for the same
// reference, since it only fires emails on the pending -> paid transition.
export async function confirmPayment(
  transactionReference: string
): Promise<PaymentRecord | undefined> {
  const record = await findPayment(transactionReference);
  if (!record) return undefined;
  if (record.status === "paid") return record;

  const result = await verifyTransaction(transactionReference);

  if (result.status === "successful" || result.status === "success") {
    const updated = await updatePayment(transactionReference, {
      status: "paid",
      paidAt: new Date().toISOString(),
      rawVerifyResponse: result.raw,
    });
    if (updated) {
      await Promise.all([
        sendPayerConfirmation(updated).catch((err) =>
          console.error("[confirmPayment] payer email failed", err)
        ),
        sendOwnerNotification(updated).catch((err) =>
          console.error("[confirmPayment] owner email failed", err)
        ),
      ]);
    }
    return updated;
  }

  if (result.status === "failed" || result.status === "reversed" || result.status === "abandoned") {
    return updatePayment(transactionReference, {
      status: result.status === "reversed" ? "failed" : (result.status as "failed" | "abandoned"),
      rawVerifyResponse: result.raw,
    });
  }

  // Still pending on Novac's side — leave the record untouched.
  return record;
}
