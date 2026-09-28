"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import {
  SpotlightNavbar,
  type NavItem,
} from "@/components/vengeance/SpotlightNavbar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = [
        "projects",
        "experience",
        "skills",
        "about",
        "contact",
      ];
      const threshold = Math.min(window.innerHeight * 0.4, 300);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= threshold) {
          setActiveIndex(i);
          return;
        }
      }
      setActiveIndex(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return;
    }
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace(/.*#/, "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSpotlightClick = (_item: NavItem, index: number) => {
    setActiveIndex(index);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return;
    }
    const id = _item.href.replace(/.*#/, "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo / Prompt */}
        <Link
          href="/#home"
          className="flex items-center gap-2 text-white group shrink-0"
          aria-label="Md. Rakibul Islam — Home"
        >
          <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.1] flex items-center justify-center font-mono text-[11px] text-sky-400 group-hover:border-sky-400/40 group-hover:bg-sky-400/10 transition-all duration-200">
            &gt;_
          </div>
          <span className="hidden sm:block font-mono text-sm font-semibold text-slate-100 tracking-tight group-hover:text-white transition-colors">
            rakib
          </span>
        </Link>

        {/* Center: SpotlightNavbar */}
        <nav
          className="hidden md:flex flex-1 justify-center"
          aria-label="Main navigation"
        >
          <SpotlightNavbar
            items={NAV_ITEMS}
            activeIndex={activeIndex}
            onItemClick={handleSpotlightClick}
          />
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Available</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex rounded-full text-xs text-slate-400 hover:text-white h-8 px-3 gap-1.5 cursor-pointer"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </Button>

          <Button
            size="sm"
            className="rounded-full text-xs font-medium bg-sky-500 hover:bg-sky-400 text-white h-8 px-4 gap-1.5 cursor-pointer transition-colors"
            asChild
          >
            <Link href="/#contact">
              Hire me
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-b border-white/[0.08] bg-[#08090D]/98 backdrop-blur-xl px-4 py-5 space-y-2"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-slate-600 text-xs">↗</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              Resume ↗
            </a>
            <Button
              className="w-full rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors"
              asChild
            >
              <Link href="/#contact" onClick={() => setMenuOpen(false)}>
                Hire me
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
