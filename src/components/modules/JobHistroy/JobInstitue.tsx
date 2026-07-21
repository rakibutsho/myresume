"use client";

import { jobs } from "@/data/job";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function JobInstitute() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll("[data-timeline-item]");
      if (!items) return;

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1000px] mx-auto mt-12 space-y-8">
      {jobs.map((job) => {
        const isCurrent = job.timeline.toLowerCase().includes("present");

        return (
          <div 
            key={job.id} 
            data-timeline-item 
            className="group relative rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 p-8 md:p-10 transition-all hover:border-emerald-500/30 hover:bg-white/5 shadow-xl"
          >
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              
              <div className="space-y-2">
                {/* Role */}
                <h3 className="text-2xl md:text-3xl font-serif italic text-white tracking-tight">
                  {job.position}
                </h3>
                
                {/* Company & Type */}
                <div className="flex items-center gap-2 text-[15px] font-mono">
                  <span className="text-emerald-400 font-medium">{job.companyName}</span>
                  <span className="text-[#a1a1aa]">•</span>
                  <span className="text-[#a1a1aa]">{job.type || "Remote"}</span>
                </div>
                
                {/* Timeline */}
                <div className="text-xs font-mono text-[#a1a1aa] uppercase tracking-widest pt-1">
                  {job.timeline}
                </div>
              </div>

              {/* Status Pill */}
              {isCurrent && (
                <div className="hidden md:inline-flex px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-widest self-start">
                  current
                </div>
              )}
            </div>

            {/* Highlights List */}
            <ul className="space-y-4 mb-8">
              {job.highlights?.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-[#a1a1aa] leading-relaxed text-[15px]">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Stack Pills */}
            {job.stack && job.stack.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/5">
                {job.stack.map((item: string) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-md bg-[#18181a] border border-white/5 text-[#a1a1aa] text-[11px] font-mono font-medium transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default JobInstitute;
