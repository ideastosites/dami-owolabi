import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSessionCookieValue } from "@/lib/admin/auth";
import { getAllPayments } from "@/lib/payments/store";
import { getAllWaitlistEntries } from "@/lib/waitlist/store";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidSessionCookieValue(session)) {
    redirect("/admin/login");
  }

  const [payments, waitlist] = await Promise.all([getAllPayments(), getAllWaitlistEntries()]);

  return <AdminDashboard payments={payments} waitlist={waitlist} />;
}
