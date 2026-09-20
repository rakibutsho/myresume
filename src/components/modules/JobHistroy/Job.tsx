"use client";

import JobInstitute from "./JobInstitue";
import { BlurText } from "@/components/common/BlurText";
import { Terminal as TerminalIcon } from "lucide-react";

export default function JobHistory() {
  return (
    <section
      id="experience"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ cat experience.log</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">career.history</span>
          </div>

          <BlurText
            text="Where I've contributed and grown."
            highlightWords={["contributed", "grown."]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Real production contributions across onsite engineering teams,
            remote development agencies, and national institutions.
          </p>
        </div>

        <JobInstitute />
      </div>
    </section>
  );
}
