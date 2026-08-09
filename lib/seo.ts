import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl()}${item.path}`,
    })),
  };
}

// Every page's metadata funnels through here so title/description, the
// canonical URL, and the Open Graph/Twitter cards all stay in sync — a page
// that only sets `title` but forgets `alternates.canonical` is a common way
// SEO quietly rots over time as pages get added.
//
// Next.js metadata merging is shallow per top-level key: the moment a page
// sets its own `openGraph` object (even just title/description), the parent
// layout's entire openGraph — including the image resolved from
// opengraph-image.tsx — is replaced, not merged. Confirmed by inspecting
// actual rendered output: pages using this helper had no og:image at all
// until `images` was added explicitly below. Pointing every page at the same
// file-convention route keeps one shared branded image without duplicating
// the actual image logic.
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl()}${opts.path}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: "Dami Owolabi",
      locale: "en_US",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ["/twitter-image"],
    },
  };
}
