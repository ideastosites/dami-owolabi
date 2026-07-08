import type { Metadata } from "next";
import { Mulish, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dami Owolabi | Executive Brand Advisory & Thought Leadership",
  description:
    "Architecting enduring brands, intellectual authority, and executive ecosystems for high-impact leaders across the globe.",
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
      <body className="min-h-screen flex flex-col bg-white text-[#0A0A0A] font-mulish selection:bg-[#439aa9]/20 selection:text-[#054753]">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
