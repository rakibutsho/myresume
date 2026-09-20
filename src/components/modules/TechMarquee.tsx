"use client";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiRedis,
  SiTailwindcss,
  SiRedux,
  SiGit,
  SiVercel,
  SiLinux,
  SiSocketdotio,
} from "react-icons/si";

const TECH_ITEMS = [
  { name: "Next.js 15", icon: SiNextdotjs, color: "text-white" },
  { name: "React 19", icon: SiReact, color: "text-sky-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-400" },
  { name: "Express.js", icon: SiExpress, color: "text-slate-300" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-emerald-500" },
  { name: "Prisma ORM", icon: SiPrisma, color: "text-teal-300" },
  { name: "Docker", icon: SiDocker, color: "text-sky-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
  { name: "Redux Toolkit", icon: SiRedux, color: "text-purple-400" },
  { name: "Socket.io", icon: SiSocketdotio, color: "text-white" },
  { name: "Git", icon: SiGit, color: "text-orange-400" },
  { name: "Linux VPS", icon: SiLinux, color: "text-yellow-400" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
];

export function TechMarquee() {
  return (
    <div className="w-full py-8 overflow-hidden relative border-y border-white/[0.06] bg-[#0A0C12]/60 backdrop-blur-sm">
      {/* Left/Right Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090D] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2.5 mx-5 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.02] text-xs font-mono text-slate-300 hover:text-white hover:border-sky-400/40 hover:bg-sky-400/[0.06] transition-all duration-200 cursor-default shrink-0 group"
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${item.color}`}
              />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
