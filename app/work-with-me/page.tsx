import React from "react";
import Link from "next/link";

export default function WorkWithMePage() {
  const engagements = [
    {
      title: "Executive Brand Advisory",
      tagline: "1-on-1 Strategic Mentorship & Positioning",
      description:
        "High-touch advisory for founders, C-suite executives, and thought leaders looking to architect enduring authority and market differentiation.",
      badge: "Advisory",
    },
    {
      title: "Keynotes & Masterclasses",
      tagline: "Global Speaking & Leadership Forums",
      description:
        "Engaging keynotes exploring brand architecture, intellectual property leverage, and the future of creative leadership.",
      badge: "Speaking",
    },
    {
      title: "Corporate Brand Transformation",
      tagline: "Ecosystem Audit & Architecture",
      description:
        "Comprehensive brand equity engineering for high-growth enterprises seeking unified narrative, cultural alignment, and market dominance.",
      badge: "Enterprise",
    },
  ];

  return (
    <div className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#439aa9]/10 text-[#439aa9] border border-[#439aa9]/20">
          Work With Me
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Strategic Advisory & Executive Collaboration
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Partner directly with Dami Owolabi to transform organizational narrative, architect market-defining brand systems, and empower leadership resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {engagements.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 hover:border-[#439aa9] transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#054753] text-[#62b6c4]">
                {item.badge}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-[#439aa9]">{item.tagline}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#439aa9] hover:text-[#054753] dark:hover:text-white transition-colors"
              >
                <span className="link-hover">Inquire About Engagement</span> &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#054753] to-[#022930] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#439aa9]/30">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Architect Your Brand Ecosystem?
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Let’s discuss your current trajectory and determine how Brandforge methodologies can accelerate your strategic impact.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-8 py-4 rounded-xl bg-[#439aa9] hover:bg-[#62b6c4] text-white font-semibold text-sm transition-all shadow-lg shrink-0"
        >
          Book a Consultation
        </Link>
      </div>
    </div>
  );
}
