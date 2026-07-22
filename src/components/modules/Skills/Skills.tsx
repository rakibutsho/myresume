"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "BACKEND",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.io", "JWT Authentication"],
    highlight: true,
  },
  {
    title: "DATABASES",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Mongoose"],
    highlight: true,
  },
  {
    title: "FRONTEND",
    skills: ["React", "Next.js", "Tailwind CSS", "Redux", "HTML5", "CSS3", "Shadcn UI", "Framer Motion", "React Query", "React Hook Form"],
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
      "VPS Hosting",
      "AWS Basics",
    ],
    highlight: true,
  },
  {
    title: "LANGUAGES",
    skills: ["JavaScript", "TypeScript", "Go", "C/C++", "SQL"],
    highlight: true,
  },
  {
    title: "TOOLS & ARCHITECTURE",
    skills: ["System Design", "Microservices", "Postman", "Linux", "Figma", "Agile/Scrum"],
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
      className="w-full py-24 relative overflow-hidden"
    >
      {/* Modern Background Glows */}

      <div className="w-full max-w-300 mx-auto px-4 md:px-8 relative z-10">
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2 max-w-[1200px] mx-auto">
          <span className="text-sm font-mono text-emerald-400">02</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">Skills</span>
        </div>

        {/* Heading */}
        <div className="max-w-300 mx-auto mb-16">
          <h2 className="fade-up-element text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white font-serif">
            <span className="">What I bring to the</span>{" "}
            <span className="text-emerald-400">table</span>
          </h2>
        </div>

        {/* Masonry-like Grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-275 mx-auto"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="break-inside-avoid mb-6 p-6 md:p-8 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all shadow-xl group"
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
