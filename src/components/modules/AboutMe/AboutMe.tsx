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
    <section id="about" ref={containerRef} className="w-full py-24 relative bg-[#0a0a0c] font-sans text-white border-t border-white/5 overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-16">
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500">Discover</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Original Bio */}
          <div className="space-y-10">
            <h2 className="fade-up-element text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">scalable web ecosystems</span> from the ground up.
            </h2>
            
            <div className="fade-up-element space-y-6 text-[#a1a1aa] text-lg leading-relaxed font-light">
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
          </div>

          {/* Right Column: Unique Capability Cards */}
          <div className="relative">
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
            
            <div className="relative flex flex-col gap-6">
              
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-emerald-500/30 transition-colors rounded-2xl p-6 shadow-2xl flex gap-5 items-start">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Frontend Mastery</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    Building highly interactive, SEO-optimized web apps using React, Next.js, and Tailwind CSS. Obsessed with Lighthouse scores and clean component structures.
                  </p>
                </div>
              </div>
              
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-blue-500/30 transition-colors rounded-2xl p-6 shadow-2xl flex gap-5 items-start lg:-ml-8">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Community Leadership</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    Former President of the BUBT IT Club and Event Coordinator for ICPC Regionals. I believe that great software is built through collaboration, clear communication, and empowering passionate teams.
                  </p>
                </div>
              </div>
              
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-purple-500/30 transition-colors rounded-2xl p-6 shadow-2xl flex gap-5 items-start">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Full-Stack Execution</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    Bridging the gap with Node.js, Express, and MongoDB. From secure JWT authentication workflows to handling complex relational data in Prisma.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutMe;
