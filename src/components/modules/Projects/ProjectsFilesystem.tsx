"use client";

import React, { useState } from "react";
import { Project, ProjectMilestone } from "@/data/project";
import {
  Folder,
  FolderOpen,
  GitCommit,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Terminal,
  Zap,
  Layers,
  Rocket,
  Wrench,
} from "lucide-react";
import { Github } from "@/components/common/Icons";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsFilesystemProps {
  projects: Project[];
}

const MILESTONE_ICONS: Record<
  ProjectMilestone["type"],
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  architecture: {
    icon: Layers,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  feature: {
    icon: Wrench,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  perf: {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  launch: {
    icon: Rocket,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
};

export const ProjectsFilesystem: React.FC<ProjectsFilesystemProps> = ({
  projects,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    projects[0]?.id || null,
  );
  const [filterTag, setFilterTag] = useState<string>("ALL");

  const filteredProjects = projects.filter((p) => {
    if (filterTag === "ALL") return true;
    if (filterTag === "OPEN_SOURCE")
      return p.category === "OPEN SOURCE" || !p.isPrivate;
    if (filterTag === "PRODUCTION") return p.category === "PRODUCTION";
    if (filterTag === "ENTERPRISE") return p.category === "ENTERPRISE";
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0A0D14]/90 backdrop-blur-md overflow-hidden shadow-2xl font-mono text-xs">
      {/* Shell Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-200 font-semibold">Directory Tree:</span>
          <span className="text-emerald-400">~/projects</span>
          <span className="text-slate-600">
            // total {projects.length} entries
          </span>
        </div>

        {/* Directory filter tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["ALL", "OPEN_SOURCE", "ENTERPRISE", "PRODUCTION"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilterTag(tag)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                filterTag === tag
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
            >
              {tag.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Column Headers for larger screens */}
      <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-2.5 border-b border-white/[0.05] text-[11px] text-slate-500 font-semibold tracking-wider uppercase select-none">
        <div className="col-span-2">Permissions</div>
        <div className="col-span-1">Owner</div>
        <div className="col-span-1">Size</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-3">Directory / Project</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Directory rows list */}
      <div className="divide-y divide-white/[0.04]">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;
          const folderName = `${project.id.toLowerCase()}/`;

          return (
            <div key={project.id} className="transition-colors group">
              {/* Row Header / Clickable Item */}
              <div
                onClick={() => toggleExpand(project.id)}
                className={`flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-3 px-4 sm:px-6 py-3 cursor-pointer select-none transition-all duration-200 ${
                  isExpanded
                    ? "bg-white/[0.04] text-white"
                    : "hover:bg-white/[0.02] text-slate-300"
                }`}
              >
                {/* Perms */}
                <div className="hidden md:block col-span-2 text-slate-500">
                  {project.perms || "drwxr-xr-x"}
                </div>

                {/* Owner */}
                <div className="hidden md:block col-span-1 text-slate-400">
                  rakib
                </div>

                {/* Size */}
                <div className="hidden md:block col-span-1 text-amber-400/80">
                  {project.size || "4.8K"}
                </div>

                {/* Date */}
                <div className="hidden md:block col-span-1 text-slate-500">
                  {project.date || "2024"}
                </div>

                {/* Directory Name & Title */}
                <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                  {isExpanded ? (
                    <FolderOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 text-sky-400/80 shrink-0 group-hover:text-emerald-400 transition-colors" />
                  )}
                  <span className="font-semibold text-emerald-300 group-hover:underline underline-offset-4">
                    {folderName}
                  </span>
                  <span className="text-slate-400 font-sans text-xs md:hidden">
                    — {project.title}
                  </span>
                </div>

                {/* Category & Badge */}
                <div className="col-span-12 md:col-span-2 flex items-center gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      project.category === "OPEN SOURCE"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : project.category === "PRODUCTION"
                          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                          : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                    }`}
                  >
                    {project.category || project.type}
                  </span>
                </div>

                {/* Action / Expand indicator */}
                <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-2 text-slate-400">
                  <span className="text-[11px] text-slate-500 md:hidden">
                    {project.perms || "drwxr-xr-x"} | {project.date}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="text-[11px] group-hover:underline">
                      {isExpanded
                        ? "collapse"
                        : "cd " + project.id.toLowerCase()}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* In-place Expansion: Git Commit Milestone Log & Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="border-t border-b border-white/[0.06] bg-[#07090F]/95 px-4 sm:px-8 py-6 space-y-6"
                  >
                    {/* Project Header and Links */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">
                            $ cat README.md
                          </span>
                          <span className="text-slate-600">
                            // {project.subtitle}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-sans text-white mt-1">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-xs font-sans mt-1 max-w-3xl leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-2 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-slate-500 tracking-wider">
                        STACK & DEPENDENCIES:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-[11px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Git Commit Milestones */}
                    {project.milestones && project.milestones.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <GitCommit className="w-4 h-4 text-emerald-400" />
                          <span className="font-semibold text-slate-200">
                            $ git log --oneline --graph --decorate
                          </span>
                          <span className="text-slate-600">
                            // Architecture Milestones
                          </span>
                        </div>

                        <div className="relative pl-6 sm:pl-8 space-y-4 border-l-2 border-slate-800 ml-2 pt-1">
                          {project.milestones.map((milestone, idx) => {
                            const config =
                              MILESTONE_ICONS[milestone.type] ||
                              MILESTONE_ICONS.feature;
                            const Icon = config.icon;

                            return (
                              <div
                                key={milestone.hash}
                                className="relative group/commit"
                              >
                                {/* Commit node bullet */}
                                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#08090D] border-2 border-slate-700 flex items-center justify-center group-hover/commit:border-emerald-400 transition-colors">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                </div>

                                <div className="space-y-1 bg-white/[0.015] p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-amber-400 font-bold tracking-wider">
                                      {milestone.hash}
                                    </span>

                                    <span
                                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${config.bg} ${config.color} border ${config.border}`}
                                    >
                                      <Icon className="w-3 h-3" />
                                      {milestone.type}
                                    </span>

                                    <span className="text-slate-200 font-semibold font-sans">
                                      {milestone.title}
                                    </span>

                                    {milestone.date && (
                                      <span className="text-slate-500 text-[10px] ml-auto">
                                        {milestone.date}
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-slate-400 text-xs font-sans pl-0.5 leading-relaxed">
                                    {milestone.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Directory Footer Status */}
      <div className="flex items-center justify-between px-6 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[11px] text-slate-500">
        <span>Press row or run command to view git commit history</span>
        <span className="text-emerald-400">git branch: main (clean)</span>
      </div>
    </div>
  );
};
