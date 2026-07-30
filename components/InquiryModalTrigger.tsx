"use client";

import React, { useState } from "react";
import InquiryForm from "./InquiryForm";

type InquiryModalTriggerProps = {
  buttonText: string;
  defaultType?: string;
};

export default function InquiryModalTrigger({ buttonText, defaultType = "Advisory" }: InquiryModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center bg-[#02232A] text-white font-roc font-bold px-8 py-4 overflow-hidden group text-sm uppercase tracking-wider w-full md:w-auto rounded-full"
      >
        <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        <span className="relative z-10">
          {buttonText}
        </span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          {/* InquiryForm prevents click propagation to the backdrop */}
          <InquiryForm 
            formName="Start a Conversation" 
            defaultType={defaultType} 
            onClose={() => setIsOpen(false)} 
          />
        </div>
      )}
    </>
  );
}
