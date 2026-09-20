"use client";

import { testimonials } from "@/data/testimonials";
import { Quote, Terminal as TerminalIcon, CheckCircle2 } from "lucide-react";
import { BlurText } from "@/components/common/BlurText";

const ENDORSEMENT_TAGS: Record<number, string[]> = {
  1: ["#ProductionDelivery", "#DesignEngineeringHandoff"],
  2: ["#CleanReact", "#QualityPRs"],
  3: ["#PixelPrecision", "#UIInteraction"],
  4: ["#SystemTesting", "#DefectResolution"],
};

export default function Testimonials() {
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
      className="w-full py-24 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>$ cat recommendations.log</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">peer.endorsements</span>
          </div>

          <BlurText
            text="Feedback from team leads, designers & engineers."
            highlightWords={["engineers.", "leads,"]}
            highlightClass="text-shimmer"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />

          <p className="text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Direct endorsements from colleagues I&apos;ve collaborated with on
            production releases, design-to-code handoffs, and QA lifecycles.
          </p>
        </div>

        {/* 2x2 Interactive Terminal Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => {
            const tags = ENDORSEMENT_TAGS[t.id] || [];

            return (
              <div
                key={t.id}
                onMouseMove={handleMouseMove}
                className="spotlight-card glow-card p-7 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0F1117] flex flex-col justify-between space-y-6 group transition-all duration-300"
              >
                {/* Card Terminal Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] relative z-10">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <span className="text-sky-400">&gt;_</span>
                    <span className="text-slate-300 font-medium">
                      review_0{t.id}.md
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Colleague</span>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="space-y-4 relative z-10">
                  <Quote className="w-6 h-6 text-sky-400/50 group-hover:text-sky-400 transition-colors" />
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  {/* Skill/Contribution Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/[0.06] bg-white/[0.02] text-slate-400 group-hover:text-sky-300 group-hover:border-sky-400/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author Footer */}
                <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] group-hover:border-sky-500/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 transition-colors shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono truncate">
                      {t.role} <span className="text-white/20">•</span>{" "}
                      {t.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
