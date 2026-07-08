import React from "react";
import Link from "next/link";

export default function BrandforgeRoundtablePage() {
  return (
    <div className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#439aa9] font-medium">
          <Link href="/brandforge" className="hover:underline">
            Brandforge
          </Link>
          <span>/</span>
          <span>Roundtable</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Executive Roundtable
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Curated C-Suite forums exploring macro shifts in brand resilience, reputational equity, and organizational trust.
        </p>
      </div>

      <div className="p-10 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Thought Leadership at the Highest Level
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Brandforge Roundtable brings together CEOs, Chief Marketing Officers, and board directors for confidential, peer-led dialogues. Hosted quarterly, these forums dissect real-world brand challenges and unlock collective foresight.
        </p>
        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-[#439aa9] hover:bg-[#348896] text-white text-sm font-semibold transition-all shadow-md"
          >
            Inquire About Upcoming Roundtables
          </Link>
        </div>
      </div>
    </div>
  );
}
