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
    <div className="w-full pt-32 pb-20 relative min-h-screen">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Navigation & Header */}
        <div className="mb-16">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            All{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Projects
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Dive into my complete portfolio of work. Each project below represents a unique problem solved using modern full-stack technologies.
          </p>
        </div>

        {/* The Full Grid */}
        <ProjectsGrid projects={projects} />

      </div>
    </div>
  );
}
