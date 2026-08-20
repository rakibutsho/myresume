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
    <footer className="w-full flex flex-col items-center justify-center pt-10 pb-10 px-4 mt-20 relative overflow-hidden bg-transparent">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-10 border-b border-[#1E3A5F] relative z-10">

        {/* Name & Title */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <h3 className="text-xl md:text-2xl font-mono text-white font-bold tracking-wide">
            Rakibul Islam<span className="text-[#2C74B3]">.</span>
          </h3>
          <p className="text-[#8B9BB4] text-[13px] font-sans tracking-wide mt-1">
            Full-Stack Software Engineer{" "}
            <span className="text-[#2C74B3] mx-1">/</span> Dhaka, BD
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[13px] md:text-[14px] font-mono text-[#4A6274] mt-2 md:mt-1">
          {[
            { label: "About", href: "/#about" },
            { label: "Skills", href: "/#skills" },
            { label: "Education", href: "/#education" },
            { label: "Experience", href: "/#experience" },
            { label: "Projects", href: "/#projects" },
            { label: "Testimonials", href: "/#testimonials" },
            { label: "Contact", href: "/#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleScroll(e, href)}
              className="hover:text-[#2C74B3] transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link
            href="https://github.com/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-[#0D1421] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
            aria-label="GitHub"
          >
            <HugeiconsIcon aria-hidden icon={GithubIcon} className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rakibutsho"
            target="_blank"
            className="w-11 h-11 rounded-full bg-[#0D1421] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
            aria-label="LinkedIn"
          >
            <HugeiconsIcon aria-hidden icon={Linkedin02Icon} className="w-4 h-4 fill-current" />
          </Link>
          <Link
            href="mailto:mail@rakibutsho.dev"
            className="w-11 h-11 rounded-full bg-[#0D1421] border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 transition-all"
            aria-label="Email"
          >
            <HugeiconsIcon aria-hidden icon={Mail01FreeIcons} className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-[1200px] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#4A6274] font-mono relative z-10">
        <p>© {new Date().getFullYear()} Rakibul Islam. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Built with <span className="text-[#2C74B3] text-sm">♥</span> in BD
        </p>
      </div>
    </footer>
  );
};
