"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PdfModal } from "../common/PdfModal/PdfModal";
import { useState } from "react";
import gsap from "gsap";

const stats = [
  { value: 1.5, suffix: "+", label: "Years Experience" },
  { value: 20,  suffix: "+", label: "Projects Shipped" },
  { value: 10,  suffix: "+", label: "Happy Clients"    },
];

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/rakibutsho",              icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rakibutsho",     icon: "in" },
  { label: "Email",    href: "mailto:mail@rakibutsho.dev",                 icon: "@"  },
];

function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const sectionRef   = useRef<HTMLElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const paraRef      = useRef<HTMLParagraphElement>(null);
  const socialRef    = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const statNums     = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(breadcrumbRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5 });
      tl.fromTo(line1Ref.current,      { opacity: 0, y: 40  }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2");
      tl.fromTo(line2Ref.current,      { opacity: 0, y: 40  }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
      tl.fromTo(paraRef.current,       { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      tl.fromTo(socialRef.current,     { opacity: 0, y: 16  }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      const statItems = statsRef.current?.querySelectorAll("[data-stat]");
      if (statItems?.length) {
        tl.fromTo(statItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.2");
      }

      // Counter animation
      statNums.current.forEach((el, i) => {
        if (!el) return;
        const isFloat = stats[i].value % 1 !== 0;
        tl.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: String(stats[i].value),
            duration: 1.3,
            ease: "power1.out",
            snap: { textContent: isFloat ? 0.1 : 1 },
          },
          "-=1.1"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="w-full pt-36 pb-20 min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Breadcrumb */}
        <div
          ref={breadcrumbRef}
          className="breadcrumb-label mb-10 opacity-0"
        >
          ... /home ...
        </div>

        {/* ── H1 block ──────────────────────────────────────── */}
        <div className="relative">

          {/* Line 1: "Full-stack" + CTA pill */}
          <div ref={line1Ref} className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-2 opacity-0">
            <h1
              className="font-mono font-bold leading-none tracking-tight text-white"
              style={{
                fontFamily: "var(--font-roboto)",
                fontSize: "clamp(56px, 9vw, 112px)",
                letterSpacing: "-0.03em",
              }}
            >
              Full-stack
            </h1>

            {/* Inline CTA pill */}
            <a
              href="/#projects"
              onClick={(e) => {
                if (window.location.pathname !== "/") return;
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
              }}
              className="pill-btn pill-btn-solid text-[15px] font-mono"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              Projects
              <span className="text-[#3D3D3D] font-bold">→</span>
            </a>
          </div>

          {/* Line 2: "Developer" */}
          <div ref={line2Ref} className="opacity-0">
            <h1
              className="font-mono font-bold leading-none tracking-tight text-white"
              style={{
                fontFamily: "var(--font-roboto)",
                fontSize: "clamp(56px, 9vw, 112px)",
                letterSpacing: "-0.03em",
              }}
            >
              Developer
            </h1>
          </div>
        </div>

        {/* ── Body paragraph ────────────────────────────────── */}
        <p
          ref={paraRef}
          className="mt-10 max-w-[520px] text-[16px] leading-[1.8] opacity-0"
          style={{ color: "#F5F5F5", fontFamily: "var(--font-open-sans)" }}
        >
          My goal is to write{" "}
          <em className="font-bold not-italic" style={{ color: "#FFFFFF" }}>maintainable, clean</em>{" "}
          and{" "}
          <em className="font-bold not-italic" style={{ color: "#FFFFFF" }}>understandable code</em>{" "}
          — turning ambitious ideas into production-ready software with React, Next.js, and Node.js.
        </p>

        {/* ── Social Pills ──────────────────────────────────── */}
        <div ref={socialRef} className="flex flex-wrap gap-3 mt-8 opacity-0">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="pill-btn pill-btn-outline text-[13px] gap-2"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <span className="font-mono text-[11px]" style={{ color: "#A6A6A6" }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="pill-btn pill-btn-outline text-[13px]"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            <span className="font-mono text-[11px]" style={{ color: "#A6A6A6" }}>↗</span>
            Résumé
          </button>
        </div>

        {/* ── Stats row ─────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="mt-16 pt-10 grid grid-cols-3 max-w-[480px] gap-6"
          style={{ borderTop: "1px solid #3D3D3D" }}
        >
          {stats.map((s, i) => (
            <div key={s.label} data-stat className="flex flex-col gap-1 opacity-0">
              <div className="flex items-end gap-0.5">
                <span
                  className="font-mono font-bold text-white"
                  style={{
                    fontFamily: "var(--font-roboto)",
                    fontSize: "clamp(32px, 4vw, 46px)",
                    lineHeight: 1,
                  }}
                >
                  <span ref={(el) => { statNums.current[i] = el; }}>{s.value}</span>
                  <span style={{ color: "#A6A6A6" }}>{s.suffix}</span>
                </span>
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.15em] font-sans"
                style={{ color: "#A6A6A6" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
      />
    </section>
  );
}

export default Home;
