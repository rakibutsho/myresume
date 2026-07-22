"use client";

import { BrainCircuit, Code, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-up-element",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="w-full py-24 relative font-sans text-white overflow-hidden">
      
      {/* Modern Background Glows */}
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-emerald-400">01</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">About</span>
        </div>

        <div className="flex flex-col gap-10">
          
          {/* Main Header */}
          <h2 className="fade-up-element text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-serif lg:max-w-[55%]">
            Engineer, <span className="text-emerald-400">builder,</span><br className="hidden md:block"/> and lifelong learner
          </h2>
          
          {/* Content Grid: Bio & Info Cards */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Bio */}
            <div className="lg:col-span-7 fade-up-element space-y-6 text-[#a1a1aa] text-lg leading-relaxed font-light order-2 lg:order-1">
              <p>
                My journey is driven by an absolute passion for coding and technology. Beyond just writing syntax, I am deeply involved in the tech community, having led as President of the BUBT IT Club and organized major events like the ICPC Asia Dhaka Regionals.
              </p>
              <p>
                Today, as a Software Engineer at SM Technology, I channel that precision into building robust, full-stack applications. I specialize in Next.js and React, crafting pixel-perfect interfaces that don't compromise on backend performance.
              </p>
              <p>
                Whether I'm optimizing state management with Redux or designing automated REST APIs, my goal remains the same: delivering seamless, conversion-driven user experiences backed by maintainable architecture.
              </p>
            </div>

            {/* Right Column: Info Cards */}
            <div className="lg:col-span-5 space-y-4 order-1 lg:order-2 w-full">
              <div className="fade-up-element bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col transition-all hover:border-emerald-500/30 hover:bg-white/5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">Currently</span>
                <span className="text-white font-medium">Software Engineer @ SM Technology</span>
              </div>
              
              <div className="fade-up-element bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col transition-all hover:border-blue-500/30 hover:bg-white/5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">Based In</span>
                <span className="text-white font-medium">Dhaka, Bangladesh</span>
              </div>
              
              <div className="fade-up-element bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col transition-all hover:border-emerald-500/30 hover:bg-white/5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">Focus</span>
                <span className="text-white font-medium">React · Next.js · Full-Stack</span>
              </div>
              
              <div className="fade-up-element bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col transition-all hover:border-blue-500/30 hover:bg-white/5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">Leadership</span>
                <span className="text-white font-medium">Ex-President @ BUBT IT Club</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
