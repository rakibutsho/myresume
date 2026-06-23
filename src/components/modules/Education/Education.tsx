"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Institute from "./Institute";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="education" className="w-full pt-15 pb-20 relative bg-[#09090b]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Academic Background
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Educational {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Journey
            </span>
          </h2>

          <p className="text-xl text-[#a1a1aa] font-light leading-relaxed">
            The academic foundation that shaped my engineering mindset and problem-solving skills.
          </p>
        </div>

        {/* Grid of Institutes */}
        <div className="mt-12">
          <Institute />
        </div>
        
      </div>
    </section>
  );
};

export default Education;
