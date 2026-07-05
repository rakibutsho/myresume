"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Institute from "./Institute";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  return (
    <section id="education" className="w-full py-24 relative bg-[#0a0a0c] font-sans text-white border-t border-white/5">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest">
          <div>— ACADEMIC BACKGROUND</div>
          <div>[ EDUCATION ]</div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 leading-tight">
          <span className="font-serif italic">Where I've</span> <span className="font-serif italic text-emerald-400">learned.</span>
        </h2>

        {/* Grid of Institutes */}
        <Institute />
        
      </div>
    </section>
  );
};

export default Education;
