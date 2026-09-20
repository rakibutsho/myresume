"use client";

import { useState, useMemo } from "react";
import { Project } from "@/data/project";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, Code, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  projects: Project[];
};

const CATEGORIES = [
  { id: "all",         label: "All Projects",  icon: Layers   },
  { id: "fullstack",   label: "Full-Stack",    icon: Sparkles },
  { id: "opensource",  label: "Open-Source",   icon: Code     },
  { id: "frontend",    label: "Frontend",      icon: Globe    },
];

export default function ProjectsGrid({ projects }: Props) {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    if (activeTab === "fullstack") {
      return projects.filter((p) => p.type.toLowerCase().includes("full stack") || p.type.toLowerCase().includes("full-stack"));
    }
    if (activeTab === "opensource") {
      return projects.filter((p) => !p.isPrivate);
    }
    if (activeTab === "frontend") {
      return projects.filter((p) => p.type.toLowerCase().includes("frontend"));
    }
    return projects;
  }, [projects, activeTab]);

  return (
    <div className="space-y-10">
      
      {/* Category Filter Pills with Smooth Sliding Layout Motion */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] w-fit backdrop-blur-md">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setVisibleCount(6);
              }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer select-none ${
                isActive ? "text-black" : "text-slate-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects List with Stagger & Layout Transition */}
      <motion.div layout className="flex flex-col gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.slice(0, visibleCount).map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More Trigger */}
      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="rounded-full border-white/[0.1] bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-slate-200 text-xs font-medium h-10 px-6"
          >
            Show more projects ({filteredProjects.length - visibleCount} remaining)
          </Button>
        </div>
      )}

    </div>
  );
}
