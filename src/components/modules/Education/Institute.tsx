"use client";

import { education } from "@/data/education";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitCommit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Institute = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-edu-card]");
      const dots = el.querySelectorAll<HTMLElement>("[data-edu-dot]");

      // Animate the central line drawing downwards
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      }

      // Animate cards popping in
      cards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? -50 : 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate dots glowing
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-10 mt-10">
      
      {/* Central Timeline Line */}
      <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1E3A5F]/50 -translate-x-1/2">
        <div 
          ref={lineRef}
          className="w-full h-full bg-gradient-to-b from-[#60A8E0] via-[#2C74B3] to-transparent origin-top shadow-[0_0_15px_rgba(44,116,179,0.8)]"
        />
      </div>

      <div className="flex flex-col gap-12 md:gap-20 relative">
        {education.map((insti, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={insti.id} 
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? "md:justify-start" : "md:justify-end"}`}
            >
              
              {/* Timeline Dot */}
              <div 
                data-edu-dot
                className="absolute left-[38px] md:left-1/2 -translate-x-1/2 mt-6 md:mt-0 w-10 h-10 rounded-full bg-[#0A2647] border-2 border-[#60A8E0] shadow-[0_0_20px_rgba(96,168,224,0.4)] flex items-center justify-center z-20"
              >
                <GitCommit className="w-5 h-5 text-[#60A8E0]" />
              </div>

              {/* Card Container */}
              <div 
                data-edu-card
                className={`w-full md:w-[45%] pl-24 md:pl-0 ${isEven ? "md:pr-16" : "md:pl-16"} z-10`}
              >
                <div className="group relative rounded-xl bg-[#0A2647]/60 backdrop-blur-md border border-[#205295]/50 p-6 sm:p-8 transition-all hover:bg-[#144272]/30 hover:border-[#60A8E0]/40 flex flex-col hover:shadow-[0_0_30px_rgba(44,116,179,0.2)]">
                  
                  {/* Subtle scanline on hover */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl mix-blend-overlay" />
                  
                  {/* Header: Logo and Timestamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-lg bg-[#071626] border border-[#1E3A5F] flex items-center justify-center overflow-hidden p-2 shadow-inner shrink-0">
                      <Image
                        src={insti.logo}
                        alt={insti.institute}
                        fill
                        className="object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#071626]/80 border border-[#205295]/40 self-start sm:self-auto">
                      <span className="text-[#205295] font-mono text-[11px] font-bold">TS:</span>
                      <span className="text-[#60A8E0] font-mono text-[12px]">{insti.timeline}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <h3 className="text-white font-serif font-bold text-xl md:text-2xl tracking-wide mb-2 leading-tight group-hover:text-[#60A8E0] transition-colors">
                      {insti.institute}
                    </h3>

                    <div className="flex flex-col gap-3 mt-2 border-l-2 border-[#205295]/30 pl-4 py-1">
                      <h4 className="text-[#8B9BB4] font-mono font-medium text-[13px] uppercase tracking-wider">
                        <span className="text-[#205295] mr-2">›</span> {insti.degree}
                      </h4>
                      <p className="text-[#60A8E0]/80 text-[14px] font-sans leading-relaxed">
                        {insti.subject}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Institute;
