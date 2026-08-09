import React from "react";
import Link from "next/link";
import Image from "next/image";
import InquiryModalTrigger from "@/components/InquiryModalTrigger";
import Reveal from "@/components/Reveal";

export const metadata = {
    title: "Work With Me | Dami Owolabi",
    description: "Strategic Advisory & Executive Collaboration.",
};

export default function WorkWithMePage() {
    return (
        <main className="pt-16 pb-20">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-20">

                {/* Header */}
                <Reveal className="mb-16 lg:mb-20 max-w-[70ch]">
                    <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#02232A] tracking-tight font-sans leading-[1.05]">
                        Work With Me
                    </h1>
                </Reveal>

                {/* 01: Advisory */}
                <section className="mb-20 md:mb-24 border-t border-[#E3E7E7] pt-16">
                  <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <span className="font-roc text-[#439aa9] font-semibold text-[13px] uppercase tracking-[0.08em]">
                            01 / Advisory
                        </span>
                        <div className="relative w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#E3E7E7]">
                            <Image src="/Advisory.png" alt="Strategic Advisory" fill quality={100} className="object-cover object-left" />
                        </div>
                    </div>
                    <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A]/90 space-y-8 font-sans leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
                        <h2 className="text-3xl md:text-[32px] font-bold text-[#02232A] mb-10 leading-[1.2]">
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
                  </Reveal>
                </section>

                {/* 02: Speaking */}
                <section className="mb-20 md:mb-24 border-t border-[#E3E7E7] pt-16">
                  <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <span className="font-roc text-[#439aa9] font-semibold text-[13px] uppercase tracking-[0.08em]">
                            02 / Speaking
                        </span>
                        <div className="relative w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#E3E7E7]">
                            <Image src="/Speaking-Keynote.png" alt="Speaking and Keynotes" fill quality={100} className="object-cover object-center md:object-[35%_center] lg:object-[32%_center]" />
                        </div>
                    </div>
                    <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A]/90 space-y-8 font-sans leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
                        <h2 className="text-3xl md:text-[32px] font-bold text-[#02232A] mb-10 leading-[1.2]">
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
                  </Reveal>
                </section>

                {/* 03: Training */}
                <section className="mb-16 border-t border-[#E3E7E7] pt-16">
                  <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <span className="font-roc text-[#439aa9] font-semibold text-[13px] uppercase tracking-[0.08em]">
                            03 / Training
                        </span>
                        <div className="relative w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#E3E7E7]">
                            <Image src="/Training(1).png" alt="Corporate Training" fill quality={100} className="object-cover object-top md:object-center" />
                        </div>
                    </div>
                    <div className="md:col-span-8 max-w-[65ch] text-base md:text-[18px] text-[#0A0A0A]/90 space-y-8 font-sans leading-[1.6] bg-[#F7F8F8] p-8 md:p-10 rounded-2xl border border-[#E3E7E7]">
                        <h2 className="text-3xl md:text-[32px] font-bold text-[#02232A] mb-10 leading-[1.2]">
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
                  </Reveal>
                </section>

            </div>
        </main>
    );
}
