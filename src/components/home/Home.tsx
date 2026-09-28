"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PdfModal } from "../common/PdfModal/PdfModal";
import {
  Copy,
  Check,
  ArrowDown,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { TerminalHeroCard } from "./TerminalHeroCard";
import { AnimatedNumber } from "@/components/vengeance/AnimatedNumber";
import { SocialFlipButton } from "@/components/vengeance/SocialFlipButton";
import { LightLines } from "@/components/vengeance/LightLines";

function getProductionYears(): string {
  const start = new Date(2025, 3, 1);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const yrs = months / 12;
  return yrs < 1 ? "<1" : `${yrs.toFixed(1)}+`;
}

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const prodYears = useMemo(() => getProductionYears(), []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mail@rakibutsho.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full pt-28 sm:pt-36 pb-20 overflow-hidden"
    >
      {/* Subtle architectural light lines background accent */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <LightLines
          linesOpacity={0.03}
          lightsOpacity={0.2}
          speedMultiplier={0.5}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column (7 cols): Editorial Typography, CTAs, Socials */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Status & Role Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Available for opportunities</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="text-slate-400 font-mono text-xs hidden sm:inline">
                Junior Executive, Front End @ SM Technology
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Frontend engineer building production dashboards with{" "}
              <span className="text-sky-400">Next.js</span> and{" "}
              <span className="text-sky-400">TypeScript</span>.
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              At <strong className="text-white font-semibold">SM Technology</strong>,
              I own client-facing dashboard modules from build to release.
              Outside work I build{" "}
              <strong className="text-white font-semibold">SpiderNode</strong>, an
              open-source uptime monitor.
            </motion.p>

            {/* 2 Main CTAs + Action Group */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* CTA 1: Explore projects */}
              <Button
                asChild
                className="rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all h-11 px-6 gap-2 text-sm cursor-pointer shadow-sm hover:shadow-sky-500/20"
              >
                <Link href="#projects" onClick={scrollToProjects}>
                  <span>Explore projects</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </Button>

              {/* CTA 2: Contact me */}
              <Button
                variant="outline"
                className="rounded-full border-white/[0.14] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/[0.28] transition-colors h-11 px-5 gap-2 text-sm cursor-pointer"
                asChild
              >
                <Link href="/#contact">
                  <span>Contact me</span>
                  <ArrowUpRight className="w-4 h-4 text-sky-400" />
                </Link>
              </Button>

              {/* Resume Trigger */}
              <Button
                variant="ghost"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors h-11 px-4 gap-2 text-xs font-mono cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume</span>
              </Button>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 h-11 px-4 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[0.1] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/[0.2]"
                }`}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>mail@rakibutsho.dev</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Presence: Vengeance UI SocialFlipButton */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-xs font-mono text-slate-500">Connect:</span>
              <SocialFlipButton />
            </motion.div>
          </div>

          {/* Right Column (5 cols): ONE Interactive Terminal Window */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TerminalHeroCard />
          </div>
        </div>

        {/* 3 Honest Proof Stats: Modern Cohesive Metric Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="pt-8 border-t border-white/[0.08]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* Stat 1 */}
            <div className="space-y-1.5 border-l-2 border-sky-400/40 pl-4 py-1">
              <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-mono flex items-baseline gap-1">
                <AnimatedNumber value={5} />
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Products shipped
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Production dashboards &amp; web applications
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5 border-l-2 border-sky-400/40 pl-4 py-1">
              <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-mono">
                {prodYears}
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Years in production
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Frontend engineering computed from Apr 2025
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5 border-l-2 border-sky-400/40 pl-4 py-1">
              <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-mono flex items-baseline gap-1">
                <AnimatedNumber value={1} />
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Open-source (SpiderNode)
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Dual-cron uptime monitor with instant alerts
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CV Preview Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
      />
    </section>
  );
}
