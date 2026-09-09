"use client";

import { projects } from "@/data/project";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full py-28 bg-background border-t border-border"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        {/* Section Header Indicator */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
              <span className="text-accent font-bold">04</span>
              <span className="text-border">/</span>
              <span>SELECTED WORKS & CASE STUDIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
              Featured Systems
            </h2>
          </div>
          <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
            PRODUCTION ARTIFACTS
          </span>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
