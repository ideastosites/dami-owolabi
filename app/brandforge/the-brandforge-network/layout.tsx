import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The BrandForge Network | Community for Marketers — Dami Owolabi",
  description:
    "Join the waitlist for The BrandForge Network — a growing community for marketers, brand builders and growth-minded professionals.",
  path: "/brandforge/the-brandforge-network",
});

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
