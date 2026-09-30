"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "motion/react";
import profileImg from "@/assets/Profile.png";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { MapPin, GraduationCap, Layers, Code2, Server, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
};

const ABOUT_TEXT = [
  "Full-Stack Software Engineer based in Dhaka, Bangladesh. Currently building production dashboard workflows at SM Technology while pursuing an M.Sc. in Computer Science at Jahangirnagar University (CGPA 3.75/4.0).",
  "My engineering philosophy: predictability, maintainability, and user delight. I obsess over state management boundaries, network request caching, and smooth 60fps micro-interactions — not just ticket-closing.",
];

export default function BentoProfile() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeSkills =
    skillCategories.find((c) => c.id === activeCategory)?.skills ?? [];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-20 px-4 sm:px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
            Profile
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Who I am, what I know.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {/* ── Card A (span 2): About narrative + portrait ── */}
          <motion.div
            variants={item}
            className="lg:col-span-2 glow-card rounded-2xl border border-white/[0.08] bg-[#0F1117] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
          >
            {/* Portrait */}
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/[0.1] bg-[#161922]">
              <Image
                src={profileImg}
                alt="Md. Rakibul Islam"
                width={96}
                height={96}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="space-y-4 flex-1 min-w-0">
              <div>
                <p className="text-base font-bold text-white">Md. Rakibul Islam</p>
                <p className="text-xs font-mono text-sky-400 mt-0.5">
                  Junior Executive, Front End · SM Technology
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {ABOUT_TEXT.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  Dhaka, Bangladesh
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <GraduationCap className="w-3 h-3 text-emerald-400" />
                  M.Sc. CSE · Ongoing
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Card B (span 1): Education ── */}
          <motion.div
            variants={item}
            className="glow-card rounded-2xl border border-white/[0.08] bg-[#0F1117] p-6 space-y-4"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold text-white tracking-tight">Education</span>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-0.5"
                >
                  <p className="text-xs font-semibold text-white leading-tight">
                    {edu.institute}
                  </p>
                  <p className="text-[11px] font-mono text-sky-400">{edu.degree}</p>
                  <p className="text-[10px] text-slate-500">{edu.timeline}</p>
                  {"CGPA" in edu && (
                    <p className="text-[10px] font-mono text-emerald-400">
                      CGPA {edu.CGPA}
                    </p>
                  )}
                  {"GPA" in edu && (
                    <p className="text-[10px] font-mono text-emerald-400">
                      GPA {edu.GPA}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card C (span 3): Skills with category tabs ── */}
          <motion.div
            variants={item}
            className="lg:col-span-3 glow-card rounded-2xl border border-white/[0.08] bg-[#0F1117] p-6 sm:p-8 space-y-5"
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 flex-wrap">
              <Layers className="w-4 h-4 text-sky-400 mr-2" />
              {skillCategories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id];
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
                      activeCategory === cat.id
                        ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        : "text-slate-400 border border-white/[0.06] hover:text-white hover:border-white/[0.15]"
                    )}
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Skill badges */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {activeSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.07] bg-white/[0.02] hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-200 cursor-default"
                >
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  {/* Level bar */}
                  <div className="h-1 w-10 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-400/60"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {skill.level}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
