"use client";

import gsap from "gsap";
import { BadgeCheck, Download, Facebook, GithubIcon, LinkedinIcon, Phone } from "lucide-react";
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
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.5 },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={wrapRef} className="w-full pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Main Hero Text (Centered) */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-emerald-300 tracking-wide">
              Available for Full-Stack Roles
            </span>
          </div>

          <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
            Full-stack Next.js Engineer for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              SaaS and Product Teams.
            </span>
          </h1>

          <p ref={descRef} className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
            I help startups ship fast, reliable web apps that users trust and teams can scale. 
            I specialize in Next.js, React, TypeScript, Node.js, and creating premium UI experiences.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
            <a href="#projects" className="px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-emerald-400 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20">
              View Case Studies
            </a>
            <a href="/cv/Rakibul_Islam.pdf" download="Rakibul_Islam.pdf" className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Bento Grid (Replaces ProfileCard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          
          {/* Profile Tile (Spans 2 columns) */}
          <div 
            ref={(el) => { bentoRefs.current[0] = el; }}
            className="col-span-1 md:col-span-2 lg:col-span-2 rounded-3xl p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 hover:border-emerald-500/30 transition-all duration-300 group"
          >
            <div className="relative shrink-0 w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
              <Image src={profile} alt="Md. Rakibul Islam" className="w-full h-full object-cover object-top" priority />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2 mb-2">
                Md. Rakibul Islam
                <BadgeCheck className="h-6 w-6 text-emerald-400" />
              </h2>
              <p className="text-emerald-300 text-lg font-medium mb-4">Full-Stack Software Engineer</p>
              <p className="text-white/60 mb-6 leading-relaxed">
                Based in Dhaka, Bangladesh. I specialize in building high-performance web applications with Next.js, React, and Node.js.
              </p>
              
              <div className="flex justify-center md:justify-start gap-3">
                {social.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Link
                      key={app.name}
                      href={app.href}
                      target="_blank"
                      aria-label={app.name}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:-translate-y-1 transition-all"
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
            className="col-span-1 rounded-3xl p-6 md:p-8 bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md flex flex-col justify-center"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Current Focus</p>
            <p className="text-lg text-white/90 leading-relaxed font-medium">
              Building conversion-focused SaaS dashboards and highly maintainable design systems.
            </p>
          </div>

          {/* Stats Tiles */}
          {STATS.map((s, i) => (
            <div 
              key={s.label}
              ref={(el) => { bentoRefs.current[2 + i] = el; }}
              className="col-span-1 rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors"
            >
              <h3 className="text-4xl font-bold text-white mb-3">{s.value}</h3>
              <p className="text-sm text-emerald-300/80 font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default Home;
