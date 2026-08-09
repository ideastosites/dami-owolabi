import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact | Dami Owolabi",
  description:
    "Get in touch with Dami Owolabi to schedule a call about strategic advisory, speaking, corporate training, or The Forge Room.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
