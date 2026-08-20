"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ServerStack01Icon } from "@hugeicons/core-free-icons";

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
    title: "CLOUD_DEVOPS",
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
    title: "SYS_ARCH",
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
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Fast "boot up" staggered entry for the modules
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2C74B3]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-2 max-w-[1200px] mx-auto">
          <span className="text-sm font-mono text-[#2C74B3]">02</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">Skills</span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="max-w-[1200px] mx-auto mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white font-serif relative z-10">
            What I bring to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A8E0] to-[#2C74B3] drop-shadow-[0_0_15px_rgba(44,116,179,0.5)]">table.</span>
          </h2>
          <div className="absolute -inset-4 bg-[#2C74B3]/5 blur-3xl -z-10 rounded-full w-1/3" />
        </div>

        {/* Server Module Dashboard Grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-[1200px] mx-auto group/grid"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="break-inside-avoid mb-6 rounded-[16px] bg-[#0A2647]/50 backdrop-blur-md border border-[#1E3A5F] overflow-hidden transition-all duration-300 group/card group-hover/grid:opacity-40 hover:!opacity-100 hover:border-[#60A8E0]/40 hover:shadow-[0_0_30px_rgba(44,116,179,0.25)] relative"
            >
              {/* Subtle hover scanline */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover/card:opacity-100 transition-opacity mix-blend-overlay z-0" />

              {/* Server Rack Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#071626]/80 border-b border-[#1E3A5F] relative z-10">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon aria-hidden icon={ServerStack01Icon} className="w-4 h-4 text-[#4A6274] group-hover/card:text-[#60A8E0] transition-colors" />
                  <span className="text-[11px] font-mono font-bold text-[#60A8E0] tracking-widest uppercase">
                    sys.run({category.title})
                  </span>
                </div>
                {/* Indicator Lights */}
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1E3A5F] group-hover/card:bg-red-400 transition-colors duration-500" />
                  <div className="w-2 h-2 rounded-full bg-[#1E3A5F] group-hover/card:bg-yellow-400 transition-colors duration-300" />
                  <div className="w-2 h-2 rounded-full bg-[#1E3A5F] group-hover/card:bg-emerald-400 group-hover/card:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-150" />
                </div>
              </div>

              {/* Skills Payload */}
              <div className="p-5 md:p-6 flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/skill relative flex items-center gap-2 px-3 py-2 text-[12px] font-mono font-semibold rounded-md border border-[#1E3A5F]/60 bg-[#0D1421]/60 transition-all duration-300 hover:border-[#60A8E0] hover:bg-[#144272]/40 hover:shadow-[0_0_15px_rgba(96,168,224,0.3)] hover:-translate-y-0.5 cursor-default"
                  >
                    {/* Active pulsing dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6274] group-hover/skill:bg-[#60A8E0] group-hover/skill:shadow-[0_0_8px_rgba(96,168,224,1)] transition-colors" />
                    
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain opacity-70 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-all"
                    />
                    <span className="text-[#8B9BB4] group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
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
