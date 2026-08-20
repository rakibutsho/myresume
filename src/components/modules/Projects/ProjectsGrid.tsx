/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/project";
import ProjectCard from "./ProjectCard";
import { TerminalSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  useEffect(() => {
    if (!wrapRef.current) return;

    // Respect reduced motion
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Select only cards that haven't been animated yet
    const cards = wrapRef.current.querySelectorAll<HTMLElement>(
      "[data-project-card]:not([data-animated='true'])",
    );
    if (!cards.length) return;

    if (!reduceMotion) {
      const ctx = gsap.context(() => {
        cards.forEach((card) => {
          // Mark as animated so it doesn't re-animate if state changes
          card.setAttribute("data-animated", "true");

          gsap.fromTo(
            card,
            { opacity: 0, y: 50, rotationX: 10, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", 
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, wrapRef);

      return () => ctx.revert();
    } else {
      // If reduced motion, just mark them as animated to avoid re-processing
      cards.forEach(card => card.setAttribute("data-animated", "true"));
    }
  }, [showAll]);

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto perspective-1000">
      <div ref={wrapRef} className="flex flex-col gap-12 w-full">
        {displayedProjects.map((p, index) => (
          <ProjectCard key={p.id} project={p} index={index} />
        ))}
      </div>

      {!showAll && projects.length > 3 && (
        <div className="mt-20">
          <button
            onClick={() => setShowAll(true)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg bg-[#0A2647]/50 backdrop-blur-md border border-[#205295]/50 hover:bg-[#144272]/50 hover:border-[#60A8E0]/40 transition-all duration-300 shadow-[0_0_20px_rgba(10,38,71,0.5)] hover:shadow-[0_0_30px_rgba(44,116,179,0.4)] overflow-hidden"
          >
            {/* Hover scanline effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#60A8E0]/10 to-transparent -translate-y-full group-hover:animate-scanline" />
            
            <TerminalSquare className="w-5 h-5 text-[#60A8E0]" />
            <span className="font-mono text-sm md:text-base font-bold text-white tracking-widest uppercase">
              Load Archive
            </span>
            <span className="text-[#8B9BB4] font-mono text-xs ml-2">
              [{projects.length - 3} more]
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
