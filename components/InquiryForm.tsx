"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

type InquiryFormData = {
  name: string;
  email: string;
  engagementType: string;
  message: string;
};

type InquiryFormProps = {
  formName: string;
  defaultType?: string;
  onClose?: () => void;
};

export default function InquiryForm({ formName, defaultType = "Advisory", onClose }: InquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    defaultValues: {
      engagementType: defaultType,
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const selectedType = watch("engagementType");

  const onSubmit = async (data: InquiryFormData) => {
    // Simulated API call per design system constraints
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`[${formName}] Submitted:`, data);
    setIsSuccess(true);
    reset();
    setTimeout(() => {
      setIsSuccess(false);
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <div 
      className="bg-white w-[95vw] max-w-4xl h-[90vh] md:h-[85vh] flex flex-col rounded-xl overflow-hidden shadow-2xl relative"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      {/* Sticky Header */}
      <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6 border-b border-[#E3E7E7] shrink-0 bg-white z-10">
        <div>
          <span className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-[#439aa9] block mb-1">
            Engagement Inquiry
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#054753] font-mulish">
            {defaultType}
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#E3E7E7] flex items-center justify-center text-slate-400 hover:text-[#054753] hover:border-[#054753] transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-[#054753] font-mulish">
              Start a Conversation
            </h3>
            <p className="text-sm md:text-base text-slate-500 font-mulish">
              Fill out the form below and I will get back to you regarding <span className="font-semibold text-[#054753]">{selectedType}</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            
            <div>
              <label htmlFor="name" className="text-[11px] font-montserrat font-bold uppercase tracking-[0.15em] text-[#054753] block mb-4">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border-b border-[#E3E7E7] bg-transparent pb-3 text-[#0A0A0A] placeholder-slate-300 focus:outline-none focus:border-teal-600 transition-colors font-mulish text-base"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2 font-mulish">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="text-[11px] font-montserrat font-bold uppercase tracking-[0.15em] text-[#054753] block mb-4">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-b border-[#E3E7E7] bg-transparent pb-3 text-[#0A0A0A] placeholder-slate-300 focus:outline-none focus:border-teal-600 transition-colors font-mulish text-base"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 font-mulish">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="engagementType" className="text-[11px] font-montserrat font-bold uppercase tracking-[0.15em] text-[#054753] block mb-4">
                Engagement Type
              </label>
              <select
                id="engagementType"
                className="w-full border-b border-[#E3E7E7] bg-transparent pb-3 text-[#0A0A0A] focus:outline-none focus:border-teal-600 transition-colors font-mulish text-base appearance-none cursor-pointer"
                {...register("engagementType", { required: "Please select an engagement type" })}
              >
                <option value="Strategic Advisory">Strategic Advisory</option>
                <option value="Speaking & Keynotes">Speaking & Keynotes</option>
                <option value="Corporate Training">Corporate Training</option>
              </select>
              {errors.engagementType && (
                <p className="text-red-500 text-xs mt-2 font-mulish">{errors.engagementType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="text-[11px] font-montserrat font-bold uppercase tracking-[0.15em] text-[#054753] block mb-4">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full border-b border-[#E3E7E7] bg-transparent pb-3 text-[#0A0A0A] placeholder-slate-300 focus:outline-none focus:border-teal-600 transition-colors resize-none font-mulish text-base"
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-2 font-mulish">{errors.message.message}</p>
              )}
            </div>
            
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block bg-[#054753] text-white font-montserrat font-semibold px-10 py-4 rounded-[6px] hover:bg-[#022930] transition-all disabled:opacity-50 text-sm uppercase tracking-wider w-full md:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Send Inquiry"}
              </button>
            </div>

            {isSuccess && (
              <p className="text-teal-600 text-sm font-medium font-mulish mt-4">
                Thank you! Your message has been received.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
