"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
