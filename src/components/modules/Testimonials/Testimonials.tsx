"use client";

import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data/testimonials";
import {
  Quote,
  Terminal as TerminalIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { BlurText } from "@/components/common/BlurText";
import { motion, AnimatePresence } from "motion/react";

const ENDORSEMENT_TAGS: Record<number, string[]> = {
  1: ["#ProductionDelivery", "#DesignEngineeringHandoff", "#AgileSpeed"],
  2: ["#CleanReact", "#QualityPRs", "#TypeScriptRigor"],
  3: ["#PixelPrecision", "#UIInteraction", "#DesignSystemFidelity"],
  4: ["#SystemTesting", "#DefectResolution", "#Ownership"],
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const DURATION = 5000; // 5 seconds per slide
  const INTERVAL_STEP = 50;

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return prev + (INTERVAL_STEP / DURATION) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setProgress(0);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const selectReview = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setProgress(0);
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];
  const tags = ENDORSEMENT_TAGS[current.id] || [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="testimonials"
      className="w-full py-16 px-6 border-t border-white/[0.06] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header with Integrated Compact Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>$ cat recommendations.log --stream</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">peer.endorsements</span>
            </div>

            <BlurText
              text="Feedback from team leads & engineers."
              highlightWords={["engineers.", "leads"]}
              highlightClass="text-shimmer"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
              as="h2"
            />
          </div>

          {/* Interactive Navigation & Playback Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-slate-300">
              <span className="text-sky-400 font-bold">
                0{currentIndex + 1}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-slate-500">0{testimonials.length}</span>

              {/* Mini circular/bar progress indicator */}
              <div className="w-10 h-1 bg-white/[0.08] rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-sky-400 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                title={isPlaying ? "Pause autoplay" : "Resume autoplay"}
                className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:text-white text-slate-400 transition-all cursor-pointer"
                aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>

              <button
                onClick={handlePrev}
                title="Previous testimonial"
                className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:text-white text-slate-400 transition-all cursor-pointer active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                title="Next testimonial"
                className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:text-white text-slate-400 transition-all cursor-pointer active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Reviewer Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-white/[0.06] pb-3">
          {testimonials.map((t, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={t.id}
                onClick={() => selectReview(idx)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeReviewerTab"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[10px] font-bold text-sky-400">
                  {t.avatar}
                </span>
                <span className="relative z-10">{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Compact Kinetic Testimonial Stage Card */}
        <div
          onMouseMove={handleMouseMove}
          className="spotlight-card glow-card rounded-2xl border border-white/[0.1] bg-[#0E1118]/90 backdrop-blur-xl relative overflow-hidden transition-all duration-300 min-h-[250px] sm:min-h-[230px] flex flex-col justify-between"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] text-xs font-mono text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-sky-400">&gt;_</span>
              <span className="text-slate-200 font-medium">
                endorsement_0{current.id}.md
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-500 hidden sm:inline">
                signed_colleague_hash
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Colleague Review</span>
            </div>
          </div>

          {/* Animated Quote Content Area */}
          <div className="p-6 sm:p-8 relative z-10 flex-1 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <Quote className="w-7 h-7 text-sky-400/50 shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed italic">
                    &ldquo;{current.message}&rdquo;
                  </p>
                </div>

                {/* Contribution / Endorsement Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pl-11">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-sky-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Author Footer Info */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-sky-400 shrink-0 shadow-inner">
                  {current.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    {current.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {current.role} <span className="text-white/20">•</span>{" "}
                    <span className="text-slate-300 font-medium">
                      {current.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Colleague Badge */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Production Peer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
