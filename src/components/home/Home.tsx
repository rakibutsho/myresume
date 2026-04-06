"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";

const STATS = [
  { label: "Years Experience", value: "1.5+" },
  { label: "Production Projects", value: "15+" },
  { label: "Avg. Lighthouse Score", value: "90+" },
];

function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // container fade/slide
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );

      // heading "vibe"
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 18, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.05,
        },
      );

      // paragraph
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 14, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          delay: 0.18,
        },
      );

      // stats stagger
      gsap.fromTo(
        statRefs.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.28,
        },
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.35,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="w-full max-w-6xl mx-auto mt-20 px-4">
      <div className="flex flex-col gap-10 md:flex-row items-center">
        {/* Left: Profile card (fixed width, no shrink) */}
        <div className="lg:w-85">
          <ProfileCard />
        </div>

        {/* Right: Hero / About (takes remaining width) */}
        <div className="flex-1 items-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-cyan-300/85 text-center md:text-left">
            Available For Full-Stack Roles And Freelance Projects
          </p>
          <h1
            ref={titleRef}
            className="mt-3 text-3xl md:text-6xl font-semibold leading-tight text-white text-center md:text-start"
          >
            Full-stack Next.js Engineer for SaaS and Product Teams.
          </h1>

          {/* Shorter content */}
          <p
            ref={descRef}
            className="mt-5 max-w-2xl text-white/70 leading-relaxed"
          >
            I help startups ship fast, reliable web apps that users trust and
            teams can scale. I specialize in Next.js, React, TypeScript,
            Node.js, and full-stack architecture with measurable impact on
            conversion, speed, and maintainability.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                ref={(el) => {
                  statRefs.current[i] = el;
                }}
                className="rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur"
              >
                <p className="text-cyan-200 text-2xl font-semibold">
                  {s.value}
                </p>
                <p className="text-white/60 text-sm mt-1 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-300 text-slate-950 px-5 py-2.5 text-sm font-semibold hover:bg-cyan-200 transition"
            >
              View Case Studies
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-100 px-5 py-2.5 text-sm font-semibold hover:bg-cyan-300/20 transition"
            >
              Hire Me
            </a>
            <a
              href="https://github.com/rakib-utsho"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-white/15 bg-white/5 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition"
            >
              GitHub Profile
            </a>
          </div>

          {/* <p className="mt-6 text-white/50 text-sm">
            Fun fact: I love playing football ⚽
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
