import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin | Dami Owolabi",
  description: "Admin sign-in.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
