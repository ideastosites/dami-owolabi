import Script from "next/script";

// Loads nothing at all unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set — safe to
// ship in every environment, becomes live the moment a real ID is added to
// the host's env vars. Measurement IDs are meant to be public (they're
// visible in every page's HTML on any GA4 site), which is why this is the
// one env var in the project that uses the NEXT_PUBLIC_ prefix.
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
