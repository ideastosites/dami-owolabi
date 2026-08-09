import { pageMetadata } from "@/lib/seo";

// Transactional redirect target, not content — kept out of search entirely.
export const metadata = pageMetadata({
  title: "Payment Status | Dami Owolabi",
  description: "Checking your payment status.",
  path: "/pay/return",
  noIndex: true,
});

export default function PayReturnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
