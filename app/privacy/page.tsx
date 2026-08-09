import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | Dami Owolabi",
  description: "How Dami Owolabi collects, uses, and protects your information.",
  path: "/privacy",
  noIndex: true,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 border-t border-[#E3E7E7] pt-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#02232A] font-sans">{title}</h2>
      <div className="space-y-4 text-base text-[#0A0A0A]/80 font-sans leading-[1.7]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-16 pb-20">
      <div className="max-w-[820px] mx-auto px-6 lg:px-10">
        <Reveal className="mb-14">
          <span className="font-roc text-[#439aa9] font-semibold text-[13px] uppercase tracking-[0.08em] block mb-4">
            Privacy Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#02232A] tracking-tight font-sans leading-[1.1] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6B7573] font-sans text-sm">Last updated: 9 August 2026</p>
        </Reveal>

        <div className="space-y-10">
          <Section title="What this covers">
            <p>
              This policy explains what information damiowolabi.com collects when you fill out a form,
              book a paid service, or join a waitlist, and what happens to it afterward.
            </p>
          </Section>

          <Section title="What we collect">
            <p>Depending on which form you use, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name, email address and phone number</li>
              <li>The content of any message or inquiry you send</li>
              <li>
                For paid bookings: which course or service you paid for, the amount, and a payment
                status and reference number from our payment provider — never your full card number
              </li>
            </ul>
            <p>
              We do not process or store card details ourselves. Payments are handled entirely on
              NovaCPayment&apos;s own secure checkout page; we only ever receive a confirmation and a
              masked summary (e.g. the first six and last four digits of a card) after the fact.
            </p>
          </Section>

          <Section title="How we use it">
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiry or confirm your booking</li>
              <li>To send you a receipt or confirmation email</li>
              <li>To follow up about a course, session, or waitlist spot you&apos;ve registered for</li>
            </ul>
            <p>We do not sell your information, and we do not use it for advertising.</p>
          </Section>

          <Section title="Who else sees it">
            <p>Two service providers process data on our behalf, strictly to run the site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>NovaCPayment</strong> — processes card and bank transfer payments. Your card
                details go directly to them, never to us.
              </li>
              <li>
                <strong>Resend</strong> — delivers the confirmation and notification emails this site
                sends.
              </li>
            </ul>
            <p>
              If analytics is enabled on this site, aggregated, anonymised usage data may also be
              shared with Google Analytics.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Payment and waitlist records are kept for as long as reasonably necessary for
              bookkeeping, customer support, and to meet any legal or tax obligations. You can ask
              for your information to be deleted at any time — see &quot;Your rights&quot; below.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              The site uses one functional cookie for the admin dashboard login (not used to track
              visitors). If analytics is enabled, Google Analytics may set its own cookies to measure
              site usage.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask what information we hold about you, ask us to correct it, or ask us to
              delete it, at any time — just email{" "}
              <a href="mailto:hello@damiowolabi.com" className="text-[#439aa9] hover:text-[#054753] transition-colors">
                hello@damiowolabi.com
              </a>
              .
            </p>
          </Section>

          <Section title="Questions">
            <p>
              If anything here is unclear, reach out at{" "}
              <a href="mailto:hello@damiowolabi.com" className="text-[#439aa9] hover:text-[#054753] transition-colors">
                hello@damiowolabi.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
