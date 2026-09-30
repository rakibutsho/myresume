"use client";
import React, { useRef, useSyncExternalStore } from "react";
import { projects } from "@/data/project";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import { ProjectsFilesystem } from "./ProjectsFilesystem";
import { BlurText } from "@/components/common/BlurText";
import { Terminal as TerminalIcon, LayoutGrid, ListTree } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProjectViewMode } from "@/redux/features/ui/uiSlice";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export default function ProjectsSection() {
  const dispatch = useAppDispatch();
  const projectViewMode = useAppSelector((state) => state.ui.projectViewMode);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isFilesystem = mounted && projectViewMode === "filesystem";

  return (
    <section
      id="projects"
      ref={ref}
      className="w-full py-24 px-4 sm:px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-2 hover:bg-white/[0.05] transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-pulse" />
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
                ls ~/projects --interactive
              </span>
            </div>

            <BlurText
              text="Selected Software Engineering Projects"
              highlightWords={["Engineering", "Projects"]}
              highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 font-bold"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              as="h2"
            />

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
              Featured production platforms and open-source engines engineered
              for reliability, responsiveness, and clean maintainability.
            </p>
          </motion.div>

          {/* View Mode Toggle Switcher - Premium Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex items-center p-1.5 rounded-2xl border border-white/[0.08] bg-[#0A0C10]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] shrink-0 self-start md:self-auto font-mono text-xs relative overflow-hidden group"
          >
            {/* Subtle highlight gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <button
              type="button"
              onClick={() => dispatch(setProjectViewMode("bento"))}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden",
                !isFilesystem
                  ? "text-white font-medium bg-white/[0.06] shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/[0.08]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent"
              )}
            >
              <LayoutGrid className={cn("w-4 h-4 transition-colors duration-300", !isFilesystem ? "text-sky-400" : "text-slate-500")} />
              <span>Bento Grid</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(setProjectViewMode("filesystem"))}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden",
                isFilesystem
                  ? "text-emerald-300 font-medium bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent"
              )}
            >
              <ListTree className={cn("w-4 h-4 transition-colors duration-300", isFilesystem ? "text-emerald-400" : "text-slate-500")} />
              <span>Filesystem</span>
            </button>
          </motion.div>
        </div>

        {/* Dynamic Project Presentation */}
        <AnimatePresence mode="wait">
          {isFilesystem ? (
            <motion.div
              key="filesystem-view"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectsFilesystem projects={projects} />
            </motion.div>
          ) : (
            <motion.div
              key="bento-view"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FeaturedProjectsGrid projects={projects} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
