import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#054753] text-white border-t border-[#439aa9]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Identity Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#439aa9] flex items-center justify-center text-white font-bold text-lg shadow-md">
                DO
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white">
                  Dami Owolabi
                </span>
                <span className="text-xs uppercase tracking-widest text-[#62b6c4] font-semibold">
                  Brandforge
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Architecting enduring brands, intellectual authority, and executive ecosystems for high-impact leaders across the globe.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#439aa9]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/brandforge" className="hover:text-white transition-colors">
                  Brandforge Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/work-with-me" className="hover:text-white transition-colors">
                  Work With Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Brandforge Pillars */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#439aa9]">
              Brandforge Pillars
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/brandforge/academy" className="hover:text-white transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/brandforge/the-forge-room" className="hover:text-white transition-colors">
                  The Forge Room
                </Link>
              </li>
              <li>
                <Link href="/brandforge/the-brandforge-network" className="hover:text-white transition-colors">
                  The Brandforge Network
                </Link>
              </li>
              <li>
                <Link href="/brandforge/roundtable" className="hover:text-white transition-colors">
                  Roundtable
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#439aa9]">
              Connect & Engage
            </h4>
            <p className="text-sm text-slate-300">
              Ready to elevate your brand ecosystem and executive presence?
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#439aa9] hover:bg-[#62b6c4] text-white font-medium text-sm transition-all shadow-md"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dami Owolabi & Brandforge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Built with Next.js & Tailwind CSS Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
