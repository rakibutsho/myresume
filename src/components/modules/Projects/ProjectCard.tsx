"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

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
    if (match && match[1]) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return url;
  };

  const finalImageSrc = coverImage ? getImageUrl(coverImage) : "";
  const isEven = index % 2 === 0;

  return (
    <div
      data-project-card
      className="w-full group"
      style={{
        border: "1px solid #3D3D3D",
        borderRadius: "14px",
        background: "#1E1E1E",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#A6A6A6"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#3D3D3D"; }}
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} w-full`}>

        {/* ── Image side ───────────────────────────────────── */}
        <div className="flex-[1.1] relative" style={{ borderRight: isEven ? "1px solid #3D3D3D" : undefined, borderLeft: !isEven ? "1px solid #3D3D3D" : undefined }}>
          <Link
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            className="block relative w-full h-full min-h-[220px] lg:min-h-[280px] overflow-hidden"
            style={{ background: "#121212" }}
          >
            {finalImageSrc ? (
              <Image
                src={finalImageSrc}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-95 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-mono text-sm"
                style={{ color: "#3D3D3D", minHeight: "220px" }}
              >
                [ No preview ]
              </div>
            )}
          </Link>
        </div>

        {/* ── Text side ────────────────────────────────────── */}
        <div className="flex-[1] flex flex-col p-7 lg:p-10 justify-center">

          {/* Type badge */}
          <span
            className="font-mono text-[11px] uppercase tracking-[0.15em] mb-4 self-start px-2.5 py-1"
            style={{
              color: "#A6A6A6",
              border: "1px solid #3D3D3D",
              borderRadius: "4px",
              fontFamily: "var(--font-roboto)",
            }}
          >
            {project.type || "Full Stack"}
          </span>

          {/* Title */}
          <h3
            className="font-mono font-bold text-white mb-2 leading-tight"
            style={{
              fontFamily: "var(--font-roboto)",
              fontSize: "clamp(22px, 3vw, 32px)",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="font-sans text-[13px] mb-5"
            style={{ color: "#A6A6A6" }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            className="font-sans text-[14px] leading-[1.75] mb-6"
            style={{ color: "#F5F5F5" }}
          >
            {project.problem || ""}
          </p>

          {/* Tech stack — slash separated */}
          <p
            className="font-mono text-[12px] mb-8"
            style={{ color: "#A6A6A6", fontFamily: "var(--font-roboto)" }}
          >
            {project.tech?.join(" / ")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="pill-btn pill-btn-solid text-[13px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live App
              </Link>
            )}
            {!project.isPrivate && project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="pill-btn pill-btn-outline text-[13px]"
              >
                <Github className="w-3.5 h-3.5" />
                Source
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
