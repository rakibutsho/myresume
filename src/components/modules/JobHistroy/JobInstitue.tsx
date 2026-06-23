"use client";

import VerifiedBadge from "@/components/common/VerifiedBadge";
import { jobs } from "@/data/job";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
    <div ref={containerRef} className="relative max-w-[1000px] mx-auto mt-12">
      
      {/* Central Glowing Timeline Line */}
      <div className="absolute left-[28px] md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />

      <div className="space-y-12">
        {jobs.map((job, index) => (
          <div key={job.id} data-timeline-item className="relative flex items-start gap-6 md:gap-10 group">
            
            {/* Timeline Node & Logo Container */}
            <div className="relative shrink-0 flex flex-col items-center">
              {/* Outer Glow Ring */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-[1.25rem] bg-[#09090b] shadow-inner border border-white/10 flex items-center justify-center z-10 overflow-hidden group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500 group-hover:scale-110">
                <Image
                  src={job.logo}
                  alt={`${job.companyName} logo`}
                  className="w-10 h-10 md:w-14 md:h-14 object-contain"
                />
              </div>
              {/* Connection Dot */}
              <div className="absolute top-[70px] md:top-[90px] w-3 h-3 rounded-full bg-[#09090b] border-2 border-emerald-500/50 z-10 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#10b981] transition-all duration-300" />
            </div>

            {/* Experience Card */}
            <div className="flex-1 mt-2">
              <div className="
                p-8 md:p-10 rounded-[2rem] 
                bg-[#121214] border border-white/5 
                shadow-2xl 
                hover:border-white/10 
                transition-all duration-500 relative overflow-hidden
              ">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
                
                {/* Header (Role & Timeline) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                  <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2 mb-2">
                      {job.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-medium tracking-wide">
                        {job.companyName}
                      </span>
                      <VerifiedBadge className="h-4 w-4 text-emerald-500/60" />
                    </div>
                  </div>
                  
                  {/* Timeline Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09090b] border border-white/5 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                    <span className="text-xs font-mono font-medium text-[#a1a1aa] tracking-widest uppercase">
                      {job.timeline}
                    </span>
                  </div>
                </div>

                {/* Badges (Type & Stack) */}
                <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b border-white/5 relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                    {job.type}
                  </span>
                  {job.stack?.map((item: string) => (
                    <span
                      key={item}
                      className="text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-4 relative z-10">
                  {job.highlights?.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-[#a1a1aa] leading-relaxed text-sm md:text-base font-light">
                      <span className="text-emerald-500 mt-1 shrink-0">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default JobInstitute;
