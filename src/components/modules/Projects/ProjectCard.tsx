// src/components/modules/Projects/ProjectCard.tsx

"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Github, ExternalLink } from "lucide-react";

type Props = { project: Project; index: number };

export default function ProjectCard({ project, index }: Props) {
  if (!project) return null;

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
    <div data-project-card className="w-full relative group perspective-1000">
      {/* Outer Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2C74B3] to-[#144272] rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative w-full flex flex-col bg-[#0A2647]/80 backdrop-blur-md rounded-xl overflow-hidden border border-[#205295]/50 shadow-[0_8px_32px_rgba(10,38,71,0.5)] transition-all duration-500 hover:border-[#2C74B3]/50 hover:shadow-[0_8px_40px_rgba(44,116,179,0.3)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#205295]/50 bg-gradient-to-r from-[#144272]/50 to-[#0A2647]/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <span className="text-[#8B9BB4] font-mono text-[12px] tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
              bash - exec {project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.sh
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} w-full`}>
          
          {/* Image Side */}
          <div className="flex-[1.1] w-full relative p-4 lg:p-6 border-b lg:border-b-0 border-[#205295]/30">
            <Link
              href={project.liveUrl || project.githubUrl || "#"}
              target="_blank"
              className="block relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#071626] border border-[#144272]/50 shadow-inner group/image"
            >
              {finalImageSrc ? (
                <>
                  <Image
                    src={finalImageSrc}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover/image:opacity-100 group-hover/image:scale-[1.03] transition-all duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* CRT Scanline Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-40 mix-blend-overlay group-hover/image:opacity-80 transition-opacity duration-500" />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(10,38,71,0.8)]" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#4A6274] font-mono text-sm">
                  [ No Image Rendered ]
                </div>
              )}
            </Link>
          </div>

          {/* Text Side */}
          <div className="flex-[1] flex flex-col items-start text-left p-6 lg:p-8 justify-center border-l border-transparent lg:border-[#205295]/30">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#60A8E0] font-mono font-bold text-[11px] uppercase tracking-[0.2em] px-2 py-1 bg-[#144272]/30 rounded-sm border border-[#205295]/40 shadow-[0_0_10px_rgba(20,66,114,0.3)]">
                {project.type || "Full Stack"}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-[#60A8E0] transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-[#8B9BB4] text-[14px] lg:text-[15px] font-sans leading-relaxed mb-6">
              {project.problem || project.subtitle}
            </p>

            {/* Terminal output for Tech Stack */}
            <div className="w-full bg-[#071626]/80 rounded-md p-4 mb-8 border border-[#144272]/50 font-mono text-[12px] shadow-inner">
              <div className="text-[#205295] mb-2">$ cat dependencies.json</div>
              <div className="flex flex-wrap items-center gap-1.5 leading-loose">
                <span className="text-[#8B9BB4] mr-1">[</span>
                {project.tech?.map((t, i) => (
                  <span key={t} className="flex items-center">
                    <span className="text-[#60A8E0]">"{t}"</span>
                    {i < project.tech!.length - 1 && <span className="text-[#8B9BB4] mr-1">,</span>}
                  </span>
                ))}
                <span className="text-[#8B9BB4] ml-1">]</span>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 mt-auto">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#2C74B3] hover:bg-[#144272] text-white font-mono text-[13px] transition-all border border-[#60A8E0]/30 shadow-[0_0_15px_rgba(44,116,179,0.3)] hover:shadow-[0_0_20px_rgba(44,116,179,0.6)] group/btn"
                >
                  <ExternalLink className="w-4 h-4" /> Live App
                </Link>
              )}
              {!project.isPrivate && project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#0A2647] hover:bg-[#144272]/50 text-[#8B9BB4] hover:text-white font-mono text-[13px] transition-all border border-[#205295]/50 hover:border-[#60A8E0]/30 group/btn"
                >
                  <Github className="w-4 h-4" /> Source Code
                </Link>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
