import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TEMPORARY: Roc Grotesk standing in for Mulish, using the licensed font
// files from the client's Roc Grotesk Font Family package. Swap back to
// Mulish (next/font/google) when this trial period is over.
const mulish = localFont({
  variable: "--font-mulish",
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
    "Dami Owolabi works at the intersection of marketing, growth and business — helping brands grow smarter and marketers become hard to ignore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#0A0A0A] font-sans selection:bg-[#439aa9]/20 selection:text-[#054753]">
        <div aria-hidden className="grain-overlay" />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
