"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Institute from "./Institute";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  return (
    <section id="education" className="w-full py-24 relative overflow-hidden font-sans text-white">
      {/* Modern Background Glows */}

      <div className="w-full max-w-300 mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-12">
          <span className="text-sm font-mono text-emerald-400">03</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">Education</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 leading-tight font-serif">
          <span className="">Where I've</span> <span className="text-emerald-400">learned.</span>
        </h2>

        {/* Grid of Institutes */}
        <Institute />
        
      </div>
    </section>
  );
};

export default Education;
