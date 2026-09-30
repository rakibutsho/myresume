"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PdfModal } from "../common/PdfModal/PdfModal";
import { ArrowUpRight, Download, Mail, MapPin, Clock } from "lucide-react";
import { HeroImage } from "./HeroImage";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center pt-24 sm:pt-32 pb-16 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col space-y-8 text-center sm:text-left"
          >
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] w-fit mx-auto sm:mx-0 shadow-lg shadow-sky-900/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs text-slate-300">
                Building scalable dashboard architectures
              </span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-4">
              <p className="text-slate-400 font-mono text-sm flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl">👋</span> Hello, I'm
              </p>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 pb-2">
                Rakibul Islam
              </h1>
              <p className="text-xl sm:text-2xl text-slate-200 font-medium flex flex-wrap items-center justify-center sm:justify-start gap-2">
                Frontend Engineer <span className="text-sky-400 font-mono text-sm">@</span> <span className="text-sky-400">SM Technology</span>
              </p>
            </div>

            {/* Concise Subtitle (since detailed bio is in About) */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mx-auto sm:mx-0">
              I specialize in crafting high-performance, interactive UI components and robust state management for enterprise-level web applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Button
                asChild
                className="rounded-full bg-white text-[#0A0D14] hover:bg-sky-50 font-bold h-12 px-6 gap-2 text-sm transition-all hover:scale-105"
              >
                <Link href="#projects">
                  View Work
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsPdfModalOpen(true)}
                className="rounded-full border-white/[0.12] bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-white/[0.2] h-12 px-6 gap-2 text-sm transition-all"
              >
                <Download className="w-4 h-4 text-slate-400" />
                Resume
              </Button>

              <Button
                variant="outline"
                asChild
                className="rounded-full border-transparent bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] h-12 px-5 gap-2 text-sm transition-all"
              >
                <Link href="#contact">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </Button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-6 font-mono text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
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
