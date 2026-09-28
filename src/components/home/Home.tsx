"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PdfModal } from "../common/PdfModal/PdfModal";
import { Copy, Check, ArrowDown, FileText } from "lucide-react";
import { TerminalHeroCard } from "./TerminalHeroCard";
import { LightLines } from "@/components/vengeance/LightLines";
import { AnimatedNumber } from "@/components/vengeance/AnimatedNumber";
import { SocialFlipButton } from "@/components/vengeance/SocialFlipButton";

const PROOF_STATS = [
  {
    numericValue: 1,
    suffix: ".5+",
    label: "Years Experience",
    desc: "Production delivery at SM Technology",
  },
  {
    numericValue: 5,
    suffix: "",
    label: "Case Studies",
    desc: "Enterprise dashboards & open-source tools",
  },
  {
    numericValue: null,
    displayValue: "3.75",
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
    setTimeout(() => setCopied(false), 2000);
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
      className="relative w-full pt-28 sm:pt-36 pb-16 overflow-hidden bg-[#08090D]"
    >
      {/* Vengeance UI LightLines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <LightLines
          linesOpacity={0.03}
          lightsOpacity={0.3}
          speedMultiplier={0.7}
          gradientFrom="#38bdf8"
          gradientTo="#0284c7"
          lineColor="#ffffff"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (7 cols): Clear, unembellished typography & proof */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            {/* Status indicator (Mono accent) */}
            <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for engineering roles</span>
            </div>

            {/* Headline: Specific, direct, no generic buzzwords */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Building production web dashboards and tools with Next.js &amp; TypeScript.
            </h1>

            {/* One-line Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Junior Executive, Front End at SM Technology. Focused on component architecture and production interfaces, with backend contributions in Node.js.
            </p>

            {/* 2 Primary CTAs + Quick Email Action */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <Button
                onClick={scrollToProjects}
                className="rounded-full bg-sky-500 hover:bg-sky-400 text-white font-medium h-10 px-5 gap-2 text-sm cursor-pointer transition-colors"
              >
                <span>Explore work</span>
                <ArrowDown className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-full border-white/[0.12] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/[0.24] h-10 px-5 gap-2 text-sm cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>View resume</span>
              </Button>

              {/* Email copy helper */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full border text-xs font-mono transition-colors cursor-pointer ${
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.05]"
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
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>mail@rakibutsho.dev</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links using Vengeance UI SocialFlipButton */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              <span className="font-mono text-xs text-slate-500">Connect:</span>
              <SocialFlipButton
                itemClassName="h-8 w-8"
                frontClassName="text-xs"
              />
            </div>

            {/* 3 Honest Proof Stats using Vengeance UI AnimatedNumber */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROOF_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-lg border border-white/[0.08] bg-[#0F1117] text-left hover:border-white/[0.18] transition-colors"
                >
                  <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-center">
                    {stat.numericValue !== null ? (
                      <>
                        <AnimatedNumber value={stat.numericValue} />
                        <span>{stat.suffix}</span>
                      </>
                    ) : (
                      <span>{stat.displayValue}</span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): The Single Terminal Card with working RUN chips */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TerminalHeroCard />
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
      />
    </section>
  );
}
