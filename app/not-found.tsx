import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <p className="font-roc text-[#439aa9] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#02232A] font-sans mb-4">
          Page not found
        </h1>
        <p className="text-[#6B7573] font-sans text-base mb-8">
          The page you’re looking for doesn’t exist, or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#054753] px-8 py-3 font-roc text-sm font-semibold text-white transition-colors hover:bg-[#439aa9]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
