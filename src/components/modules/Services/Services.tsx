"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutDashboard, Rocket, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: LayoutDashboard,
    title: "Full-Stack Product Development",
    outcome:
      "Launch polished, responsive product interfaces and supporting backend flows that reduce friction from the first screen to the last action.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    outcome:
      "Improve Core Web Vitals and page speed so users stay longer, bounce less, and convert more consistently.",
  },
  {
    icon: Wrench,
    title: "Refactor And Rescue",
    outcome:
      "Stabilize messy codebases, remove UI bugs, and rebuild critical frontend-backend flows without halting your product roadmap.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-service-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="w-full pt-20 pb-5 relative bg-[#09090b]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              What I Do
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Services That {}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Move Metrics
            </span>
          </h2>
          
          <p className="text-xl text-[#a1a1aa] font-light leading-relaxed">
            I do not just ship pages. I help teams improve activation,
            engagement, and delivery speed with reliable full-stack engineering.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                data-service-card
                className="group relative rounded-[2rem] p-8 bg-[#121214] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500 overflow-hidden flex flex-col"
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-2xl bg-[#09090b] border border-white/10 shadow-inner flex items-center justify-center mb-8 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#a1a1aa] leading-relaxed text-sm font-light mt-auto">
                    {service.outcome}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
