import React from "react";
import Link from "next/link";

export default function TheForgeRoomPage() {
  return (
    <div className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#439aa9] font-medium">
          <Link href="/brandforge" className="hover:underline">
            Brandforge
          </Link>
          <span>/</span>
          <span>The Forge Room</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          The Forge Room
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Intensive, high-stakes working sessions where executive brand positioning, visual architecture, and strategic messaging are forged under pressure.
        </p>
      </div>

      <div className="p-10 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Immersive Strategic Sprints
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike traditional workshops, The Forge Room is a hands-on strategic environment. Dami Owolabi and specialist architects collaborate directly with your leadership team to diagnose bottlenecks, reconstruct core identity, and deploy market-ready brand assets.
        </p>
        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-[#439aa9] hover:bg-[#348896] text-white text-sm font-semibold transition-all shadow-md"
          >
            Schedule a Forge Room Session
          </Link>
        </div>
      </div>
    </div>
  );
}
