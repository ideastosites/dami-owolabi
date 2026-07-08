import React from "react";
import Link from "next/link";

export default function HomePage() {
  const routes = [
    {
      title: "Brandforge Overview",
      href: "/brandforge",
      desc: "Explore the comprehensive Brandforge architecture and core executive pillars.",
      badge: "/brandforge",
    },
    {
      title: "Academy",
      href: "/brandforge/academy",
      desc: "Executive brand curriculum and elite identity design certification.",
      badge: "/brandforge/academy",
    },
    {
      title: "The Forge Room",
      href: "/brandforge/the-forge-room",
      desc: "Intensive strategic workshops and high-stakes brand engineering sprints.",
      badge: "/brandforge/the-forge-room",
    },
    {
      title: "The Brandforge Network",
      href: "/brandforge/the-brandforge-network",
      desc: "An exclusive global collective of visionary founders and C-suite leaders.",
      badge: "/brandforge/the-brandforge-network",
    },
    {
      title: "Roundtable",
      href: "/brandforge/roundtable",
      desc: "Quarterly C-suite forums analyzing macro shifts in brand resilience.",
      badge: "/brandforge/roundtable",
    },
    {
      title: "Work With Me",
      href: "/work-with-me",
      desc: "1-on-1 strategic advisory, keynote speaking, and organizational consulting.",
      badge: "/work-with-me",
    },
    {
      title: "Contact",
      href: "/contact",
      desc: "Direct inquiry office for consultations, press, and scheduling.",
      badge: "/contact",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-36 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#041418] dark:via-[#071f25] dark:to-[#041418] border-b border-[#439aa9]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#439aa9]/10 border border-[#439aa9]/25 text-[#439aa9] text-xs font-semibold uppercase tracking-widest">
            <span>Next.js App Router Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#439aa9]" />
            <span>Tailwind CSS Design System</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Architecting Enduring <span className="text-[#439aa9]">Executive Authority</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to the digital ecosystem of <strong className="text-slate-900 dark:text-white">Dami Owolabi</strong> &amp; <strong className="text-[#439aa9]">Brandforge</strong>. Built on high-performance architecture with Primary <code className="text-xs px-2 py-0.5 rounded bg-[#439aa9]/15 text-[#439aa9]">#439aa9</code> and Secondary <code className="text-xs px-2 py-0.5 rounded bg-[#054753]/40 text-[#054753] dark:text-[#62b6c4]">#054753</code> tokens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/brandforge"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#439aa9] hover:bg-[#348896] text-white font-semibold text-sm shadow-xl shadow-[#439aa9]/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Brandforge Ecosystem
            </Link>
            <Link
              href="/work-with-me"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#054753] hover:bg-[#083a43] text-white font-semibold text-sm transition-all duration-300 border border-[#439aa9]/30"
            >
              Strategic Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* Routes & Architecture Matrix */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#439aa9]">
              Site Directory & Routing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              Architecture Index
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            Every route is structured with dedicated App Router layouts, rich design system styling, and semantic markup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, idx) => (
            <Link
              key={idx}
              href={route.href}
              className="group p-6 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 hover:border-[#439aa9] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#439aa9]/10 text-[#439aa9]">
                  {route.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#439aa9] transition-colors">
                  {route.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {route.desc}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#439aa9]">
                <span>Visit Route</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
