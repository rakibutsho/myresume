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
      {/* Main Container */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-10 border-b border-white/5 relative z-10">
        {/* Left: Name and Title */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <h3 className="text-xl md:text-2xl font-serif text-white font-bold tracking-wide">
            Rakibul Islam<span className="text-emerald-400">.</span>
          </h3>
          <p className="text-[#a1a1aa] text-[13px] font-medium tracking-wide mt-1">
            Full-Stack Software Engineer{" "}
            <span className="text-emerald-400 mx-1">/</span> Dhaka, BD
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[13px] md:text-[14px] font-medium text-[#a1a1aa] mt-2 md:mt-1">
          <a
            href="/#about"
            onClick={(e) => handleScroll(e, "/#about")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            About
          </a>
          <a
            href="/#skills"
            onClick={(e) => handleScroll(e, "/#skills")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Skills
          </a>
          <a
            href="/#education"
            onClick={(e) => handleScroll(e, "/#education")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Education
          </a>
          <a
            href="/#experience"
            onClick={(e) => handleScroll(e, "/#experience")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Experience
          </a>
          <a
            href="/#projects"
            onClick={(e) => handleScroll(e, "/#projects")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a
            href="/#testimonials"
            onClick={(e) => handleScroll(e, "/#testimonials")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Testimonials
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleScroll(e, "/#contact")}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link
            href="https://github.com/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-[#18181b] border border-white/5 flex items-center justify-center text-[#a1a1aa] hover:text-emerald-400 hover:bg-white/5 hover:border-emerald-500/30 transition-all shadow-sm"
            aria-label="GitHub"
          >
            <HugeiconsIcon
              aria-hidden="true"
              icon={GithubIcon}
              className="w-4 h-4"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-[#18181b] border border-white/5 flex items-center justify-center text-[#a1a1aa] hover:text-[#0a66c2] hover:bg-white/5 hover:border-[#0a66c2]/30 transition-all shadow-sm"
            aria-label="LinkedIn"
          >
            <HugeiconsIcon
              aria-hidden="true"
              icon={Linkedin02Icon}
              className="w-4 h-4 fill-current"
            />
          </Link>
          <Link
            href="mailto:mail@rakibutsho.dev"
            className="w-11 h-11 rounded-full bg-[#18181b] border border-white/5 flex items-center justify-center text-[#a1a1aa] hover:text-emerald-400 hover:bg-white/5 hover:border-emerald-500/30 transition-all shadow-sm"
            aria-label="Email"
          >
            <HugeiconsIcon icon={Mail01FreeIcons}
            aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom: Copyright & Attribution */}
      <div className="w-full max-w-[1200px] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#a1a1aa] font-medium relative z-10">
        <p>© {new Date().getFullYear()} Rakibul Islam. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Built with <span className="text-emerald-400 text-sm">♥</span> in BD
        </p>
      </div>
    </footer>
  );
};
