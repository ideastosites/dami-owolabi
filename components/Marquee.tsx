"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const DEFAULT_ITEMS = [
  "Marketing",
  "Growth",
  "Brand Strategy",
  "Positioning",
  "Customer Acquisition",
  "Retention",
];

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const track = [...items, ...items];
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, (latest) => `${wrap(-50, 0, latest * -0.04)}%`);

  return (
    <div className="relative overflow-hidden border-y border-[#E3E7E7] py-6" aria-hidden>
      <motion.div
        style={reduceMotion ? undefined : { x }}
        className="flex w-max gap-10"
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-sans text-2xl font-bold uppercase tracking-[-0.01em] text-transparent sm:text-3xl"
            style={{ WebkitTextStroke: "1px #B0B8B8" }}
          >
            {item}
            <span className="text-[#439aa9]" style={{ WebkitTextStroke: "0" }}>
              &bull;
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
