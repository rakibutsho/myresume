"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Gauge, Rocket, Users } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Frontend Architecture",
    desc: "Building component-driven systems and state flows that help ship features faster.",
  },
  {
    icon: Rocket,
    title: "UX Performance",
    desc: "Reducing friction with fast load times and clean visual hierarchy.",
  },
  {
    icon: Users,
    title: "Product Mindset",
    desc: "Aligning frontend and backend engineering decisions directly with business outcomes.",
  },
  {
    icon: Gauge,
    title: "Quality Delivery",
    desc: "Delivering production-ready features even in fast-moving startup environments.",
  },
];

function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Right cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-about-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full pt-15 pb-5 relative overflow-hidden bg-[#09090b]">
      <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -translate-y-1/2 -z-10 pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Bio */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                The Journey
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              A bit about{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
                my background
              </span>
            </h2>
            
            <div className="space-y-6 text-xl text-[#a1a1aa] font-light leading-relaxed">
              <p>
                I am a full-stack engineer who genuinely enjoys solving messy product problems. Over the past 1.5+ years, I have worked on platforms where quality, reliability, and delivery speed were critical.
              </p>
              <p>
                I started by perfecting pixel-level UI tasks and quickly grew into taking full ownership of end-to-end features. Outside of coding, I play football and take long walks to reset and think clearly.
              </p>
              <p className="text-white font-medium">
                If your team needs someone who can convert complex designs into polished UI and integrate APIs cleanly, that is the exact gap I fill.
              </p>
            </div>
          </div>

          {/* Right Column: Grid of Highlights */}
          <div ref={cardsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-about-card
                  className="group relative rounded-[2rem] p-8 bg-[#121214] border border-white/5 overflow-hidden flex flex-col justify-center hover:border-white/10 transition-colors duration-500 shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="h-14 w-14 rounded-2xl bg-[#09090b] border border-white/10 shadow-inner group-hover:border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative z-10">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-[#a1a1aa] leading-relaxed text-sm font-light relative z-10">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutMe;
