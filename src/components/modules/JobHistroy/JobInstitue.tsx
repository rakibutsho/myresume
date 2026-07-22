"use client";

import { jobs } from "@/data/job";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
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
    <div ref={containerRef} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => {
        const isCurrent = job.timeline.toLowerCase().includes("present");

        return (
          <div 
            key={job.id} 
            data-timeline-item 
            className="group relative rounded-2xl bg-[#0f0f11] border border-white/5 p-8 transition-all hover:bg-white/5 hover:border-white/10 flex flex-col h-full cursor-pointer"
          >
            {/* Top Right Arrow */}
            {/* <div className="absolute top-8 right-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-5 h-5 text-[#a1a1aa] group-hover:text-white transition-colors" />
            </div> */}

            {/* Header section */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shrink-0 overflow-hidden">
                <Image src={job.logo} alt={job.companyName} className="w-full h-full object-contain" />
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-bold text-[17px] tracking-wide">
                    {job.companyName}
                  </h3>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-widest uppercase">
                      CURRENT
                    </span>
                  )}
                </div>
                <h4 className="text-emerald-400 font-medium text-[13px] mt-0.5">{job.position}</h4>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#a1a1aa] text-[15px] leading-[1.7] mb-auto font-medium">
              {job.highlights.slice(0, 2).join(" ")}
            </div>

            {/* Timeline */}
            <div className="text-[13px] text-[#a1a1aa] font-medium mt-10">
              {job.timeline}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobInstitute;
