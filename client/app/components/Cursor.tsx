"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const dot = cursor.current;
    const circle = ring.current;

    if (!dot || !circle) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
      });

      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const hoverTargets = document.querySelectorAll(
      "button, a, input, textarea, .date-card, .form-shell"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(circle, {
          scale: 1.6,
          borderColor: "#e8b84b",
          duration: 0.25,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(circle, {
          scale: 1,
          borderColor: "#c9952a",
          duration: 0.25,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  });

  return (
    <>
      {/* cursor dot */}
      <div
        ref={cursor}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b84b]"
      />

      {/* cursor ring */}
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9952a]"
      />
    </>
  );
}