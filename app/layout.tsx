import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

// Roc Grotesk using the licensed font files from the client's Roc Grotesk Font Family package.
// Applied to the BrandForge ecosystem as the secondary typography. Only the
// weights actually used with font-roc anywhere in the app are loaded —
// ExtraBold/Black aren't referenced (font-extrabold/font-black only appear
// on font-sans/Montserrat elements), so shipping and preloading those two
// files on every page would be pure waste.
const rocGrotesk = localFont({
  variable: "--font-roc",
  src: [
    {
      path: "../public/fonts/roc-grotesk/RocGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/roc-grotesk/RocGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/roc-grotesk/RocGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const title = "Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder";
const description =
  "Dami Owolabi works at the intersection of marketing, growth and business strategy — helping brands grow smarter and marketers become hard to ignore.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Site-wide credit — inherited by every page unless a page's own
  // metadata explicitly sets `authors`/`creator`/`publisher` itself
  // (none currently do), per Next's shallow-merge-per-key metadata model.
  authors: [
    { name: "IdeasToSites", url: "https://ideastosites.com" },
    { name: "Laolu Ibitoye" },
    { name: "Franklin Pre-Gee" },
    { name: "Oladele (Niji) Oladipupo" },
    { name: "Awwal Folarin" },
  ],
  creator: "IdeasToSites",
  publisher: "IdeasToSites",
  openGraph: {
    title,
    description,
    url: siteUrl(),
    siteName: "Dami Owolabi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

import PageGlow from "@/components/PageGlow";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dami Owolabi",
  url: siteUrl(),
  jobTitle: "Marketing Leader, Growth Strategist, Brand Builder",
  description,
  sameAs: [
    "https://www.linkedin.com/in/dami-owolabi-93426717/",
    "https://x.com/dami_owoo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${rocGrotesk.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-white text-[#0A0A0A] font-sans selection:bg-[#439aa9]/20 selection:text-[#054753]">
        <StructuredData data={personSchema} />
        <Analytics />
        <div aria-hidden className="grain-overlay" />
        <PageGlow />
        <Navbar />
        <main className="flex-grow flex flex-col relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
