"use client";

import { jobs } from "@/data/job";
import Image from "next/image";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

export default function JobInstitute() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="space-y-8">
      {jobs.map((job) => {
        const isCurrent = job.timeline.toLowerCase().includes("present");

        return (
          <div
            key={job.id}
            onMouseMove={handleMouseMove}
            className={`spotlight-card glow-card p-7 sm:p-9 rounded-2xl border transition-all duration-300 group ${
              isCurrent
                ? "border-sky-500/30 bg-gradient-to-b from-[#0F1117] to-[#0A0C12]"
                : "border-white/[0.08] bg-[#0F1117]"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.06] relative z-10">
              
              {/* Left: Company & Role */}
              <div className="flex items-start gap-4">
                {job.logo ? (
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center p-2 shrink-0 group-hover:border-sky-500/40 transition-colors">
                    <Image
                      src={job.logo}
                      alt={job.companyName}
                      width={36}
                      height={36}
                      className="object-contain w-8 h-8"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-sky-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      {job.position}
                    </h3>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        Current Role
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="text-slate-200 font-semibold">{job.companyName}</span>
                    <span className="text-white/20">•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>

              {/* Right: Timeline */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-slate-300 w-fit">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{job.timeline}</span>
              </div>

            </div>

            {/* Impact Highlights */}
            <div className="pt-6 space-y-3 relative z-10">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Key Deliverables & Responsibilities
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {job.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed group/item hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-2 relative z-10">
              <span className="text-xs font-mono text-slate-400 mr-2">Core Tech:</span>
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}
