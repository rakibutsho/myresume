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

  const avatarGradients = [
    "from-emerald-400 to-emerald-600",
    "from-emerald-500 to-[#10b981]",
    "from-[#10b981] to-emerald-700",
    "from-emerald-300 to-emerald-500",
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="w-full pt-10 pb-20 relative bg-[#09090b]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Endorsements
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            What Teams{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Say
            </span>
          </h2>
          
          <p className="text-xl text-[#a1a1aa] font-light leading-relaxed">
            Feedback from managers, developers, and designers I have worked with on real product deliveries.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              data-testimonial
              className="
                group relative p-8 md:p-10 rounded-[2rem]
                bg-[#121214] border border-white/5 
                shadow-2xl
                hover:border-white/10
                transition-all duration-500 flex flex-col overflow-hidden
              "
            >
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              {/* Subtle ambient light inside the card */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

              {/* Huge Quote icon in background */}
              <div className="absolute -top-6 -right-6 rotate-12 opacity-[0.03] group-hover:opacity-5 group-hover:rotate-6 transition-all duration-500 pointer-events-none">
                <Quote className="w-40 h-40 text-emerald-300 fill-emerald-300" />
              </div>

              {/* Message */}
              <div className="relative z-10 flex-grow">
                <Quote className="h-8 w-8 text-emerald-400/50 mb-8" />
                <p className="text-xl text-white/90 leading-relaxed italic font-light tracking-wide">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-5 mt-10 pt-6 border-t border-white/5 relative z-10">
                {/* 3D Avatar */}
                <div
                  className={`
                    h-14 w-14 rounded-[1.25rem] shrink-0
                    bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]}
                    flex items-center justify-center
                    text-white text-xl font-bold
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_8px_16px_rgba(0,0,0,0.5)]
                    border border-white/20 group-hover:scale-110 transition-transform duration-500
                  `}
                >
                  {t.avatar}
                </div>

                <div>
                  <p className="text-lg font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors mb-1">
                    {t.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400/90">
                      {t.role}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-sm font-medium text-[#a1a1aa]">
                      {t.company}
                    </span>
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
