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
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface FeaturedProjectsGridProps {
  projects: Project[];
}

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  // Select the top 3 flagship projects
  const topProjects = projects.slice(0, 3);
  const heroProject = topProjects[0]; // SpiderNode
  const secondaryProjects = topProjects.slice(1); // Pawradise, Anesthelink

  const getImageUrl = (url?: string | Record<string, unknown>[]) => {
    if (!url) return null;
    let raw = "";
    if (Array.isArray(url)) {
      const coverObj = url.find((img) => typeof img.cover === "string");
      if (coverObj && typeof coverObj.cover === "string") {
        raw = coverObj.cover;
      } else if (url[0] && typeof url[0].responsive === "string") {
        raw = url[0].responsive;
      }
    } else if (typeof url === "string") {
      raw = url;
    }
    if (!raw) return null;
    if (raw.startsWith("/")) return raw;
    const match = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1])
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return raw;
  };

  const heroImageUrl = heroProject ? getImageUrl(heroProject.image) : null;

  return (
    <div className="space-y-10">
      {/* 1. Flagship Hero Bento Card (SpiderNode) */}
      {heroProject && (
        <SpotlightCard>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Production</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-sky-400">&gt;_</span>
              <span className="text-slate-300 tracking-tight">
                flagship_01 • {heroProject.id}.ts
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Dual-Cron Engine</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
            {/* Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-[#030407] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.05] group/image">
              <Link
                href={heroProject.liveUrl || heroProject.githubUrl || "#"}
                target="_blank"
                className="block relative w-full h-full overflow-hidden"
              >
                {heroImageUrl ? (
                  <Image
                    src={heroImageUrl}
                    alt={heroProject.title}
                    fill
                    className="object-cover object-top opacity-80 group-hover/image:opacity-100 group-hover/image:scale-105 transition-all duration-1000 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    [ Flagship Showcase ]
                  </div>
                )}

                {/* Elegant Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-transparent to-transparent opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#05060A]/80 via-transparent to-transparent opacity-90 pointer-events-none lg:block hidden" />

                {/* Floating Preview Pill */}
                <div className="absolute bottom-6 left-6 right-6 lg:right-auto p-4 rounded-2xl border border-white/[0.08] bg-[#0A0C10]/60 backdrop-blur-xl flex items-center justify-between text-xs font-mono shadow-[0_8px_30px_rgb(0,0,0,0.2)] transform translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-emerald-400 font-bold">$</span>
                    </div>
                    <span className="text-white font-medium tracking-tight">
                      curl -I https://{heroProject.id}.site
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold ml-6 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    200 OK • 12ms
                  </span>
                </div>
              </Link>
            </div>

            {/* Content & Technical Breakdown (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#05060A]">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border border-sky-500/20 bg-sky-500/10 text-sky-400">
                    {heroProject.type}
                  </span>
                  <span className="text-xs text-emerald-400/80 font-mono flex items-center gap-1.5 bg-emerald-500/5 px-2 py-1 rounded-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Source</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-2 group-hover:from-sky-300 group-hover:to-sky-600 transition-colors duration-500">
                    {heroProject.title}
                  </h3>
                  <p className="text-sm font-medium text-sky-400/80 tracking-wide">
                    {heroProject.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-400 font-normal leading-relaxed">
                  {heroProject.problem}
                </p>

                {heroProject.solution && (
                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] text-sm text-emerald-200/80 leading-relaxed flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{heroProject.solution}</span>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {heroProject.tech.slice(0, 8).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.02] border border-white/[0.05] text-slate-300 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-300 transition-colors shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                  {heroProject.tech.length > 8 && (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-500 bg-transparent border border-dashed border-white/[0.1]">
                      +{heroProject.tech.length - 8} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/[0.05] flex flex-wrap items-center gap-4">
                {heroProject.liveUrl && (
                  <Button
                    className="rounded-xl bg-white text-black font-bold hover:bg-sky-50 hover:text-sky-600 transition-all duration-300 h-12 px-6 gap-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] group/btn relative overflow-hidden"
                    asChild
                  >
                    <Link href={heroProject.liveUrl} target="_blank">
                      <span className="relative z-10">Live Monitor</span>
                      <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite] pointer-events-none" />
                    </Link>
                  </Button>
                )}

                {heroProject.githubUrl && (
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/[0.1] bg-white/[0.01] text-slate-300 hover:bg-white/[0.05] hover:border-white/[0.2] hover:text-white transition-all duration-300 h-12 px-6 gap-2 text-sm"
                    asChild
                  >
                    <Link href={heroProject.githubUrl} target="_blank">
                      <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* 2. Side-by-Side Bento Cards (Pawradise & Anesthelink) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {secondaryProjects.map((project, idx) => {
          const imgUrl = getImageUrl(project.image);

          return (
            <SpotlightCard key={project.id} className="flex flex-col">
              {/* Card Top Chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#05060A]">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-sky-400">&gt;_</span>
                  <span className="text-slate-300 tracking-tight">
                    case_0{idx + 2} • {project.id}.tsx
                  </span>
                </div>

                <div>
                  {project.isPrivate ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-400/90 font-mono bg-amber-500/10 border border-amber-500/20">
                      <Lock className="w-3 h-3" />
                      <span>Enterprise</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SaaS</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Thumbnail */}
              <div className="relative h-64 sm:h-72 bg-[#020305] overflow-hidden border-b border-white/[0.05] group/image">
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
                      className="object-cover object-top opacity-70 group-hover/image:opacity-100 group-hover/image:scale-[1.03] transition-all duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                      [ Interactive Demo ]
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-transparent to-transparent opacity-90 pointer-events-none" />
                </Link>
              </div>

              {/* Body Content */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6 bg-[#05060A] relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border border-sky-500/20 bg-sky-500/5 text-sky-400">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 group-hover/card:from-sky-300 group-hover/card:to-sky-600 transition-colors duration-500">
                    {project.title}
                  </h3>

                  <p className="text-sm font-medium text-sky-400/80">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-slate-400 font-normal leading-relaxed line-clamp-3">
                    {project.problem}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.02] border border-white/[0.05] text-slate-300 hover:border-sky-400/40 hover:text-sky-300 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-500 bg-transparent border border-dashed border-white/[0.1]">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-sky-400 transition-colors group/link"
                    >
                      <span>Explore Production App</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 bg-white/[0.02] px-3 py-1.5 rounded-md border border-white/[0.05]">
                      Internal Enterprise App
                    </span>
                  )}

                  {!project.isPrivate && project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.05]"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* 3. Aesthetic Terminal Archive CTA Banner */}
      <SpotlightCard>
        <div className="p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#05060A] to-[#0A0D15]">
          <div className="absolute top-0 right-0 p-32 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-sm text-slate-400 bg-[#020305] w-fit px-4 py-2 rounded-xl border border-white/[0.05]">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-white font-medium tracking-tight">
                  cd ~/projects &amp;&amp; ls -la --all
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
                Want to see all projects and architectures?
              </h4>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
                Browse the complete portfolio archive featuring e-commerce
                pipelines, tournament bracket engines, and open-source packages.
              </p>
            </div>

            <Button
              className="rounded-2xl bg-white text-black font-bold hover:bg-sky-50 transition-all duration-300 h-14 px-8 gap-3 text-sm shadow-[0_8px_30px_rgba(255,255,255,0.15)] shrink-0 group hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]"
              asChild
            >
              <Link href="/projects">
                <Layers className="w-5 h-5 text-black" />
                <span>View All Projects ({projects.length})</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

// Spotlight Card Component for Premium Hover Effects
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/[0.05] bg-[#05060A] overflow-hidden group/card shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100 z-50 rounded-3xl"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
