"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { name: "about.md", href: "/#about" },
  { name: "projects/", href: "/#projects" },
  { name: "experience.log", href: "/#experience" },
  { name: "skills/", href: "/#skills" },
  { name: "contact.sh", href: "/#contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("/#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (typeof window === "undefined" || window.location.pathname !== "/")
        return;
      const sectionIds = [
        "home",
        "about",
        "projects",
        "experience",
        "skills",
        "contact",
      ];
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace(/.*#/, "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090D]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <a
          href="/#home"
          onClick={(e) => handleNavClick(e, "/#home")}
          className="flex items-center gap-2.5 text-white group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center font-mono text-xs text-sky-400 group-hover:border-sky-400/50 group-hover:bg-sky-400/10 transition-all duration-300">
            &gt;_
          </div>
          <div className="flex items-center font-mono text-xs sm:text-sm tracking-tight">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-slate-100 font-semibold ml-1.5 group-hover:text-white transition-colors">
              rakib
            </span>
            <span className="text-slate-500">@</span>
            <span className="text-sky-400 font-medium">terminal</span>
            <span className="text-slate-500">:~</span>
            <span className="inline-block w-1.5 h-3.5 bg-amber-400 animate-pulse ml-1" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/[0.1] shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-medium border-white/[0.1] bg-white/[0.03] hover:bg-white hover:text-black hover:border-white transition-all duration-300 h-9 px-4 gap-1.5"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#08090D]/95 backdrop-blur-xl px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Full-Stack Roles</span>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <Button
              className="w-full rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors"
              asChild
            >
              <a
                href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Resume ↗
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
