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
    <section id="education" className="w-full pt-32 pb-20 relative">
      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Academic Background
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            Educational {""}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Journey
            </span>
          </h2>

          <p className="text-lg text-white/50 leading-relaxed font-medium">
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
