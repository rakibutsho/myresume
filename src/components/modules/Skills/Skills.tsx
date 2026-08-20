"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", icon: "https://api.iconify.design/logos:nodejs-icon.svg" },
      { name: "Express.js", icon: "https://api.iconify.design/simple-icons:express.svg?color=white" },
      { name: "REST APIs", icon: "https://api.iconify.design/carbon:api.svg?color=%232C74B3" },
      { name: "Socket.io", icon: "https://api.iconify.design/logos:socket-io.svg" },
      { name: "JWT Auth", icon: "https://api.iconify.design/logos:jwt-icon.svg" },
    ],
    highlight: true,
  },
  {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", icon: "https://api.iconify.design/logos:postgresql.svg" },
      { name: "MongoDB", icon: "https://api.iconify.design/logos:mongodb-icon.svg" },
      { name: "Prisma", icon: "https://api.iconify.design/logos:prisma.svg" },
      { name: "Mongoose", icon: "https://api.iconify.design/devicon:mongoose.svg" },
    ],
    highlight: true,
  },
  {
    title: "FRONTEND",
    skills: [
      { name: "React", icon: "https://api.iconify.design/logos:react.svg" },
      { name: "Next.js", icon: "https://api.iconify.design/logos:nextjs-icon.svg" },
      { name: "Tailwind CSS", icon: "https://api.iconify.design/logos:tailwindcss-icon.svg" },
      { name: "Redux Toolkit", icon: "https://api.iconify.design/logos:redux.svg" },
      { name: "HTML5", icon: "https://api.iconify.design/logos:html-5.svg" },
      { name: "CSS3", icon: "https://api.iconify.design/logos:css-3.svg" },
      { name: "Shadcn UI", icon: "https://api.iconify.design/simple-icons:shadcnui.svg?color=white" },
      { name: "Framer Motion", icon: "https://api.iconify.design/logos:framer.svg" },
      { name: "React Query", icon: "https://api.iconify.design/logos:react-query-icon.svg" },
      { name: "React Hook Form", icon: "https://api.iconify.design/logos:react.svg" },
    ],
    highlight: false,
  },
  {
    title: "CLOUD/DEVOPS",
    skills: [
      { name: "Git", icon: "https://api.iconify.design/logos:git-icon.svg" },
      { name: "Docker", icon: "https://api.iconify.design/logos:docker-icon.svg" },
      { name: "CI/CD Basics", icon: "https://api.iconify.design/logos:github-actions.svg" },
      { name: "VPS Hosting", icon: "https://api.iconify.design/mdi:server.svg?color=%232C74B3" },
      { name: "AWS Basics", icon: "https://api.iconify.design/logos:aws.svg" },
    ],
    highlight: true,
  },
  {
    title: "LANGUAGES",
    skills: [
      { name: "JavaScript", icon: "https://api.iconify.design/logos:javascript.svg" },
      { name: "TypeScript", icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Go", icon: "https://api.iconify.design/logos:go.svg" },
      { name: "C/C++", icon: "https://api.iconify.design/logos:c-plusplus.svg" },
      { name: "SQL", icon: "https://api.iconify.design/vscode-icons:file-type-sql.svg" },
    ],
    highlight: true,
  },
  {
    title: "TOOLS & ARCHITECTURE",
    skills: [
      { name: "System Design", icon: "https://api.iconify.design/carbon:chart-network.svg?color=%232C74B3" },
      { name: "Microservices", icon: "https://api.iconify.design/carbon:microservices-1.svg?color=%232C74B3" },
      { name: "Postman", icon: "https://api.iconify.design/logos:postman-icon.svg" },
      { name: "Linux", icon: "https://api.iconify.design/logos:linux-tux.svg" },
      { name: "Figma", icon: "https://api.iconify.design/logos:figma.svg" },
      { name: "Agile/Scrum", icon: "https://api.iconify.design/logos:jira.svg" },
    ],
    highlight: false,
  },
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
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
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0A2647]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-2 max-w-[1200px] mx-auto">
          <span className="text-sm font-mono text-[#2C74B3]">02</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">Skills</span>
        </div>

        {/* Heading */}
        <div className="max-w-[1200px] mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white font-serif">
            <span>What I bring to the</span>{" "}
            <span className="text-[#2C74B3]">table</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-275 mx-auto"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="break-inside-avoid mb-6 p-6 md:p-8 rounded-2xl bg-[#0A2647]/40 backdrop-blur-xl border border-[#1E3A5F] hover:border-[#2C74B3]/50 hover:bg-[#144272]/20 transition-all shadow-xl group"
            >
              {/* Category title — terminal comment style */}
              <h3 className="text-[12px] font-mono font-bold text-[#205295] tracking-widest uppercase mb-5">
                <span className="text-[#1E3A5F] mr-1">{"// "}</span>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`flex items-center gap-2 px-3 py-1.5 text-[12px] font-mono font-medium rounded-md border transition-all ${
                      category.highlight
                        ? "bg-[#205295]/15 border-[#2C74B3]/30 text-[#2C74B3] hover:bg-[#205295]/25 hover:border-[#2C74B3]/60"
                        : "bg-white/5 border-white/10 text-[#8B9BB4] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    {skill.name}
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
