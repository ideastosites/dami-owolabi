"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandforgeDropdownOpen, setBrandforgeDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const brandforgeLinks = [
    { name: "Brandforge Overview", href: "/brandforge" },
    { name: "Academy", href: "/brandforge/academy" },
    { name: "The Forge Room", href: "/brandforge/the-forge-room" },
    { name: "The Brandforge Network", href: "/brandforge/the-brandforge-network" },
    { name: "Roundtable", href: "/brandforge/roundtable" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#041418]/85 border-b border-[#439aa9]/20 transition-all">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#439aa9] to-[#054753] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#439aa9]/20 group-hover:scale-105 transition-transform duration-300">
            DO
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-[#439aa9] transition-colors">
              Dami Owolabi
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#439aa9]">
              Brandforge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-[#439aa9] ${
              isActive("/") ? "text-[#439aa9] font-semibold" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Home
          </Link>

          {/* Brandforge Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBrandforgeDropdownOpen(true)}
            onMouseLeave={() => setBrandforgeDropdownOpen(false)}
          >
            <button
              onClick={() => setBrandforgeDropdownOpen(!brandforgeDropdownOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#439aa9] py-2 ${
                pathname.startsWith("/brandforge")
                  ? "text-[#439aa9] font-semibold"
                  : "text-slate-700 dark:text-slate-200"
              }`}
            >
              Brandforge Ecosystem
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  brandforgeDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {brandforgeDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-2">
                <div className="bg-white dark:bg-[#071f25] rounded-2xl shadow-xl border border-[#439aa9]/20 p-2 overflow-hidden backdrop-blur-xl">
                  {brandforgeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                        isActive(link.href)
                          ? "bg-[#439aa9]/15 text-[#439aa9] font-medium"
                          : "text-slate-700 dark:text-slate-200 hover:bg-[#439aa9]/10 hover:text-[#439aa9]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/work-with-me"
            className={`text-sm font-medium transition-colors hover:text-[#439aa9] ${
              isActive("/work-with-me")
                ? "text-[#439aa9] font-semibold"
                : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Work With Me
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-[#439aa9] ${
              isActive("/contact") ? "text-[#439aa9] font-semibold" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Action CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#439aa9] hover:bg-[#348896] text-white font-medium text-sm shadow-md shadow-[#439aa9]/25 hover:shadow-lg hover:shadow-[#439aa9]/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#439aa9]/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#041418] border-b border-[#439aa9]/20 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-sm font-medium ${
              isActive("/") ? "bg-[#439aa9]/15 text-[#439aa9]" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Home
          </Link>

          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#439aa9]">
            Brandforge Ecosystem
          </div>
          <div className="pl-4 space-y-1">
            {brandforgeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm ${
                  isActive(link.href)
                    ? "bg-[#439aa9]/15 text-[#439aa9] font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#439aa9]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/work-with-me"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-sm font-medium ${
              isActive("/work-with-me")
                ? "bg-[#439aa9]/15 text-[#439aa9]" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Work With Me
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-sm font-medium ${
              isActive("/contact")
                ? "bg-[#439aa9]/15 text-[#439aa9]" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Contact
          </Link>

          <div className="pt-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-xl bg-[#439aa9] text-white font-medium text-sm shadow-md"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
