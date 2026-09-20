"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Lock, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  if (!project) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const isArray = Array.isArray(project.image);
  let coverImage = "";
  if (isArray) {
    (project.image as any[]).forEach((img) => {
      if ("cover" in img) coverImage = img.cover;
    });
  } else if (typeof project.image === "string") {
    coverImage = project.image;
  }

  const getImageUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return url;
  };

  const finalImageSrc = coverImage ? getImageUrl(coverImage) : "";
  const isEven = index % 2 === 0;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="spotlight-card glow-card rounded-2xl border border-white/[0.08] bg-[#0F1117] overflow-hidden group transition-all duration-300"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} w-full relative z-10`}>
        
        {/* Visual Preview Frame */}
        <div className="flex-[1.15] relative min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] bg-[#08090D] overflow-hidden border-b lg:border-b-0 border-white/[0.06]">
          <Link
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            className="block relative w-full h-full overflow-hidden"
          >
            {finalImageSrc ? (
              <Image
                src={finalImageSrc}
                alt={project.title}
                fill
                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 font-mono text-xs">
                <span>[ Live Project Preview ]</span>
              </div>
            )}
            
            {/* Ambient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent opacity-80 pointer-events-none" />
          </Link>
        </div>

        {/* Technical Narrative & Details */}
        <div className="flex-[1] flex flex-col justify-between p-7 sm:p-9 space-y-6">
          
          <div className="space-y-4">
            
            {/* Meta Row: Type & Access Status */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-sky-500/20 bg-sky-500/10 text-sky-300">
                {project.type || "Full-Stack System"}
              </span>

              {project.isPrivate ? (
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Lock className="w-3 h-3 text-amber-400/80" />
                  <span>Enterprise NDA</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open Source</span>
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Problem & Architectural Solution Description */}
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              {project.problem}
            </p>

            {project.solution && (
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs text-slate-300 font-mono flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{project.solution}</span>
              </div>
            )}

            {/* Tech Badges */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/40 hover:text-white transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>

          {/* Action Links Row */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button
                className="rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 h-10 px-5 gap-2 text-xs shadow-[0_2px_12px_rgba(255,255,255,0.15)] group/btn"
                asChild
              >
                <Link href={project.liveUrl} target="_blank">
                  <span>Visit Live App</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
            )}

            {!project.isPrivate && project.githubUrl && (
              <Button
                variant="outline"
                className="rounded-full border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-colors h-10 px-5 gap-2 text-xs"
                asChild
              >
                <Link href={project.githubUrl} target="_blank">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </Link>
              </Button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
