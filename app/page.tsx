import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import IntersectionStatement from "@/components/IntersectionStatement";
import FocusRevealSection from "@/components/FocusReveal";
import Marquee from "@/components/Marquee";
import StickyPortraitLayout from "@/components/StickyPortraitLayout";

function GradientDivider() {
    return (
        <div
            aria-hidden
            className="h-px w-full bg-gradient-to-r from-transparent via-[#E3E7E7] to-transparent"
        />
    );
}

export default function HomePage() {
    return (
        <StickyPortraitLayout imageSrc="/dami-owolabi2.png" imageAlt="Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder">
            <section className="px-6 py-12 text-center sm:px-12 sm:py-16 sm:text-left lg:px-16 lg:py-24">
                <Reveal>
                    <h1 className="font-sans text-6xl font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#0A0A0A] sm:text-7xl lg:text-8xl">
                        Dami
                        <br />
                        Owolabi
                    </h1>
                    <p className="mt-5 font-sans text-lg font-semibold text-[#054753] sm:text-xl">
                        Marketing Leader
                        <span className="mx-3 text-xl font-bold text-[#6B7573] sm:text-2xl">
                            &middot;
                        </span>
                        Growth Strategist
                        <span className="mx-3 text-xl font-bold text-[#6B7573] sm:text-2xl">
                            &middot;
                        </span>
                        Brand Builder
                    </p>
                </Reveal>

                <Reveal delay={0.1} className="mt-8 sm:mt-12">
                    <IntersectionStatement />
                    <Link
                        href="/work-with-me"
                        className="mx-auto mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#054753] px-7 py-3.5 font-roc text-sm font-semibold text-white transition-colors hover:bg-[#439aa9] sm:mx-0 sm:mt-12"
                    >
                        Work With Me
                    </Link>
                </Reveal>

                {/* Portrait photo (mobile/tablet only) — sits directly under the name and text section. */}
                <Reveal
                    delay={0.2}
                    className="relative mt-10 aspect-[4/5] w-full sm:mt-12 sm:aspect-[3/4] lg:hidden"
                >
                    <Image
                        src="/dami-owolabi2.png"
                        alt="Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder"
                        fill
                        quality={90}
                        sizes="100vw"
                        className="object-cover object-top"
                    />
                </Reveal>
            </section>

            <GradientDivider />

            <section className="relative overflow-hidden px-8 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
                {/* Confined dot-grid texture behind the stats row. */}
                <div
                    className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 h-64"
                    aria-hidden
                />

                <div className="relative z-10">
                    <Reveal>
                        <div className="max-w-2xl font-sans text-lg leading-relaxed text-[#0A0A0A] sm:text-xl">
                            <p>
                                For over a decade, I have helped brands grow, reposition,
                                acquire customers, retain users and build marketing systems that
                                connect activity to commercial impact.
                            </p>
                            <p className="mt-6">
                                My work has cut across fintech, payments, QSR, retail, consumer
                                brands, Web3 and the agency-led marketing, with experience
                                across West Africa, East Africa and the United Kingdom.
                            </p>
                        </div>

                        <Image
                            src="/Client_Signature_Dark.png"
                            alt="Dami Owolabi's signature"
                            width={200}
                            height={56}
                            className="mt-8 h-10 w-auto object-contain sm:h-12"
                        />
                    </Reveal>

                    <Reveal
                        delay={0.15}
                        className="mt-10 grid grid-cols-3 gap-4 text-center sm:mt-12 sm:gap-8 sm:text-left"
                    >
                        {[
                            ["10+", "Years"],
                            ["7+", "Industries"],
                            ["6+", "Countries"],
                        ].map(([value, label]) => (
                            <div key={label}>
                                <span className="block font-sans text-6xl font-extrabold leading-none tracking-[-0.02em] text-[#054753] sm:text-7xl">
                                    {value}
                                </span>
                                <span className="mt-3 block font-roc text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7573] sm:text-sm">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <Marquee />

            <div className="px-8 pt-14 sm:px-12 sm:pt-16 lg:px-16 lg:pt-20">
                <Reveal>
                    <p className="font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-[#0A0A0A] sm:text-2xl">
                        Today, my work is focused on two things:
                    </p>
                </Reveal>
            </div>

            <FocusRevealSection />
        </StickyPortraitLayout>
    );
}
