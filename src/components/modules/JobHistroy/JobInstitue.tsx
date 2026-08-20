"use client";

import { jobs } from "@/data/job";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, Briefcase, MapPin, Clock } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

function JobInstitute() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const [activeJob, setActiveJob] = useState<number>(jobs[0].id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger in
      const cards = containerRef.current?.querySelectorAll("[data-job-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.18,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Featured panel slides in from right
      gsap.fromTo(
        ".featured-panel",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const active = jobs.find((j) => j.id === activeJob) ?? jobs[0];
  const isCurrent = active.timeline.toLowerCase().includes("present");

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

      {/* ── Left: Timeline List ─────────────────────────── */}
      <div className="relative w-full lg:w-[340px] shrink-0">
        {/* Vertical line */}
        <div className="timeline-line absolute left-[19px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#2C74B3] via-[#205295] to-transparent origin-top" />

        <div className="space-y-3">
          {jobs.map((job, i) => {
            const isActive  = activeJob === job.id;
            const isCur     = job.timeline.toLowerCase().includes("present");

            return (
              <button
                key={job.id}
                data-job-card
                onClick={() => setActiveJob(job.id)}
                className={`relative w-full text-left pl-12 pr-5 py-5 rounded-xl border transition-all duration-300 cursor-pointer group ${
                  isActive
                    ? "bg-[#144272]/50 border-[#2C74B3]/60 shadow-[0_0_24px_rgba(44,116,179,0.15)]"
                    : "bg-[#0A2647]/30 border-[#1E3A5F] hover:border-[#205295]/60 hover:bg-[#0A2647]/60"
                }`}
              >
                {/* Timeline dot */}
                <span
                  className={`absolute left-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-[#2C74B3] border-[#2C74B3] shadow-[0_0_10px_rgba(44,116,179,0.8)]"
                      : isCur
                      ? "bg-[#2C74B3]/40 border-[#2C74B3]/60"
                      : "bg-[#0A1929] border-[#205295]/50"
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[14px] font-bold truncate transition-colors ${isActive ? "text-white" : "text-[#8B9BB4]"}`}>
                        {job.companyName}
                      </span>
                      {isCur && (
                        <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-[#205295]/30 text-[#2C74B3] text-[9px] font-mono font-bold tracking-widest uppercase border border-[#2C74B3]/30">
                          NOW
                        </span>
                      )}
                    </div>
                    <span className={`text-[12px] font-mono transition-colors ${isActive ? "text-[#2C74B3]" : "text-[#4A6274]"}`}>
                      {job.position}
                    </span>
                    <div className={`text-[11px] font-mono mt-1.5 transition-colors ${isActive ? "text-[#8B9BB4]" : "text-[#4A6274]"}`}>
                      {job.timeline}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-0.5 transition-all duration-300 ${
                      isActive ? "text-[#2C74B3] translate-x-0" : "text-[#4A6274] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right: Featured Detail Panel ──────────────── */}
      <div className="featured-panel flex-1 min-w-0">
        <div className="terminal-window w-full">

          {/* Terminal title bar */}
          <div className="terminal-titlebar">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title ml-2 truncate">
              ~/experience/{active.companyName.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")} $ ls
            </span>
          </div>

          {/* Panel body */}
          <div className="p-6 md:p-8">

            {/* Header row */}
            <div className="flex items-start gap-5 mb-7">
              <div className="w-16 h-16 rounded-xl bg-white/95 border border-[#1E3A5F] flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-lg">
                <Image
                  src={active.logo}
                  alt={active.companyName}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-white font-bold text-xl font-sans">{active.companyName}</h3>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#205295]/25 text-[#2C74B3] text-[10px] font-mono font-bold tracking-widest uppercase border border-[#2C74B3]/40">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="text-[#2C74B3] font-mono font-medium text-[14px] mb-3">{active.position}</p>
                <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono text-[#4A6274]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {active.timeline}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {active.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Terminal output: highlights */}
            <div className="mb-7">
              <div className="font-mono text-[12px] mb-3">
                <span className="terminal-prompt">$ </span>
                <span className="terminal-cmd">cat highlights.md</span>
              </div>
              <ul className="space-y-2.5">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] font-sans text-[#8B9BB4] leading-relaxed">
                    <span className="shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full bg-[#2C74B3]/60" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1E3A5F] mb-6" />

            {/* Tech stack */}
            <div>
              <div className="font-mono text-[12px] mb-3">
                <span className="terminal-prompt">$ </span>
                <span className="terminal-cmd">echo $STACK</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#144272]/60 border border-[#205295]/40 text-[#8B9BB4] text-[11px] font-mono hover:border-[#2C74B3]/60 hover:text-[#2C74B3] transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default JobInstitute;
