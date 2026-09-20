"use client";

import Institute from "./Institute";
import { BlurText } from "@/components/common/BlurText";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ cat education.json</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">academic.degrees</span>
          </div>

          <BlurText
            text="Computer Science Foundation"
            highlightWords={["Foundation"]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Formal computational education in advanced algorithms, distributed
            databases, software quality assurance, and system design.
          </p>
        </div>

        <Institute />
      </div>
    </section>
  );
}
