"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { jobs } from "@/data/job";
import { Briefcase, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  "Full-Time Onsite": "text-sky-400 border-sky-500/25 bg-sky-500/5",
  Remote: "text-violet-400 border-violet-500/25 bg-violet-500/5",
  Internship: "text-amber-400 border-amber-500/25 bg-amber-500/5",
};

export default function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="w-full py-20 px-4 sm:px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
            Career
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Where I have contributed.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/[0.06] hidden sm:block" />

          <div className="space-y-2">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                className="relative sm:pl-9"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center">
                  <Circle className="w-[11px] h-[11px] fill-[#0F1117] stroke-white/20" />
                </div>

                {/* Card */}
                <div className="glow-card rounded-2xl border border-white/[0.08] bg-[#0F1117] p-6 sm:p-7 space-y-5">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {job.position}
                        </p>
                        <p className="text-xs font-mono text-sky-400">
                          {job.companyName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "text-[11px] font-mono px-2.5 py-1 rounded-full border",
                          TYPE_COLORS[job.type] ??
                            "text-slate-400 border-white/[0.08] bg-white/[0.02]"
                        )}
                      >
                        {job.type}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {job.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {job.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-sky-400/50 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.06]">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

