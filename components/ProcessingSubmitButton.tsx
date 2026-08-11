"use client";

type Props = {
  isProcessing: boolean;
  processingLabel: string;
  idleLabel: string;
};

// Shared visual for the academy/roundtable checkout & waitlist submit
// buttons — a teal fill that eases in while a request is in flight, using
// the same fill color/mechanic the roundtable button already used on hover.
export default function ProcessingSubmitButton({ isProcessing, processingLabel, idleLabel }: Props) {
  return (
    <button
      type="submit"
      disabled={isProcessing}
      className="group relative w-full flex items-center justify-center px-6 py-4 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full disabled:cursor-wait"
    >
      <span className="relative z-10">{isProcessing ? processingLabel : idleLabel}</span>
      <div
        aria-hidden
        className={`absolute inset-0 bg-[#439aa9] origin-left transition-transform duration-300 ease-out ${
          isProcessing ? "checkout-progress-fill" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </button>
  );
}
