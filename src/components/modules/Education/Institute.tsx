"use client";

import { education } from "@/data/education";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Institute = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-edu-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-5">
      {education.map((insti) => (
        <div
          key={insti.id}
          data-edu-card
          className="skill-card group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8"
        >
          {/* Logo */}
          <div
            className="shrink-0 w-14 h-14 rounded-[10px] overflow-hidden flex items-center justify-center"
            style={{ background: "#121212", border: "1px solid #3D3D3D" }}
          >
            <Image
              src={insti.logo}
              alt={insti.institute}
              width={48}
              height={48}
              className="object-contain w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3
                className="font-mono font-semibold text-white text-[16px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {insti.institute}
              </h3>
              <span
                className="font-mono text-[12px] shrink-0"
                style={{ color: "#A6A6A6", fontFamily: "var(--font-roboto)" }}
              >
                {insti.timeline}
              </span>
            </div>
            <p className="font-sans text-[14px] mb-0.5" style={{ color: "#F5F5F5" }}>
              {insti.degree}
            </p>
            <p className="font-sans text-[13px]" style={{ color: "#A6A6A6" }}>
              {insti.subject}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
