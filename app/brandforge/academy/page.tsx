import React from "react";
import Link from "next/link";

export default function BrandforgeAcademyPage() {
  return (
    <div className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#439aa9] font-medium">
          <Link href="/brandforge" className="link-hover">
            Brandforge
          </Link>
          <span>/</span>
          <span>Academy</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Brandforge Academy
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          The premiere curriculum for executive brand architecture, strategic authority, and market-shaping identity design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#439aa9]">
            Curriculum Pillar 01
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Foundational Authority & Narrative
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Master the core mechanics of articulating differentiation, positioning intellectual property, and commanding market trust.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#439aa9]">
            Curriculum Pillar 02
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ecosystem Scaling & Resilience
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Build sustainable brand ecosystems that withstand competitive pressure and evolve seamlessly across multiple channels and ventures.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#054753] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold">Enrollment & Advisory</h4>
          <p className="text-sm text-slate-300">
            Inquire about upcoming cohort enrollments and private organizational licensing.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-[#439aa9] hover:bg-[#62b6c4] text-white text-sm font-semibold transition-all shrink-0"
        >
          Request Curriculum Guide
        </Link>
      </div>
    </div>
  );
}
