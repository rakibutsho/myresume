"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { jobs } from "@/data/job";
import { Briefcase, Circle, Calendar, MapPin, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  "Full-Time Onsite": "text-sky-400 border-sky-500/25 bg-sky-500/10 shadow-[0_0_10px_rgba(56,189,248,0.1)]",
  Remote: "text-violet-400 border-violet-500/25 bg-violet-500/10 shadow-[0_0_10px_rgba(139,92,246,0.1)]",
  Internship: "text-amber-400 border-amber-500/25 bg-amber-500/10 shadow-[0_0_10px_rgba(251,191,36,0.1)]",
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="w-full py-24 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center sm:text-left flex flex-col sm:items-start items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
              Career Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Where I've made an impact
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-sm sm:text-base">
            A timeline of my professional roles, highlighting the problems I've solved and the technologies I've mastered along the way.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative"
        >
          {/* Vertical line - Premium gradient */}
          <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/[0.15] to-transparent hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="relative sm:pl-16 group"
              >
                {/* Timeline Node - Glowing effect on hover */}
                <div className="absolute left-[11px] sm:left-[11px] top-6 hidden sm:flex items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0A0C10] border-2 border-white/[0.1] flex items-center justify-center group-hover:border-violet-500/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-500">
                    <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-violet-400 transition-colors duration-500" />
                  </div>
                </div>

                {/* Premium Glass Card */}
                <div className="relative rounded-[2rem] border border-white/[0.08] bg-[#0A0C10]/60 backdrop-blur-xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.02] hover:border-white/[0.12] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Header Row */}
                  <div className="relative z-10 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white/[0.06] transition-all duration-500">
                        <Building2 className="w-5 h-5 text-slate-300 group-hover:text-violet-300 transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-violet-100 transition-colors">
                          {job.position}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-sky-400/90">
                          <span>{job.companyName}</span>
                          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/[0.1]" />
                          <span className="text-slate-400 flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 xl:justify-end shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.02] text-xs font-mono text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {job.timeline}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border",
                          TYPE_COLORS[job.type] ??
                            "text-slate-400 border-white/[0.08] bg-white/[0.02]"
                        )}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="relative z-10 space-y-3 mb-6">
                    {job.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300/90 leading-relaxed group-hover:text-slate-200 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-violet-400/70 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-md border border-white/[0.06] bg-[#0A0C10] group-hover:border-white/[0.1] transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

