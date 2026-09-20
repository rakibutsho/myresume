import { projects } from "@/data/project";
import ProjectsGrid from "@/components/modules/Projects/ProjectsGrid";
import { ArrowLeft, Terminal as TerminalIcon, Layers } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "All Projects Archive | Md. Rakibul Islam",
  description:
    "A comprehensive archive of production full-stack systems, open-source engines, and web architectures.",
};

export default function AllProjectsPage() {
  return (
    <div className="w-full pt-32 sm:pt-36 pb-24 relative min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 space-y-12">
        {/* Navigation & Terminal Command Header */}
        <div className="space-y-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-sky-400" />
            <span>cd .. (Back to Home)</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>$ ls ~/projects --all</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">
                {projects.length} systems indexed
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Complete Projects Archive<span className="text-sky-400">.</span>
            </h1>

            <p className="text-base text-slate-400 leading-relaxed max-w-2xl font-normal">
              Dive into the full catalogue of software systems, SaaS platforms,
              internal enterprise tooling, and open-source contributions.
            </p>
          </div>
        </div>

        {/* The Full Filterable Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
