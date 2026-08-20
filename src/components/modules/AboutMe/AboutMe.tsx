"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Terminal commands & output lines ──────────────────────
const terminalLines = [
  { type: "cmd",    text: "cat profile.md" },
  { type: "output", text: "My journey is driven by an absolute passion for coding" },
  { type: "output", text: "and technology. Beyond just writing syntax, I am deeply" },
  { type: "output", text: "involved in the tech community, having led as President" },
  { type: "output", text: "of the BUBT IT Club and organized major events like the" },
  { type: "output", text: "ICPC Asia Dhaka Regionals." },
  { type: "blank" },
  { type: "cmd",    text: "ls -la /career" },
  { type: "output", text: "Software Engineer  @  SM Technology" },
  { type: "output", text: "Ex-President       @  BUBT IT Club" },
  { type: "blank" },
  { type: "cmd",    text: "echo $STACK" },
  { type: "output", text: "React · Next.js · Node.js · TypeScript · PostgreSQL" },
  { type: "blank" },
  { type: "cursor" },
];

// ── Info cards ─────────────────────────────────────────────
const infoCards = [
  {
    label: "Currently",
    value: "Software Engineer @ SM Technology",
    color: "#2C74B3",
  },
  {
    label: "Based In",
    value: "Dhaka, Bangladesh",
    color: "#205295",
  },
  {
    label: "Focus",
    value: "React · Next.js · Full-Stack",
    color: "#2C74B3",
  },
  {
    label: "Leadership",
    value: "Ex-President @ BUBT IT Club",
    color: "#205295",
  },
];

// ── Skill badges ───────────────────────────────────────────
const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Redux", "Docker",
];

function AboutMe() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const terminalRef   = useRef<HTMLDivElement>(null);
  const linesRef      = useRef<HTMLDivElement>(null);
  const cardsRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Terminal window slides up
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Terminal lines stagger in
      const lines = linesRef.current?.querySelectorAll("[data-term-line]");
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { opacity: 0, x: -10 },
          {
            opacity: 1, x: 0,
            stagger: 0.07,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: terminalRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Info cards cascade from right
      const cards = cardsRef.current?.querySelectorAll("[data-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="w-full py-24 relative font-sans text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/3 w-[350px] h-[350px] bg-[#0A2647]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">

        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-sm font-mono text-[#2C74B3]">01</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">About</span>
        </div>

        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-serif mb-12 lg:max-w-[55%]">
          Engineer, <span className="text-[#2C74B3]">builder,</span>
          <br className="hidden md:block" /> and lifelong learner
        </h2>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left: Terminal Panel ── */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div ref={terminalRef} className="terminal-window">

              {/* Title bar */}
              <div className="terminal-titlebar">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">rakib@portfolio:~/about — bash</span>
              </div>

              {/* Terminal body */}
              <div ref={linesRef} className="p-5 md:p-6 space-y-0.5 font-mono text-[13px] leading-7">
                {terminalLines.map((line, i) => {
                  if (line.type === "blank") {
                    return <div key={i} data-term-line className="h-3" />;
                  }
                  if (line.type === "cursor") {
                    return (
                      <div key={i} data-term-line className="flex items-center gap-2">
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-cursor" />
                      </div>
                    );
                  }
                  if (line.type === "cmd") {
                    return (
                      <div key={i} data-term-line className="flex items-start gap-2">
                        <span className="terminal-prompt shrink-0">$</span>
                        <span className="terminal-cmd">{line.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={i} data-term-line className="flex items-start gap-2">
                      <span className="shrink-0 w-[14px]" />
                      <span className="terminal-output">{line.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Info Cards ── */}
          <div ref={cardsRef} className="lg:col-span-5 space-y-4 order-1 lg:order-2">

            {infoCards.map((card) => (
              <div
                key={card.label}
                data-card
                className="relative rounded-xl bg-[#0A2647]/50 border border-[#1E3A5F] p-5 flex flex-col transition-all duration-300 hover:border-[#2C74B3]/50 hover:bg-[#144272]/20 overflow-hidden group"
                style={{
                  boxShadow: "0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(44,116,179,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 transparent";
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 group-hover:opacity-100 opacity-60"
                  style={{ background: card.color }}
                />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-semibold mb-1.5 ml-3">
                  {card.label}
                </span>
                <span className="text-white font-medium text-sm ml-3">{card.value}</span>
              </div>
            ))}

            {/* Skill badges */}
            <div data-card className="rounded-xl bg-[#0A2647]/50 border border-[#1E3A5F] p-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-semibold mb-3 block ml-0.5">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-[#144272]/60 border border-[#205295]/40 text-[#8B9BB4] text-[12px] font-mono hover:border-[#2C74B3]/60 hover:text-[#2C74B3] transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
