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
    <section id="testimonials" ref={sectionRef} className="w-full py-24 relative overflow-hidden font-sans text-white">
      {/* Modern Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-300 mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-12">
          <span className="text-sm font-mono text-emerald-400">06</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">Testimonials</span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="max-w-250 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-black-ops">
            <span className="text-white">Kind words from</span>{" "}
            <span className="text-emerald-400">colleagues.</span>
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-300">
          {testimonials.map((t) => (
            <div
              key={t.id}
              data-testimonial
              className="group relative p-8 md:p-10 rounded-[2rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between"
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
