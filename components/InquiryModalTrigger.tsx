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
        className="inline-block bg-teal-800 text-white font-montserrat font-semibold px-8 py-4 rounded-[6px] hover:bg-teal-700 transition-colors text-sm uppercase tracking-wider"
      >
        {buttonText}
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
