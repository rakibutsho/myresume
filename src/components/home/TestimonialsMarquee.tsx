"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="shrink-0 w-72 sm:w-80 mx-3 p-5 rounded-2xl border border-white/[0.08] bg-[#0F1117] space-y-3 select-none">
      <Quote className="w-4 h-4 text-sky-400/60" />
      <p className="text-sm text-slate-300 leading-relaxed line-clamp-4">
        {t.message}
      </p>
      <div className="flex items-center gap-2.5 pt-1 border-t border-white/[0.06]">
        <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono text-[10px] text-sky-400 font-bold shrink-0">
          {t.avatar}
        </div>
        <div>
          <p className="text-xs font-semibold text-white">{t.name}</p>
          <p className="text-[10px] font-mono text-slate-500">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="w-full py-20 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
            Recommendations
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What colleagues say.
          </h2>
        </motion.div>
      </div>

      {/* Marquee track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-[#08090D] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#08090D] to-transparent" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

