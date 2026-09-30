"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "motion/react";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { MapPin, GraduationCap, Layers, Code2, Server, Wrench, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
            <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase font-bold">
              The Architect
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white max-w-2xl leading-[1.1]">
            Engineering with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">product-first</span> mindset.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto"
        >
          {/* Card 1: Main Bio (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 group relative rounded-[2.5rem] border border-white/[0.05] bg-[#05060A] shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="p-8 sm:p-12 relative z-10">
              <div className="flex flex-col gap-8 mb-8">
                <div className="space-y-6">
                  <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                    {ABOUT_TEXT.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.05]">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      Dhaka, BD
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/[0.05] bg-white/[0.01]">
              <div className="p-6 border-r border-white/[0.05] group/stat hover:bg-white/[0.02] transition-colors">
                <div className="text-3xl font-black text-white font-mono flex items-center gap-0.5 group-hover/stat:text-sky-300 transition-colors">
                  1<span className="text-sky-400">+</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-semibold">Years Exp</div>
              </div>
              <div className="p-6 border-r border-white/[0.05] group/stat hover:bg-white/[0.02] transition-colors">
                <div className="text-3xl font-black text-white font-mono flex items-center gap-0.5 group-hover/stat:text-sky-300 transition-colors">
                  5<span className="text-sky-400">+</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-semibold">Projects</div>
              </div>
              <div className="p-6 border-r border-white/[0.05] group/stat hover:bg-white/[0.02] transition-colors">
                <div className="text-3xl font-black text-white font-mono flex items-center gap-0.5 group-hover/stat:text-sky-300 transition-colors">
                  FE
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-semibold">Specialist</div>
              </div>
              <div className="p-6 group/stat hover:bg-white/[0.02] transition-colors">
                <div className="text-3xl font-black text-white font-mono flex items-center gap-0.5 group-hover/stat:text-sky-300 transition-colors">
                  3.75
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-semibold">M.Sc CGPA</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Education (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 rounded-[2.5rem] border border-white/[0.05] bg-[#05060A] shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-8 sm:p-10 relative overflow-hidden flex flex-col group/edu"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/edu:opacity-10 transition-opacity duration-700 pointer-events-none">
              <GraduationCap className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex items-center gap-3 mb-10 relative z-10">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Academic Journey</h3>
            </div>

            <div className="space-y-8 relative z-10 flex-1">
              {education.map((edu, idx) => (
                <div key={edu.id} className="relative pl-5 border-l border-white/[0.08]">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400/20 border border-indigo-400 -left-[5.5px] top-1" />
                  <p className="text-[11px] font-mono font-semibold tracking-wider text-indigo-400/80 mb-1.5 uppercase">{edu.timeline}</p>
                  <p className="text-base font-bold text-white leading-tight mb-1.5">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-400 mb-3 font-medium">{edu.institute}</p>
                  {("CGPA" in edu || "GPA" in edu) && (
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.03] text-slate-300 border border-white/[0.05]">
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
            className="md:col-span-12 rounded-[2.5rem] border border-white/[0.05] bg-[#05060A] shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Technical Arsenal</h3>
              </div>
              
              {/* Category Tabs */}
              <div className="flex items-center p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                {skillCategories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id];
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer",
                        isActive
                          ? "bg-white/[0.06] text-white shadow-sm border border-white/[0.08]"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent"
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-3 relative z-10">
              <AnimatePresence mode="popLayout">
                {activeSkills.map((skill) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.25 }}
                    key={skill.name}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-sky-500/5 hover:border-sky-500/20 hover:text-sky-300 transition-all duration-300 group/skill cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/70 group-hover/skill:text-sky-400 transition-colors" />
                    <span className="text-sm font-semibold text-slate-300 group-hover/skill:text-sky-100 transition-colors">
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
