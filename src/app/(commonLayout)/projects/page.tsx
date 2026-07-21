import { projects } from "@/data/project";
import ProjectsGrid from "@/components/modules/Projects/ProjectsGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "All Projects | Md. Rakibul Islam",
  description: "A comprehensive list of my full-stack projects, case studies, and engineering work.",
};

export default function AllProjectsPage() {
  return (
    <div className="w-full pt-32 pb-20 relative min-h-screen bg-[#09090b]">
      {/* Background glow */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-16">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            All Projects
            <span className="text-emerald-400">.</span>
          </h1>
          <p className="text-base text-[#a1a1aa] leading-relaxed max-w-2xl font-light">
            Dive into my complete portfolio of work. Each project below represents a unique problem solved using modern full-stack technologies and design systems.
          </p>
        </div>

        {/* The Full Grid */}
        <ProjectsGrid projects={projects} />

      </div>
    </div>
  );
}
