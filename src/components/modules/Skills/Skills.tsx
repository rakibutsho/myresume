"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { 
  SiNodedotjs, SiExpress, SiSocketdotio, SiJsonwebtokens,
  SiPostgresql, SiMongodb, SiMysql, SiPrisma, SiMongoose,
  SiReact, SiNextdotjs, SiTailwindcss, SiRedux, SiHtml5, SiCss, SiShadcnui, SiFramer, SiReactquery, SiReacthookform,
  SiGit, SiDocker, SiGithubactions, SiVercel, SiRailway, SiLinux,
  SiJavascript, SiTypescript, SiGo, SiCplusplus, SiJira,
  SiPostman, SiFigma
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaServer, FaProjectDiagram, FaCogs, FaAws } from "react-icons/fa";

const SKILL_CATEGORIES = [
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: TbApi },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "JWT Authentication", icon: SiJsonwebtokens },
    ],
    highlight: true,
  },
  {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Prisma", icon: SiPrisma },
      { name: "Mongoose", icon: SiMongoose },
    ],
    highlight: true,
  },
  {
    title: "FRONTEND",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Redux", icon: SiRedux },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Shadcn UI", icon: SiShadcnui },
      { name: "Framer Motion", icon: SiFramer },
      { name: "React Query", icon: SiReactquery },
      { name: "React Hook Form", icon: SiReacthookform },
    ],
    highlight: false,
  },
  {
    title: "CLOUD/DEVOPS",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD Basics", icon: SiGithubactions },
      { name: "Vercel", icon: SiVercel },
      { name: "Railway", icon: SiRailway },
      { name: "VPS Hosting", icon: FaServer },
      { name: "AWS Basics", icon: FaAws },
    ],
    highlight: true,
  },
  {
    title: "LANGUAGES",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Go", icon: SiGo },
      { name: "C/C++", icon: SiCplusplus },
      { name: "SQL", icon: SiMysql },
    ],
    highlight: true,
  },
  {
    title: "TOOLS & ARCHITECTURE",
    skills: [
      { name: "System Design", icon: FaProjectDiagram },
      { name: "Microservices", icon: FaCogs },
      { name: "Postman", icon: SiPostman },
      { name: "Linux", icon: SiLinux },
      { name: "Figma", icon: SiFigma },
      { name: "Agile/Scrum", icon: SiJira },
    ],
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
                    key={skill.name}
                    className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-mono font-medium rounded-md border transition-colors ${
                      category.highlight
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-white/5 border-white/10 text-[#a1a1aa] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <skill.icon className="w-3.5 h-3.5" />
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
