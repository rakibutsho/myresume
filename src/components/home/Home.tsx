"use client";

import gsap from "gsap";
import { BadgeCheck, Download, Facebook, GithubIcon, LinkedinIcon, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import profile from "@/assets/profile-2.png";

const social = [
  { name: "Facebook", href: "https://www.facebook.com/rakibulislam.utsho/", icon: Facebook },
  { name: "WhatsApp", href: "https://wa.me/8801707934655", icon: Phone },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-rakibutsho-cse/", icon: LinkedinIcon },
  { name: "GitHub", href: "https://github.com/rakib-utsho", icon: GithubIcon },
];

const STATS = [
  { label: "Years Experience", value: "1.5+" },
  { label: "Production Projects", value: "15+" },
  { label: "Lighthouse Score", value: "90+" },
];

function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.1 },
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 },
      );

      gsap.fromTo(
        bentoRefs.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.5 },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={wrapRef} className="w-full pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-[#09090b]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-center">
        
        {/* Main Hero Text (Centered) */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Available for Full-Stack Roles
            </span>
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-white mb-8">
            Full-stack Next.js Engineer for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              Product Teams.
            </span>
          </h1>

          <p ref={descRef} className="text-xl md:text-2xl text-[#a1a1aa] font-light leading-relaxed max-w-3xl mx-auto mb-10">
            I help startups ship fast, reliable web apps that users trust and teams can scale. 
            I specialize in <span className="text-white font-medium">Next.js, React, Node.js</span>, and creating premium UI experiences.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-5">
            <a href="#projects" className="group flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase text-black bg-white hover:bg-emerald-400 hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              View Case Studies
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </a>
            <a href="/cv/Rakibul_Islam.pdf" download="Rakibul_Islam.pdf" className="group flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          
          {/* Profile Tile (Spans 2 columns) */}
          <div 
            ref={(el) => { bentoRefs.current[0] = el; }}
            className="col-span-1 md:col-span-2 lg:col-span-2 rounded-[2rem] p-8 md:p-10 bg-[#121214] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl flex flex-col md:flex-row items-center gap-10"
          >
            <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative shrink-0 w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl bg-[#09090b] z-10 group-hover:border-emerald-500/30 transition-colors duration-500">
              <Image src={profile} alt="Md. Rakibul Islam" className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105" priority />
            </div>
            
            <div className="text-center md:text-left flex-1 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-3 mb-2">
                Rakibul Islam
                <BadgeCheck className="h-7 w-7 text-emerald-400 shrink-0" />
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#a1a1aa] font-semibold">Software Engineer</p>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
              <p className="text-white/60 mb-8 leading-relaxed text-lg font-light">
                Based in Dhaka, Bangladesh. I specialize in building high-performance web applications with scalable architectures.
              </p>
              
              <div className="flex justify-center md:justify-start gap-4">
                {social.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Link
                      key={app.name}
                      href={app.href}
                      target="_blank"
                      aria-label={app.name}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Focus Tile */}
          <div 
            ref={(el) => { bentoRefs.current[1] = el; }}
            className="col-span-1 rounded-[2rem] p-8 md:p-10 bg-[#121214] border border-white/5 relative overflow-hidden flex flex-col justify-center group hover:border-white/10 transition-colors duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1a1aa]">Current Focus</p>
            </div>
            <p className="text-xl text-white leading-relaxed font-light tracking-wide relative z-10">
              Building conversion-focused SaaS dashboards and highly maintainable design systems.
            </p>
          </div>

          {/* Stats Tiles */}
          {STATS.map((s, i) => (
            <div 
              key={s.label}
              ref={(el) => { bentoRefs.current[2 + i] = el; }}
              className="col-span-1 rounded-[2rem] p-8 md:p-10 bg-[#121214] border border-white/5 relative overflow-hidden flex flex-col justify-center items-center text-center group hover:border-white/10 transition-all duration-500 shadow-2xl"
            >
              <h3 className="text-5xl font-bold tracking-tight text-white mb-4 group-hover:scale-110 transition-transform duration-500">{s.value}</h3>
              <p className="text-xs text-[#a1a1aa] font-medium uppercase tracking-[0.15em]">{s.label}</p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default Home;
