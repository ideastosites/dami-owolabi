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
          <Section title="1. Introduction">
            <p>
              This Privacy Policy describes how damiowolabi.com (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, discloses, and safeguards information in connection with
              this website and the services offered through it, including strategic advisory, speaking
              and training engagements, and the BrandForge courses, roundtables, and community
              programmes. By using this website, you agree to the practices described in this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect information in the following ways:</p>
            <p className="font-semibold text-[#02232A]">Information you provide directly</p>
            <p>
              When you submit an inquiry, register for a waitlist, or book a paid course or service, we
              collect the information you enter into the relevant form. Depending on the form, this may
              include your name, email address, phone number, location, and the content of any message
              you send us.
            </p>
            <p className="font-semibold text-[#02232A]">Payment information</p>
            <p>
              For paid bookings, we retain a record of which course or service was purchased, the
              amount charged, and a payment status and reference number provided by our payment
              processor. We do not collect, process, or store your full card number, expiry date, or
              security code. Card details are entered directly on our payment processor&apos;s own
              secure checkout page and are never transmitted to or held by us; we receive only a
              payment confirmation and a masked summary of the card used (for example, its first six
              and last four digits).
            </p>
            <p className="font-semibold text-[#02232A]">Information collected automatically</p>
            <p>
              If website analytics is enabled, we may collect general, aggregated information about how
              visitors use this website — for example, which pages are viewed, time spent on the site,
              referring pages, general device or browser type, and an approximate geographic location
              derived from IP address. This information is statistical in nature, is not used to
              identify you personally, and is entirely separate from any information you submit through
              a form. Analytics is not active unless it has been explicitly enabled, and can be disabled
              at our discretion at any time.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and communicate with you about our services</li>
              <li>Process and confirm bookings, and issue payment receipts and confirmations</li>
              <li>Provide onboarding and follow-up details for courses, sessions, or events you have registered or paid for</li>
              <li>Maintain records for bookkeeping, tax, and administrative purposes</li>
              <li>Monitor, maintain, and improve the performance and security of this website</li>
              <li>Understand, in aggregate, how visitors use this website, where analytics is enabled</li>
            </ul>
            <p>
              We do not sell or rent your personal information to third parties, and we do not use it
              for third-party advertising purposes.
            </p>
          </Section>

          <Section title="4. Cookies and Similar Technologies">
            <p>
              This website uses a limited number of cookies. A functional cookie is used to maintain an
              authenticated administrative session for site management purposes; this cookie is not used
              to track visitors and is not accessible to the public. Where website analytics is enabled,
              our analytics provider may set its own cookies, or use comparable technology, to
              distinguish between visitors and compile aggregate usage statistics.
            </p>
            <p>
              Most browsers allow you to refuse or delete cookies through their settings. Doing so may
              affect certain functionality of this website.
            </p>
          </Section>

          <Section title="5. How We Share Your Information">
            <p>
              We engage a small number of specialist third-party service providers to help us operate
              this website and deliver our services. Each provider is granted access only to the
              information necessary to perform its function, under terms that restrict its use of that
              information to the purpose for which it was engaged. These providers include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                A <strong>payment processor</strong>, which handles card and bank transfer payments on
                our behalf. Card details are provided directly to the payment processor and are not
                accessible to us.
              </li>
              <li>
                An <strong>email delivery provider</strong>, which sends transactional emails such as
                booking confirmations, receipts, and responses to inquiries on our behalf.
              </li>
              <li>
                A <strong>website analytics provider</strong>, where analytics is enabled, which
                processes aggregated usage data as described in Section 2.
              </li>
            </ul>
            <p>
              We do not otherwise share your personal information with third parties, except where
              required by law, to protect our legal rights, or in connection with a business transition
              such as a merger or sale of assets, in which case affected users would be notified.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain personal and payment-related information for as long as reasonably necessary to
              fulfil the purposes described in this policy, including ongoing bookkeeping, customer
              support, and compliance with applicable legal, tax, or regulatory obligations. Where
              information is no longer required for these purposes, we take reasonable steps to delete
              or anonymise it.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We take reasonable administrative and technical measures designed to protect the
              information we hold against unauthorised access, disclosure, alteration, or destruction.
              Access to administrative systems is password-protected, and payment card data is handled
              exclusively by our payment processor rather than by us. No method of transmission or
              storage over the internet is entirely secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>
              You may request confirmation of what personal information we hold about you, request that
              inaccurate information be corrected, or request that your information be deleted, subject
              to our legitimate need to retain certain records for legal, tax, or administrative
              purposes. To exercise any of these rights, contact us using the details in Section 11.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              This website and the services offered through it are intended for individuals aged 18 and
              over. We do not knowingly collect personal information from children. If you believe a
              child has provided us with personal information, please contact us so that we can take
              appropriate action.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              for other operational, legal, or regulatory reasons. The date at the top of this page
              indicates when it was last revised. Continued use of this website after any changes take
              effect constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have questions about this Privacy Policy or how your information is handled,
              please contact us at{" "}
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
