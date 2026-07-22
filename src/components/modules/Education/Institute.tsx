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
          className="group relative rounded-2xl bg-[#0f0f11] border border-white/5 p-8 transition-all hover:bg-white/5 hover:border-white/10 flex flex-col h-full cursor-pointer"
        >
          {/* Logo */}
          <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden mb-6">
            <Image
              src={insti.logo}
              alt={insti.institute}
              fill
              className="object-contain p-2"
              sizes="56px"
            />
          </div>

          {/* Main Info */}
          <div className="flex flex-col grow">
            <h3 className="text-white font-bold text-[17px] tracking-wide mb-1 leading-snug">
              {insti.institute}
            </h3>
            
            <h4 className="text-emerald-400 font-medium text-[13px] mb-2">
              {insti.degree}
            </h4>
            
            <p className="text-[#a1a1aa] text-[14px] font-medium leading-relaxed mb-6">
              {insti.subject}
            </p>

            {/* Timeline */}
            <div className="text-[13px] text-[#a1a1aa] font-medium mt-auto">
              {insti.timeline}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
