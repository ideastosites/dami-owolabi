// Authoritative server-side price list. The client only ever sends a
// productId — never an amount — so a tampered request can't change what
// gets charged. Keep ids in sync with the `id` fields used in
// app/brandforge/academy/page.tsx and the Roundtable page.

export type Product = {
  id: string;
  name: string;
  amount: number; // NGN, whole naira
  currency: "NGN";
};

const PRODUCTS: Record<string, Product> = {
  "interview-prep": {
    id: "interview-prep",
    name: "BrandForge Academy — Interview Prep Sprint",
    amount: 50000,
    currency: "NGN",
  },
  "strategy-session": {
    id: "strategy-session",
    name: "BrandForge Academy — 1:1 Strategy Session with Dami",
    amount: 100000,
    currency: "NGN",
  },
  "switching-into-marketing": {
    id: "switching-into-marketing",
    name: "BrandForge Academy — Switching Into Marketing",
    amount: 250000,
    currency: "NGN",
  },
  "commercial-marketing": {
    id: "commercial-marketing",
    name: "BrandForge Academy — Commercial Marketing & Growth",
    amount: 350000,
    currency: "NGN",
  },
  roundtable: {
    id: "roundtable",
    name: "BrandForge Roundtable — Seat",
    amount: 100000,
    currency: "NGN",
  },
};

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS[productId];
}
