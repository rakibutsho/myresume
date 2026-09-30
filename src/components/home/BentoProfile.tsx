"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "motion/react";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { MapPin, GraduationCap, Layers, Code2, Server, Wrench, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/vengeance/AnimatedNumber";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
};

const ABOUT_TEXT = [
  "At SM Technology, I build frontends that have to hold up in production — complex dashboard architectures, interactive workflows, and robust state management. As a Junior Executive, I obsess over UI predictability and clean code.",
  "That seat is deliberate — I'm building a product mindset from the engineering side, growing toward leadership by owning outcomes, not just code. I'm also pursuing my M.Sc. in Computer Science at Jahangirnagar University."
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BentoProfile() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeSkills = useMemo(() => 
    skillCategories.find((c) => c.id === activeCategory)?.skills ?? [],
    [activeCategory]
  );

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-24 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
              The Architect
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.1]">
            Engineering with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">product-first</span> mindset.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto"
        >
          {/* Card 1: Main Bio (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 group relative rounded-[2rem] border border-white/[0.08] bg-[#0A0C10]/80 backdrop-blur-md overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 sm:p-10 relative z-10">
              <div className="flex flex-col gap-6 mb-8">
                <div className="space-y-4">
                  <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                    {ABOUT_TEXT.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      Dhaka, BD
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Footer inside Card 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/[0.06] bg-white/[0.01]">
              <div className="p-5 border-r border-white/[0.06]">
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-0.5">
                  1<span className="text-sky-400">+</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider">Years Exp</div>
              </div>
              <div className="p-5 border-r border-white/[0.06]">
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-0.5">
                  5<span className="text-sky-400">+</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider">Projects</div>
              </div>
              <div className="p-5 border-r border-white/[0.06]">
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-0.5">
                  FE
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider">Specialist</div>
              </div>
              <div className="p-5">
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-0.5">
                  3.75
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wider">M.Sc CGPA</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Education (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 rounded-[2rem] border border-white/[0.08] bg-[#0A0C10]/80 backdrop-blur-md p-8 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <GraduationCap className="w-24 h-24 text-white" />
            </div>
            
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Academic Journey</h3>
            </div>

            <div className="space-y-6 relative z-10 flex-1">
              {education.map((edu, idx) => (
                <div key={edu.id} className="relative pl-4 border-l border-white/[0.1]">
                  <div className="absolute w-2 h-2 rounded-full bg-indigo-400 -left-[4.5px] top-1" />
                  <p className="text-[11px] font-mono text-indigo-300 mb-1">{edu.timeline}</p>
                  <p className="text-sm font-bold text-white leading-tight mb-1">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-400 mb-2">{edu.institute}</p>
                  {("CGPA" in edu || "GPA" in edu) && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.05]">
                      {edu.CGPA ? `CGPA: ${edu.CGPA}` : `GPA: ${edu.GPA}`}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Skills (Span 12) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 rounded-[2rem] border border-white/[0.08] bg-[#0A0C10]/80 backdrop-blur-md p-8 sm:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight">Technical Arsenal</h3>
              </div>
              
              {/* Category Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                {skillCategories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id];
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer",
                        isActive
                          ? "bg-white/[0.08] text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-3">
              <AnimatePresence mode="popLayout">
                {activeSkills.map((skill) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70" />
                    <span className="text-sm font-medium text-slate-200">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
