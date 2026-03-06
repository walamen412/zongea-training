import DBASignupForm from "./components/DBASignupForm"

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a1628] px-6 pb-20 pt-16 text-center">
        {/* background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 0%, rgba(201,149,42,0.15) 0%, transparent 65%), radial-gradient(ellipse at 10% 100%, rgba(201,149,42,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[rgba(201,149,42,0.4)] bg-[rgba(201,149,42,0.15)] px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[#e8b84b]">
            Professional Development
          </span>

          <h1 className="mt-7 font-serif text-[clamp(2.2rem,6vw,3.8rem)] font-black leading-[1.08] text-white">
            DBA Training <br />
            <span className="text-[#e8b84b]">Class Registration</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[520px] text-[1.05rem] leading-[1.7] text-white/65">
            An industry-led, hands-on Database Administration course designed to build real,
            job-ready technical skills.
          </p>
        </div>
      </section>

      {/* DETAILS BAR */}
      <section className="bg-[#c9952a] px-6 py-3.5">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3">
          <DetailItem icon="calendar">Saturdays &amp; Sundays</DetailItem>
          <DetailItem icon="clock">5:00 PM Liberia Time</DetailItem>
          <DetailItem icon="users">Industry Instructor</DetailItem>
          <DetailItem icon="cap">Start Date: March 21, 2026</DetailItem>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {/* INFO */}
          <div>
            <h2 className="font-serif text-[1.7rem] font-bold text-[#0a1628]">
              About This Course
            </h2>

            <p className="mt-4 text-[0.95rem] leading-[1.75] text-[#6b7a95]">
              We have partnered with an experienced industry professional to bring a
              comprehensive DBA training course directly to our team and partners. This is a
              rigorous, technical program covering core database administration concepts,
              tools, and real-world practices.
            </p>

            <div className="mt-7 rounded-[4px] border-l-4 border-[#c9952a] bg-[#fff8ee] px-4 py-4">
              <strong className="block text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[#c9952a]">
                ⚠ Commitment Required
              </strong>
              <p className="mt-1 text-[0.9rem] leading-[1.6] text-[#1a2640]">
                Once the class begins, <strong>withdrawal is not permitted</strong>. You must
                commit to completing the full program. Only register if you are fully
                prepared to dedicate the time and effort required.
              </p>
            </div>

            <p className="mt-7 text-[0.9rem] font-semibold uppercase tracking-[0.8px] text-[#0a1628]">
              What to expect:
            </p>

            <ul className="mt-4 space-y-6.5">
              {[
                "In-depth, technically rigorous instruction from an industry professional",
                "Weekend sessions every Saturday & Sunday at 5 PM Liberia time",
                "Assignments and hands-on practice throughout the course",
                "Full commitment required — no mid-course withdrawals",
                "Open to both internal team members and partner organizations",
              ].map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-[0.93rem] leading-[1.5] text-[#1a2640]">
                  <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#0a1628]">
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="1.5,5 4,7.5 8.5,2.5" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* FORM */}
          <DBASignupForm />
        </div>
      </section>

      <footer className="border-t border-[#ddd5c4] px-6 py-8 text-center text-[0.82rem] text-[#6b7a95]">
        © 2026 Zongea DBA Training Program · All registrations are subject to confirmation
      </footer>
    </main>
  );
}

function DetailItem({
  icon,
  children,
}: {
  icon: "calendar" | "clock" | "users" | "cap";
  children: React.ReactNode;
}) {
  const Icon = ICONS[icon];
  return (
    <div className="flex items-center gap-2 text-[0.88rem] font-semibold tracking-[0.3px] text-[#0a1628]">
      <Icon />
      {children}
    </div>
  );
}

const ICONS = {
  calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  cap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
} as const;