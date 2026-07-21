"use client";

import { projects } from "@/data/project";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-24 relative overflow-hidden font-sans text-white">
      {/* Modern Background Glows */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-12">
          <span className="text-sm font-mono text-emerald-400">05</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">Projects</span>
        </div>

        {/* Heading */}
        <div className="max-w-[1000px] mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-serif">
            <span className="text-white">Selected Case</span>{" "}
            <span className="text-emerald-400">Studies.</span>
          </h2>
        </div>

        {/* Vertical List of Projects */}
        <ProjectsGrid projects={projects} />
        
      </div>
    </section>
  );
}
