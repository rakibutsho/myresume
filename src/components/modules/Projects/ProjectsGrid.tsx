/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/project";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

type Props = { projects: Project[] };

export default function ProjectsGrid({ projects }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  useEffect(() => {
    if (!wrapRef.current) return;
    const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const cards = wrapRef.current.querySelectorAll<HTMLElement>("[data-project-card]:not([data-animated='true'])");
    if (!cards.length) return;

    if (!reduceMotion) {
      const ctx = gsap.context(() => {
        cards.forEach((card) => {
          card.setAttribute("data-animated", "true");
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });
      }, wrapRef);
      return () => ctx.revert();
    } else {
      cards.forEach((card) => card.setAttribute("data-animated", "true"));
    }
  }, [showAll]);

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto">
      <div ref={wrapRef} className="flex flex-col gap-8 w-full">
        {displayedProjects.map((p, index) => (
          <ProjectCard key={p.id} project={p} index={index} />
        ))}
      </div>

      {!showAll && projects.length > 3 && (
        <div className="mt-14">
          <button
            onClick={() => setShowAll(true)}
            className="pill-btn pill-btn-outline font-mono text-[13px]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Show {projects.length - 3} more projects
            <span style={{ color: "#A6A6A6" }}>↓</span>
          </button>
        </div>
      )}
    </div>
  );
}
