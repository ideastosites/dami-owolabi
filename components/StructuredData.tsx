// Renders a JSON-LD <script> tag. Safe to use with dangerouslySetInnerHTML
// here specifically because every caller passes statically-defined site
// content (course catalogs, page copy) — never raw user input — so there's
// no injection surface, just JSON.stringify output.
export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
