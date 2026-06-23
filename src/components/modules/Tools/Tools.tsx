"use client";

import React from "react";
import WorkTools from "./WorkTools";

function Tools() {
  return (
    <section id="ecosystem" className="w-full pt-10 pb-20 relative overflow-hidden bg-[#09090b]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Minimal Centered Heading */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-center mb-16 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Development Ecosystem
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
          Trusted by the best{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
            modern teams
          </span>
        </h2>
        
        <p className="text-xl text-[#a1a1aa] font-light leading-relaxed max-w-2xl mx-auto">
          I leverage industry-standard technologies to ensure high performance, security, and developer experience.
        </p>
      </div>

      {/* Unique Scrolling Ecosystem Wall (Edge to Edge) */}
      <div className="w-full">
        <WorkTools />
      </div>
    </section>
  );
}

export default Tools;
