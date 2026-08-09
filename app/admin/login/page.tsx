"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#F7F8F8] border border-[#E3E7E7] rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-[#02232A] font-sans mb-2">Admin</h1>
        <p className="text-sm text-[#6B7573] font-sans mb-6">
          Enter the admin password to view payments and waitlist signups.
        </p>

        <label className="block font-roc font-semibold text-xs uppercase tracking-wider text-[#02232A] mb-2">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 bg-white border border-[#E3E7E7] rounded-lg text-[#0A0A0A] font-sans text-base focus:outline-none focus:border-[#054753] transition-colors mb-4"
        />

        {error && <p className="text-sm text-[#B8433A] font-sans mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || !password}
          className="w-full py-3 bg-[#02232A] text-white font-roc font-bold text-xs tracking-widest uppercase hover:bg-[#054753] transition-colors rounded-full disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
