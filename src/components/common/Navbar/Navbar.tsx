"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const navigationLinks = [
  { name: "About",      href: "/#about"       },
  { name: "Skills",     href: "/#skills"      },
  { name: "Experience", href: "/#experience"  },
  { name: "Projects",   href: "/#projects"    },
  { name: "Contact",    href: "/#contact"     },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("/#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined" || window.location.pathname !== "/") return;
      const sectionIds = ["home", "about", "skills", "experience", "projects", "contact"];
      let current = "/#home";
      const threshold = window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = `/#${sectionIds[i]}`;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace(/.*#/, "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md transition-all"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a
          href="/#home"
          onClick={(e) => handleClick(e, "/#home")}
          className="flex items-baseline gap-2.5 text-foreground group"
        >
          <span className="font-display text-sm tracking-tight font-bold group-hover:text-accent transition-colors">
            RAKIBUL ISLAM
          </span>
          <span className="text-border text-xs">/</span>
          <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
            EDITION 2026
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
                  isActive ? "text-foreground" : "text-fg-subtle hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-2xs font-medium text-fg-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden lg:inline uppercase tracking-wider">Available</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-2xs uppercase tracking-widest font-bold border-border hover:border-accent hover:text-accent h-8 px-4"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé ↗
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-5 h-[1.5px] bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block text-sm uppercase tracking-wider font-semibold text-fg-muted hover:text-accent py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-widest" asChild>
              <a
                href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Résumé ↗
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
