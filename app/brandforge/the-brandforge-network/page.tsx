import React from "react";
import Link from "next/link";

export default function BrandforgeNetworkPage() {
  return (
    <div className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#439aa9] font-medium">
          <Link href="/brandforge" className="hover:underline">
            Brandforge
          </Link>
          <span>/</span>
          <span>The Brandforge Network</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          The Brandforge Network
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          An elite alliance of founders, executives, creative directors, and industry leaders dedicated to high-impact brand excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Peer Synergy</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Connect with seasoned operators and exchange actionable insights on brand growth and market dynamics.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Exclusive Resources</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Access proprietary research, brand architecture templates, and private member briefings.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Private Salons</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Invitation-only networking gatherings across key international business capitals.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#054753] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold">Apply for Network Membership</h4>
          <p className="text-sm text-slate-300">
            Membership is vetted to maintain high trust and exceptional caliber.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-[#439aa9] hover:bg-[#62b6c4] text-white text-sm font-semibold transition-all shrink-0"
        >
          Request Invitation
        </Link>
      </div>
    </div>
  );
}
