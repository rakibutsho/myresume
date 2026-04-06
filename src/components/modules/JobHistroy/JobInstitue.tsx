/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import VerifiedBadge from "@/components/common/VerifiedBadge";
import { Card } from "@/components/ui/card";
import { jobs } from "@/data/job";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

function JobInstitute() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const cards =
      wrapRef.current.querySelectorAll<HTMLElement>("[data-job-card]");
    if (!cards.length) return;

    // entrance animation
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        clearProps: "transform",
      },
    );

    // hover micro-interaction
    const enter = (el: HTMLElement) =>
      gsap.to(el, { y: -6, duration: 0.25, ease: "power2.out" });
    const leave = (el: HTMLElement) =>
      gsap.to(el, { y: 0, duration: 0.25, ease: "power2.out" });

    cards.forEach((el) => {
      const onEnter = () => enter(el);
      const onLeave = () => leave(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      (el as any).__onEnter = onEnter;
      (el as any).__onLeave = onLeave;
    });

    return () => {
      cards.forEach((el) => {
        el.removeEventListener("mouseenter", (el as any).__onEnter);
        el.removeEventListener("mouseleave", (el as any).__onLeave);
      });
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">
          Roles And Impact
        </p>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Scroll-friendly cards with consistent spacing
        </div>
      </div>

      <div
        ref={wrapRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
      >
        {jobs.map((job) => (
          <div key={job.id} className="h-full">
            <Card
              data-job-card
              className="
                h-full text-white overflow-hidden
                bg-white/7 backdrop-blur-md
                border border-cyan-300/15
                rounded-[1.75rem]
                px-5 py-5
                shadow-[0_18px_45px_-22px_rgba(0,0,0,0.7)]
                transition-all duration-300
                hover:bg-white/10 hover:border-cyan-300/30 hover:-translate-y-1
              "
            >
              <div className="mb-5 h-1.5 w-20 rounded-full bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200" />

              {/* Top */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border border-cyan-300/20 bg-white/95 shadow-lg shadow-cyan-950/20">
                  <Image
                    src={job.logo}
                    alt={`${job.companyName} logo`}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="flex items-center gap-2 text-xl font-semibold leading-tight truncate text-wrap">
                    {job.companyName}

                    <span className="inline-flex items-center justify-center rounded-full bg-cyan-300/20 border border-cyan-300/30 p-0.5">
                      <VerifiedBadge className="h-4 w-4 text-cyan-200" />
                    </span>
                  </h4>

                  <p className="truncate text-sm text-white/80">
                    {job.position}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-white/70">{job.timeline}</span>

                <span
                  className="
                    text-xs text-cyan-100
                    px-3 py-1 rounded-full
                    bg-cyan-300/10 border border-cyan-300/30
                  "
                >
                  {job.type}
                </span>
              </div>

              {/* Stack Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack?.map((item: string) => (
                  <span
                    key={item}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-cyan-300/25 bg-cyan-300/8 text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Impact Highlights */}
              <ul className="mt-5 list-disc pl-5 space-y-2 text-sm leading-relaxed text-white/80">
                {job.highlights?.map((point: string) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobInstitute;
