"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
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
        },
      );

      // Cards stagger
      if (cardsRef.current) {
        const cards =
          cardsRef.current.querySelectorAll<HTMLElement>("[data-testimonial]");
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
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section id="testimonials" ref={sectionRef} className="w-full py-24 relative bg-[#0a0a0c] font-sans text-white border-t border-white/5">
      <div className="w-full max-w-300 mx-auto px-4 md:px-8">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest">
          <div>— WHAT TEAMS SAY</div>
          <div>[ ENDORSEMENTS ]</div>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="max-w-250 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            <span className="font-serif italic text-white">Kind words from</span>{" "}
            <span className="font-serif italic text-emerald-400">colleagues.</span>
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-300">
          {testimonials.map((t) => (
            <div
              key={t.id}
              data-testimonial
              className="group relative p-8 md:p-10 rounded-xl bg-[#0f0f11] border border-white/5 hover:border-white/10 transition-colors duration-300 flex flex-col justify-between"
            >
              {/* Message */}
              <div className="mb-12">
                <Quote className="h-6 w-6 text-white/10 mb-6 group-hover:text-emerald-400/50 transition-colors" />
                <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                  "{t.message}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] font-mono text-xs font-bold group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-colors">
                  {t.avatar}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[15px] font-semibold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#6b7280]">
                    {t.role} <span className="text-white/10 mx-1">|</span> {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default Testimonials;
