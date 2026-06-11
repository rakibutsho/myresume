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
          { opacity: 0, y: 40, scale: 0.95 },
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
    <section id="testimonials" ref={sectionRef} className="w-full pt-32 pb-20 relative">
      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Premium Header */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Endorsements
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            What Teams{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Say
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed font-medium">
            Feedback from managers, developers, and designers I have worked with on real product deliveries.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              data-testimonial
              className="
                group relative p-8 md:p-10 rounded-[2rem]
                bg-[#131b2c] border border-[#1e293b] 
                shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.4)]
                hover:border-emerald-500/30 hover:bg-[#152033] hover:-translate-y-2
                transition-all duration-500 flex flex-col overflow-hidden
              "
            >
              {/* Subtle ambient light inside the card */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

              {/* Huge Quote icon in background */}
              <div className="absolute -top-6 -right-6 rotate-12 opacity-5 group-hover:opacity-10 group-hover:rotate-6 transition-all duration-500 pointer-events-none">
                <Quote className="w-40 h-40 text-emerald-300 fill-emerald-300" />
              </div>

              {/* Message */}
              <div className="relative z-10 flex-grow">
                <Quote className="h-8 w-8 text-emerald-400/50 mb-6" />
                <p className="text-lg md:text-xl text-white/80 leading-relaxed italic font-medium">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
                {/* 3D Avatar */}
                <div
                  className={`
                    h-14 w-14 rounded-2xl shrink-0
                    bg-linear-to-br ${avatarGradients[i % avatarGradients.length]}
                    flex items-center justify-center
                    text-white text-lg font-bold
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_8px_16px_rgba(0,0,0,0.5)]
                    border border-white/10 group-hover:scale-110 transition-transform duration-500
                  `}
                >
                  {t.avatar}
                </div>

                <div>
                  <p className="text-base font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                      {t.role}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-sm font-medium text-white/50">
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
