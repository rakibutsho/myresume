"use client";
import React, { useState, useEffect } from "react";
import { projects } from "@/data/project";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import { ProjectsFilesystem } from "./ProjectsFilesystem";
import { BlurText } from "@/components/common/BlurText";
import { Terminal as TerminalIcon, LayoutGrid, ListTree } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProjectViewMode } from "@/redux/features/ui/uiSlice";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectsSection() {
  const dispatch = useAppDispatch();
  const projectViewMode = useAppSelector((state) => state.ui.projectViewMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFilesystem = mounted && projectViewMode === "filesystem";

  return (
    <section
      id="projects"
      className="w-full py-24 px-4 sm:px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>$ ls ~/projects --interactive</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">flagship.systems</span>
            </div>

            <BlurText
              text="Selected Software Engineering Projects"
              highlightWords={["Engineering", "Projects"]}
              highlightClass="text-shimmer"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
              as="h2"
            />

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
              Featured production platforms and open-source engines engineered
              for reliability, responsiveness, and clean maintainability.
            </p>
          </div>

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center p-1 rounded-xl border border-white/[0.08] bg-[#0A0D14]/90 backdrop-blur-md shrink-0 self-start md:self-auto font-mono text-xs">
            <button
              type="button"
              onClick={() => dispatch(setProjectViewMode("bento"))}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isFilesystem
                  ? "bg-white/[0.08] text-white font-semibold shadow-sm border border-white/[0.06]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
              <span>Bento Grid</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(setProjectViewMode("filesystem"))}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isFilesystem
                  ? "bg-emerald-500/15 text-emerald-300 font-semibold shadow-sm border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ListTree className="w-3.5 h-3.5 text-emerald-400" />
              <span>Filesystem (ls -la)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Presentation */}
        <AnimatePresence mode="wait">
          {isFilesystem ? (
            <motion.div
              key="filesystem-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectsFilesystem projects={projects} />
            </motion.div>
          ) : (
            <motion.div
              key="bento-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <FeaturedProjectsGrid projects={projects} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
