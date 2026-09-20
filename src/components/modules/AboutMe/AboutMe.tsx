"use client";

import Image from "next/image";
import profileImg from "@/assets/Profile.png";
import { BlurText } from "@/components/common/BlurText";
import {
  Code2,
  Server,
  Database,
  GitBranch,
  MapPin,
  GraduationCap,
  Terminal as TerminalIcon,
} from "lucide-react";

const PILLARS = [
  {
    icon: Code2,
    title: "Frontend & Design Systems",
    desc: "Crafting modular, reusable component systems in Next.js, React, and TypeScript with fluid interactions and strict performance budgets.",
  },
  {
    icon: Server,
    title: "Backend & Distributed APIs",
    desc: "Engineering scalable REST APIs, WebSocket channels, and authentication flows with Node.js, Express, and microservice principles.",
  },
  {
    icon: Database,
    title: "Database Modeling & Caching",
    desc: "Structuring clean relational & document schemas in PostgreSQL and MongoDB, optimized with Prisma and Redis caching layers.",
  },
  {
    icon: GitBranch,
    title: "DevOps & Production Delivery",
    desc: "Containerizing deployments with Docker, automating CI/CD pipelines, and maintaining high uptime on Linux VPS instances.",
  },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ cat about.md</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">profile.dossier</span>
          </div>

          <BlurText
            text="Driven by curiosity, rigor, and software craft."
            highlightWords={["curiosity,", "craft."]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />
        </div>

        {/* 2-Column Split: Narrative + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Cols: Engineering Story */}
          <div className="lg:col-span-7 space-y-6 text-base text-slate-300 font-normal leading-relaxed">
            <p>
              I am a{" "}
              <strong className="text-white font-semibold">
                Full-Stack Software Engineer
              </strong>{" "}
              based in Dhaka, Bangladesh. Currently, I build production
              dashboard workflows and performance-critical interfaces at{" "}
              <strong className="text-white font-semibold">
                SM Technology
              </strong>
              , while pursuing an{" "}
              <strong className="text-white font-semibold">
                M.Sc. in Computer Science & Engineering at Jahangirnagar
                University
              </strong>{" "}
              (CGPA 3.75/4.0).
            </p>

            <p>
              My engineering philosophy revolves around{" "}
              <strong className="text-white font-semibold">
                predictability, maintainability, and user delight
              </strong>
              . I don&apos;t just build features to check tickets; I obsess over
              state management boundaries, network request caching, bundle size
              reduction, and smooth 60fps micro-interactions.
            </p>

            <p>
              Whether designing an open-source uptime monitoring engine with
              sub-second polling (
              <em className="text-sky-300 not-italic font-mono text-xs">
                SpiderNode
              </em>
              ) or optimizing enterprise healthcare platforms (
              <em className="text-sky-300 not-italic font-mono text-xs">
                Anesthelink
              </em>
              ), I focus on clean abstractions that scale smoothly as teams and
              workloads grow.
            </p>

            {/* Quick Badges */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>M.Sc. in CSE (Ongoing)</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Refined Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="glow-card relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0F1117] p-2 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={profileImg}
                  alt="Rakibul Islam — Full-Stack Engineer"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Floating Bottom Card Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl border border-white/[0.1] bg-[#08090D]/80 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Md. Rakibul Islam
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Full-Stack Software Engineer
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glow-card p-6 rounded-2xl border border-white/[0.08] bg-[#0F1117] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-sky-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
