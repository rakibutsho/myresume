"use client";

import { BrainCircuit, Code, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import profileImg from "@/assets/profile-2.png";

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

        <div className="flex flex-col gap-20">
          
          {/* Top Section: Bio & Profile Image */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Bio */}
            <div className="space-y-10 order-2 lg:order-1">
              <h2 className="fade-up-element text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
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

            {/* Right Column: Profile Image */}
            <div className="relative fade-up-element order-1 lg:order-2 flex justify-center lg:justify-end">
               {/* Decorative background blur */}
               <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
               <div className="relative w-full max-w-[450px] aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                 <Image src={profileImg} alt="Md. Rakibul Islam" fill className="object-cover" />
                 {/* Optional gradient at the bottom for polish */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent opacity-60" />
               </div>
            </div>

          </div>

          {/* Bottom Section: Horizontal Core Competencies */}
          <div className="relative">
            <div className="fade-up-element flex items-center gap-4 mb-10">
              <div className="w-8 h-[1px] bg-white/10" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Core Competencies</span>
            </div>

            {/* Horizontal Grid */}
            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              
              {/* Decorative background blur for cards */}
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

              {/* Card 1 */}
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-emerald-500/30 transition-colors rounded-2xl p-8 shadow-2xl flex flex-col items-start h-full">
                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 mb-6">
                  <Code className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Frontend Mastery</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    Building highly interactive, SEO-optimized web apps using React, Next.js, and Tailwind CSS. Obsessed with Lighthouse scores and clean component structures.
                  </p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-blue-500/30 transition-colors rounded-2xl p-8 shadow-2xl flex flex-col items-start h-full">
                <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl shrink-0 mb-6">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Community Leadership</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    Former President of the BUBT IT Club and Event Coordinator for ICPC Regionals. I believe that great software is built through collaboration, clear communication, and empowering passionate teams.
                  </p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="fade-up-element bg-[#121214] border border-white/5 hover:border-purple-500/30 transition-colors rounded-2xl p-8 shadow-2xl flex flex-col items-start h-full">
                <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 mb-6">
                  <Rocket className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Full-Stack Execution</h3>
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
