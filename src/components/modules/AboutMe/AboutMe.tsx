"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import profileImg from "@/assets/Profile.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillDomains = [
  {
    title: "Client-Side Engineering",
    tags: ["TypeScript", "Next.js", "React 19", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  },
  {
    title: "Server & Micro-Services",
    tags: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Socket.io", "System Design"],
  },
  {
    title: "Databases & Storage",
    tags: ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "MySQL", "Redis Caching"],
  },
  {
    title: "DevOps & Infrastructure",
    tags: ["Docker", "Git", "GitHub Actions CI/CD", "Linux VPS Hosting", "Vercel", "AWS Basics"],
  },
];

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hybrid-about-left",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".hybrid-about-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".hybrid-about-portrait",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full py-28 bg-background border-t border-border"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">

        {/* Section Header Indicator */}
        <div className="flex items-center justify-between pb-6 border-b border-border mb-16">
          <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle">
            <span className="text-accent font-bold">01</span>
            <span className="text-border">/</span>
            <span>BACKGROUND & ENGINEERING PHILOSOPHY</span>
          </div>
          <span className="hidden sm:inline font-mono text-2xs uppercase tracking-widest text-fg-subtle">
            DHAKA, BANGLADESH
          </span>
        </div>

        {/* Two-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (7 cols): Editorial Narrative + Domain Cards */}
          <div className="lg:col-span-7 space-y-10 hybrid-about-left opacity-0">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-foreground leading-tight">
                Architecting interfaces with <span className="text-accent">surgical precision</span>.
              </h2>
              <p className="text-base md:text-lg text-fg-muted font-normal leading-relaxed">
                Hello! I&apos;m Rakibul Islam, a full-stack engineer driven by a passion for clean code architecture, resilient distributed backends, and responsive, accessible user interfaces.
              </p>
              <p className="text-sm md:text-base text-fg-subtle leading-relaxed">
                Over 1.5+ years of shipping enterprise web software, I have focused on closing the feedback loop between design mockups and production deployment — building scalable component libraries, optimizing render pipelines, and designing secure, predictable REST services.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {skillDomains.map((domain) => (
                <Card
                  key={domain.title}
                  className="hybrid-about-card rounded-xl border border-border bg-surface p-5 opacity-0 hover:border-accent/40 transition-colors"
                >
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xs font-mono uppercase tracking-wider text-foreground font-bold flex items-center justify-between">
                      <span>{domain.title}</span>
                      <span className="text-accent text-2xs">●</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-2xs font-mono leading-relaxed text-fg-subtle uppercase tracking-wider">
                      {domain.tags.join(" / ")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Portrait & Verified Dossier */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6 hybrid-about-portrait opacity-0">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface shadow-md group">
              <Image
                src={profileImg}
                alt="Md. Rakibul Islam — Full-Stack Engineer"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-border/80 bg-background/80 backdrop-blur-md flex items-center justify-between font-mono text-2xs uppercase tracking-wider">
                <div>
                  <span className="text-foreground font-bold block">Md. Rakibul Islam</span>
                  <span className="text-fg-subtle">Full-Stack Engineer</span>
                </div>
                <span className="px-2 py-1 rounded bg-accent/10 border border-accent/30 text-accent font-bold">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Quick Stats Capsule */}
            <div className="w-full max-w-[380px] p-4 rounded-xl border border-border bg-surface/60 font-mono text-2xs uppercase tracking-widest text-fg-subtle flex justify-between">
              <span>Location: Dhaka, BD</span>
              <span className="text-accent">Available Worldwide</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
