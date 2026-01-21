/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { jobs } from "@/data/job";
import Image from "next/image";
import gsap from "gsap";
import VerifiedBadge from "@/components/common/VerifiedBadge";

function JobInstitue() {
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
  }, []);

  return (
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
              bg-white/10 backdrop-blur-md
              border border-white/10
              rounded-2xl
              px-5 py-5
              shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
              transition-colors duration-300
              hover:bg-white/15
            "
          >
            {/* Top */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border border-white/15 bg-white">
                <Image
                  src={job.logo}
                  alt={`${job.companyName} logo`}
                  fill
                  className="object-contain p-1"
                  sizes="56px"
                />
              </div>

              <div className="min-w-0">
                <h4 className="flex items-center gap-2 text-xl font-semibold leading-tight truncate">
                  {job.companyName}

                  <span className="inline-flex items-center justify-center rounded-full bg-blue-800 ">
                    <VerifiedBadge className="h-4 w-4 text-white" />
                  </span>
                </h4>

                <p className="truncate text-sm text-white/80">{job.position}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-white/70">{job.timeline}</span>

              <span
                className="
                  text-xs text-white/85
                  px-3 py-1 rounded-full
                  bg-white/10 border border-white/10
                "
              >
                {job.type}
              </span>
            </div>

            {/* Divider */}
            {/* <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" /> */}

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/80">
              {job.description}
            </p>

            {/* Bottom accent */}
            {/* <div className="pointer-events-none mt-6 h-10 w-full rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0" /> */}
          </Card>
        </div>
      ))}
    </div>
  );
}

export default JobInstitue;
