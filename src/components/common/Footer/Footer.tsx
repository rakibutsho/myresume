"use client";

import { Github, Linkedin } from "lucide-react";
import React, { useCallback } from "react";

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (window.location.pathname !== "/") {
        return;
      }

      e.preventDefault();
      const id = href.replace(/.*#/, "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <footer className="w-full flex flex-col items-center justify-center pt-10 pb-10 px-4 mt-20 relative overflow-hidden bg-transparent">
      {/* Modern Background Glows - Optional ambient glow to match theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-10 border-b border-white/10 relative z-10">
        {/* Left: Name and Title */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <h3 className="text-xl md:text-2xl font-serif text-white font-bold tracking-wide">
            Rakibul Islam
          </h3>
          <p className="text-[#a1a1aa] text-[13px] font-medium tracking-wide">
            Full-Stack Software Engineer · Dhaka, Bangladesh
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[13px] md:text-[14px] font-medium text-[#a1a1aa] mt-2 md:mt-1">
          <a
            href="/#about"
            onClick={(e) => handleScroll(e, "/#about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </a>
          <a
            href="/#skills"
            onClick={(e) => handleScroll(e, "/#skills")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Skills
          </a>
          <a
            href="/#education"
            onClick={(e) => handleScroll(e, "/#education")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Education
          </a>
          <a
            href="/#experience"
            onClick={(e) => handleScroll(e, "/#experience")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Experience
          </a>
          <a
            href="/#projects"
            onClick={(e) => handleScroll(e, "/#projects")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a
            href="/#testimonials"
            onClick={(e) => handleScroll(e, "/#testimonials")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Testimonials
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleScroll(e, "/#contact")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a
            href="https://github.com/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all shadow-sm"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-[#0a66c2] hover:bg-white/5 hover:border-white/20 transition-all shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 fill-current" />
          </a>
          {/* <a 
            href="#" 
            target="_blank" 
            className="w-11 h-11 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all shadow-sm"
            aria-label="X (Twitter)"
          >
            <span className="text-[13px] font-bold font-sans">𝕏</span>
          </a> */}
          <a
            href="mailto:rakibutsho1920@gmail.com"
            className="w-11 h-11 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/5 hover:border-white/20 transition-all shadow-sm"
            aria-label="Email"
          >
            <span className="text-[15px] font-bold font-mono">@</span>
          </a>
        </div>
      </div>

      {/* Bottom: Copyright & Attribution */}
      <div className="w-full max-w-[1200px] pt-8 flex flex-col items-center justify-center gap-2 text-[13px] text-[#a1a1aa] font-medium relative z-10">
        <p className="flex items-center gap-1.5">
          Built with <span className="text-red-500 text-sm">♥</span> by Rakibul
          Islam
        </p>
        <p>© {new Date().getFullYear()} · All rights reserved</p>
      </div>
    </footer>
  );
};
