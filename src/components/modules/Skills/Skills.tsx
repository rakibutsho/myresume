"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "BACKEND",
    skills: ["Node.js", "Express.js", "Python", "Django", "DRF", "REST APIs"],
    highlight: true,
  },
  {
    title: "DATABASES",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma"],
    highlight: true,
  },
  {
    title: "FRONTEND",
    skills: ["React", "Next.js", "Tailwind CSS", "Redux", "HTML5", "CSS3"],
    highlight: false,
  },
  {
    title: "CLOUD/DEVOPS",
    skills: [
      "Git",
      "Docker",
      "CI/CD Basics",
      "Vercel",
      "Railway",
      "AWS Basics",
    ],
    highlight: true,
  },
  {
    title: "LANGUAGES",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "SQL"],
    highlight: true,
  },
  {
    title: "TOOLS & ARCHITECTURE",
    skills: ["System Design", "Microservices", "Postman", "Pytest", "Linux"],
    highlight: false,
  },
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-24 relative bg-[#0a0a0c] border-t border-white/5"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest max-w-[1200px] mx-auto">
          <div>— CORE COMPETENCIES</div>
          <div>[ SKILLS ]</div>
        </div>

        {/* Heading */}
        <div className="max-w-[1200px] mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
            <span className="font-serif italic">What I bring to the</span>{" "}
            <span className="font-serif italic text-emerald-400">table.</span>
          </h2>
        </div>

        {/* Masonry-like Grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-[1100px] mx-auto"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="break-inside-avoid mb-6 p-6 md:p-8 rounded-[1.5rem] bg-[#0f0f11] border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className="text-[13px] font-mono font-bold text-[#6b7280] tracking-widest uppercase mb-6">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-[13px] font-mono font-medium rounded-md border transition-colors ${
                      category.highlight
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-white/5 border-white/10 text-[#a1a1aa] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
