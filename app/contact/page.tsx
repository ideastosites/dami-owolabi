"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Loader2 } from "lucide-react";
import Reveal from "@/components/Reveal";

type ContactFormInputs = {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    // Placeholder endpoint for now
    console.log("Form Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert("Message sent successfully!");
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="w-full bg-white flex justify-center py-16 md:py-24 px-6 md:px-10 lg:px-20">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column - Copy & Details */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-10">
          <Reveal className="space-y-6">
            <h1 className="font-sans font-bold tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl text-[#02232A]">
              Let’s build something worthwhile
            </h1>
            <p className="font-sans text-lg sm:text-xl leading-[1.6] text-[#0A0A0A]/80 max-w-[45ch] lg:max-w-[60ch]">
              Whether you're looking for strategic support, a speaker, career coaching or <span className="italic font-normal text-[#439aa9] whitespace-nowrap">The Forge Room</span>, I'd love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col space-y-8 pt-6 border-t border-[#E3E7E7]">
            <div>
              <span className="block font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573] mb-2">
                Email
              </span>
              <a 
                href="mailto:hello@damiowolabi.com" 
                className="font-sans text-lg sm:text-xl text-[#0A0A0A]/90 hover:text-[#439aa9] transition-colors duration-200"
              >
                hello@damiowolabi.com
              </a>
            </div>
            
            <div>
              <span className="block font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573] mb-4">
                Social
              </span>
              <div className="flex space-x-6">
                <Link 
                  href="#" 
                  className="flex items-center space-x-2 text-[#0A0A0A]/90 hover:text-[#439aa9] transition-colors duration-200 group"
                >
                  <FaLinkedin size={24} className="group-hover:text-[#439aa9] transition-colors" />
                  <span className="font-sans text-lg">LinkedIn</span>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center space-x-2 text-[#0A0A0A]/90 hover:text-[#439aa9] transition-colors duration-200 group"
                >
                  <FaInstagram size={24} className="group-hover:text-[#439aa9] transition-colors" />
                  <span className="font-sans text-lg">Instagram</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Form */}
        <Reveal delay={0.2} className="lg:col-span-7">
          <div className="bg-[#F7F8F8] p-8 md:p-12 border border-[#E3E7E7] rounded-none">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
              
              <div className="space-y-2">
                <label htmlFor="fullName" className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName", { required: "Full name is required" })}
                  className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none placeholder-[#6B7573]"
                />
                {errors.fullName && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.fullName.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none placeholder-[#6B7573]"
                />
                {errors.email && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ 
                    required: "Phone number is required",
                    validate: (value) => {
                      if (!value) return false;
                      return isValidPhoneNumber(value) || "Invalid phone number";
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={value}
                      onChange={onChange}
                      placeholder="(555) 123-4567"
                      className={`w-full flex gap-3 sm:gap-4
                        [&_.PhoneInputCountry]:bg-transparent [&_.PhoneInputCountry]:border-b [&_.PhoneInputCountry]:border-[#E3E7E7] [&_.PhoneInputCountry]:px-0 [&_.PhoneInputCountry]:py-2.5 [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:transition-colors
                        [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-b [&_.PhoneInputInput]:border-[#E3E7E7] [&_.PhoneInputInput]:px-0 [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:focus:outline-none [&_.PhoneInputInput]:focus:border-[#054753] [&_.PhoneInputInput]:transition-colors [&_.PhoneInputInput]:rounded-none [&_.PhoneInputInput]:text-[#0A0A0A] [&_.PhoneInputInput]:placeholder-[#6B7573] [&_.PhoneInputInput]:font-sans [&_.PhoneInputInput]:text-base
                        ${errors.phone ? '[&_.PhoneInputInput]:border-[#02232A] [&_.PhoneInputCountry]:border-[#02232A]' : ''}
                      `}
                    />
                  )}
                />
                {errors.phone && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.phone.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredDate" className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Preferred Date
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  min={today}
                  {...register("preferredDate", { required: "Date is required" })}
                  className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none placeholder-[#6B7573]"
                />
                {errors.preferredDate && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.preferredDate.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredTime" className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Preferred Time
                </label>
                <input
                  id="preferredTime"
                  type="time"
                  {...register("preferredTime", { required: "Time is required" })}
                  className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none placeholder-[#6B7573]"
                />
                {errors.preferredTime && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.preferredTime.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-roc font-bold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  placeholder="Describe your goals, timeline, budget, or anything else that would help me prepare for our conversation."
                  {...register("message", { required: "This field is required" })}
                  className="w-full h-[150px] resize-none p-3 bg-transparent border border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none placeholder-[#6B7573]"
                ></textarea>
                {errors.message && (
                  <span className="font-sans text-sm text-[#02232A]">{errors.message.message}</span>
                )}
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex items-center justify-center px-6 py-4 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden group w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  <div className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Scheduling...
                      </>
                    ) : (
                      "Schedule a Call"
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
