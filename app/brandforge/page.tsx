import React from "react";
import Link from "next/link";

export default function BrandforgeOverviewPage() {
  const pillars = [
    {
      name: "Academy",
      href: "/brandforge/academy",
      subtitle: "Executive Curriculum & Certification",
      desc: "Structured frameworks and masterclasses designed to equip leaders with elite brand architecture methodologies.",
    },
    {
      name: "The Forge Room",
      href: "/brandforge/the-forge-room",
      subtitle: "Intensive Workshops & Strategy Sprints",
      desc: "Immersive, high-octane working sessions where foundational brand systems and intellectual property are engineered.",
    },
    {
      name: "The Brandforge Network",
      href: "/brandforge/the-brandforge-network",
      subtitle: "Global Peer Alliance",
      desc: "An exclusive collective of forward-thinking founders, executives, and strategists collaborating on high-impact initiatives.",
    },
    {
      name: "Roundtable",
      href: "/brandforge/roundtable",
      subtitle: "C-Suite Thought Leadership Forums",
      desc: "Curated roundtables bringing together visionary leaders to address macro market shifts and brand resilience.",
    },
  ];

  return (
    <div className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#439aa9]/10 text-[#439aa9] border border-[#439aa9]/20">
          The Brandforge Ecosystem
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Architecting Executive Authority
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore the four integrated pillars of Brandforge designed to empower leaders, forge strategic identity, and foster high-level alliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar, idx) => (
          <Link
            key={idx}
            href={pillar.href}
            className="group flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 hover:border-[#439aa9] transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#439aa9]">
                  Pillar 0{idx + 1}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#439aa9]/10 flex items-center justify-center text-[#439aa9] group-hover:bg-[#439aa9] group-hover:text-white transition-colors">
                  &rarr;
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-[#439aa9] transition-colors">
                {pillar.name}
              </h2>
              <p className="text-sm font-semibold text-[#054753] dark:text-[#62b6c4]">
                {pillar.subtitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
