"use client";

import DBASignupForm from "./components/DBASignupForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import Cursor from "./components/Cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TARGET_DATE = new Date("2026-03-13T17:00:00Z");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null);

  const countdown = useCountdown(TARGET_DATE);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.set(
        [
          ".hero-badge",
          ".hero-title-line",
          ".hero-text",
          ".dates-title",
          ".date-card",
          ".detail-item",
          ".about-title",
          ".about-copy",
          ".commit-box",
          ".expect-label",
          ".expect-item",
          ".form-shell",
          ".footer-copy",
        ],
        { willChange: "transform, opacity" }
      );

      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTl
        .from(".hero-badge", {
          y: 18,
          opacity: 0,
          duration: 0.55,
        })
        .from(
          ".hero-title-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.2"
        )
        .from(
          ".hero-text",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        );

      gsap.from(".dates-title", {
        scrollTrigger: {
          trigger: ".dates-section",
          start: "top 82%",
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
      });

      gsap.from(".date-card", {
        scrollTrigger: {
          trigger: ".dates-grid",
          start: "top 82%",
          once: true,
        },
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
      });

      gsap.from(".detail-item", {
        scrollTrigger: {
          trigger: ".details-bar",
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-grid",
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      aboutTl
        .from(".about-title", {
          y: 28,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".about-copy",
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".commit-box",
          {
            y: 26,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".expect-label",
          {
            y: 18,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.38"
        )
        .from(
          ".expect-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.25"
        );

      gsap.from(".form-shell", {
        scrollTrigger: {
          trigger: ".form-shell",
          start: "top 82%",
          once: true,
        },
        x: 42,
        opacity: 0,
        scale: 0.985,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".footer-copy", {
        scrollTrigger: {
          trigger: ".footer-copy",
          start: "top 95%",
          once: true,
        },
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      const numberCards = gsap.utils.toArray<HTMLElement>(".count-item");
      numberCards.forEach((item) => {
        const value = item.querySelector(".count-value");
        if (!value) return;

        gsap.fromTo(
          value,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 0.22,
            ease: "power1.out",
            yoyo: true,
            repeat: 1,
            repeatDelay: 0,
          }
        );
      });

      // Wave animations
      const waveTl = gsap.timeline({ repeat: -1 });
      
      waveTl
        .to(".wave-1", {
          y: -10,
          duration: 4,
          ease: "sine.inOut",
        })
        .to(".wave-2", {
          y: -8,
          duration: 3,
          ease: "sine.inOut",
        }, "-=2")
        .to(".wave-3", {
          y: -6,
          duration: 2.5,
          ease: "sine.inOut",
        }, "-=1.5")
        .to(".wave-1", {
          y: 0,
          duration: 4,
          ease: "sine.inOut",
        })
        .to(".wave-2", {
          y: 0,
          duration: 3,
          ease: "sine.inOut",
        }, "-=2")
        .to(".wave-3", {
          y: 0,
          duration: 2.5,
          ease: "sine.inOut",
        }, "-=1.5");

      // Registration card expansion animation with scroll pause
      
      // Mobile detection for responsive animation
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      
      // Different animation parameters for mobile vs desktop
      const animationConfig = isMobile ? {
        scale: 1.15,
        width: "100%",
        duration: 1.0,
        ease: "power2.inOut"
      } : {
        scale: 1.1,
        width: "300%",
        duration: 1.5,
        ease: "power3.inOut"
      };
      
      ScrollTrigger.create({
        trigger: ".dates-section",
        start: "top 20%",
        end: "bottom 20%",
        pin: true,
        pinSpacing: true,
        scrub: false,
        onEnter: () => {
          gsap.to(".registration-card", {
            scale: animationConfig.scale,
            width: animationConfig.width,
            zIndex: 100,
            duration: animationConfig.duration,
            ease: animationConfig.ease
          });
        },
        onLeave: () => {
          // Keep expanded state and high z-index when scrolling past
          gsap.set(".registration-card", {
            zIndex: 100
          });
        },
        onEnterBack: () => {
          gsap.to(".registration-card", {
            scale: 1,
            width: "100%",
            zIndex: 100, // Maintain high z-index during scale-down
            duration: animationConfig.duration,
            ease: animationConfig.ease,
            onComplete: () => {
              // Only reset z-index after animation is complete
              setTimeout(() => {
                gsap.set(".registration-card", {
                  zIndex: ""
                });
              }, 100);
            }
          });
        },
        onLeaveBack: () => {
          // Ensure z-index is reset when completely leaving the section
          gsap.set(".registration-card", {
            zIndex: ""
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen overflow-x-hidden">
      <Cursor />
      <section className="relative overflow-hidden bg-[#0a1628] px-6 pb-20 pt-16 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 0%, rgba(201,149,42,0.15) 0%, transparent 65%), radial-gradient(ellipse at 10% 100%, rgba(201,149,42,0.08) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="hero-badge inline-flex items-center rounded-full border border-[rgba(201,149,42,0.4)] bg-[rgba(201,149,42,0.15)] px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[#e8b84b]">
            Professional Development
          </span>

          <h1 className="mt-7 font-serif text-[clamp(2.2rem,6vw,3.8rem)] font-black leading-[1.08] text-white">
            <span className="hero-title-line block">DBA Training</span>
            <span className="hero-title-line block text-[#e8b84b]">
              Class Registration
            </span>
          </h1>

          <p className="hero-text mx-auto mt-4 max-w-[520px] text-[1.05rem] leading-[1.7] text-white/65">
            An industry-led, hands-on Database Administration course designed
            to build real, job-ready technical skills.
          </p>
        </div>

        {/* Wave Backgrounds */}
        <div className="absolute bottom-[-30px] left-0 right-0 pointer-events-none">
          {/* Wave 1 - Back layer */}
          <svg
            className="wave-1 absolute bottom-0 w-full h-32 opacity-30"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,56 C150,100 350,0 600,56 C850,112 1050,12 1200,56 L1200,120 L0,120 Z"
              fill="#c9952a"
            />
          </svg>

          {/* Wave 2 - Middle layer */}
          <svg
            className="wave-2 absolute bottom-0 w-full h-16 opacity-40"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C200,120 400,8 600,64 C800,120 1000,8 1200,64 L1200,120 L0,120 Z"
              fill="#0a1628"
            />
          </svg>

          {/* Wave 3 - Front layer */}
          <svg
            className="wave-3 absolute bottom-0 w-full h-12 opacity-50"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,72 C180,120 320,24 600,72 C880,120 1020,24 1200,72 L1200,120 L0,120 Z"
              fill="#0a1628"
            />
          </svg>
        </div>
      </section>

           <section className="details-bar bg-[#c9952a] px-6 py-3.5">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3">
          <DetailItem icon="calendar">Saturdays &amp; Sundays</DetailItem>
          <DetailItem icon="clock">5:00 PM Liberia Time</DetailItem>
          <DetailItem icon="users">Industry Instructor</DetailItem>
        </div>
      </section>

      <section className="dates-section bg-[#fdfaf6] px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="dates-title mb-8 text-center font-serif text-[1.7rem] font-bold text-[#0a1628]">
            Important Dates
          </h2>

          <div className="dates-grid grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="registration-card date-card rounded-xl border border-[#ddd5c4] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9952a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f2f3f5"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0a1628]">
                    Registration Closes
                  </h3>
                  <p className="text-sm text-[#6b7a95]">
                    March 13, 2026 at 5:00 PM Liberia Time
                  </p>
                </div>
              </div>

              {!countdown.isExpired ? (
                <div className="rounded-lg bg-[#0a1628] p-4 text-center">
                  <div className="grid grid-cols-4 gap-2 text-white">
                    <div className="count-item">
                      <div className="count-value text-2xl font-bold">
                        {countdown.days}
                      </div>
                      <div className="text-xs uppercase tracking-wide opacity-80">
                        Days
                      </div>
                    </div>
                    <div className="count-item">
                      <div className="count-value text-2xl font-bold">
                        {countdown.hours}
                      </div>
                      <div className="text-xs uppercase tracking-wide opacity-80">
                        Hours
                      </div>
                    </div>
                    <div className="count-item">
                      <div className="count-value text-2xl font-bold">
                        {countdown.minutes}
                      </div>
                      <div className="text-xs uppercase tracking-wide opacity-80">
                        Mins
                      </div>
                    </div>
                    <div className="count-item">
                      <div className="count-value text-2xl font-bold">
                        {countdown.seconds}
                      </div>
                      <div className="text-xs uppercase tracking-wide opacity-80">
                        Secs
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                  <p className="font-semibold text-red-900">
                    Registration Closed
                  </p>
                </div>
              )}
            </div>

            <div className="date-card rounded-xl border border-[#ddd5c4] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9952a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f2f3f5"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0a1628]">Interviews</h3>
                  <p className="text-sm text-[#6b7a95]">
                    Week of March 16, 2026
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#6b7a95]">
                Selected candidates will be contacted for interviews during
                this week.
              </p>
            </div>

            <div className="date-card rounded-xl border border-[#ddd5c4] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9952a]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f2f3f5"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0a1628]">
                    Anticipated Class Start
                  </h3>
                  <p className="text-sm text-[#6b7a95]">March 21, 2026</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed italic text-[#6b7a95]">
                Date will be confirmed to all registered candidates
              </p>
            </div>
          </div>
        </div>
      </section>

     

      <section className="px-6 py-14">
        <div className="main-grid mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="about-title font-serif text-[1.7rem] font-bold text-[#0a1628]">
              About This Course
            </h2>

            <p className="about-copy mt-4 text-[0.95rem] leading-[1.75] text-[#6b7a95]">
              We have partnered with an experienced industry professional to
              bring a comprehensive DBA training course directly to our team and
              partners. This is a rigorous, technical program covering core
              database administration concepts, tools, and real-world practices.
            </p>

            <div className="commit-box mt-7 rounded-[4px] border-l-4 border-[#c9952a] bg-[#fff8ee] px-4 py-4">
              <strong className="block text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[#c9952a]">
                Commitment Required
              </strong>
              <p className="mt-1 text-[0.9rem] leading-[1.6] text-[#1a2640]">
                Once the class begins, <strong>withdrawal is not permitted</strong>.
                You must commit to completing the full program. Only register if
                you are fully prepared to dedicate the time and effort required.
              </p>
            </div>

            <p className="expect-label mt-7 text-[0.9rem] font-semibold uppercase tracking-[0.8px] text-[#0a1628]">
              What to expect:
            </p>

            <ul className="mt-4 space-y-6">
              {[
                "In-depth, technically rigorous instruction from an industry professional",
                "Weekend sessions every Saturday & Sunday at 5 PM Liberia time",
                "Assignments and hands-on practice throughout the course",
                "Full commitment required — no mid-course withdrawals",
                "Open to both internal team members and partner organizations",
              ].map((text) => (
                <li
                  key={text}
                  className="expect-item flex items-start gap-2.5 text-[0.93rem] leading-[1.5] text-[#1a2640]"
                >
                  <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#0a1628]">
                    <svg
                      viewBox="0 0 10 10"
                      className="h-2.5 w-2.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <polyline points="1.5,5 4,7.5 8.5,2.5" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="form-shell">
            <DBASignupForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ddd5c4] px-6 py-8 text-center text-[0.82rem] text-[#6b7a95]">
        <p className="footer-copy">
          © 2026 Zongea DBA Training Program · All registrations are subject to
          confirmation
        </p>
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
    <div className="detail-item flex items-center gap-2 text-[0.88rem] font-semibold tracking-[0.3px] text-[#0a1628]">
      <Icon />
      {children}
    </div>
  );
}

const ICONS = {
  calendar: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  users: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  cap: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
} as const;