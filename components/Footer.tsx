import Link from "next/link";
import Image from "next/image";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const aboutLinks = [
    { label: "Home", href: "/" },
    { label: "Work With Me", href: "/work-with-me" },
    { label: "Brand Forge", href: "/brandforge" },
    { label: "Contact Me", href: "/contact" },
  ];

  const moreLinks = [
    { label: "The Forge Room", href: "/brandforge/the-forge-room" },
    { label: "The Brandforge Network", href: "/brandforge/the-brandforge-network" },
    { label: "The BrandForge Academy", href: "/brandforge/academy" },
    { label: "BrandForge Roundtable", href: "/brandforge/roundtable" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dami-owolabi-93426717/", icon: LinkedInIcon },
    { label: "Instagram", href: "https://www.instagram.com/brandforgeofficial/", icon: InstagramIcon },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#02232A] text-white mt-auto">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.04), transparent 40%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.03), transparent 45%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Contact */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/Main_Logo_White.png"
                alt="Dami Owolabi Logo"
                width={170}
                height={46}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <h4 className="font-montserrat font-semibold text-sm text-white">Contact</h4>
            <ul className="space-y-3 font-sans text-sm text-white/70">
              <li>
                <a
                  href="mailto:hello@damiowolabi.com"
                  className="link-hover hover:text-white transition-colors duration-200"
                >
                  hello@damiowolabi.com
                </a>
              </li>
            </ul>
          </div>

          {/* Directory */}
          <div className="space-y-5">
            <h4 className="font-montserrat font-semibold text-sm text-white">Directory</h4>
            <ul className="space-y-3 font-sans text-sm">
              {aboutLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-hover inline-flex items-center text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-5">
            <h4 className="font-montserrat font-semibold text-sm text-white">More Links</h4>
            <ul className="space-y-3 font-sans text-sm">
              {moreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-hover inline-flex items-center text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-5">
            <h4 className="font-montserrat font-semibold text-sm text-white">Socials</h4>
            <ul className="space-y-3 font-sans text-sm">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <item.icon />
                    <span className="link-hover">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="mt-10 pt-4 border-t border-white/10 text-center w-full font-sans text-xs text-white/60">
          <p>© 2026 Dami Owolabi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
