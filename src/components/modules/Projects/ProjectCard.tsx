"use client";

import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="w-full group rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-all duration-300"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} w-full`}>
        
        {/* Preview Frame */}
        <div className="flex-[1.1] relative min-h-[260px] lg:min-h-[340px] bg-background border-b lg:border-b-0 border-border overflow-hidden">
          <Link
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            className="block relative w-full h-full"
          >
            {finalImageSrc ? (
              <Image
                src={finalImageSrc}
                alt={project.title}
                fill
                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-fg-subtle uppercase tracking-widest">
                [ No visual preview ]
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent pointer-events-none" />
          </Link>
        </div>

        {/* Text & Specification Panel */}
        <div className="flex-[1] flex flex-col p-8 lg:p-10 justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xs uppercase tracking-widest text-accent font-bold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                {project.type || "Full-Stack System"}
              </span>
              <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                CASE STUDY
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-fg-muted font-normal leading-relaxed">
              {project.problem || project.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 font-mono text-2xs uppercase tracking-wider text-fg-subtle">
              {project.tech?.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded bg-background border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-border/80 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button
                variant="default"
                size="sm"
                className="rounded-lg text-2xs uppercase tracking-wider font-bold gap-2 h-9 px-4"
                asChild
              >
                <Link href={project.liveUrl} target="_blank">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live App
                </Link>
              </Button>
            )}
            {!project.isPrivate && project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg text-2xs uppercase tracking-wider font-bold gap-2 h-9 px-4 border-border hover:border-foreground"
                asChild
              >
                <Link href={project.githubUrl} target="_blank">
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
