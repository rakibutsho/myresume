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
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Github, Linkedin } from "@/components/common/Icons";
import { motion } from "motion/react";
import { TerminalHeroCard } from "./TerminalHeroCard";
import { TechMarquee } from "@/components/modules/TechMarquee";
import { AnimatedNumber } from "@/components/vengeance/AnimatedNumber";

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
      className="relative w-full pt-28 sm:pt-36 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Specific Headline, Honest Value Prop, 2 CTAs, 3 Proof Stats */}
          <div className="lg:col-span-7 space-y-7 text-center sm:text-left">
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Available for opportunities</span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Frontend engineer building production dashboards with{" "}
                <span className="text-sky-400">Next.js</span> and{" "}
                <span className="text-sky-400">TypeScript</span>.
              </h1>
            </div>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              At <strong className="text-white font-semibold">SM Technology</strong>,
              I own client-facing dashboard modules from build to release.
              Outside work I build{" "}
              <strong className="text-white font-semibold">SpiderNode</strong>, an
              open-source uptime monitor.
            </p>

            {/* 2 Main CTAs + Secondary actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <Button
                asChild
                className="rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors h-10 px-5 gap-2 text-sm cursor-pointer"
              >
                <Link href="#projects" onClick={scrollToProjects}>
                  <span>Explore projects</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-white/[0.12] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/[0.25] transition-colors h-10 px-5 gap-2 text-sm cursor-pointer"
                asChild
              >
                <Link href="/#contact">
                  <span>Contact me</span>
                  <ArrowUpRight className="w-4 h-4 text-sky-400" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-full text-slate-400 hover:text-white transition-colors h-10 px-4 gap-2 text-xs font-mono cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume</span>
              </Button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/[0.16]"
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
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-slate-400 text-xs font-mono">
              <a
                href="https://github.com/rakibutsho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github</span>
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://www.linkedin.com/in/rakibutsho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin</span>
              </a>
              <span className="text-white/20">·</span>
              <a
                href="mailto:mail@rakibutsho.dev"
                className="flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>email</span>
              </a>
            </div>

            {/* 3 Honest Proof Stats */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Stat 1: 5 products shipped */}
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-left hover:border-white/[0.16] transition-colors">
                <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-baseline gap-1">
                  <AnimatedNumber value={5} />
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  Products shipped
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Production dashboards &amp; web apps
                </div>
              </div>

              {/* Stat 2: Years in production computed from Apr 2025 */}
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-left hover:border-white/[0.16] transition-colors">
                <div className="text-2xl font-bold tracking-tight text-white font-mono">
                  {prodYears}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  Years in production
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Computed from Apr 2025
                </div>
              </div>

              {/* Stat 3: 1 open-source project */}
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-left hover:border-white/[0.16] transition-colors">
                <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-baseline gap-1">
                  <AnimatedNumber value={1} />
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  Open-source (SpiderNode)
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Uptime monitoring tool
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: ONE Interactive Terminal Window */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TerminalHeroCard />
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-16">
        <TechMarquee />
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
