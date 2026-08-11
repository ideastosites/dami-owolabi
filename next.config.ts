import type { NextConfig } from "next";

// Not a nonce-based CSP — Next.js's own hydration/streaming scripts run
// inline, and adding nonces would need custom middleware. 'unsafe-inline'
// still blocks the main things that matter here: loading a script or
// exfiltrating data to a domain that isn't ours, checkout.novacpayment.com,
// or Resend's asset CDN.
//
// 'unsafe-eval' is added only outside production — webpack's dev-mode HMR
// executes module code via eval() for source maps, and without this the
// entire client bundle fails to run, which silently breaks every
// scroll/fade-in animation on the site (they stay at their initial
// opacity-0 state forever) while looking like a normal 200 response.
// Confirmed clean with zero CSP violations against an actual production
// build, so this only loosens the policy somewhere that never ships.
const csp = [
  "default-src 'self'",
  // Google Tag Manager/Analytics only actually load if NEXT_PUBLIC_GA_MEASUREMENT_ID
  // is set (see components/Analytics.tsx) — allowing their domains here is a
  // no-op until then, and saves a "analytics blocked by CSP" surprise later.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.novacpayment.com https://www.google-analytics.com https://www.googletagmanager.com",
  "form-action 'self' https://checkout.novacpayment.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
  },
  // Source maps aren't useful in production for a marketing site with no
  // client-facing error reporting hooked up, and generating them adds real
  // memory overhead during the build — see the memory knobs below.
  productionBrowserSourceMaps: false,
  experimental: {
    // The production host reports far more CPUs than it actually has RAM
    // for — Next's default worker count (one per detected CPU) spawned 21
    // parallel build workers during "Collecting page data" and the OOM
    // killer took the process down (`Killed`, no error message). This site
    // has well under 100 pages total, so setting the per-worker page
    // budget above that forces everything onto a single build worker.
    staticGenerationMinPagesPerWorker: 100,
    // Official low-risk flag for exactly this situation (per Next's own
    // "How to optimize memory usage" guide) — trims webpack's peak memory
    // during compilation at the cost of a slightly slower build.
    webpackMemoryOptimizations: true,
    // Prerender-phase source maps, on by default since Next 15 — same
    // memory tradeoff as productionBrowserSourceMaps above.
    serverSourceMaps: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
