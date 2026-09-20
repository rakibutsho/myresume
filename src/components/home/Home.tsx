"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PdfModal } from "../common/PdfModal/PdfModal";
import {
  Copy,
  Check,
  ArrowDown,
  FileText,
  Mail,
  Terminal as TerminalIcon,
} from "lucide-react";
import { Github, Linkedin } from "@/components/common/Icons";
import { motion } from "motion/react";
import { BlurText } from "@/components/common/BlurText";
import { TerminalHeroCard } from "./TerminalHeroCard";
import { TechMarquee } from "@/components/modules/TechMarquee";

const METRICS = [
  {
    value: "1.5+",
    label: "Years Experience",
    desc: "Production software delivery",
  },
  {
    value: "20+",
    label: "Projects Shipped",
    desc: "SaaS & full-stack platforms",
  },
  {
    value: "3.75",
    label: "M.Sc. in CSE CGPA",
    desc: "Jahangirnagar University",
  },
];

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
        {/* Main 2-Column Hero: Kinetic Copy Left, Interactive 3D Terminal Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center sm:text-left">
            {/* Terminal Command Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/[0.06] text-sky-400 font-mono text-xs backdrop-blur-md">
                <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>$ whoami --role</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400 text-xs font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </span>
                <span>Available for Full-time Roles</span>
              </div>
            </motion.div>

            {/* Kinetic Typography Blur-Reveal Headline */}
            <div className="space-y-2">
              <BlurText
                text="Engineering scalable web systems with craft and clarity."
                highlightWords={["craft", "clarity."]}
                highlightClass="text-shimmer font-black"
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
                as="h1"
              />
            </div>

            {/* Narrative Dossier */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              Hi, I&apos;m{" "}
              <span className="text-white font-semibold">Rakibul Islam</span>.
              Full-Stack Software Engineer building high-throughput frontend
              dashboards at{" "}
              <span className="text-white font-semibold">SM Technology</span>{" "}
              and pursuing an{" "}
              <span className="text-white font-semibold">
                M.Sc. in CSE at Jahangirnagar University
              </span>
              . Specialized in Next.js, TypeScript, and distributed Node
              architectures.
            </motion.p>

            {/* Interactive Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2"
            >
              <Button
                onClick={scrollToProjects}
                className="rounded-full bg-white text-black font-semibold hover:bg-slate-200 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 h-11 px-6 gap-2 text-sm shadow-[0_4px_24px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-full border-white/[0.12] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/[0.25] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 h-11 px-5 gap-2 text-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>View Resume</span>
              </Button>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 h-11 px-4 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.05]"
                }`}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>mail@rakibutsho.dev</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-slate-400 text-xs font-mono"
            >
              <a
                href="https://github.com/rakibutsho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/rakibutsho</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://www.linkedin.com/in/rakibutsho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>linkedin</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href="mailto:mail@rakibutsho.dev"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>email</span>
              </a>
            </motion.div>

            {/* Metrics Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            >
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-left hover:border-white/[0.16] hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="text-2xl font-bold tracking-tight text-white font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {m.desc}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (5 cols): Interactive 3D Perspective Terminal Window */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TerminalHeroCard />
          </div>
        </div>
      </div>

      {/* Infinite Tech Stack Marquee */}
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
