import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const siteLinks = [
    { label: "Home", href: "/" },
    { label: "Work With Me", href: "/work-with-me" },
    { label: "BrandForge", href: "/brandforge" },
    { label: "Contact", href: "/contact" },
  ];

  const contactLinks = [
    { label: "hello@damiowolabi.com", href: "mailto:hello@damiowolabi.com" },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Instagram", href: "https://instagram.com", external: true },
  ];

  return (
    <footer className="bg-[#02232A] text-white border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand & Logo Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/Main_Logo_White.png"
                alt="Dami Owolabi Logo"
                width={170}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="font-mulish text-sm text-white/80 leading-relaxed max-w-sm">
              Architecting enduring brands, intellectual authority, and executive ecosystems for high-impact leaders across the globe.
            </p>
          </div>

          {/* Site Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-widest text-white/60">
              Site Links
            </h4>
            <ul className="space-y-3 font-mulish text-base">
              {siteLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#439aa9] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Connect Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-widest text-white/60">
              Contact & Connect
            </h4>
            <ul className="space-y-3 font-mulish text-base">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-white hover:text-[#439aa9] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center w-full font-mulish text-xs text-white/60">
          <p>© 2026 Dami Owolabi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
