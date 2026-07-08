import React from "react";

export default function ContactPage() {
  return (
    <div className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center space-y-4 mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#439aa9]/10 text-[#439aa9] border border-[#439aa9]/20">
          Direct Inquiry
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Start a Conversation
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Connect with Dami Owolabi and the Brandforge executive team for strategic advisory, keynote speaking, or partnership inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass-panel p-8 md:p-10 rounded-3xl shadow-sm border border-[#439aa9]/20 bg-white dark:bg-[#071f25]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Dami Owolabi"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#133c46] bg-slate-50 dark:bg-[#041418] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#439aa9] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="contact@brandforge.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#133c46] bg-slate-50 dark:bg-[#041418] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#439aa9] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Subject & Engagement Type
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#133c46] bg-slate-50 dark:bg-[#041418] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#439aa9] transition-all">
                <option>Brandforge Academy Inquiry</option>
                <option>Executive Advisory & Consulting</option>
                <option>Keynote & Speaking Engagement</option>
                <option>The Forge Room Workshop</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Share context on your brand, team, or strategic objectives..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#133c46] bg-slate-50 dark:bg-[#041418] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#439aa9] transition-all"
              />
            </div>
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#439aa9] hover:bg-[#348896] text-white font-medium text-sm shadow-lg shadow-[#439aa9]/25 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#054753] text-white space-y-4 shadow-lg">
            <h3 className="text-lg font-bold">Direct Office</h3>
            <p className="text-sm text-slate-200">
              For priority executive scheduling or media inquiries, reach our team directly.
            </p>
            <div className="pt-2 text-sm text-[#62b6c4] font-medium">
              inquiries@damiowolabi.com
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#071f25] border border-[#439aa9]/20 space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white">Response Time</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Our advisory office reviews all inquiries within 24 to 48 business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
