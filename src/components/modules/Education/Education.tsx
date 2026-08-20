"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Institute from "./Institute";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  return (
    <section
      id="education"
      className="w-full py-24 relative overflow-hidden font-sans text-white"
    >
      {/* Modern Background Glows */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-[#2C74B3]">03</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">
            Education
          </span>
        </div>

        {/* Heading */}
        <h2 className="fade-up-element text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 leading-tight font-serif">
          Academic <span className="text-[#2C74B3]">foundation</span>
        </h2>

        {/* Grid of Institutes */}
        <Institute />
      </div>
    </section>
  );
};

export default Education;
