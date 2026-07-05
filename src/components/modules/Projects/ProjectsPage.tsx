"use client";

import { projects } from "@/data/project";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-24 relative bg-[#0a0a0c] font-sans text-white border-t border-white/5">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest">
          <div>— FEATURED PROJECTS</div>
          <div>[ PORTFOLIO ]</div>
        </div>

        {/* Heading */}
        <div className="max-w-[1000px] mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            <span className="font-serif italic text-white">Selected Case</span>{" "}
            <span className="font-serif italic text-emerald-400">Studies.</span>
          </h2>
        </div>

        {/* Vertical List of Projects */}
        <ProjectsGrid projects={projects} />
        
      </div>
    </section>
  );
}
