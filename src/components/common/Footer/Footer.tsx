"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined" || window.location.pathname !== "/") return;
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
    <footer className="w-full pt-20 pb-12 bg-background border-t border-border">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-border">
          
          <div className="md:col-span-6 space-y-3">
            <a
              href="/#home"
              onClick={(e) => handleScroll(e, "/#home")}
              className="font-display text-xl font-bold uppercase tracking-tight text-foreground hover:text-accent transition-colors block"
            >
              Md. Rakibul Islam
            </a>
            <p className="text-sm text-fg-subtle font-normal max-w-md leading-relaxed">
              Full-Stack Software Engineer building resilient client architectures, distributed backend APIs, and performant web products.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                Available for Q1 / Q2 Engagements
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle block font-bold">
              Navigation
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-semibold">
              {[
                { name: "About",      href: "/#about"       },
                { name: "Skills",     href: "/#skills"      },
                { name: "Experience", href: "/#experience"  },
                { name: "Projects",   href: "/#projects"    },
                { name: "Contact",    href: "/#contact"     },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-fg-muted hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle block font-bold">
              Connect
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-semibold">
              {[
                { label: "GitHub",   href: "https://github.com/rakibutsho"          },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/rakibutsho" },
                { label: "Email",    href: "mailto:mail@rakibutsho.dev"             },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-accent transition-colors flex items-center gap-1"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-2xs uppercase tracking-widest text-fg-subtle">
          <div>
            © {new Date().getFullYear()} RAKIBUL ISLAM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>DHAKA [23.8103° N]</span>
            <span className="text-border">/</span>
            <span>NEXT.JS · TAILWIND · SHADCN</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
