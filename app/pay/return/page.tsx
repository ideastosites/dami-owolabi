"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "checking" | "paid" | "pending" | "failed" | "error";

type StatusResponse = {
  status?: string;
  productName?: string;
  amount?: number;
  currency?: string;
  error?: string;
};

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
          <div className="w-10 h-10 border-2 border-[#E3E7E7] border-t-[#054753] rounded-full animate-spin" />
        </main>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("transactionReference");

  const [status, setStatus] = useState<Status>(reference ? "checking" : "error");
  const [detail, setDetail] = useState<StatusResponse | null>(null);

  useEffect(() => {
    if (!reference) return;

    let attempts = 0;
    let cancelled = false;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/checkout/status?ref=${encodeURIComponent(reference!)}`);
        const body: StatusResponse = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setStatus("error");
          return;
        }

        setDetail(body);

        if (body.status === "paid") {
          setStatus("paid");
        } else if (body.status === "failed" || body.status === "abandoned") {
          setStatus("failed");
        } else if (attempts < 8) {
          setTimeout(poll, 2500);
        } else {
          setStatus("pending");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center bg-[#F7F8F8] border border-[#E3E7E7] rounded-2xl p-10">
        {status === "checking" && (
          <>
            <div className="w-10 h-10 mx-auto mb-6 border-2 border-[#E3E7E7] border-t-[#054753] rounded-full animate-spin" />
            <h1 className="text-2xl font-bold text-[#02232A] font-sans mb-2">Confirming your payment</h1>
            <p className="text-[#6B7573] font-sans text-sm">This usually takes a few seconds.</p>
          </>
        )}

        {status === "paid" && (
          <>
            <div className="w-12 h-12 rounded-full bg-[#439aa9]/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-[#054753]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#02232A] font-sans mb-2">Payment confirmed</h1>
            <p className="text-[#6B7573] font-sans text-sm mb-6">
              {detail?.productName ? (
                <>
                  Thank you for paying for <strong className="text-[#02232A]">{detail.productName}</strong>. A confirmation
                  email is on its way to you.
                </>
              ) : (
                "A confirmation email is on its way to you."
              )}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#054753] px-8 py-3 font-roc text-sm font-semibold text-white transition-colors hover:bg-[#439aa9]"
            >
              Back to Home
            </Link>
          </>
        )}

        {status === "pending" && (
          <>
            <h1 className="text-2xl font-bold text-[#02232A] font-sans mb-2">Still processing</h1>
            <p className="text-[#6B7573] font-sans text-sm">
              Your payment is still being confirmed. This page will not update further automatically —
              refresh in a minute, or check your email for confirmation.
            </p>
          </>
        )}

        {(status === "failed" || status === "error") && (
          <>
            <h1 className="text-2xl font-bold text-[#02232A] font-sans mb-2">
              {status === "failed" ? "Payment not completed" : "Something went wrong"}
            </h1>
            <p className="text-[#6B7573] font-sans text-sm mb-6">
              {status === "failed"
                ? "It looks like this payment wasn't completed. No charge should have gone through."
                : "We couldn't confirm this payment's status. If you were charged, reach out and reference this page."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#054753] text-[#054753] px-8 py-3 font-roc text-sm font-semibold hover:bg-[#054753] hover:text-white transition-colors"
            >
              Contact Support
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
