import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrandForge Academy | Practical Marketing & Career Courses — Dami Owolabi",
  description:
    "Focused courses in marketing, brand and career development — from interview prep to commercial marketing and growth strategy — taught by Dami Owolabi.",
  path: "/brandforge/academy",
});

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
