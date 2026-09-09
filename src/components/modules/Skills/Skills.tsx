"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Client-Side Engineering",
    skills: [
      { name: "React",          icon: "https://api.iconify.design/logos:react.svg" },
      { name: "Next.js",        icon: "https://api.iconify.design/logos:nextjs-icon.svg" },
      { name: "TypeScript",     icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Tailwind CSS",   icon: "https://api.iconify.design/logos:tailwindcss-icon.svg" },
      { name: "Redux Toolkit",  icon: "https://api.iconify.design/logos:redux.svg" },
      { name: "Framer Motion",  icon: "https://api.iconify.design/logos:framer.svg" },
      { name: "Shadcn UI",      icon: "https://api.iconify.design/simple-icons:shadcnui.svg?color=white" },
      { name: "React Query",    icon: "https://api.iconify.design/logos:react-query-icon.svg" },
    ],
  },
  {
    title: "Backend & Distributed APIs",
    skills: [
      { name: "Node.js",    icon: "https://api.iconify.design/logos:nodejs-icon.svg" },
      { name: "Express.js", icon: "https://api.iconify.design/simple-icons:express.svg?color=white" },
      { name: "REST APIs",  icon: "https://api.iconify.design/carbon:api.svg?color=%238E909B" },
      { name: "Socket.io",  icon: "https://api.iconify.design/logos:socket-io.svg" },
      { name: "JWT Auth",   icon: "https://api.iconify.design/logos:jwt-icon.svg" },
    ],
  },
  {
    title: "Database Architecture",
    skills: [
      { name: "PostgreSQL", icon: "https://api.iconify.design/logos:postgresql.svg" },
      { name: "MongoDB",    icon: "https://api.iconify.design/logos:mongodb-icon.svg" },
      { name: "Prisma ORM", icon: "https://api.iconify.design/logos:prisma.svg" },
      { name: "Mongoose",   icon: "https://api.iconify.design/devicon:mongoose.svg" },
      { name: "MySQL",      icon: "https://api.iconify.design/logos:mysql.svg" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: "https://api.iconify.design/logos:javascript.svg" },
      { name: "TypeScript", icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Go Lang",    icon: "https://api.iconify.design/logos:go.svg" },
      { name: "SQL",        icon: "https://api.iconify.design/vscode-icons:file-type-sql.svg" },
    ],
  },
  {
    title: "DevOps & Cloud Infrastructure",
    skills: [
      { name: "Git",        icon: "https://api.iconify.design/logos:git-icon.svg" },
      { name: "Docker",     icon: "https://api.iconify.design/logos:docker-icon.svg" },
      { name: "CI/CD",      icon: "https://api.iconify.design/logos:github-actions.svg" },
      { name: "Linux VPS",  icon: "https://api.iconify.design/mdi:server.svg?color=%238E909B" },
      { name: "AWS Basics", icon: "https://api.iconify.design/logos:aws.svg" },
    ],
  },
  {
    title: "Tooling & Design Standards",
    skills: [
      { name: "Figma",         icon: "https://api.iconify.design/logos:figma.svg" },
      { name: "Postman",       icon: "https://api.iconify.design/logos:postman-icon.svg" },
      { name: "System Design", icon: "https://api.iconify.design/carbon:chart-network.svg?color=%238E909B" },
      { name: "Agile / Scrum", icon: "https://api.iconify.design/logos:jira.svg" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hybrid-skills-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".hybrid-skill-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-28 bg-background border-t border-border"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        
        {/* Section Header Indicator */}
        <div className="hybrid-skills-header flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16 opacity-0">
          <div>
            <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
              <span className="text-accent font-bold">02</span>
              <span className="text-border">/</span>
              <span>TECHNICAL ECOSYSTEM & TOOLING</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
              Production Capabilities
            </h2>
          </div>
          <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
            ENGINEERED FOR RESILIENCE
          </span>
        </div>

        {/* 3-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <Card
              key={category.title}
              className="hybrid-skill-card rounded-xl border border-border bg-surface p-6 opacity-0 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <CardHeader className="p-0 pb-4 border-b border-border/80 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                    {category.title}
                  </CardTitle>
                  <span className="text-accent text-2xs font-mono">●</span>
                </CardHeader>
                
                <CardContent className="p-0 pt-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 font-mono text-2xs text-fg-muted uppercase tracking-wider">
                    {category.skills.map((skill, idx) => (
                      <span key={skill.name} className="inline-flex items-center gap-2 group/tag">
                        {idx > 0 && <span className="text-border select-none">/</span>}
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5 object-contain opacity-70 group-hover/tag:opacity-100 transition-opacity"
                        />
                        <span className="group-hover/tag:text-accent transition-colors">
                          {skill.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <div className="mt-8 pt-3 border-t border-border/60 flex items-center justify-between font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                <span>Verified</span>
                <span>Active</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
