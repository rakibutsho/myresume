"use client";

import { education } from "@/data/education";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Institute = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-edu-card]");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.2)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {education.map((insti) => (
        <div
          key={insti.id}
          data-edu-card
          className="group relative p-8 md:p-10 rounded-4xl bg-[#0f0f11] border border-white/5 shadow-2xl hover:border-white/20 transition-colors duration-500 flex flex-col h-full overflow-hidden"
        >
          
          {/* Top Section: Timeline & Logo */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            {/* Timeline */}
            <div className="text-[10px] font-mono text-[#a1a1aa] uppercase tracking-[0.2em] pt-3">
              {insti.timeline}
            </div>

            {/* Logo */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <Image
                src={insti.logo}
                alt={insti.institute}
                fill
                className="object-contain p-1.5"
                sizes="56px"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="flex flex-col grow relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif italic tracking-tight leading-[1.2] text-white mb-2">
              {insti.degree}
            </h3>
            
            <p className="text-emerald-400 text-[13px] font-mono font-medium mb-8">
              {insti.institute}
            </p>
            
            {((insti as any).CGPA || (insti as any).GPA) && (() => {
              const isCGPA = !!(insti as any).CGPA;
              const scoreStr = isCGPA ? (insti as any).CGPA : (insti as any).GPA;
              const parts = scoreStr.split("out of");
              const mainScore = parts[0]?.trim();
              const subScore = parts.length > 1 ? `/ ${parts[1]?.trim()} ${isCGPA ? "CGPA" : "GPA"}` : "";

              return (
                <div className="mt-auto mb-6 flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-serif italic text-white tracking-tighter">
                    {mainScore}
                  </span>
                  <span className="text-[11px] font-mono text-[#a1a1aa] uppercase tracking-widest">
                    {subScore}
                  </span>
                </div>
              );
            })()}

            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono text-[#a1a1aa] uppercase tracking-widest leading-relaxed">
                {insti.subject}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
