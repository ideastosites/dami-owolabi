"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandForgeDropdownOpen, setBrandForgeDropdownOpen] = useState(false);
  const [mobileBrandForgeExpanded, setMobileBrandForgeExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const brandForgeLinks = [
    { label: "What is BrandForge", href: "/brandforge" },
    { label: "The Forge Room", href: "/brandforge/the-forge-room" },
    { label: "The BrandForge Network", href: "/brandforge/the-brandforge-network" },
    { label: "The BrandForge Academy", href: "/brandforge/academy" },
    { label: "BrandForge Roundtable", href: "/brandforge/roundtable" },
  ];

  const isBrandForgeActive = pathname.startsWith("/brandforge");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBrandForgeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Main_Logo_Dark.png"
            alt="Dami Owolabi Logo"
            width={160}
            height={44}
            className="h-9 md:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="/"
            className={`link-hover font-sans text-base transition-colors duration-200 ${
              pathname === "/"
                ? "text-[#054753] font-bold"
                : "text-[#0A0A0A] font-semibold hover:text-[#439aa9]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/work-with-me"
            className={`link-hover font-sans text-base transition-colors duration-200 ${
              pathname === "/work-with-me"
                ? "text-[#054753] font-bold"
                : "text-[#0A0A0A] font-semibold hover:text-[#439aa9]"
            }`}
          >
            Work With Me
          </Link>

          {/* BrandForge Dropdown Trigger */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setBrandForgeDropdownOpen(true)}
            onMouseLeave={() => setBrandForgeDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setBrandForgeDropdownOpen(!brandForgeDropdownOpen)}
              className={`flex items-center gap-1.5 font-sans text-base py-2 transition-colors duration-200 focus:outline-none ${
                isBrandForgeActive
                  ? "text-[#054753] font-bold"
                  : "text-[#0A0A0A] font-semibold hover:text-[#439aa9]"
              }`}
              aria-expanded={brandForgeDropdownOpen}
            >
              <span className="link-hover">BrandForge</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  brandForgeDropdownOpen ? "rotate-180 text-[#054753]" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Desktop Dropdown Menu */}
            {brandForgeDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-1 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-[#E3E7E7] py-2 overflow-hidden">
                  {brandForgeLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setBrandForgeDropdownOpen(false)}
                        className={`block px-5 py-2.5 font-sans text-sm transition-colors duration-150 ${
                          isActive
                            ? "bg-[#EFF9FA] text-[#054753] font-bold"
                            : "text-[#0A0A0A] hover:bg-[#EFF9FA] hover:text-[#439aa9]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Far Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="rounded-full border-2 border-[#054753] text-[#054753] hover:bg-[#054753] hover:text-white font-roc font-semibold text-sm px-7 py-3 transition-colors duration-200"
          >
            Contact Me
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A0A0A] hover:text-[#054753] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E3E7E7] px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-sans text-base ${
                pathname === "/"
                  ? "text-[#054753] font-bold bg-[#EFF9FA]"
                  : "text-[#0A0A0A] font-semibold hover:text-[#439aa9]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/work-with-me"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-sans text-base ${
                pathname === "/work-with-me"
                  ? "text-[#054753] font-bold bg-[#EFF9FA]"
                  : "text-[#0A0A0A] font-semibold hover:text-[#439aa9]"
              }`}
            >
              Work With Me
            </Link>

            {/* Mobile BrandForge Accordion Item */}
            <div>
              <button
                type="button"
                onClick={() => setMobileBrandForgeExpanded(!mobileBrandForgeExpanded)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-sans text-base focus:outline-none ${
                  isBrandForgeActive
                    ? "text-[#054753] font-bold bg-[#EFF9FA]"
                    : "text-[#0A0A0A] font-semibold"
                }`}
              >
                <span>BrandForge</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    mobileBrandForgeExpanded ? "rotate-180 text-[#054753]" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileBrandForgeExpanded && (
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-[#E3E7E7] ml-3">
                  {brandForgeLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg font-sans text-sm ${
                          isActive
                            ? "text-[#054753] font-bold bg-[#EFF9FA]"
                            : "text-[#0A0A0A] hover:text-[#439aa9]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 px-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full border-2 border-[#054753] text-[#054753] hover:bg-[#054753] hover:text-white font-roc font-semibold text-sm py-3.5 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
