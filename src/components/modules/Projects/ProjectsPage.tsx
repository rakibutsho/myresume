"use client";

import { projects } from "@/data/project";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import { BlurText } from "@/components/common/BlurText";
import { Terminal as TerminalIcon } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ ls ~/projects --featured --top</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">flagship.systems</span>
          </div>

          <BlurText
            text="Selected Software Engineering Projects"
            highlightWords={["Engineering", "Projects"]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Featured production platforms and open-source engines engineered for
            reliability, responsiveness, and clean maintainability.
          </p>
        </div>

        {/* Top & Flagship Projects Bento Showcase */}
        <FeaturedProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
