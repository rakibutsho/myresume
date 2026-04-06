// src/components/projects/ProjectCard.tsx

import { Card } from "@/components/ui/card";
import { Project } from "@/data/project";
import Image from "next/image";
import Link from "next/link";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  if (!project) return null;

  return (
    <div data-project-card className="h-full">
      <Card
        className="
          h-full flex flex-col overflow-hidden text-white
          bg-white/8 backdrop-blur-md
          border border-white/10
          shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
          transition duration-300
          hover:bg-white/12
        "
      >
        {project.image && (
          <div className="relative w-full h-62.5 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title || "project"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-fill transition duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* ✅ Content */}
        <div className="p-5 flex flex-col grow gap-4">
          <div>
            <h3 className="text-xl font-semibold leading-tight">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-white/75">{project.subtitle}</p>

            <span className="inline-flex mt-3 text-xs px-3 py-1 rounded-full bg-cyan-300/15 border border-cyan-300/35 text-cyan-200">
              {project.type}
            </span>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-cyan-200/85 mb-1">
                Problem
              </p>
              <p>{project.problem}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-cyan-200/85 mb-1">
                Solution
              </p>
              <p>{project.solution}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-cyan-200/85 mb-1">
                Results
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                {project.results?.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Buttons (ALWAYS SAME POSITION) */}
          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-4 py-2 rounded-xl bg-cyan-300 text-slate-900 font-semibold hover:bg-cyan-200 transition"
              >
                Live Product
              </Link>
            )}

            {project.isPrivate ? (
              <span className="text-sm px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-red-200">
                Private
              </span>
            ) : (
              project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition"
                >
                  Source Code
                </Link>
              )
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
