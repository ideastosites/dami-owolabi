import React from 'react';

export default function PageGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      <div className="absolute right-4 top-[5%] h-[320px] w-[320px] rounded-full bg-[#94C7D1] opacity-[0.14] blur-3xl sm:right-8 sm:h-[380px] sm:w-[380px]" />
      <div className="absolute right-4 top-[38%] h-[320px] w-[320px] rounded-full bg-[#439aa9] opacity-[0.12] blur-3xl sm:right-8 sm:h-[360px] sm:w-[360px]" />
      <div className="absolute right-4 top-[68%] h-[300px] w-[300px] rounded-full bg-[#94C7D1] opacity-[0.12] blur-3xl sm:right-8 sm:h-[340px] sm:w-[340px]" />
    </div>
  );
}
