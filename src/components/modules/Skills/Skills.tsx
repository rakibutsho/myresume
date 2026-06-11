"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import {
  SiCss,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

// Grouped for display
const allSkills = [
  // Frontend
  { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" },
  { name: "TypeScript", icon: SiTypescript, color: "group-hover:text-[#3178C6]" },
  { name: "React.js", icon: SiReact, color: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-white" },
  { name: "Tailwind", icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
  { name: "Redux", icon: SiRedux, color: "group-hover:text-[#764ABC]" },
  { name: "HTML5", icon: SiHtml5, color: "group-hover:text-[#E34F26]" },
  { name: "CSS3", icon: SiCss, color: "group-hover:text-[#1572B6]" },
  
  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-[#339933]" },
  { name: "Express.js", icon: SiExpress, color: "group-hover:text-white" },
  { name: "MongoDB", icon: SiMongodb, color: "group-hover:text-[#47A248]" },
  { name: "MySQL", icon: SiMysql, color: "group-hover:text-[#4479A1]" },
  { name: "Go", icon: SiGo, color: "group-hover:text-[#00ADD8]" },
  { name: "REST APIs", icon: TbApi, color: "group-hover:text-emerald-400" },
  
  // Tools
  { name: "Git", icon: SiGithub, color: "group-hover:text-white" },
  { name: "Firebase", icon: SiFirebase, color: "group-hover:text-[#FFCA28]" },
  { name: "Prisma", icon: SiPrisma, color: "group-hover:text-white" },
  { name: "Figma", icon: SiFigma, color: "group-hover:text-[#F24E1E]" },
  { name: "Linux", icon: SiLinux, color: "group-hover:text-[#FCC624]" },
  { name: "Agile", icon: FaProjectDiagram, color: "group-hover:text-emerald-400" },
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Icons Stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-skill-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="w-full pt-32 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              My Arsenal
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Technologies I{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Work With
            </span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            A comprehensive list of the tools, languages, and frameworks I use to build scalable, high-performance applications.
          </p>
        </div>

        {/* Dense Icon Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {allSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                data-skill-card
                className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md shadow-xl hover:-translate-y-2 cursor-pointer"
              >
                {/* 3D App Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#0f172a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.6)] border border-[#1e293b] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Icon className={`text-3xl text-emerald-400/80 transition-colors duration-300 ${skill.color}`} />
                </div>
                
                {/* Skill Name */}
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors text-center">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
