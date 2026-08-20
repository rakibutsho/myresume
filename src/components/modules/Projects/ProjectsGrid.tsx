/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/project";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    // Respect reduced motion
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const cards = wrapRef.current.querySelectorAll<HTMLElement>(
      "[data-project-card]",
    );
    if (!cards.length) return;

    if (!reduceMotion) {
      // Create a ScrollTrigger for each card to animate in as it scrolls into view
      const ctx = gsap.context(() => {
        cards.forEach((card) => {
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
                start: "top 85%", // Trigger when top of card hits 85% of viewport
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, wrapRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flex flex-col gap-12 w-full max-w-[1200px] mx-auto perspective-1000"
    >
      {projects.map((p, index) => (
        <ProjectCard key={p.id} project={p} index={index} />
      ))}
    </div>
  );
}
