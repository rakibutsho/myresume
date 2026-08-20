"use client";

import { projects } from "@/data/project";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full py-24 relative overflow-hidden font-sans text-white"
    >
      {/* Modern Background Glows */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-[#2C74B3]">05</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">
            Projects
          </span>
        </div>

        {/* Heading */}
        <div className="fade-up-element max-w-[1000px] mb-16 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-serif text-white">
            Selected Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A8E0] to-[#2C74B3] drop-shadow-[0_0_15px_rgba(44,116,179,0.5)]">Studies.</span>
          </h2>
          {/* Subtle glow behind heading */}
          <div className="absolute -inset-4 bg-[#2C74B3]/5 blur-3xl -z-10 rounded-full" />
        </div>

        {/* Vertical List of Projects */}
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
