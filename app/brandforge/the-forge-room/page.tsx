"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function TheForgeRoomPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full text-[#0A0A0A] font-sans">
      
      {/* =========================================================
          SECTION 01: HERO & OVERVIEW (Image + Typography Split)
      ========================================================= */}
      <section className="relative flex flex-col justify-center py-12 md:py-16">
        
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 md:mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (6 cols): Editorial Typographic Hero */}
            <div className="lg:col-span-6 space-y-8 relative z-10">
              
              <Reveal>
                <div className="space-y-4">
                  <span className="inline-block font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573] border-b border-[#E3E7E7] pb-2">
                    01 / The Forge Room
                  </span>

                  <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#02232A] leading-[1.1]">
                    A 12-Week BrandForge <span className="italic text-[#439aa9] font-normal tracking-tight">Experience.</span>
                  </h1>

                  <p className="font-sans font-bold text-xl sm:text-2xl text-[#054753] max-w-[22ch] leading-tight pt-2">
                    For marketers who want to become hard to ignore.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4 font-sans text-lg sm:text-xl text-[#0A0A0A]/80 leading-[1.6] max-w-[45ch]">
                  <p>
                    The Forge Room is a 12-week development experience for ambitious marketers who want to move beyond execution and become more strategic, commercially aware and influential.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2">
                  <a
                    href="#application-form"
                    className="group relative inline-flex items-center justify-center px-6 py-4 bg-[#054753] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full"
                  >
                    <span className="relative z-10">Apply Now</span>
                    <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column (6 cols): Asymmetric Image Placeholder */}
            <div className="lg:col-span-6 w-full relative">
              <Reveal delay={0.1}>
                <div className="aspect-[4/5] max-h-[600px] relative overflow-hidden border border-[#E3E7E7] rounded-2xl">
                  <Image src="/forgeroom.jpg" alt="The Forge Room" fill className="object-cover" priority />
                </div>
              </Reveal>
              
              {/* Overlapping Info Box */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 border border-[#E3E7E7] shadow-xl hidden md:block max-w-[260px]">
                <p className="font-roc text-xs font-semibold uppercase tracking-widest text-[#6B7573] mb-1">Cohort Size</p>
                <p className="font-sans font-bold text-2xl text-[#02232A]">30</p>
                <p className="font-sans text-sm text-[#0A0A0A]/60 mt-1 leading-snug">Participants max to keep the experience personal.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02: DRAMATIC DARK IMPACT STATEMENT
      ========================================================= */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#02232A] to-[#054753] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <Reveal>
            <div className="w-px h-12 bg-[#439aa9] mx-auto" />
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight">
              This is not another online course.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="font-sans text-lg sm:text-xl text-white/70 max-w-[40ch] mx-auto leading-relaxed">
              It is a practical experience built around masterclasses, real conversations and access to The BrandForge Network.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="w-px h-12 bg-[#439aa9] mx-auto" />
          </Reveal>

        </div>
      </section>

      {/* =========================================================
          SECTION 03: PROGRAM OUTCOMES (Asymmetric Grid)
      ========================================================= */}
      <section className="py-12 md:py-16 bg-[#F7F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* What You Will Get */}
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                  02 / Deliverables
                </span>
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#02232A] tracking-tight">
                  What You Will Get
                </h2>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Monthly virtual live masterclass with experienced marketing and business leaders",
                  "Access to session recordings",
                  "Lifetime membership of The BrandForge Network"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 border-t border-[#E3E7E7] pt-4">
                    <span className="font-roc font-bold text-xs text-[#6B7573] mt-1.5">0{idx + 1}</span>
                    <span className="font-sans text-lg text-[#0A0A0A]/90 leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Will Leave With */}
            <div className="md:col-span-6 md:col-start-7 space-y-8">
              <div className="space-y-3">
                <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                  03 / Outcomes
                </span>
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#02232A] tracking-tight">
                  What You Will Leave With
                </h2>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Stronger commercial thinking",
                  "Clearer career direction",
                  "Better confidence communicating your value",
                  "A stronger personal brand",
                  "A wider professional network"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 bg-[#439aa9] rounded-none group-hover:scale-150 transition-transform" />
                    <span className="font-sans text-lg sm:text-xl text-[#0A0A0A]/80 leading-relaxed group-hover:text-[#02232A] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 04: APPLICATION FORM (Editorial Style)
      ========================================================= */}
      <section id="application-form" className="py-12 md:py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-[linear-gradient(to_right,transparent,#E3E7E7_20%,#E3E7E7_80%,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Form Info Context */}
            <div className="space-y-10 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                  04 / Apply
                </span>
                <h2 className="font-sans font-bold text-4xl sm:text-5xl text-[#02232A] tracking-tight leading-[1.1]">
                  Secure Your Spot.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-[#E3E7E7] py-6">
                <div>
                  <p className="font-roc font-semibold text-xs uppercase tracking-widest text-[#6B7573] mb-1">
                    Who Should Join
                  </p>
                  <p className="font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
                    Marketers and career professionals who want to grow in marketing, brand, digital, growth or related fields.
                  </p>
                </div>
                <div>
                  <p className="font-roc font-semibold text-xs uppercase tracking-widest text-[#6B7573] mb-1">
                    Investment
                  </p>
                  <p className="font-sans font-bold text-2xl text-[#054753]">
                    ₦50,000
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-[#F7F8F8] p-6 sm:p-10 border border-[#E3E7E7] relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#02232A]" />
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-px h-10 bg-[#439aa9] mx-auto" />
                  <h3 className="font-sans font-bold text-2xl text-[#02232A]">
                    Application Received
                  </h3>
                  <p className="font-sans text-base text-[#6B7573] max-w-md mx-auto">
                    Thank you for applying. We will review your application and be in touch regarding payment details.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  
                  {/* Full name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none"
                    />
                  </div>

                  {/* Email address */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none"
                    />
                  </div>

                  {/* WhatsApp number */}
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                      WhatsApp number
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      placeholder="+234..."
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none"
                    />
                  </div>

                  {/* Where are you currently based? */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                      Where are you currently based?
                    </label>
                    <input
                      type="text"
                      id="location"
                      required
                      placeholder="City, Country"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none"
                    />
                  </div>

                  {/* LinkedIn Profile Link */}
                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                      LinkedIn Profile Link
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      required
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="group relative w-full flex items-center justify-center px-6 py-4 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full"
                    >
                      <span className="relative z-10">Submit Application</span>
                      <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>
                    <p className="text-center font-sans text-[11px] text-[#6B7573] mt-4">
                      Payment details will be provided upon application review.
                    </p>
                  </div>
                  
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
