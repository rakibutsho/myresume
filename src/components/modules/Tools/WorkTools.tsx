"use client";

import React, { useMemo } from "react";
import { tools } from "../../../data/work";
import Image from "next/image";

const WorkTools = () => {
  // Split tools into two rows for multi-directional scrolling
  const row1 = useMemo(() => tools.slice(0, 6), []);
  const row2 = useMemo(() => tools.slice(6, 11), []);

  // We duplicate the arrays a few times to ensure the CSS infinite scroll has enough content to loop seamlessly without a visual jump.
  const row1Duplicated = [...row1, ...row1, ...row1, ...row1];
  const row2Duplicated = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="w-full overflow-hidden flex flex-col gap-6 relative max-w-[100vw]">
      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 50s linear infinite; }
        .animate-scroll-right { animation: scroll-right 50s linear infinite; }
        .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }
      `}} />

      {/* Gradient Mask for fading edges */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-linear-to-r from-[#0a0f1a] via-transparent to-[#0a0f1a] w-full" />

      {/* ROW 1: Scrolls Left */}
      <div className="flex w-max animate-scroll-left gap-6 px-4">
        {row1Duplicated.map((tool, idx) => (
          <div
            key={`row1-${tool.id}-${idx}`}
            className="flex items-center gap-4 px-6 py-4 rounded-full bg-[#131b2c] border border-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/50 hover:bg-[#152033] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer shrink-0"
          >
            <div className="relative w-10 h-10 shrink-0 bg-white rounded-full p-2 shadow-inner">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain p-2"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col pr-2">
              <h3 className="text-sm font-bold leading-tight text-white/90">
                {tool.name}
              </h3>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
                {tool.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: Scrolls Right */}
      <div className="flex w-max animate-scroll-right gap-6 px-4">
        {row2Duplicated.map((tool, idx) => (
          <div
            key={`row2-${tool.id}-${idx}`}
            className="flex items-center gap-4 px-6 py-4 rounded-full bg-[#131b2c] border border-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/50 hover:bg-[#152033] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer shrink-0"
          >
            <div className="relative w-10 h-10 shrink-0 bg-white rounded-full p-2 shadow-inner">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain p-2"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col pr-2">
              <h3 className="text-sm font-bold leading-tight text-white/90">
                {tool.name}
              </h3>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
                {tool.category}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WorkTools;
