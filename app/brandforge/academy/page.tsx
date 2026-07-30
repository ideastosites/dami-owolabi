"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

// Full data object for all courses based on the document
const courses = [
  {
    id: "interview-prep",
    image: "/interview_prep.jpg",
    title: "Interview Prep Sprint",
    duration: "2 Sessions",
    desc: "A focused 2 session course for marketing professionals with an upcoming interview who need clearer answers, stronger positioning and practical preparation before the conversation.",
    format: "Online (60m/session)",
    price: "₦50,000",
    fullDetails: {
      intro: "Prepare better. Speak clearer. Show up with confidence.\n\nThe Interview Prep Sprint is a focused 2-session course for marketing professionals who have an upcoming interview and want to prepare properly. It is designed for people applying for roles in marketing, brand, growth, digital marketing, communications or related fields.\n\nThis is not a generic interview coaching session. It is built specifically around marketing interviews, where you need to show how you think, how you solve problems, how you understand the customer, how you connect marketing to business goals and how you communicate your value clearly.",
      sections: [
        {
          title: "Who This Course Is For",
          items: [
            "Marketing professionals with an upcoming interview",
            "Brand professionals preparing for a new role",
            "Growth marketers interviewing for growth or acquisition roles",
            "Digital marketers preparing for digital, content or performance roles",
            "Marketing executives moving into bigger roles",
            "Marketing managers preparing for leadership interviews",
            "Career switchers interviewing for marketing roles"
          ]
        },
        {
          title: "What You Will Learn",
          items: [
            "How to prepare properly for a marketing interview",
            "How to study the company, role and market before the interview",
            "How to connect your experience to what the employer needs",
            "How to answer common marketing interview questions",
            "How to speak about campaigns, results and business impact",
            "How to explain your thinking without sounding rehearsed",
            "How to handle questions around strategy, execution, data and stakeholders",
            "How to ask strong questions at the end of the interview"
          ]
        },
        {
          title: "Course Structure",
          items: [
            "Session 1: Interview Strategy & Positioning (60 mins) - Understanding the role, the company and the story you need to tell.",
            "Session 2: Mock Interview & Feedback (60 mins) - Practice before the real interview with feedback on your answers and delivery."
          ]
        }
      ]
    }
  },
  {
    id: "strategy-session",
    image: "/11 Strategy Session.jpg",
    title: "1:1 Strategy Session with Dami",
    duration: "90 Minutes",
    desc: "Get clear, practical guidance on your career, brand, business or marketing challenge.",
    format: "Private 1:1 Online",
    price: "₦100,000",
    fullDetails: {
      intro: "Get clarity on your next move.\n\nThe 1:1 Strategy Session is a 90 minutes personalised session for marketers, founders, career professionals and growth-minded individuals who need clearer direction.\n\nThis is not a generic coaching call. It is a focused conversation built around your current stage, your goals and the specific clarity you need. The session can focus on your career, personal brand, marketing challenge, business idea, or how to position yourself for better opportunities.",
      sections: [
        {
          title: "Best For",
          items: [
            "Marketers who feel stuck or unclear",
            "Career professionals trying to reposition themselves",
            "Founders who need marketing clarity",
            "Career switchers moving into marketing",
            "Professionals preparing for interviews or promotion",
            "People who want honest, practical feedback"
          ]
        },
        {
          title: "What You Can Use the Session For",
          items: [
            "Career direction",
            "Personal brand clarity",
            "Interview preparation",
            "Marketing strategy review",
            "Business or brand positioning",
            "Confidence and communication",
            "Next-step planning"
          ]
        },
        {
          title: "What You Will Leave With",
          items: [
            "Clearer thinking",
            "Practical feedback",
            "A stronger sense of direction",
            "Specific next steps",
            "Honest guidance based on your current stage"
          ]
        }
      ]
    }
  },
  {
    id: "switching-into-marketing",
    image: "/Switching Into Marketing.jpg",
    title: "Switching Into Marketing",
    duration: "2 Days",
    desc: "A practical course for career switchers who want to move into marketing, digital marketing or brand management with clarity, confidence and the right positioning.",
    format: "In Person",
    price: "₦250,000",
    fullDetails: {
      intro: "A practical course for people who want to start a career in marketing, digital or brand management.\n\nBreaking into marketing can feel confusing when you are coming from another background. You may know you are interested in marketing, but you are not sure where to start, what skills matter, how to position your previous experience or what kind of roles to apply for.\n\nThis course is designed to help you make that transition with more clarity. It will help you understand how marketing works, the different career paths available, the skills you need to build and how to present yourself as someone who can bring value, even without a traditional marketing background.",
      sections: [
        {
          title: "Who This Course Is For",
          items: [
            "Career switchers moving into marketing",
            "Professionals interested in digital marketing",
            "People who want to move into brand management",
            "Graduates exploring marketing as a career path",
            "Creatives who want to understand marketing better",
            "Business professionals trying to transition into growth, brand or communications roles"
          ]
        },
        {
          title: "Course Modules",
          items: [
            "Module 1: Understanding Marketing, Digital and Brand Management",
            "Module 2: Finding Your Best Fit",
            "Module 3: Building Your Foundation",
            "Module 4: Creating Proof Without Experience",
            "Module 5: Positioning Yourself for Opportunities"
          ]
        },
        {
          title: "What You Will Leave With",
          items: [
            "A clearer understanding of marketing career paths",
            "A stronger sense of where you fit",
            "A practical transition plan",
            "Better CV and LinkedIn positioning",
            "Ideas for building a beginner portfolio",
            "More confidence applying for marketing roles"
          ]
        }
      ]
    }
  },
  {
    id: "commercial-marketing",
    image: "/Commercial Marketing & Growth.jpg",
    title: "Commercial Marketing & Growth",
    duration: "2 Days",
    desc: "A practical course for marketers, founders and business professionals who want to understand how marketing connects to revenue, customer growth, retention and business performance.",
    format: "In Person",
    price: "₦350,000",
    fullDetails: {
      intro: "Build brands. Drive revenue. Lead growth.\n\nMarketing is no longer just about campaigns, content or visibility. Today's marketers are expected to understand customers, influence growth, support acquisition, improve retention, justify marketing investment and contribute to business decisions.\n\nThe Commercial Marketing & Growth Course is designed for marketers, founders, business owners and commercial professionals who want to move beyond traditional marketing and understand how modern businesses grow. This is not another basic marketing course. It is a practical course on how marketing connects to growth, revenue and commercial impact.",
      sections: [
        {
          title: "Who This Course Is For",
          items: [
            "Marketing professionals, Brand managers, Marketing executives",
            "Growth marketers, Digital marketers",
            "Founders and entrepreneurs, Business owners",
            "Sales and commercial professionals, Product managers"
          ]
        },
        {
          title: "Course Modules",
          items: [
            "Module 1: The New Role of Marketing",
            "Module 2: Positioning and Brand Growth",
            "Module 3: Customer Acquisition and Growth Systems",
            "Module 4: Commercial Marketing Metrics",
            "Module 5: AI, Leadership and the 90-Day Growth Roadmap"
          ]
        },
        {
          title: "What You Will Leave With",
          items: [
            "A clearer understanding of commercial marketing",
            "A stronger view of how marketing drives growth",
            "A practical positioning framework",
            "A simple acquisition and retention view",
            "Better understanding of key marketing metrics",
            "A 90-day growth roadmap you can apply to your role or business"
          ]
        }
      ]
    }
  }
];

