"use client";

import { useState } from "react";
import { jobs } from "@/data/job";
import Image from "next/image";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  GitBranch,
  Terminal as TerminalIcon,
  Sparkles,
  MapPin,
  ChevronRight,
  GitCommit,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const COMMIT_HASHES: Record<number, string> = {
  1: "HEAD -> main",
  2: "c7e2b19",
  3: "a1f09d4",
};

export default function JobInstitute() {
  const [activeJobId, setActiveJobId] = useState(jobs[0].id);

  const activeJob = jobs.find((j) => j.id === activeJobId) || jobs[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Interactive Career Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Authentic Git-Branch Timeline Rail */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-sky-400">
              <GitBranch className="w-3.5 h-3.5" />
              <span>git log --oneline --graph</span>
            </span>
            <span className="text-slate-500">3 career commits</span>
          </div>

          {/* Timeline Milestones List */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-sky-400 before:to-slate-700">
            {jobs.map((job, idx) => {
              const isSelected = job.id === activeJobId;
              const isCurrent = job.timeline.toLowerCase().includes("present");
              const commitHash = COMMIT_HASHES[job.id] || `commit_0${job.id}`;

              return (
                <div key={job.id} className="relative">
                  {/* Dedicated Git Graph Node Dot on the branch line */}
                  <div
                    className={`absolute -left-[30px] top-5 z-20 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? "bg-sky-400 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-110"
                        : isCurrent
                          ? "bg-emerald-500 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                          : "bg-[#0B0D13] border-slate-600 group-hover:border-slate-400"
                    }`}
                  >
                    {isCurrent && (
                      <span className="animate-ping absolute w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    )}
                  </div>

                  {/* Interactive Milestone Card */}
                  <button
                    onClick={() => setActiveJobId(job.id)}
                    className={`relative w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex items-start gap-3.5 ${
                      isSelected
                        ? "border-sky-400/50 bg-gradient-to-r from-sky-500/[0.1] via-white/[0.03] to-[#0E1118] shadow-[0_0_24px_rgba(56,189,248,0.14)]"
                        : "border-white/[0.08] bg-[#0E1118]/80 hover:border-white/[0.2] hover:bg-[#121620]"
                    }`}
                  >
                    {/* High-Contrast Company Logo Badge */}
                    <div className="relative shrink-0">
                      {job.logo ? (
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center p-1.5 transition-all ${
                            isSelected
                              ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)] ring-2 ring-sky-400/50"
                              : "bg-white/90 group-hover:bg-white"
                          }`}
                        >
                          <Image
                            src={job.logo}
                            alt={job.companyName}
                            width={32}
                            height={32}
                            className="object-contain w-7 h-7"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-sky-400">
                          <Briefcase className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Milestone Information */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-amber-300 font-semibold">
                          {commitHash}
                        </span>
                        {isCurrent ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500">
                            Milestone 0{3 - idx}
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                          isSelected
                            ? "text-white"
                            : "text-slate-200 group-hover:text-white"
                        }`}
                      >
                        {job.position}
                      </h4>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="text-slate-300 font-medium truncate">
                          {job.companyName}
                        </span>
                        <span className="text-white/20">•</span>
                        <span>{job.timeline}</span>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform mt-3 ${
                        isSelected
                          ? "text-sky-400 translate-x-1"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Active Role Engineering Dossier */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJob.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              className="spotlight-card glow-card rounded-3xl border border-sky-500/25 bg-gradient-to-b from-[#0F121C] to-[#0A0C12] p-7 sm:p-9 relative overflow-hidden space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Terminal Chrome Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08] relative z-10">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-sky-400 font-bold">&gt;_</span>
                  <span className="text-white font-medium">
                    experience_{activeJob.shortName.toLowerCase()}.ts
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-slate-400">production_impact.log</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-sky-500/20 bg-sky-500/10 text-sky-300">
                    {activeJob.type}
                  </span>
                  {activeJob.timeline.toLowerCase().includes("present") && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Current Position</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Position & Company Details */}
              <div className="space-y-2 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {activeJob.position}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{activeJob.timeline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-sky-300 font-semibold font-mono">
                  <span>{activeJob.companyName}</span>
                </div>
              </div>

              {/* Quantified Deliverables & Architectural Contributions */}
              <div className="space-y-3 relative z-10">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Deliverables &amp; Responsibilities</span>
                </div>

                <div className="space-y-2.5">
                  {activeJob.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-colors flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Technical Stack Chips */}
              <div className="pt-4 border-t border-white/[0.08] relative z-10 space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Role-Specific Stack &amp; Production Tools</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/[0.07] text-slate-300 hover:border-sky-400/40 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
