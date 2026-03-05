"use client";

import React, { useState } from "react";

type FormState = {
  fullname: string;
  email: string;
  phone: string;
  role: string;
  affiliation: "" | "Internal Team Member" | "Partner Organization" | "Other";
  motivation: string;
  commit: boolean;
};

export default function DBASignupForm() {
  const [form, setForm] = useState<FormState>({
    fullname: "",
    email: "",
    phone: "",
    role: "",
    affiliation: "",
    motivation: "",
    commit: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.fullname.trim()) return "Please enter your full name.";
    if (!form.email.trim() || !form.email.includes("@"))
      return "Please enter a valid email address.";
    if (!form.affiliation) return "Please select your affiliation.";
    if (!form.commit)
      return "Please confirm your commitment to complete the class before submitting.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Later you will point this to your Next.js API route:
      // await fetch("/api/dba-signup", {...})
      // For now: local success
      await new Promise((r) => setTimeout(r, 400));
      setSubmitted(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#ddd5c4] bg-white px-8 py-9 shadow-[0_4px_32px_rgba(10,22,40,0.10)]">
      {!submitted ? (
        <>
          <h3 className="font-serif text-[1.35rem] font-bold text-[#0a1628]">
            Register Your Interest
          </h3>
          <p className="mt-1 text-[0.85rem] text-[#6b7a95]">
            Complete the form below to sign up for the DBA class.
          </p>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.9rem] text-red-900">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-7 space-y-5">
            <Field label="Full Name" htmlFor="fullname">
              <input
                id="fullname"
                type="text"
                placeholder="e.g. John Doe"
                value={form.fullname}
                onChange={(e) => setForm((p) => ({ ...p, fullname: e.target.value }))}
                className="w-full rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              />
            </Field>

            <Field label="Email Address" htmlFor="email">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              />
            </Field>

            <Field label="Phone Number" htmlFor="phone">
              <input
                id="phone"
                type="tel"
                placeholder="+231 xxx xxx xxx"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="w-full rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              />
            </Field>

            <Field label="Your Role / Department" htmlFor="role">
              <input
                id="role"
                type="text"
                placeholder="e.g. Software Developer, IT, Data Analyst"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="w-full rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              />
            </Field>

            <Field label="Affiliation" htmlFor="affiliation">
              <select
                id="affiliation"
                value={form.affiliation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, affiliation: e.target.value as FormState["affiliation"] }))
                }
                className="w-full appearance-none rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              >
                <option value="">— Select one —</option>
                <option>Internal Team Member</option>
                <option>Partner Organization</option>
                <option>Other</option>
              </select>
            </Field>

            <Field
              label={
                <>
                  Why do you want to take this class?{" "}
                  <span className="font-normal normal-case tracking-normal text-[#6b7a95]">
                    (optional)
                  </span>
                </>
              }
              htmlFor="motivation"
            >
              <textarea
                id="motivation"
                placeholder="Briefly share your motivation or goals..."
                value={form.motivation}
                onChange={(e) => setForm((p) => ({ ...p, motivation: e.target.value }))}
                className="min-h-[80px] w-full resize-y rounded-lg border-[1.5px] border-[#ddd5c4] bg-[#fdfaf6] px-3.5 py-2.5 text-[0.95rem] text-[#1a2640] outline-none transition focus:border-[#c9952a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,149,42,0.12)]"
              />
            </Field>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="commit"
                type="checkbox"
                checked={form.commit}
                onChange={(e) => setForm((p) => ({ ...p, commit: e.target.checked }))}
                className="mt-0.5 h-[18px] w-[18px] cursor-pointer accent-[#c9952a]"
              />
              <label
                htmlFor="commit"
                className="text-[0.85rem] leading-[1.5] text-[#6b7a95]"
              >
                I understand that <span className="font-semibold text-[#1a2640]">once the class starts, I cannot withdraw</span>.
                I am fully committed to completing the entire program.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#0a1628] px-4 py-3.5 text-[1rem] font-semibold tracking-[0.3px] text-white transition hover:bg-[#0f2044] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Registration →"}
            </button>
          </form>
        </>
      ) : (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2e7d32"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h4 className="font-serif text-[1.3rem] font-bold text-[#0a1628]">
            You&apos;re registered!
          </h4>
          <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-[1.6] text-[#6b7a95]">
            Thank you for signing up. We&apos;ll be in touch with class details and the confirmed
            start date soon. Get ready to level up your skills!
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.8rem] font-semibold uppercase tracking-[0.8px] text-[#0a1628]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}