"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PaymentRecord } from "@/lib/payments/store";
import type { WaitlistRecord } from "@/lib/waitlist/store";

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-[#EAF5EF] text-[#2F7A5C] border-[#2F7A5C]/25",
    pending: "bg-[#FBF3E4] text-[#B8863B] border-[#B8863B]/25",
    failed: "bg-[#FBEBE9] text-[#B8433A] border-[#B8433A]/25",
    abandoned: "bg-[#FBEBE9] text-[#B8433A] border-[#B8433A]/25",
  };
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-roc font-semibold uppercase tracking-wider border ${styles[status] || "bg-[#F7F8F8] text-[#6B7573] border-[#E3E7E7]"}`}
    >
      {status}
    </span>
  );
}

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-2 bg-white border border-[#E3E7E7] rounded-lg text-sm font-sans focus:outline-none focus:border-[#054753] transition-colors w-full sm:w-64"
    />
  );
}

function ExportButton({ href, label }: { href: string; label: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(href, { headers: { "x-admin-export": "1" } });
      if (!res.ok) throw new Error("Export failed");

      const disposition = res.headers.get("Content-Disposition") || "";
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match ? match[1] : "export.xlsx";

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not export right now. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDownloading}
      className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#054753] text-[#054753] hover:bg-[#054753] hover:text-white font-roc font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
    >
      {isDownloading ? "Exporting..." : label}
    </button>
  );
}

export default function AdminDashboard({
  payments,
  waitlist,
}: {
  payments: PaymentRecord[];
  waitlist: WaitlistRecord[];
}) {
  const router = useRouter();
  const [paymentsQuery, setPaymentsQuery] = useState("");
  const [waitlistQuery, setWaitlistQuery] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const sortedPayments = useMemo(
    () => [...payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [payments]
  );
  const sortedWaitlist = useMemo(
    () => [...waitlist].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [waitlist]
  );

  const filteredPayments = useMemo(() => {
    const q = paymentsQuery.trim().toLowerCase();
    if (!q) return sortedPayments;
    return sortedPayments.filter((p) =>
      [p.customerName, p.customerEmail, p.productName, p.transactionReference]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [sortedPayments, paymentsQuery]);

  const filteredWaitlist = useMemo(() => {
    const q = waitlistQuery.trim().toLowerCase();
    if (!q) return sortedWaitlist;
    return sortedWaitlist.filter((w) =>
      [w.customerName, w.customerEmail, w.courseTitle, w.location].join(" ").toLowerCase().includes(q)
    );
  }, [sortedWaitlist, waitlistQuery]);

  const totalRevenue = useMemo(
    () => payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    [payments]
  );
  const paidCount = payments.filter((p) => p.status === "paid").length;
  const pendingCount = payments.filter((p) => p.status === "pending").length;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <main className="pt-16 pb-20">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#02232A] font-sans">Admin</h1>
          <div className="flex items-center gap-5">
            <ExportButton href="/api/admin/backup" label="Download Full Backup" />
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-sm font-sans text-[#6B7573] hover:text-[#02232A] transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="bg-[#F7F8F8] border border-[#E3E7E7] rounded-xl p-5">
            <p className="text-xs font-roc font-semibold uppercase tracking-wider text-[#6B7573] mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-[#054753] font-sans">{formatNaira(totalRevenue)}</p>
          </div>
          <div className="bg-[#F7F8F8] border border-[#E3E7E7] rounded-xl p-5">
            <p className="text-xs font-roc font-semibold uppercase tracking-wider text-[#6B7573] mb-1">Paid</p>
            <p className="text-2xl font-bold text-[#02232A] font-sans">{paidCount}</p>
          </div>
          <div className="bg-[#F7F8F8] border border-[#E3E7E7] rounded-xl p-5">
            <p className="text-xs font-roc font-semibold uppercase tracking-wider text-[#6B7573] mb-1">Pending</p>
            <p className="text-2xl font-bold text-[#02232A] font-sans">{pendingCount}</p>
          </div>
          <div className="bg-[#F7F8F8] border border-[#E3E7E7] rounded-xl p-5">
            <p className="text-xs font-roc font-semibold uppercase tracking-wider text-[#6B7573] mb-1">Waitlist Signups</p>
            <p className="text-2xl font-bold text-[#02232A] font-sans">{waitlist.length}</p>
          </div>
        </div>

        {/* Payments */}
        <section className="mb-16">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-xl font-bold text-[#02232A] font-sans">Payments</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <SearchInput value={paymentsQuery} onChange={setPaymentsQuery} placeholder="Search name, email, course..." />
              <ExportButton href="/api/admin/export/payments" label="Export to Excel" />
            </div>
          </div>

          <div className="overflow-x-auto border border-[#E3E7E7] rounded-xl">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#F7F8F8] border-b border-[#E3E7E7] text-left">
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Date</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Status</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Name</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Email</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Phone</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Course / Product</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573] text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-[#6B7573]">
                      {payments.length === 0 ? "No payments yet." : "No results match your search."}
                    </td>
                  </tr>
                )}
                {filteredPayments.map((p) => (
                  <tr key={p.transactionReference} className="border-b border-[#E3E7E7] last:border-b-0">
                    <td className="px-4 py-3 whitespace-nowrap text-[#6B7573]">{formatDate(p.createdAt)}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3 text-[#0A0A0A] font-medium">{p.customerName}</td>
                    <td className="px-4 py-3 text-[#6B7573]">{p.customerEmail}</td>
                    <td className="px-4 py-3 text-[#6B7573] whitespace-nowrap">{p.customerPhone || "—"}</td>
                    <td className="px-4 py-3 text-[#0A0A0A]">{p.productName}</td>
                    <td className="px-4 py-3 text-right text-[#054753] font-semibold whitespace-nowrap">{formatNaira(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Waitlist */}
        <section>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-xl font-bold text-[#02232A] font-sans">Waitlist</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <SearchInput value={waitlistQuery} onChange={setWaitlistQuery} placeholder="Search name, email, course..." />
              <ExportButton href="/api/admin/export/waitlist" label="Export to Excel" />
            </div>
          </div>

          <div className="overflow-x-auto border border-[#E3E7E7] rounded-xl">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#F7F8F8] border-b border-[#E3E7E7] text-left">
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Date</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Name</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Email</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Phone</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Course</th>
                  <th className="px-4 py-3 font-roc font-semibold text-xs uppercase tracking-wider text-[#6B7573]">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredWaitlist.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[#6B7573]">
                      {waitlist.length === 0 ? "No waitlist signups yet." : "No results match your search."}
                    </td>
                  </tr>
                )}
                {filteredWaitlist.map((w, i) => (
                  <tr key={`${w.customerEmail}-${w.createdAt}-${i}`} className="border-b border-[#E3E7E7] last:border-b-0">
                    <td className="px-4 py-3 whitespace-nowrap text-[#6B7573]">{formatDate(w.createdAt)}</td>
                    <td className="px-4 py-3 text-[#0A0A0A] font-medium">{w.customerName}</td>
                    <td className="px-4 py-3 text-[#6B7573]">{w.customerEmail}</td>
                    <td className="px-4 py-3 text-[#6B7573] whitespace-nowrap">{w.customerPhone || "—"}</td>
                    <td className="px-4 py-3 text-[#0A0A0A]">{w.courseTitle}</td>
                    <td className="px-4 py-3 text-[#6B7573]">{w.location || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
