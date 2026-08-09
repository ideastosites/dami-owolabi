"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <p className="font-roc text-[#B8433A] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
          Something went wrong
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#02232A] font-sans mb-4">
          An unexpected error occurred
        </h1>
        <p className="text-[#6B7573] font-sans text-base mb-8">
          Please try again. If this keeps happening, get in touch and let us know what you were doing.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={retry}
            className="inline-flex items-center justify-center rounded-full bg-[#054753] px-8 py-3 font-roc text-sm font-semibold text-white transition-colors hover:bg-[#439aa9]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#054753] text-[#054753] px-8 py-3 font-roc text-sm font-semibold hover:bg-[#054753] hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
