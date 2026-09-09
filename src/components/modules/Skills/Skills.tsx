"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [
      { name: "React",          icon: "https://api.iconify.design/logos:react.svg" },
      { name: "Next.js",        icon: "https://api.iconify.design/logos:nextjs-icon.svg" },
      { name: "TypeScript",     icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Tailwind CSS",   icon: "https://api.iconify.design/logos:tailwindcss-icon.svg" },
      { name: "Redux Toolkit",  icon: "https://api.iconify.design/logos:redux.svg" },
      { name: "Framer Motion",  icon: "https://api.iconify.design/logos:framer.svg" },
      { name: "Shadcn UI",      icon: "https://api.iconify.design/simple-icons:shadcnui.svg?color=white" },
      { name: "React Query",    icon: "https://api.iconify.design/logos:react-query-icon.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",    icon: "https://api.iconify.design/logos:nodejs-icon.svg" },
      { name: "Express.js", icon: "https://api.iconify.design/simple-icons:express.svg?color=white" },
      { name: "REST APIs",  icon: "https://api.iconify.design/carbon:api.svg?color=%23A6A6A6" },
      { name: "Socket.io",  icon: "https://api.iconify.design/logos:socket-io.svg" },
      { name: "JWT Auth",   icon: "https://api.iconify.design/logos:jwt-icon.svg" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "https://api.iconify.design/logos:postgresql.svg" },
      { name: "MongoDB",    icon: "https://api.iconify.design/logos:mongodb-icon.svg" },
      { name: "Prisma",     icon: "https://api.iconify.design/logos:prisma.svg" },
      { name: "Mongoose",   icon: "https://api.iconify.design/devicon:mongoose.svg" },
      { name: "MySQL",      icon: "https://api.iconify.design/logos:mysql.svg" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "https://api.iconify.design/logos:javascript.svg" },
      { name: "TypeScript", icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Go",         icon: "https://api.iconify.design/logos:go.svg" },
      { name: "SQL",        icon: "https://api.iconify.design/vscode-icons:file-type-sql.svg" },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Git",       icon: "https://api.iconify.design/logos:git-icon.svg" },
      { name: "Docker",    icon: "https://api.iconify.design/logos:docker-icon.svg" },
      { name: "CI/CD",     icon: "https://api.iconify.design/logos:github-actions.svg" },
      { name: "VPS",       icon: "https://api.iconify.design/mdi:server.svg?color=%23A6A6A6" },
      { name: "AWS",       icon: "https://api.iconify.design/logos:aws.svg" },
      { name: "Linux",     icon: "https://api.iconify.design/logos:linux-tux.svg" },
    ],
  },
  {
    title: "Tools & Design",
    skills: [
      { name: "Figma",   icon: "https://api.iconify.design/logos:figma.svg" },
      { name: "Postman", icon: "https://api.iconify.design/logos:postman-icon.svg" },
      { name: "Agile",   icon: "https://api.iconify.design/logos:jira.svg" },
      { name: "System Design", icon: "https://api.iconify.design/carbon:chart-network.svg?color=%23A6A6A6" },
    ],
  },
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" },
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
      className="w-full py-28 relative"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Section header row: breadcrumb left, chapter word right */}
        <div ref={headingRef} className="flex items-end justify-between mb-16 gap-6">
          <div>
            <span className="breadcrumb-label block mb-4">... /Skills ...</span>
            <h2
              className="font-sans text-[16px] max-w-[360px] leading-relaxed"
              style={{ color: "#A6A6A6" }}
            >
              What I bring to the table — from pixel-perfect UIs to scalable backend systems.
            </h2>
          </div>
          <div className="chapter-word hidden md:block">Skills</div>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-card break-inside-avoid mb-5 p-6 group"
            >
              {/* Category title */}
              <h3
                className="font-mono font-semibold text-[14px] mb-4"
                style={{ fontFamily: "var(--font-roboto)", color: "#FFFFFF" }}
              >
                {category.title}
              </h3>

              {/* Skills as slash-separated tags */}
              <p
                className="text-[13px] leading-[2]"
                style={{ color: "#A6A6A6", fontFamily: "var(--font-open-sans)" }}
              >
                {category.skills.map((skill, idx) => (
                  <span key={skill.name}>
                    <span className="inline-flex items-center gap-1.5 group/tag">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={14}
                        height={14}
                        className="w-[14px] h-[14px] object-contain opacity-60 group-hover/tag:opacity-100 transition-opacity"
                      />
                      <span className="group-hover/tag:text-white transition-colors">{skill.name}</span>
                    </span>
                    {idx < category.skills.length - 1 && (
                      <span className="mx-2" style={{ color: "#3D3D3D" }}>/</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
