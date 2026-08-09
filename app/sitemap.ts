import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/work-with-me", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/brandforge", priority: 0.9, changeFrequency: "monthly" },
  { path: "/brandforge/academy", priority: 0.9, changeFrequency: "weekly" },
  { path: "/brandforge/roundtable", priority: 0.8, changeFrequency: "monthly" },
  { path: "/brandforge/the-forge-room", priority: 0.7, changeFrequency: "monthly" },
  { path: "/brandforge/the-brandforge-network", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
