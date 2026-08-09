import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service | Dami Owolabi",
  description: "Terms for booking services, courses, and events through damiowolabi.com.",
  path: "/terms",
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

export default function TermsPage() {
  return (
    <main className="pt-16 pb-20">
      <div className="max-w-[820px] mx-auto px-6 lg:px-10">
        <Reveal className="mb-14">
          <span className="font-roc text-[#439aa9] font-semibold text-[13px] uppercase tracking-[0.08em] block mb-4">
            Terms of Service
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#02232A] tracking-tight font-sans leading-[1.1] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6B7573] font-sans text-sm">Last updated: 9 August 2026</p>
        </Reveal>

        <div className="space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of
              damiowolabi.com and the services offered through it, including strategic advisory,
              speaking and training engagements, and the BrandForge courses, roundtables, and community
              programmes (collectively, the &quot;Services&quot;). By submitting an inquiry, joining a
              waitlist, or completing a payment through this website, you agree to be bound by these
              Terms. If you do not agree to these Terms, please do not use this website or the Services.
            </p>
          </Section>

          <Section title="2. Description of Services">
            <p>
              We offer a range of paid and complimentary services, including one-to-one advisory
              sessions, speaking and corporate training engagements, self-contained courses, in-person
              roundtable events, and community programmes. The scope, format, and availability of any
              given service are as described on the relevant page at the time of booking and may be
              updated from time to time.
            </p>
          </Section>

          <Section title="3. Bookings and Payment">
            <p>
              Prices displayed at checkout are stated in Nigerian Naira (₦) and are charged in full at
              the time of booking. Payment is processed through our payment processor&apos;s secure
              checkout page; we do not receive or store your full card details. A booking is confirmed
              only once payment has been successfully verified, at which point you will receive an
              email confirmation.
            </p>
            <p>
              You are responsible for ensuring that the information provided at checkout, including your
              name, email address, and phone number, is accurate and current, as this information is
              used to deliver confirmation and onboarding communications.
            </p>
          </Section>

          <Section title="4. Waitlists">
            <p>
              Where a course or programme has not yet opened for enrolment, you may register your
              interest via a waitlist. Joining a waitlist does not require payment and does not
              guarantee a place once the course or programme becomes available. If a place becomes
              available, we will contact you with payment and onboarding details.
            </p>
          </Section>

          <Section title="5. Cancellations, Rescheduling and Refunds">
            <p>
              If you need to cancel or reschedule a booked session, course, or event, contact us at{" "}
              <a href="mailto:hello@damiowolabi.com" className="text-[#439aa9] hover:text-[#054753] transition-colors">
                hello@damiowolabi.com
              </a>{" "}
              as early as possible. Eligibility for a refund or reschedule depends on the amount of
              notice given and proximity to the scheduled start date. Refund and rescheduling requests
              are assessed and resolved on a case-by-case basis rather than under a fixed schedule of
              fees.
            </p>
          </Section>

          <Section title="6. Changes to a Course, Session or Event">
            <p>
              We reserve the right to change the date, format, or facilitator of a course, session, or
              event where reasonably necessary. If such a change affects a service you have already paid
              for, we will notify you and offer a reschedule or a refund.
            </p>
          </Section>

          <Section title="7. Use of Materials">
            <p>
              Any materials, content, or resources provided as part of a paid course or session are made
              available for your personal, non-commercial use in connection with that course or session.
              They may not be reproduced, distributed, or shared without our prior written consent.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              Our services are provided on the basis of professional experience and good-faith effort.
              To the fullest extent permitted by law, we are not liable for any indirect, incidental, or
              consequential loss arising from your use of this website or participation in the Services,
              beyond the amount actually paid for the relevant service.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to
              conflict-of-law principles. Any dispute arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts of Nigeria.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms from time to time to reflect changes in our services or for
              other operational or legal reasons. The date at the top of this page indicates when it was
              last revised. Continued use of this website or the Services after any changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              Questions about these Terms, or about a specific booking, can be sent to{" "}
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
