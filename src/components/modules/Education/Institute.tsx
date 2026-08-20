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
          opacity: 1, y: 0, scale: 1,
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
          className="group relative rounded-2xl bg-[#0A2647]/40 border border-[#1E3A5F] p-8 transition-all hover:bg-[#144272]/20 hover:border-[#2C74B3]/50 flex flex-col h-full cursor-pointer overflow-hidden"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(44,116,179,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#2C74B3] opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Logo */}
          <div className="relative w-14 h-14 rounded-xl bg-[#0D1421] border border-[#1E3A5F] flex items-center justify-center shrink-0 overflow-hidden mb-6 p-2">
            <Image
              src={insti.logo}
              alt={insti.institute}
              fill
              className="object-contain p-2"
              sizes="56px"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col grow">
            <h3 className="text-white font-bold text-[17px] tracking-wide mb-1 leading-snug font-sans">
              {insti.institute}
            </h3>

            <h4 className="text-[#2C74B3] font-mono font-medium text-[13px] mb-2">
              {insti.degree}
            </h4>

            <p className="text-[#8B9BB4] text-[14px] font-sans leading-relaxed mb-6">
              {insti.subject}
            </p>

            {/* Timeline — terminal style */}
            <div className="text-[12px] text-[#4A6274] font-mono mt-auto">
              <span className="text-[#205295] mr-1">$</span>
              {insti.timeline}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
