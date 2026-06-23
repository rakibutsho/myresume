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
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b] w-full" />

      {/* ROW 1: Scrolls Left */}
      <div className="flex w-max animate-scroll-left gap-6 px-4">
        {row1Duplicated.map((tool, idx) => (
          <div
            key={`row1-${tool.id}-${idx}`}
            className="flex items-center gap-4 px-6 py-4 rounded-full bg-[#121214] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500 cursor-pointer shrink-0 group"
          >
            <div className="relative w-12 h-12 shrink-0 bg-[#09090b] rounded-full p-2 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain p-2"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col pr-2">
              <h3 className="text-base font-bold leading-tight text-white group-hover:text-emerald-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-[10px] text-[#a1a1aa] uppercase tracking-[0.15em] font-bold mt-1">
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
            className="flex items-center gap-4 px-6 py-4 rounded-full bg-[#121214] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500 cursor-pointer shrink-0 group"
          >
            <div className="relative w-12 h-12 shrink-0 bg-[#09090b] rounded-full p-2 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain p-2"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col pr-2">
              <h3 className="text-base font-bold leading-tight text-white group-hover:text-emerald-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-[10px] text-[#a1a1aa] uppercase tracking-[0.15em] font-bold mt-1">
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
