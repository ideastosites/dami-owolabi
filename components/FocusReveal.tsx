import Link from "next/link";
import Reveal from "@/components/Reveal";

const FOCUS = [
  { number: "01", line: "Helping businesses grow smarter." },
  { number: "02", line: "Helping marketers become hard to ignore." },
];

function FocusItem({ number, line }: { number: string; line: string }) {
  return (
    <div className="relative flex items-center">
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-sans text-[5rem] font-bold leading-none text-[#E3E7E7] sm:text-[7rem] lg:text-[8rem]"
      >
        {number}
      </span>
      <div className="relative max-w-2xl pr-16 sm:pr-24 lg:pr-32">
        <span className="font-mulish text-sm font-bold text-[#439aa9]">
          {number}
        </span>
        <p className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.02em] text-[#0A0A0A] sm:text-3xl lg:text-4xl">
          {line}
        </p>
      </div>
    </div>
  );
}

export default function FocusRevealSection() {
  return (
    <div className="relative flex flex-col gap-10 overflow-hidden px-8 pb-16 pt-6 sm:px-12 lg:gap-12 lg:px-16 lg:pb-24 lg:pt-8">
      {/* Confined dot-grid texture behind the focus items. */}
      <div
        className="dot-grid pointer-events-none absolute inset-0"
        aria-hidden
      />

      {FOCUS.map((focus, index) => (
        <Reveal
          key={focus.number}
          delay={index * 0.1}
          className="relative z-10"
        >
          <FocusItem number={focus.number} line={focus.line} />
        </Reveal>
      ))}

      <Reveal delay={0.2} className="relative z-10">
        <Link
          href="/work-with-me"
          className="inline-flex items-center justify-center rounded-full bg-[#054753] px-8 py-4 font-mulish text-base font-semibold text-white transition-colors hover:bg-[#439aa9]"
        >
          Work With Me
        </Link>
      </Reveal>
    </div>
  );
}
