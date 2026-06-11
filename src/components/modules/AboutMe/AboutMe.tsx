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
          { opacity: 0, x: 30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
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
    <section id="about" ref={sectionRef} className="w-full pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Bio */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                The Journey
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
              A bit about{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
                my background
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                I am a full-stack engineer who genuinely enjoys solving messy product problems. Over the past 1.5+ years, I have worked on platforms where quality, reliability, and delivery speed were critical.
              </p>
              <p>
                I started by perfecting pixel-level UI tasks and quickly grew into taking full ownership of end-to-end features. Outside of coding, I play football and take long walks to reset and think clearly.
              </p>
              <p className="text-white/80 font-medium">
                If your team needs someone who can convert complex designs into polished UI and integrate APIs cleanly, that is the exact gap I fill.
              </p>
            </div>
          </div>

          {/* Right Column: Grid of Highlights */}
          <div ref={cardsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-about-card
                  className="group p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-center"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
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
