// src/components/modules/Projects/ProjectCard.tsx

"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "motion/react";

type Props = { project: Project; index: number };

export default function ProjectCard({ project, index }: Props) {
  if (!project) return null;

  // Extract cover image
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
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const finalImageSrc = coverImage ? getImageUrl(coverImage) : "";
  const formattedIndex = (index + 1).toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative w-full flex flex-col lg:flex-row gap-8 lg:gap-16 p-8 md:p-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:border-emerald-500/30 hover:bg-white/5 transition-all shadow-xl"
    >
      
      {/* LEFT: DETAILS */}
      <div className="flex-1 flex gap-6 lg:gap-8 relative z-10">
        
        {/* Number */}
        <div className="text-4xl lg:text-5xl font-serif italic text-white/20 font-bold shrink-0 pt-2">
          {formattedIndex}
        </div>
        
        {/* Content */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
            <h3 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">
              {project.title}
            </h3>
            <span className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-semibold">
              {project.subtitle}
            </span>
          </div>

          <div className="text-[#a1a1aa] font-mono text-xs uppercase tracking-widest mb-6">
            {project.type}
          </div>

          {/* Description */}
          <p className="text-[#a1a1aa] text-[15px] leading-relaxed mb-4">
            {project.problem}
          </p>

          {/* Awards or Highlight text */}
          {project.solution && project.solution.includes("🏅") ? (
            <div className="text-emerald-400 font-mono text-[11px] uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
              {project.solution}
            </div>
          ) : project.solution ? (
            <p className="text-[#a1a1aa] text-[15px] leading-relaxed mb-6">
              {project.solution}
            </p>
          ) : <div className="mb-2" />}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-mono text-[#a1a1aa] bg-[#121214] border border-white/5 rounded-md hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-auto">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors group/btn"
              >
                Live <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            )}
            {!project.isPrivate && project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors group/btn"
              >
                Code <Github className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="flex-1 w-full lg:max-w-[55%] relative flex items-center justify-center">
        {finalImageSrc ? (
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#09090b] group-hover:border-white/20 transition-colors duration-500">
            {/* Browser Header */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-1.5 z-20 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            {/* Image */}
            <div className="relative w-full h-full pt-8">
              <Image
                src={finalImageSrc}
                alt={project.title}
                fill
                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </div>
        ) : (
          <div className="w-full aspect-[4/3] rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 font-mono text-sm">
            No Image Available
          </div>
        )}
      </div>

    </motion.div>
  );
}
