import React from "react";
import Link from "next/link";
import Image from "next/image";
import InquiryModalTrigger from "@/components/InquiryModalTrigger";

export const metadata = {
  title: "Work With Me | Dami Owolabi",
  description: "Strategic Advisory & Executive Collaboration.",
};

export default function WorkWithMePage() {
  return (
    <main className="pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
        
        {/* Header */}
        <div className="mb-24 lg:mb-32 max-w-[70ch]">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-teal-800 tracking-tight font-mulish leading-[1.05]">
            Work With Me
          </h1>
        </div>

        {/* 01: Advisory */}
        <section className="mb-32 md:mb-40 border-t border-[#E3E7E7] pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-8">
            <span className="font-montserrat text-teal-500 font-semibold text-[13px] uppercase tracking-[0.08em]">
              01 / Advisory
            </span>
            <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E3E7E7]">
              <Image src="/advisory.jpg" alt="Strategic Advisory" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A] space-y-8 font-mulish leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
              <h2 className="text-3xl md:text-[32px] font-bold text-teal-800 mb-10 leading-[1.2]">
              For businesses that need more than another campaign.
            </h2>
            <div className="space-y-6">
              <p>Many business problems are treated like marketing problems.</p>
              <div className="space-y-1">
                <p>But sometimes the real issue is positioning.</p>
                <p>Or customer behaviour.</p>
                <p>Or retention.</p>
                <p>Or unclear growth priorities.</p>
                <p>Or a marketing function that is busy but not moving the business forward.</p>
              </div>
              <p>
                I work with founders, leadership teams and growth teams to diagnose the real problem, sharpen the strategy and build practical routes to growth.
              </p>
            </div>
            <div className="pt-8">
              <InquiryModalTrigger buttonText="Start A Conversation" defaultType="Strategic Advisory" />
            </div>
          </div>
        </section>

        {/* 02: Speaking */}
        <section className="mb-32 md:mb-40 border-t border-[#E3E7E7] pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-8">
            <span className="font-montserrat text-teal-500 font-semibold text-[13px] uppercase tracking-[0.08em]">
              02 / Speaking
            </span>
            <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E3E7E7]">
              <Image src="/speaking.jpg" alt="Speaking and Keynotes" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A] space-y-8 font-mulish leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
              <h2 className="text-3xl md:text-[32px] font-bold text-teal-800 mb-10 leading-[1.2]">
              Looking for a speaker who talks about marketing differently?
            </h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <p>I speak on marketing, growth, leadership and career development.</p>
                <p>No buzzwords.</p>
                <p>No recycled slides.</p>
                <p>Just practical ideas drawn from real experience.</p>
              </div>
              <p>
                Whether it’s a conference, leadership retreat, university or internal team session, every conversation is designed to leave people thinking differently.
              </p>
            </div>
            <div className="pt-8">
              <InquiryModalTrigger buttonText="Invite Me to Speak" defaultType="Speaking & Keynotes" />
            </div>
          </div>
        </section>

        {/* 03: Training */}
        <section className="mb-24 border-t border-[#E3E7E7] pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-8">
            <span className="font-montserrat text-teal-500 font-semibold text-[13px] uppercase tracking-[0.08em]">
              03 / Training
            </span>
            <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E3E7E7]">
              <Image src="/training.jpg" alt="Corporate Training" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A] space-y-8 font-mulish leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
              <h2 className="text-3xl md:text-[32px] font-bold text-teal-800 mb-10 leading-[1.2]">
              Helping marketing teams think better and execute stronger.
            </h2>
            <div className="space-y-6">
              <p>Great marketing teams are not built by activity alone.</p>
              <p>They are built through better thinking, stronger judgement, clearer strategy and sharper execution.</p>
              <p>
                I design and facilitate practical training sessions for marketing teams, growth teams and organisations that want to improve capability, confidence and business impact.
              </p>
            </div>
            <div className="pt-8">
              <InquiryModalTrigger buttonText="Discuss a Training Session" defaultType="Corporate Training" />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
