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
          <Section title="Overview">
            <p>
              These terms apply when you book a course, session, or event through damiowolabi.com.
              By completing a payment or registering interest through this site, you agree to them.
            </p>
          </Section>

          <Section title="Bookings and payment">
            <p>
              Prices shown at checkout are in Nigerian Naira (₦) and are charged in full at the time
              of booking through our payment provider, NovaCPayment. A booking is only confirmed once
              payment has been verified — you&apos;ll receive an email confirmation when that happens.
            </p>
          </Section>

          <Section title="Waitlists">
            <p>
              Joining a waitlist for a course that hasn&apos;t opened yet does not require payment and
              does not guarantee a spot. You&apos;ll be contacted with payment and onboarding details
              once a date is confirmed.
            </p>
          </Section>

          <Section title="Cancellations and refunds">
            <p>
              If you need to cancel or reschedule a booked session, course, or event, contact{" "}
              <a href="mailto:hello@damiowolabi.com" className="text-[#439aa9] hover:text-[#054753] transition-colors">
                hello@damiowolabi.com
              </a>{" "}
              as early as possible. Refund eligibility depends on how much notice is given and how
              close the session or course is to starting — we&apos;ll work it out with you directly
              rather than applying a rigid rule here.
            </p>
          </Section>

          <Section title="Changes to a course or session">
            <p>
              Occasionally a date, format, or facilitator may need to change. If that happens for
              something you&apos;ve already paid for, we&apos;ll notify you and offer a reschedule or
              refund.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms, or about a specific booking, go to{" "}
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
