"use client";

import React, { useCallback } from "react";
import Link from "next/link";

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (window.location.pathname !== "/") return;
      e.preventDefault();
      const id = href.replace(/.*#/, "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <footer
      className="w-full pt-16 pb-10 px-6 md:px-12 relative"
      style={{ borderTop: "1px solid #3D3D3D", background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-10 mb-10" style={{ borderBottom: "1px solid #3D3D3D" }}>

          {/* Brand */}
          <div>
            <a
              href="/#home"
              onClick={(e) => handleScroll(e, "/#home")}
              className="font-mono font-bold text-white text-[20px] tracking-tight block mb-2"
              style={{ fontFamily: "var(--font-roboto)", letterSpacing: "-0.02em" }}
            >
              Rakibul Islam
            </a>
            <p className="font-sans text-[13px]" style={{ color: "#A6A6A6" }}>
              Full-Stack Software Engineer · Dhaka, Bangladesh
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#A6A6A6" }}>
                Open to work
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              { name: "About",      href: "/#about"       },
              { name: "Skills",     href: "/#skills"      },
              { name: "Experience", href: "/#experience"  },
              { name: "Projects",   href: "/#projects"    },
              { name: "Contact",    href: "/#contact"     },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-sans text-[13px] transition-colors hover:text-white"
                style={{ color: "#A6A6A6" }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { label: "GitHub",   href: "https://github.com/rakibutsho",             char: "⌥" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/rakibutsho",    char: "in" },
              { label: "Email",    href: "mailto:mail@rakibutsho.dev",                char: "@"  },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center font-mono text-[12px] rounded-[8px] transition-all"
                style={{
                  border: "1px solid #3D3D3D",
                  color: "#A6A6A6",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#FFFFFF";
                  el.style.color = "#121212";
                  el.style.borderColor = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#A6A6A6";
                  el.style.borderColor = "#3D3D3D";
                }}
              >
                {s.char}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[12px]" style={{ color: "#A6A6A6" }}>
            © {new Date().getFullYear()}{" "}
            <span className="text-white">Rakibul Islam</span>. All rights reserved.
          </p>
          <p className="font-sans text-[12px]" style={{ color: "#A6A6A6" }}>
            Built with Next.js · Tailwind CSS · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};
