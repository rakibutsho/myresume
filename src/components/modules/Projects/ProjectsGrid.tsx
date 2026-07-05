/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/project";
import ProjectCard from "./ProjectCard";

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
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform",
        },
      );

      // Hover micro interaction (smooth & non-stacking)
      const enter = (el: HTMLElement) =>
        gsap.to(el, {
          y: -6,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

      const leave = (el: HTMLElement) =>
        gsap.to(el, {
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

      cards.forEach((el) => {
        const onEnter = () => enter(el);
        const onLeave = () => leave(el);

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        // store for cleanup
        (el as any).__onEnter = onEnter;
        (el as any).__onLeave = onLeave;
      });

      return () => {
        cards.forEach((el) => {
          el.removeEventListener("mouseenter", (el as any).__onEnter);
          el.removeEventListener("mouseleave", (el as any).__onLeave);
        });
      };
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flex flex-col gap-12 w-full max-w-[1200px] mx-auto"
    >
      {projects.map((p, index) => (
        <ProjectCard key={p.id} project={p} index={index} />
      ))}
    </div>
  );
}
