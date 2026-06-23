// src/components/projects/ProjectCard.tsx

"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
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

  // Helper for Google Drive direct image link
  const getImageUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const finalImageSrc = coverImage ? getImageUrl(coverImage) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative w-full h-[550px] bg-[#09090b] rounded-[32px] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col hover:shadow-[0_0_80px_-20px_rgba(255,255,255,0.15)]"
    >
      {/* TOP SECTION: IMAGE PRESENTATION */}
      <div className="relative w-full h-[55%] flex items-center justify-center bg-[#121214] overflow-hidden">
        {/* Subtle Dot Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.15] transition-opacity duration-500 group-hover:opacity-[0.3]"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        {/* Project Type Badge (Floating) */}
        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
          {project.type}
        </div>

        {/* External Links (Floating Top Right) */}
        <div className="absolute top-6 right-6 z-20 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          {!project.isPrivate && project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <Github className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Image container styled as a browser window */}
        {finalImageSrc && (
          <div className="relative w-[85%] h-[95%] mt-12 rounded-t-2xl overflow-hidden border-t border-l border-r border-white/10 shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-700 ease-out z-10 bg-[#09090b]">
            {/* Fake Browser Header */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-1.5 z-20 backdrop-blur-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            </div>
            {/* The Image */}
            <div className="relative w-full h-full pt-8">
              <Image
                src={finalImageSrc}
                alt={project.title || "project"}
                fill
                quality={100}
                className="object-cover object-top"
              />
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: CONTENT */}
      <div className="relative w-full h-[45%] bg-[#09090b] p-8 flex flex-col justify-between z-20 border-t border-white/5">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[#a1a1aa] text-sm md:text-base font-light leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        <div className="flex items-end justify-between w-full mt-4">
          {/* Tech Stack List */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pr-4">
            {project.tech?.slice(0, 3).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-emerald-400 transition-colors duration-500"></span>
                <span className="text-[11px] text-[#a1a1aa] tracking-[0.15em] font-medium uppercase">{t}</span>
              </div>
            ))}
            {project.tech && project.tech.length > 3 && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-emerald-400 transition-colors duration-500"></span>
                <span className="text-[11px] text-[#a1a1aa] tracking-[0.15em] font-medium uppercase">+{project.tech.length - 3}</span>
              </div>
            )}
          </div>

          {/* View Details Circular Button */}
          <Link
            href={`/projects/${project.id}`}
            className="shrink-0 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-emerald-400 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            aria-label="View Project Details"
          >
            <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
