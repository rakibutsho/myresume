"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PdfModal } from "../common/PdfModal/PdfModal";
import { ArrowUpRight, Download, Mail, MapPin, Clock } from "lucide-react";
import { HeroImage } from "./HeroImage";
import Link from "next/link";
import { motion } from "motion/react";
import { BlurText } from "@/components/common/BlurText";

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center pt-24 sm:pt-32 pb-16 overflow-hidden z-10"
    >
      {/* Premium Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col space-y-8 text-center sm:text-left"
          >
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] w-fit mx-auto sm:mx-0 shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </span>
              <span className="font-mono text-xs text-slate-300 font-medium tracking-wide">
                Building scalable dashboard architectures
              </span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-5">
              <p className="text-slate-400 font-mono text-sm flex items-center justify-center sm:justify-start gap-2 tracking-tight">
                <span className="text-xl">👋</span> Hello, I'm
              </p>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 pb-2">
                Rakibul Islam
              </h1>
              <p className="text-xl sm:text-2xl text-slate-200 font-medium flex flex-wrap items-center justify-center sm:justify-start gap-2">
                Frontend Engineer <span className="text-sky-400/50 font-mono text-sm mx-1">@</span> <span className="text-sky-400 font-bold bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20 shadow-sm">SM Technology</span>
              </p>
            </div>

            {/* Concise Subtitle (since detailed bio is in About) */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mx-auto sm:mx-0 font-medium">
              I specialize in crafting high-performance, interactive UI components and robust state management for enterprise-level web applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
              <Button
                asChild
                className="rounded-2xl bg-white text-black hover:bg-sky-50 hover:text-sky-600 font-bold h-14 px-8 gap-3 text-sm transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.15)] group relative overflow-hidden"
              >
                <Link href="#projects">
                  <span className="relative z-10">View Work</span>
                  <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-2xl border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] hover:border-white/[0.2] h-14 px-8 gap-3 text-sm transition-all duration-300 backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-slate-400" />
                Resume
              </Button>

              <Button
                variant="outline"
                asChild
                className="rounded-2xl border-transparent bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.05] h-14 px-6 gap-3 text-sm transition-all duration-300"
              >
                <Link href="#contact">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </Button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-8 font-mono text-[11px] text-slate-500 font-semibold tracking-widest uppercase">
              <span className="flex items-center gap-1.5 bg-white/[0.02] px-3 py-1.5 rounded-md border border-white/[0.05]">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.02] px-3 py-1.5 rounded-md border border-white/[0.05]">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                GMT+6
              </span>
            </div>

          </motion.div>

          {/* Right Column: Hero Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <HeroImage />
          </motion.div>

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
