"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

export default function StickyPortraitLayout({
  imageSrc,
  imageAlt,
  children,
}: {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const [mainHeight, setMainHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setMainHeight(entry.contentRect.height);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
      {/* Sticky portrait panel (desktop only) — height is measured directly from the
          content column so it always ends flush with the footer, at any viewport size. */}
      <aside
        className="hidden lg:block"
        style={mainHeight ? { height: mainHeight } : undefined}
      >
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <div className="relative h-full w-full">
            {/* Faint blush glow behind the portrait — sits behind the photo,
                only reads through the transparent cutout edges around the subject. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-10 top-16 h-[240px] w-[240px] rounded-full bg-[#94C7D1] opacity-50 blur-2xl"
            />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              quality={90}
              sizes="42vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </aside>

      <main ref={mainRef} className="relative bg-white">
        {/* One continuous background layer — blush accents live here so they
            never get clipped by an individual section's edges as you scroll. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute right-4 top-[5%] h-[320px] w-[320px] rounded-full bg-[#94C7D1] opacity-[0.14] blur-3xl sm:right-8 sm:h-[380px] sm:w-[380px]" />
          <div className="absolute right-4 top-[38%] h-[320px] w-[320px] rounded-full bg-[#439aa9] opacity-[0.12] blur-3xl sm:right-8 sm:h-[360px] sm:w-[360px]" />
          <div className="absolute right-4 top-[68%] h-[300px] w-[300px] rounded-full bg-[#94C7D1] opacity-[0.12] blur-3xl sm:right-8 sm:h-[340px] sm:w-[340px]" />
        </div>

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
