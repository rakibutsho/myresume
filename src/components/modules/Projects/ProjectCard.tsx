// src/components/projects/ProjectCard.tsx

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Project } from "@/data/project";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <div data-project-card className="h-full">
      <Card
        className="
          h-full overflow-hidden text-white
          bg-white/10 backdrop-blur-md
          border border-white/10
          rounded-2xl
          shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
          transition duration-300
          hover:bg-white/15
        "
      >
        {project.image ? (
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>
        ) : null}

        <div className="p-5 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-semibold leading-tight">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-white/75">{project.subtitle}</p>

            <span className="inline-flex mt-3 text-xs px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200">
              {project.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90"
              >
                {t}
              </span>
            ))}
          </div>

          <ul className="list-disc pl-5 space-y-2 text-sm text-white/80 leading-relaxed">
            {project.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition"
              >
                Live
              </Link>
            ) : null}

            {project.isPrivate ? (
              <span className="text-sm px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-red-200">
                Private
              </span>
            ) : project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition"
              >
                GitHub
              </Link>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
