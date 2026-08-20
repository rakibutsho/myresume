"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Linkedin02Icon,
  Mail01FreeIcons,
} from "@hugeicons/core-free-icons";
import React, { useCallback } from "react";
import { Link } from "react-aria-components";

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (window.location.pathname !== "/") return;
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
    []
  );

  return (
    <footer className="w-full flex flex-col items-center justify-center pt-16 pb-32 px-4 mt-20 relative overflow-hidden bg-[#050B14]">
      
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[#2C74B3]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Terminal Closing Flair */}
      <div className="w-full max-w-[1200px] mb-12 flex justify-center">
        <div className="font-mono text-[13px] text-[#4A6274] bg-[#071626] px-6 py-2 rounded-full border border-[#1E3A5F]">
          <span className="text-[#2C74B3] mr-2">$</span>
          <span>exit_session --status=success</span>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pb-12 border-b border-[#1E3A5F]/50 relative z-10">

        {/* Name & Title */}
        <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
          <h3 className="text-2xl md:text-3xl font-serif text-white font-bold tracking-wide flex items-center gap-1">
            Rakibul Islam<span className="text-[#60A8E0] animate-pulse">_</span>
          </h3>
          <p className="text-[#8B9BB4] text-[14px] font-mono tracking-wide">
            Full-Stack Software Engineer
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[#4A6274] font-mono text-[11px] uppercase tracking-widest">Dhaka, BD (Online)</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center lg:justify-end gap-4">
          <Link
            href="https://github.com/rakibutsho"
            target="_blank"
            className="group relative w-10 h-10 rounded-lg bg-[#071626] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#0A2647] hover:bg-[#60A8E0] hover:border-[#60A8E0] transition-all duration-300 shadow-[0_0_10px_rgba(10,38,71,0)] hover:shadow-[0_0_20px_rgba(96,168,224,0.4)]"
            aria-label="GitHub"
          >
            <HugeiconsIcon aria-hidden icon={GithubIcon} className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rakibutsho"
            target="_blank"
            className="group relative w-10 h-10 rounded-lg bg-[#071626] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#0A2647] hover:bg-[#60A8E0] hover:border-[#60A8E0] transition-all duration-300 shadow-[0_0_10px_rgba(10,38,71,0)] hover:shadow-[0_0_20px_rgba(96,168,224,0.4)]"
            aria-label="LinkedIn"
          >
            <HugeiconsIcon aria-hidden icon={Linkedin02Icon} className="w-4 h-4 fill-current" />
          </Link>
          <Link
            href="mailto:mail@rakibutsho.dev"
            className="group relative w-10 h-10 rounded-lg bg-[#071626] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#0A2647] hover:bg-[#60A8E0] hover:border-[#60A8E0] transition-all duration-300 shadow-[0_0_10px_rgba(10,38,71,0)] hover:shadow-[0_0_20px_rgba(96,168,224,0.4)]"
            aria-label="Email"
          >
            <HugeiconsIcon aria-hidden icon={Mail01FreeIcons} className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-[1200px] pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <p className="text-[12px] text-[#4A6274] font-mono tracking-wider text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-white">Rakibul Islam</span>. All systems operational.
        </p>

        <p className="flex items-center gap-1.5 text-[12px] text-[#4A6274] font-mono tracking-wider">
          Crafted with <span className="text-[#60A8E0] text-sm animate-pulse">⚡</span> in BD
        </p>

      </div>
    </footer>
  );
};
