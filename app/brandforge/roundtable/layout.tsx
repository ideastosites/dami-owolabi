import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrandForge Roundtable | In-Person Marketing Conversations — Dami Owolabi",
  description:
    "An in-person experience for marketers, founders and growth professionals to discuss brand, career and commercial marketing beyond surface-level advice.",
  path: "/brandforge/roundtable",
});

export default function RoundtableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
