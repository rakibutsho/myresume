// src/components/projects/ProjectCard.tsx

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  if (!project) return null;

  return (
    <div data-project-card className="h-full group">
      <div
        className="
          h-full flex flex-col overflow-hidden text-white
          bg-[#131b2c] border border-[#1e293b]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)]
          transition-all duration-500 rounded-[2rem]
          group-hover:border-emerald-500/30 group-hover:bg-[#152033] group-hover:-translate-y-1
        "
      >
        {project.image && (
          <div className="relative w-full h-64 overflow-hidden border-b border-[#1e293b]">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
            <Image
              src={project.image}
              alt={project.title || "project"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* ✅ Content */}
        <div className="p-6 md:p-8 flex flex-col grow gap-6 relative">
          
          {/* Subtle internal glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px] pointer-events-none" />

          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                {project.type}
              </span>
            </div>
            <p className="text-sm text-white/60 font-medium">{project.subtitle}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#0f172a] border border-white/5 text-white/70 shadow-inner"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-sm text-white/70 leading-relaxed mt-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/80 mb-1.5">
                Problem
              </p>
              <p>{project.problem}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/80 mb-1.5">
                Solution
              </p>
              <p>{project.solution}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/80 mb-1.5">
                Results
              </p>
              <ul className="space-y-2 mt-2">
                {project.results?.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 shrink-0 text-lg leading-none">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Buttons */}
          <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-3 pt-6 border-t border-white/5 relative z-10">
            
            {/* View Details Route */}
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-[#10b981] text-slate-900 font-bold hover:brightness-110 transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] w-full sm:w-auto"
            >
              Read Case Study
            </Link>

            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white/80 hover:text-white hover:border-emerald-500/50 hover:bg-[#131b2c] transition-all shadow-inner w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Live App
              </Link>
            )}

            {project.isPrivate ? (
              <span className="flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium cursor-not-allowed w-full sm:w-auto">
                Private Repo
              </span>
            ) : (
              project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white/80 hover:text-white hover:border-emerald-500/50 hover:bg-[#131b2c] transition-all shadow-inner w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
