import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Forge Room | A 12-Week BrandForge Experience — Dami Owolabi",
  description:
    "A 12-week development experience for marketers who want to become hard to ignore — sharpen your thinking, positioning and career trajectory with Dami Owolabi.",
  path: "/brandforge/the-forge-room",
});

export default function ForgeRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
