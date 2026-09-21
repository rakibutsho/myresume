"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { Github } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";

interface FeaturedProjectsGridProps {
  projects: Project[];
}

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  // Select the top 3 flagship projects
  const topProjects = projects.slice(0, 3);
  const heroProject = topProjects[0]; // SpiderNode
  const secondaryProjects = topProjects.slice(1); // Pawradise, Anesthelink

  const getImageUrl = (url?: string | any[]) => {
    if (!url) return "";
    let raw = "";
    if (Array.isArray(url)) {
      url.forEach((img) => {
        if ("cover" in img) raw = img.cover;
      });
    } else if (typeof url === "string") {
      raw = url;
    }
    if (raw.startsWith("/")) return raw;
    const match = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1])
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return raw;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="space-y-8">
      {/* 1. Flagship Hero Bento Card (SpiderNode) */}
      {heroProject && (
        <div
          onMouseMove={handleMouseMove}
          className="spotlight-card glow-card rounded-3xl border border-sky-500/20 bg-gradient-to-b from-[#0F121C] to-[#0A0C12] overflow-hidden group transition-all duration-300"
        >
          {/* Card Top Chrome */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>active</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-sky-400 font-semibold">&gt;_</span>
              <span className="text-slate-200">
                flagship_01 • spidernode.ts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dual-Cron Engine</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
            {/* Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] bg-[#07080C] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <Link
                href={heroProject.liveUrl || heroProject.githubUrl || "#"}
                target="_blank"
                className="block relative w-full h-full overflow-hidden"
              >
                {getImageUrl(heroProject.image) ? (
                  <Image
                    src={getImageUrl(heroProject.image)}
                    alt={heroProject.title}
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    [ Flagship Showcase ]
                  </div>
                )}

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Floating Preview Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl border border-white/[0.1] bg-[#08090D]/85 backdrop-blur-md flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-white font-medium">
                      curl -I https://spidernode.site
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">
                    200 OK • 12ms
                  </span>
                </div>
              </Link>
            </div>

            {/* Content & Technical Breakdown (5 cols) */}
            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-sky-500/20 bg-sky-500/10 text-sky-300">
                    {heroProject.type}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Source</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    {heroProject.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">
                    {heroProject.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-300 font-normal leading-relaxed">
                  {heroProject.problem}
                </p>

                {heroProject.solution && (
                  <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] text-xs text-emerald-300 font-mono flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{heroProject.solution}</span>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {heroProject.tech.slice(0, 8).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-sky-400/40 hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                  {heroProject.tech.length > 8 && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-500 bg-white/[0.01] border border-white/[0.04]">
                      +{heroProject.tech.length - 8} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                {heroProject.liveUrl && (
                  <Button
                    className="rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 h-10 px-5 gap-2 text-xs shadow-[0_2px_14px_rgba(255,255,255,0.2)] group/btn"
                    asChild
                  >
                    <Link href={heroProject.liveUrl} target="_blank">
                      <span>Live Monitor</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </Button>
                )}

                {heroProject.githubUrl && (
                  <Button
                    variant="outline"
                    className="rounded-full border-white/[0.12] bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-white/[0.25] transition-colors h-10 px-5 gap-2 text-xs"
                    asChild
                  >
                    <Link href={heroProject.githubUrl} target="_blank">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Side-by-Side Bento Cards (Pawradise & Anesthelink) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {secondaryProjects.map((project, idx) => {
          const imgUrl = getImageUrl(project.image);

          return (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              className="spotlight-card glow-card rounded-3xl border border-white/[0.08] bg-[#0F1117] overflow-hidden group flex flex-col justify-between transition-all duration-300"
            >
              {/* Card Top Chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-sky-400">&gt;_</span>
                  <span className="text-slate-300 font-medium">
                    case_0{idx + 2} • {project.id}.tsx
                  </span>
                </div>

                <div>
                  {project.isPrivate ? (
                    <span className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Enterprise NDA</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Production SaaS</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Thumbnail */}
              <div className="relative h-56 sm:h-64 bg-[#08090D] overflow-hidden border-b border-white/[0.06]">
                <Link
                  href={project.liveUrl || project.githubUrl || "#"}
                  target="_blank"
                  className="block relative w-full h-full overflow-hidden"
                >
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                      [ Interactive Demo ]
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent opacity-80 pointer-events-none" />
                </Link>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5 relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border border-sky-500/20 bg-sky-500/10 text-sky-300">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-slate-400">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-3">
                    {project.problem}
                  </p>

                  {project.solution && (
                    <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[11px] text-slate-300 font-mono flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{project.solution}</span>
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-500 bg-white/[0.01] border border-white/[0.04]">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-white transition-colors group/link"
                    >
                      <span>Explore Production App</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">
                      Internal Enterprise App
                    </span>
                  )}

                  {!project.isPrivate && project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Aesthetic Terminal Archive CTA Banner */}
      <div
        onMouseMove={handleMouseMove}
        className="spotlight-card glow-card rounded-2xl border border-white/[0.1] bg-gradient-to-r from-[#0F1117] via-[#141824] to-[#0F1117] p-7 sm:p-9 relative overflow-hidden transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white font-medium">
                cd ~/projects &amp;&amp; ls -la --all
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Want to see all projects and architectures?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-normal">
              Browse the complete portfolio archive featuring e-commerce
              pipelines, tournament bracket engines, and open-source packages.
            </p>
          </div>

          <Button
            className="rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 h-11 px-6 gap-2 text-xs shadow-[0_4px_20px_rgba(255,255,255,0.18)] shrink-0 group cursor-pointer"
            asChild
          >
            <Link href="/projects">
              <Layers className="w-4 h-4 text-black" />
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
