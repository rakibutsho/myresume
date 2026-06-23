"use client";

import { education } from "@/data/education";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";

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
    <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {education.map((insti) => (
        <div
          key={insti.id}
          data-edu-card
          className="group relative p-8 rounded-[2rem] bg-[#121214] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500 flex flex-col h-full overflow-hidden"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          {/* Subtle ambient light inside the card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

          {/* Top Section: Logo & Timeline */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            {/* 3D Logo Container */}
            <div className="relative w-16 h-16 rounded-[1.25rem] bg-[#09090b] shadow-inner border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500">
              <Image
                src={insti.logo}
                alt={insti.institute}
                fill
                className="object-contain p-2"
                sizes="64px"
              />
            </div>

            {/* Timeline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#09090b] border border-white/5 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <span className="text-[11px] font-mono font-medium text-[#a1a1aa] tracking-widest uppercase">
                {insti.timeline}
              </span>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex flex-col grow relative z-10">
            <h3 className="text-2xl font-bold tracking-tight leading-tight text-white group-hover:text-emerald-400 transition-colors mb-2">
              {insti.institute}
            </h3>
            
            <p className="text-sm text-[#a1a1aa] font-medium mb-8">
              {insti.subject}
            </p>

            {/* Degree Badge at the bottom */}
            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold tracking-wide w-full justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors duration-300">
                <GraduationCap className="w-5 h-5" />
                {insti.degree}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
