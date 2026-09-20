"use client";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiMysql,
  SiRedis,
  SiGit,
  SiDocker,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiSocketdotio,
  SiJsonwebtokens,
} from "react-icons/si";
import {
  Server,
  Globe,
  Cpu,
  Wrench,
  Terminal as TerminalIcon,
} from "lucide-react";
import { BlurText } from "@/components/common/BlurText";

const SKILL_DOMAINS = [
  {
    category: "Frontend Architecture",
    description:
      "Component design systems, state machines, and modern client runtimes",
    icon: Globe,
    skills: [
      {
        name: "Next.js 15",
        icon: SiNextdotjs,
        color: "text-white group-hover:text-white",
      },
      {
        name: "React 19",
        icon: SiReact,
        color: "text-sky-400 group-hover:text-sky-300",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "text-blue-400 group-hover:text-blue-300",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-teal-400 group-hover:text-teal-300",
      },
      {
        name: "Redux Toolkit",
        icon: SiRedux,
        color: "text-purple-400 group-hover:text-purple-300",
      },
      {
        name: "Framer Motion",
        icon: SiFramer,
        color: "text-pink-400 group-hover:text-pink-300",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "text-yellow-400 group-hover:text-yellow-300",
      },
    ],
  },
  {
    category: "Backend & Distributed APIs",
    description:
      "Low-latency REST services, WebSocket channels, and async workers",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "text-emerald-400 group-hover:text-emerald-300",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-slate-200 group-hover:text-white",
      },
      {
        name: "REST APIs",
        icon: Server,
        color: "text-sky-400 group-hover:text-sky-300",
      },
      {
        name: "Socket.io",
        icon: SiSocketdotio,
        color: "text-white group-hover:text-white",
      },
      {
        name: "JWT Auth",
        icon: SiJsonwebtokens,
        color: "text-pink-400 group-hover:text-pink-300",
      },
    ],
  },
  {
    category: "Database Modeling & Caching",
    description:
      "Relational integrity, document flexibility, and in-memory caches",
    icon: Cpu,
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "text-blue-400 group-hover:text-blue-300",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "text-emerald-400 group-hover:text-emerald-300",
      },
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        color: "text-teal-300 group-hover:text-teal-200",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "text-blue-300 group-hover:text-blue-200",
      },
      {
        name: "Redis",
        icon: SiRedis,
        color: "text-red-400 group-hover:text-red-300",
      },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    description:
      "Continuous integration, containerization, and production VPS operations",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        icon: SiGit,
        color: "text-orange-400 group-hover:text-orange-300",
      },
      {
        name: "Docker",
        icon: SiDocker,
        color: "text-sky-400 group-hover:text-sky-300",
      },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        color: "text-blue-400 group-hover:text-blue-300",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        color: "text-white group-hover:text-white",
      },
      {
        name: "Postman",
        icon: SiPostman,
        color: "text-orange-400 group-hover:text-orange-300",
      },
    ],
  },
];

export default function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="skills"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ ls -la skills/</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">production.tooling</span>
          </div>

          <BlurText
            text="Technologies I build with everyday."
            highlightWords={["everyday."]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Battle-tested frameworks and systems selected for developer
            experience, type safety, and real-world production performance.
          </p>
        </div>

        {/* 2x2 Clean Domain Grid with Interactive Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_DOMAINS.map((domain) => {
            const DomainIcon = domain.icon;
            return (
              <div
                key={domain.category}
                onMouseMove={handleMouseMove}
                className="spotlight-card glow-card p-8 rounded-2xl border border-white/[0.08] bg-[#0F1117] flex flex-col justify-between space-y-6 group transition-all duration-300"
              >
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-sky-400 group-hover:border-sky-500/40 transition-colors">
                        <DomainIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {domain.category}
                      </h3>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                    {domain.description}
                  </p>
                </div>

                {/* Skill Badges with Native Icons & Micro-Hover Scale */}
                <div className="flex flex-wrap gap-2.5 pt-2 relative z-10">
                  {domain.skills.map((s) => {
                    const SkillIcon = s.icon;
                    return (
                      <div
                        key={s.name}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-medium text-slate-200 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06] hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 cursor-default group/skill"
                      >
                        <SkillIcon
                          className={`w-4 h-4 transition-transform group-hover/skill:scale-115 ${s.color}`}
                        />
                        <span>{s.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
