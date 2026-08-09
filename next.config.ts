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
