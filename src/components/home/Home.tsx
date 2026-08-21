/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PdfModal } from "../common/PdfModal/PdfModal";
import Image from "next/image";
import profileImg from "@/assets/Profile.png";
import {
  GithubFreeIcons,
  Linkedin02Icon,
  Mail01FreeIcons,
  NewReleasesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";

// ── Terminal key-value rows ──────────────────────────────
const terminalData = [
  { key: "name", value: '"Md. Rakibul Islam"' },
  { key: "role", value: '"Software Engineer"' },
  { key: "status", value: '"Open to Work"', blink: true },
  { key: "loc", value: '"Dhaka, Bangladesh"' },
  { key: "exp", value: '"1.5+ years"' },
];

// ── Headline words (split for GSAP stagger) ──────────────
const headlineWords = [
  { text: "Turning", accent: false },
  { text: "ambitious", accent: false },
  { text: "ideas", accent: false },
  { text: "into", accent: false },
  { text: "production-ready", accent: true },
  { text: "software.", accent: true },
];

const stats = [
  { value: 1.5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Shipped" },
  { value: 10, suffix: "+", label: "Happy Clients" },
];

function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const termCardRef = useRef<HTMLDivElement>(null);
  const termLinesRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statNums = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Terminal card entrance
      tl.fromTo(
        termCardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      );

      // 2. Terminal data lines stagger
      const termLines = termLinesRef.current?.querySelectorAll("[data-line]");
      if (termLines?.length) {
        tl.fromTo(
          termLines,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 },
          "-=0.5"
        );
      }

      // 3. Section label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.5"
      );

      // 4. Headline words stagger
      const words = headlineRef.current?.querySelectorAll("[data-word]");
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 },
          "-=0.35"
        );
      }

      // 5. Paragraph
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.25"
      );

      // 6. Stats row
      const statItems = statsRef.current?.querySelectorAll("[data-stat]");
      if (statItems?.length) {
        tl.fromTo(
          statItems,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          "-=0.2"
        );
      }

      // 7. Counter animation
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
      className="w-full pt-24 pb-6 min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans text-white"
    >
      {/* Ambient blue glow behind terminal card */}
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-[#144272]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 w-[300px] h-[300px] bg-[#205295]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-16">

        {/* ── Left Column: Terminal Window Card ────────── */}
        <div ref={termCardRef} className="w-full max-w-[360px] shrink-0 mx-auto lg:mx-0">
          <div className="terminal-window w-full">

            {/* Title bar */}
            <div className="terminal-titlebar">
              <div className="flex items-center gap-[7px]">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
              </div>
              <span className="terminal-title flex-1 text-center pr-[52px]">~/rakib $ whoami</span>
            </div>

            {/* Body */}
            <div className="terminal-body p-6">
              {/* Profile image */}
              <div className="relative w-40 h-40 mx-auto mb-5 mt-2 group">
                {/* Outer vivid glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2C74B3] to-[#60A8E0] opacity-30 blur-lg group-hover:opacity-70 transition duration-500" />
                
                {/* Photo container / Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#2C74B3] bg-[#0A1929] shadow-[0_0_25px_rgba(44,116,179,0.4)] group-hover:border-[#60A8E0] group-hover:shadow-[0_0_40px_rgba(96,168,224,0.6)] transition-all duration-500 z-10">
                  <Image
                    src={profileImg}
                    alt="Md. Rakibul Islam"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="160px"
                    priority
                    fetchPriority="high"
                  />
                  
                  {/* Subtle blue tint overlay (Terminal vibe) */}
                  <div className="absolute inset-0 bg-[#2C74B3]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* CRT Scanline effect */}
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(44,116,179,0.15) 2px, rgba(44,116,179,0.15) 4px)",
                    }}
                  />
                  
                  {/* Inner vignette for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(10,25,41,0.9)] pointer-events-none" />
                </div>
              </div>

              {/* Name */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="terminal-prompt font-mono">$</span>
                <span className="terminal-cmd font-mono font-bold text-base">
                  Md. Rakibul Islam
                </span>
                <HugeiconsIcon icon={NewReleasesIcon} className="w-4 h-4 text-[#2C74B3]" />
              </div>

              {/* Terminal data rows */}
              <div ref={termLinesRef} className="mt-3 space-y-1.5 font-mono text-[13px]">
                {terminalData.map((row, i) => (
                  <div key={row.key} data-line className="flex items-center gap-2">
                    <span className="text-[#205295] shrink-0">&gt;</span>
                    <span className="text-[#4A6274] w-14 shrink-0">{row.key}</span>
                    <span className="text-[#8B9BB4]">{row.value}</span>
                    {row.blink && (
                      <span className="terminal-cursor" />
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-[#1E3A5F] my-4" />

              {/* Social connect line */}
              <div className="font-mono text-[13px] mb-3">
                <span className="terminal-prompt">$ </span>
                <span className="terminal-cmd">connect --platform</span>
              </div>
              <div className="flex items-center gap-3 ml-4 mb-4">
                <Link
                  href="https://github.com/rakibutsho"
                  target="_blank"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg bg-[#0A2647] border border-[#1E3A5F] flex items-center justify-center text-[#8B9BB4] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
                >
                  <HugeiconsIcon aria-hidden icon={GithubFreeIcons} className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/rakibutsho"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-[#0A2647] border border-[#1E3A5F] flex items-center justify-center text-[#8B9BB4] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
                >
                  <HugeiconsIcon aria-hidden icon={Linkedin02Icon} className="w-4 h-4" />
                </Link>
                <Link
                  href="mailto:mail@rakibutsho.dev"
                  aria-label="Email"
                  className="w-9 h-9 rounded-lg bg-[#0A2647] border border-[#1E3A5F] flex items-center justify-center text-[#8B9BB4] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
                >
                  <HugeiconsIcon aria-hidden icon={Mail01FreeIcons} className="w-4 h-4" />
                </Link>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <Link
                  href="#contact"
                  className="w-full py-3 rounded-lg bg-[#2C74B3] hover:bg-[#205295] text-white font-mono font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(44,116,179,0.3)] hover:shadow-[0_0_30px_rgba(44,116,179,0.5)]"
                >
                  <span className="text-[#8BBDE0]">$</span> ./get_in_touch.sh
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="w-full py-3 rounded-lg bg-[#0A2647] border border-[#1E3A5F] text-[#8B9BB4] hover:border-[#2C74B3]/50 hover:text-white font-mono text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="text-[#205295]">$</span> view résumé
                  <ArrowRight className="w-3.5 h-3.5 rotate-[-45deg]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Headline + Stats ───────────── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0">

          {/* Section label */}
          <div ref={labelRef} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A2647]/50 border border-[#205295]/50 mb-5 shadow-[0_0_20px_rgba(44,116,179,0.15)] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A8E0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60A8E0]"></span>
            </span>
            <span className="text-[#8BBDE0] text-[12px] font-mono font-bold tracking-[0.2em] uppercase">
              Full-Stack Software Engineer
            </span>
          </div>

          {/* Headline — fixed word spacing */}
          <h1
            ref={headlineRef}
            className="text-[40px] sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.08] mb-4 font-serif"
          >
            {headlineWords.map((w, i) => (
              <span
                key={i}
                data-word
                className={
                  w.accent
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#2C74B3] to-[#60A8E0]"
                    : "text-white"
                }
              >
                {w.text}
                {i < headlineWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={paraRef}
            className="text-[16px] md:text-lg text-[#8B9BB4] max-w-[520px] mb-6 leading-[1.8] font-sans"
          >
            Bridging the gap between <span className="text-white font-medium">scalable architecture</span> and pixel-perfect user interfaces. I specialize in turning ambitious ideas into <span className="text-white font-medium">production-ready software</span>.
          </p>

          {/* Quick skill tags */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
            {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-[#0A2647] border border-[#205295]/40 text-[#8B9BB4] text-[11px] font-mono hover:border-[#2C74B3]/70 hover:text-[#2C74B3] transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="mt-auto w-full grid grid-cols-3 gap-3 md:gap-6 border-t border-[#1E3A5F] pt-8"
          >
            {stats.map((s, i) => (
              <div key={s.label} data-stat className="flex flex-col items-center lg:items-start gap-1.5 group">
                <div className="flex items-end justify-center lg:justify-start gap-0.5">
                  <span
                    className="text-3xl sm:text-4xl md:text-[46px] font-mono font-bold text-white group-hover:text-[#2C74B3] transition-colors duration-300"
                    style={{ textShadow: "0 0 30px rgba(44,116,179,0)" }}
                  >
                    <span ref={(el) => { statNums.current[i] = el; }}>
                      {s.value}
                    </span>
                    <span className="text-[#2C74B3]">{s.suffix}</span>
                  </span>
                </div>
                <span className="text-[#4A6274] text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] uppercase leading-tight text-center lg:text-left">
                  {s.label}
                </span>
                {/* Hover underline */}
                <div className="h-[1px] w-0 group-hover:w-full bg-[#2C74B3]/40 transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
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