export default function BrandforgeAcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setIsBookingMode(false);
    setSubmitted(false);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setTimeout(() => {
      setIsBookingMode(false);
      setSubmitted(false);
    }, 300);
  };

  const handleBookClick = () => {
    setIsBookingMode(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-[#0A0A0A] font-sans min-h-screen relative">
      
      {/* =========================================================
          SECTION 01: HERO & MANIFESTO 
      ========================================================= */}
      <section className="relative py-12 md:py-16 border-b border-[#E3E7E7] overflow-hidden">
        
        <div className="absolute top-8 left-4 sm:left-8 z-20">
          <Link
            href="/brandforge"
            className="group flex items-center gap-3 font-roc font-semibold text-xs uppercase tracking-widest text-[#054753]"
          >
            <div className="w-8 h-px bg-[#054753] group-hover:w-12 transition-all duration-300" />
            <span className="group-hover:text-[#439aa9] transition-colors">Back to BrandForge</span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 md:mt-0 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Column */}
            <div className="flex-1 space-y-8">
              <Reveal>
                <div className="space-y-4">
                  <span className="inline-block font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573] border-b border-[#E3E7E7] pb-2">
                    03 / The Academy
                  </span>

                  <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#02232A] leading-[1.1]">
                    Practical courses to help you <span className="italic text-[#439aa9] font-normal tracking-tight">think better.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="w-12 h-1.5 bg-[#439aa9]" />
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-4 font-sans text-lg sm:text-xl text-[#0A0A0A]/80 leading-[1.6] max-w-[45ch]">
                  <p>
                    BrandForge Academy is the paid learning arm of BrandForge. It is where lessons on marketing, brand, growth, and career development are turned into focused courses.
                  </p>
                  <p>
                    Built for people who want to sharpen specific skills and build stronger thinking around marketing and career growth.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Statement Box */}
            <div className="w-full lg:w-[40%] relative">
              <Reveal delay={0.2}>
               <div className="bg-[#02232A] text-white p-8 sm:p-10 border-t-4 border-[#439aa9] shadow-xl relative">
                  <div className="space-y-4 relative z-10">
                    <p className="font-sans font-bold text-xl sm:text-2xl text-white">
                      No unnecessary theory.
                    </p>
                    <p className="font-sans font-bold text-xl sm:text-2xl text-white">
                      No recycled advice.
                    </p>
                    <p className="font-sans font-bold text-base sm:text-lg text-[#439aa9] pt-4 mt-4 border-t border-white/10 leading-snug">
                      Just courses designed to help you think better, position yourself better and create stronger impact in your work.
                    </p>
                  </div>
               </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02: AVAILABLE COURSES
      ========================================================= */}
      <section className="py-12 md:py-16 bg-[#F7F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <Reveal>
            <div className="flex items-center gap-6">
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#02232A] tracking-tight">
                Available Courses
              </h2>
              <div className="h-px bg-[#E3E7E7] flex-grow" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <Reveal key={course.id} delay={0.1 * idx}>
                <div 
                  className="group flex flex-col bg-white border border-[#E3E7E7] overflow-hidden hover:border-[#054753] transition-all duration-300 shadow-sm relative h-full"
                >
                <div className="w-full aspect-[4/3] bg-[#F7F8F8] relative overflow-hidden border-b border-[#E3E7E7]">
                  <Image src={course.image} alt={course.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                <div className="flex flex-col flex-grow p-6 sm:p-8 space-y-6">
                  <div className="space-y-4">
                    <span className="font-roc font-semibold text-xs uppercase tracking-[0.2em] text-[#6B7573]">
                      {course.duration}
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-[#02232A] leading-tight group-hover:text-[#054753] transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-sans text-sm text-[#6B7573] leading-relaxed line-clamp-4">
                      {course.desc}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-auto border-t border-[#E3E7E7] space-y-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-roc text-[10px] font-semibold text-[#6B7573] uppercase tracking-[0.1em] mb-0.5">
                          Investment
                        </p>
                        <p className="font-sans font-bold text-lg text-[#054753]">
                          {course.price}
                        </p>
                      </div>
                      <span className="font-sans font-medium text-xs text-[#0A0A0A] bg-[#F7F8F8] px-2 py-1 rounded">
                        {course.format}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal(course)}
                      className="w-full relative flex items-center justify-center px-4 py-3 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden group/btn rounded-full"
                    >
                      <span className="relative z-10">View Details</span>
                      <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>
                  </div>
                </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          COURSE DETAILS MODAL (Pop-up)
      ========================================================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#02232A]/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-full flex flex-col shadow-2xl border border-[#E3E7E7] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E3E7E7] bg-[#F7F8F8]">
              <div>
                <span className="font-roc font-semibold text-xs uppercase tracking-widest text-[#439aa9] block mb-1">
                  Course Details
                </span>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#02232A]">
                  {selectedCourse.title}
                </h3>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E3E7E7] hover:bg-[#F7F8F8] transition-colors group"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-[#6B7573] group-hover:text-[#02232A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
              
              {isBookingMode ? (
                // BOOKING FORM VIEW
                <div className="max-w-2xl mx-auto py-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="mb-8 text-center">
                    <h4 className="font-sans font-bold text-3xl text-[#02232A] mb-2">Register Your Interest</h4>
                    <p className="font-sans text-[#6B7573]">Fill out the form below to secure your spot for <strong>{selectedCourse.title}</strong>.</p>
                  </div>
                  
                  {submitted ? (
                    <div className="py-12 text-center space-y-4 border border-[#E3E7E7] bg-[#F7F8F8]">
                      <div className="w-12 h-12 rounded-full bg-[#439aa9]/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#054753]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-sans font-bold text-2xl text-[#02232A]">Registration Received</h3>
                      <p className="font-sans text-base text-[#6B7573] max-w-sm mx-auto">
                        Thank you for registering. We will contact you shortly with payment and onboarding details.
                      </p>
                      <button 
                        onClick={closeModal}
                        className="mt-6 inline-block font-roc font-bold text-xs uppercase tracking-widest text-[#054753] hover:text-[#439aa9] underline"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">Full name</label>
                        <input type="text" required className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">Email address</label>
                        <input type="email" required className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">WhatsApp number</label>
                        <input type="tel" required className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A]">Where are you currently based?</label>
                        <input type="text" required className="w-full px-0 py-2.5 bg-transparent border-b border-[#E3E7E7] text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors rounded-none" />
                      </div>
                      <div className="pt-6">
                        <button type="submit" className="w-full py-4 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase hover:bg-[#054753] transition-colors rounded-full">
                          Submit Application
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsBookingMode(false)}
                          className="w-full mt-4 py-2 font-sans text-sm text-[#6B7573] hover:text-[#0A0A0A] transition-colors"
                        >
                          Back to Course Details
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                // COURSE DETAILS VIEW
                <div className="animate-in slide-in-from-left-4 duration-300">
                  <div className="flex flex-wrap gap-4 mb-8">
                    <span className="font-sans font-semibold text-sm bg-[#F7F8F8] px-3 py-1 text-[#02232A] border border-[#E3E7E7]">
                      Investment: {selectedCourse.price}
                    </span>
                    <span className="font-sans font-semibold text-sm bg-[#F7F8F8] px-3 py-1 text-[#02232A] border border-[#E3E7E7]">
                      Format: {selectedCourse.format}
                    </span>
                    <span className="font-sans font-semibold text-sm bg-[#F7F8F8] px-3 py-1 text-[#02232A] border border-[#E3E7E7]">
                      Duration: {selectedCourse.duration}
                    </span>
                  </div>

                  <div className="prose prose-lg prose-slate max-w-none font-sans">
                    {selectedCourse.fullDetails.intro.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-[#0A0A0A]/90 leading-relaxed font-medium">
                        {paragraph}
                      </p>
                    ))}

                    <div className="my-10 h-px w-full bg-[#E3E7E7]" />

                    {selectedCourse.fullDetails.sections.map((section, idx) => (
                      <div key={idx} className="mb-10">
                        <h4 className="font-sans font-bold text-2xl text-[#02232A] mb-4">
                          {section.title}
                        </h4>
                        <ul className="space-y-3 pl-0 list-none">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-[#439aa9] font-bold block mt-1">•</span>
                              <span className="text-[#0A0A0A]/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer / CTA (Only visible when NOT in booking mode) */}
            {!isBookingMode && (
              <div className="p-6 border-t border-[#E3E7E7] bg-[#F7F8F8] flex items-center justify-between">
                <div>
                  <p className="font-roc font-semibold text-xs text-[#6B7573] uppercase tracking-widest mb-1">
                    Ready to start?
                  </p>
                  <p className="font-sans font-bold text-xl text-[#054753]">
                    {selectedCourse.price}
                  </p>
                </div>
                <button
                  onClick={handleBookClick}
                  className="group relative flex items-center justify-center px-8 py-4 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase overflow-hidden rounded-full"
                >
                  <span className="relative z-10">Book This Course</span>
                  <div className="absolute inset-0 bg-[#439aa9] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
