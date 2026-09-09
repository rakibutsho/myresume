"use client";

import { education } from "@/data/education";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Institute() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-edu-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-6">
      {education.map((insti) => (
        <Card
          key={insti.id}
          data-edu-card
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-accent/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center p-3">
            <Image
              src={insti.logo}
              alt={insti.institute}
              width={52}
              height={52}
              className="object-contain w-12 h-12 opacity-85 group-hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                {insti.institute}
              </h3>
              <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                {insti.timeline}
              </span>
            </div>
            <p className="text-sm font-semibold text-accent">
              {insti.degree}
            </p>
            <p className="text-sm text-fg-muted font-normal">
              {insti.subject}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
