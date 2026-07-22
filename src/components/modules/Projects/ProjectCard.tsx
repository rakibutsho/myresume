// src/components/modules/Projects/ProjectCard.tsx

"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`group w-full flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24 py-10 lg:py-16`}
    >
      
      {/* IMAGE SIDE */}
      <div className="flex-1 w-full relative">
        <Link href={project.liveUrl || project.githubUrl || "#"} target="_blank" className="block relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#111] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
          {finalImageSrc ? (
            <Image
              src={finalImageSrc}
              alt={project.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-sm">
              No Image Available
            </div>
          )}
        </Link>
      </div>

      {/* TEXT SIDE */}
      <div className="flex-1 flex flex-col items-start text-left">
        {/* Subtitle / Timeline */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#a1a1aa] font-medium text-[11px] uppercase tracking-widest">
            {project.type || "Full Stack"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-[1.2]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#a1a1aa] text-[15px] font-medium leading-[1.8] mb-8 max-w-[500px]">
          {project.problem || project.subtitle}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10 max-w-[500px]">
          {project.tech?.map((t, i) => (
            <div key={t} className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-[#a1a1aa]">
                {t}
              </span>
              {i < project.tech!.length - 1 && (
                <span className="text-[#a1a1aa] text-[13px] font-bold">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-6 mt-auto">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
            >
              Live URL <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
          {!project.isPrivate && project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
            >
              GitHub <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
