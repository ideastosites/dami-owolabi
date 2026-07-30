import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

// Roc Grotesk using the licensed font files from the client's Roc Grotesk Font Family package.
// Applied to the BrandForge ecosystem as the secondary typography.
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
    {
      path: "../public/fonts/roc-grotesk/RocGrotesk-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/roc-grotesk/RocGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder",
  description:
    "Dami Owolabi works at the intersection of marketing, growth and business strategy — helping brands grow smarter and marketers become hard to ignore.",
};

import PageGlow from "@/components/PageGlow";

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
        <div aria-hidden className="grain-overlay" />
        <PageGlow />
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
