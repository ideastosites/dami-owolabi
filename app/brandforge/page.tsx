import React from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function BrandforgeOverviewPage() {
  const directoryLinks = [
    {
      name: "The Forge Room",
      href: "/brandforge/the-forge-room",
      desc: "A 12-week development experience for ambitious marketers.",
      numeral: "01",
    },
    {
      name: "The BrandForge Network",
      href: "/brandforge/the-brandforge-network",
      desc: "A growing professional network for marketers committed to learning and sharing.",
      numeral: "02",
    },
    {
      name: "The BrandForge Academy",
      href: "/brandforge/academy",
      desc: "Practical courses for people who want to think better and grow stronger.",
      numeral: "03",
    },
    {
      name: "BrandForge Roundtable",
      href: "/brandforge/roundtable",
      desc: "In-person experience for deeper conversations about brand and growth.",
      numeral: "04",
    },
  ];

  return (
    <div className="w-full text-[#0A0A0A] font-sans min-h-screen">
      {/* =========================================================
          SECTION 01: HERO MANIFESTO (What is BrandForge)
      ========================================================= */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-[#E3E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
            
            {/* Left Column (7 cols): Editorial Manifesto */}
            <div className="lg:col-span-7 space-y-10">
              
              <Reveal>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-[#439aa9] w-8" />
                    <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#6B7573]">
                      What Is BrandForge
                    </span>
                  </div>

                  <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0A0A0A] leading-[1.1]">
                    Better marketers are not born. <span className="text-[#054753]">They are built.</span>
                  </h1>
                </div>
              </Reveal>

              {/* Long-form Editorial Copy */}
              <Reveal delay={0.1}>
                <div className="space-y-6 font-sans text-lg sm:text-xl text-[#0A0A0A]/90 leading-[1.6] max-w-[60ch]">
                  <p>
                    BrandForge is where ambitious marketers sharpen their thinking.
                  </p>
                  <p>
                    Through practical content, conversations and learning experiences, BrandForge helps marketers become more strategic, commercially aware and influential.
                  </p>
                </div>
              </Reveal>

              {/* Isolated Punchline Box */}
              <Reveal delay={0.2}>
                <div className="py-6 space-y-3 border-l-4 border-[#02232A] pl-6 my-8 bg-[#F7F8F8] pr-6">
                  <p className="font-sans font-bold text-xl sm:text-2xl text-[#0A0A0A]">
                    This is not another page full of marketing tips.
                  </p>
                  <p className="font-sans font-bold text-xl sm:text-2xl text-[#054753]">
                    It is a platform for marketers who want to become difficult to ignore.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column (5 cols): Logo & Directory */}
            <div className="lg:col-span-5 w-full space-y-8">
              
              {/* Logo Area */}
              <Reveal delay={0.1}>
                <div className="bg-[#F7F8F8] border border-[#E3E7E7] rounded-xl p-8 flex items-center justify-center">
                   <Image 
                     src="/Brandforge_Logo_Dark.png"
                     alt="BrandForge Logo"
                     width={220}
                     height={88}
                     className="opacity-90 object-contain"
                   />
                </div>
              </Reveal>

              {/* Ecosystem Directory in a Dark Teal Box */}
              <Reveal delay={0.2}>
                <div className="bg-gradient-to-br from-[#02232A] to-[#054753] rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <h3 className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                      The Ecosystem
                    </h3>
                  </div>
                
                <div className="flex flex-col space-y-5">
                  {directoryLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="group flex items-start gap-4 relative border-b border-white/5 pb-5 last:border-0 last:pb-0"
                    >
                      <span className="font-sans font-bold text-sm text-white/30 group-hover:text-[#439aa9] transition-colors mt-0.5">
                        {link.numeral}
                      </span>
                      <div className="space-y-1">
                        <span className="block font-sans font-bold text-lg text-white group-hover:text-[#439aa9] transition-colors">
                          {link.name}
                        </span>
                        <p className="text-sm text-white/60 font-sans leading-relaxed">
                          {link.desc}
                        </p>
                      </div>
                      <div className="absolute right-0 top-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#439aa9" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
