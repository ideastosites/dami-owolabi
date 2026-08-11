"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Honeypot from "@/components/Honeypot";
import StructuredData from "@/components/StructuredData";
import ProcessingSubmitButton from "@/components/ProcessingSubmitButton";
import { breadcrumbSchema } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { getProduct } from "@/lib/payments/products";
import { postJsonWithRetry } from "@/lib/checkout/postJsonWithRetry";

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "BrandForge", path: "/brandforge" },
  { name: "BrandForge Roundtable", path: "/brandforge/roundtable" },
]);

const roundtableProduct = getProduct("roundtable");

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "In-person marketing roundtable",
  name: "BrandForge Roundtable",
  description:
    "An in-person experience for marketers, founders and growth professionals to discuss brand, career and commercial marketing beyond surface-level advice.",
  provider: { "@type": "Person", name: "Dami Owolabi", sameAs: siteUrl() },
  url: `${siteUrl()}/brandforge/roundtable`,
  ...(roundtableProduct && {
    offers: {
      "@type": "Offer",
      price: roundtableProduct.amount,
      priceCurrency: roundtableProduct.currency,
      availability: "https://schema.org/InStock",
      url: `${siteUrl()}/brandforge/roundtable`,
    },
  }),
};

export default function BrandforgeRoundtablePage() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckoutError(null);
    setIsRetrying(false);
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);

    const result = await postJsonWithRetry<{ paymentRedirectUrl: string }>(
      "/api/checkout",
      {
        productId: "roundtable",
        name: formData.get("fullName"),
        email: formData.get("email"),
        phone,
        website: formData.get("website"),
        formRenderedAt: formData.get("formRenderedAt"),
      },
      { onRetry: () => setIsRetrying(true) }
    );

    if (!result.ok) {
      setCheckoutError(result.error);
      setIsProcessing(false);
      setIsRetrying(false);
      return;
    }

    window.location.href = result.data.paymentRedirectUrl;
  };

  return (
    <div className="w-full text-[#0A0A0A] font-sans min-h-screen">
      <StructuredData data={breadcrumbs} />
      <StructuredData data={serviceSchema} />

      {/* =========================================================
          SECTION 01: HERO & OVERVIEW 
      ========================================================= */}
      <section className="relative flex flex-col justify-center py-12 md:py-16 border-b border-[#E3E7E7]">
        
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
                    04 / Roundtable
                  </span>

                  <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#02232A] leading-[1.1]">
                    Real conversations. <br className="hidden sm:block" />
                    Real rooms. <br className="hidden sm:block" />
                    <span className="italic text-[#439aa9] font-normal tracking-tight">Real growth.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4 font-sans text-lg sm:text-xl text-[#0A0A0A]/80 leading-[1.6] max-w-[45ch]">
                  <p>
                    BrandForge Roundtable is an in-person experience for marketers, founders, and growth professionals who want deeper conversations about brand, marketing, and career development.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2">
                  <a
                    href="#register-form"
                    className="group relative inline-flex items-center justify-center px-6 py-4 bg-[#054753] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full"
                  >
                    <span className="relative z-10">Register Interest</span>
                    <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column (6 cols): Asymmetric Image Placeholder */}
            <div className="lg:col-span-6 w-full relative">
              <Reveal delay={0.1}>
                <div className="aspect-[4/5] max-h-[600px] relative overflow-hidden border border-[#E3E7E7] rounded-2xl">
                  <Image src="/Roundtable.jpg" alt="BrandForge Roundtable" fill className="object-cover" priority />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02: DRAMATIC DARK IMPACT STATEMENT
      ========================================================= */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#02232A] to-[#054753] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <Reveal>
            <div className="w-px h-12 bg-[#439aa9] mx-auto" />
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight">
              These sessions are designed to move beyond surface-level advice.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="font-sans text-lg sm:text-xl text-white/70 max-w-[40ch] mx-auto leading-relaxed space-y-4 font-medium">
              <p>No long speeches for the sake of it.</p>
              <p>No generic panels.</p>
              <p>No empty networking.</p>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="w-px h-12 bg-[#439aa9] mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          SECTION 03: THE GOAL (Asymmetric List)
      ========================================================= */}
      <section className="py-12 md:py-16 bg-[#F7F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="md:col-span-5 space-y-8 lg:sticky lg:top-32">
              <Reveal>
                <div className="space-y-3">
                  <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                    05 / The Goal
                  </span>
                  <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#02232A] tracking-tight">
                    What we discuss
                  </h2>
                </div>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="font-sans text-lg text-[#0A0A0A]/80 leading-relaxed">
                  Each Roundtable brings together selected professionals to discuss the real issues shaping marketing and business today.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7 bg-white p-6 sm:p-10 border border-[#E3E7E7] shadow-sm">
              <ul className="space-y-6">
                {[
                  "Career growth and personal positioning",
                  "Brand building",
                  "Commercial marketing",
                  "AI & Leadership",
                  "Customer growth"
                ].map((item, idx) => (
                  <Reveal key={idx} delay={0.1 * idx}>
                    <li className="flex items-start gap-4 group">
                      <div className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 bg-[#439aa9] rounded-none group-hover:scale-150 transition-transform" />
                      <span className="font-sans text-lg sm:text-xl text-[#0A0A0A]/90 leading-relaxed group-hover:text-[#02232A] transition-colors font-medium">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 04: APPLICATION FORM 
      ========================================================= */}
      <section id="register-form" className="py-12 md:py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-[linear-gradient(to_right,transparent,#E3E7E7_20%,#E3E7E7_80%,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Form Info Context */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <Reveal>
                <div className="space-y-4">
                  <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9]">
                    06 / Register
                  </span>
                  <h2 className="font-sans font-bold text-4xl sm:text-5xl text-[#02232A] tracking-tight leading-[1.1]">
                    A room where you leave with better thinking.
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="font-sans text-lg text-[#0A0A0A]/80 leading-relaxed">
                  Join a room filled with people who are serious about growth, leaving with stronger relationships and practical ideas you can use.
                </p>
              </Reveal>
            </div>

            {/* Application Form */}
            <div className="bg-[#F7F8F8] p-6 sm:p-10 border border-[#E3E7E7] relative">
              <Reveal>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#02232A]" />
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Honeypot />

                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                        Full name
                      </label>
                      <input name="fullName" type="text" id="fullName" required placeholder="Enter your full name" className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                        Email address
                      </label>
                      <input name="email" type="email" id="email" required placeholder="name@example.com" className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                        WhatsApp number
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={phone}
                        onChange={setPhone}
                        placeholder="Enter your WhatsApp number"
                        className="w-full flex gap-3 sm:gap-4
                          [&_.PhoneInputCountry]:bg-transparent [&_.PhoneInputCountry]:border-b [&_.PhoneInputCountry]:border-[#E3E7E7] [&_.PhoneInputCountry]:px-0 [&_.PhoneInputCountry]:py-2.5 [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:transition-colors
                          [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-b [&_.PhoneInputInput]:border-[#E3E7E7] [&_.PhoneInputInput]:px-0 [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:focus:outline-none [&_.PhoneInputInput]:focus:border-[#054753] [&_.PhoneInputInput]:transition-colors [&_.PhoneInputInput]:rounded-none [&_.PhoneInputInput]:text-[#0A0A0A] [&_.PhoneInputInput]:placeholder:text-[#6B7573]/50 [&_.PhoneInputInput]:font-sans [&_.PhoneInputInput]:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                        Where are you currently based?
                      </label>
                      <input name="location" type="text" id="location" required placeholder="City, Country" className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="linkedin" className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">
                        LinkedIn Profile Link
                      </label>
                      <input name="linkedin" type="url" id="linkedin" required placeholder="https://linkedin.com/in/yourprofile" className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors placeholder:text-[#6B7573]/50 rounded-none" />
                    </div>

                    {checkoutError && (
                      <p className="font-sans text-sm text-[#B8433A]">{checkoutError}</p>
                    )}
                    {isProcessing && (
                      <p className="font-sans text-sm text-[#6B7573]">
                        {isRetrying
                          ? "Still trying — please hang on a moment longer."
                          : "This can take a few seconds. Please don't close this window."}
                      </p>
                    )}

                    <div className="pt-6">
                      <ProcessingSubmitButton
                        isProcessing={isProcessing}
                        idleLabel="Continue to Payment"
                        processingLabel="Redirecting to payment..."
                      />
                    </div>

                  </form>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
