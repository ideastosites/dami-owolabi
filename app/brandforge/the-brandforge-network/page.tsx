import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Image from "next/image";

export default function TheBrandforgeNetworkPage() {
  const benefits = [
    {
      text: "Marketing and growth discussions",
      icon: "Marketing and growth discussions.svg"
    },
    {
      text: "Industry insights and emerging trends",
      icon: "Industry insights.svg"
    },
    {
      text: "Career opportunities and job openings",
      icon: "Career opportunities and job openings.svg"
    },
    {
      text: "Recommended books, articles and learning resources",
      icon: "Recommended books.svg"
    },
    {
      text: "Templates and practical frameworks",
      icon: "Templates and practical frameworks.svg"
    },
    {
      text: "Feedback on ideas, campaigns and presentations",
      icon: "Feedback on ideas.svg"
    },
    {
      text: "Networking with marketers across industries",
      icon: "Networking with marketers across industries.svg"
    },
    {
      text: "Priority access to future BrandForge events and experiences",
      icon: "Priority access.svg"
    }
  ];

  return (
    <div className="w-full text-[#0A0A0A] font-sans min-h-screen">
      
      {/* =========================================================
          SECTION 01: HERO & OVERVIEW 
      ========================================================= */}
      <section className="relative py-12 md:py-16 border-b border-[#E3E7E7] overflow-hidden">
        
        {/* Navigation */}
        <div className="absolute top-8 left-4 sm:left-8 z-20">
          <Link
            href="/brandforge"
            className="group flex items-center gap-3 font-roc font-semibold text-xs uppercase tracking-widest text-[#054753]"
          >
            <div className="w-8 h-px bg-[#054753] group-hover:w-12 transition-all duration-300" />
            <span className="group-hover:text-[#439aa9] transition-colors">Back to BrandForge</span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 md:mt-0 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Left Column (6 cols): Editorial Typographic Hero */}
            <div className="lg:col-span-6 space-y-8 relative z-10 pt-12 lg:pt-0">
              
              <Reveal>
                <div className="space-y-4">
                  <span className="inline-block font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573] border-b border-[#E3E7E7] pb-2">
                    02 / The Network
                  </span>

                  <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#02232A] leading-[1.1]">
                    The <span className="text-[#054753]">BrandForge</span> <br className="hidden sm:block" />
                    <span className="italic text-[#439aa9] font-normal tracking-tight">Network.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4 font-sans text-lg sm:text-xl text-[#0A0A0A]/80 leading-[1.6] max-w-[45ch]">
                  <p>
                    A private community for marketers, founders and brand builders who want to connect with other smart professionals.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2">
                  <a
                    href="#apply-network"
                    className="group relative inline-flex items-center justify-center px-6 py-4 bg-[#054753] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full"
                  >
                    <span className="relative z-10">Apply to Join</span>
                    <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Abstract Geometric Visual & Goal Statement */}
            <div className="w-full lg:w-[45%] relative">
              {/* Graphic background */}
              <div className="aspect-square sm:aspect-[4/3] bg-[#F7F8F8] relative flex flex-col justify-end p-8 border border-[#E3E7E7] overflow-hidden">
                 
                 {/* Decorative background grid */}
                 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,_#054753_1px,_transparent_1px),_linear-gradient(to_bottom,_#054753_1px,_transparent_1px)] bg-[size:40px_40px]" />

                 {/* Colored Logo */}
                 <div className="absolute top-8 right-8 w-40 sm:w-48 select-none pointer-events-none opacity-80 mix-blend-multiply">
                    <Image
                      src="/Brandforge_Logo_Colored.png"
                      alt="BrandForge Logo"
                      width={400}
                      height={160}
                      className="w-full h-auto object-contain"
                    />
                 </div>

                 {/* Goal Statement Box */}
                 <div className="relative z-10 bg-white p-6 sm:p-8 border-l-4 border-[#054753] shadow-sm mt-auto">
                    <p className="font-sans font-bold text-lg sm:text-xl text-[#0A0A0A] leading-snug">
                      The goal is not just to build another community.
                    </p>
                    <p className="font-sans font-bold text-base sm:text-lg text-[#439aa9] pt-3 mt-3 border-t border-[#E3E7E7] leading-snug">
                      The goal is to build one of the most valuable professional networks for marketers.
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02: WHAT'S INSIDE (Editorial Grid)
      ========================================================= */}
      <section className="py-12 md:py-16 bg-[#F7F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
               Member Access
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#02232A] tracking-tight leading-[1.2]">
              Inside the network, members get access to
            </h2>
          </div>

          {/* List as a clean geometric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E3E7E7] border border-[#E3E7E7]">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 group hover:bg-[#02232A] transition-colors duration-300 flex flex-col justify-between min-h-[160px]"
              >
                <div className="mb-8">
                  <div 
                    className="w-12 h-12 bg-[#054753] group-hover:bg-[#439aa9] transition-colors duration-300"
                    style={{
                      WebkitMaskImage: `url('/Brandforge network icons/${benefit.icon}')`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'left center',
                      maskImage: `url('/Brandforge network icons/${benefit.icon}')`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'left center',
                    }}
                  />
                </div>
                <span className="font-sans text-base text-[#0A0A0A]/90 group-hover:text-white leading-relaxed font-medium transition-colors duration-300">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
