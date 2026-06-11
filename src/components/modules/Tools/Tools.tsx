"use client";

import React from "react";
import WorkTools from "./WorkTools";

function Tools() {
  return (
    <section id="ecosystem" className="w-full pt-10 pb-20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      {/* Minimal Centered Heading */}
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-4">
          Development Ecosystem
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Trusted by the best modern teams
        </h2>
        <p className="text-white/50 text-sm max-w-xl mx-auto">
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
