"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import {
  SpotlightNavbar,
  type NavItem,
} from "@/components/vengeance/SpotlightNavbar";

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["about", "projects", "experience", "education"];
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
    <div className="fixed top-8 sm:top-10 left-1/2 -translate-x-1/2 z-50">
      
      {/* Mobile drawer (pops up below the dock) */}
      {menuOpen && (
        <div className="md:hidden absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-sm rounded-2xl border border-white/[0.08] bg-[#0E1116]/95 backdrop-blur-xl px-4 py-4 shadow-2xl flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* The Dock */}
      <nav
        className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-[2rem] border border-white/[0.06] bg-[#11131A]/90 backdrop-blur-md shadow-2xl"
        aria-label="Primary Dock"
      >
        {/* Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, "/#hero")}
          className="flex items-center px-3 gap-1 font-mono text-base font-semibold hover:opacity-80 transition-opacity shrink-0"
          aria-label="Home"
        >
          <span className="text-emerald-400">&lt;</span>
          <span className="text-white">Rakib</span>
          <span className="text-emerald-400">/&gt;</span>
        </Link>

        {/* Separator */}
        <div className="h-6 w-px bg-white/[0.08] mx-2 hidden sm:block"></div>

        {/* Desktop Links (Spotlight) */}
        <div className="hidden md:block">
          <SpotlightNavbar
            items={NAV_ITEMS}
            activeIndex={activeIndex}
            onItemClick={handleSpotlightClick}
            className="border-none bg-transparent px-0 py-0"
          />
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-white/[0.08] mx-2 hidden md:block"></div>

        {/* Search Bar Button */}
        <button
          className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.04] hover:bg-white/[0.08] transition-colors text-slate-400 hover:text-slate-200"
          title="Search"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search</span>
          </div>
          <div className="flex items-center justify-center px-1.5 py-0.5 rounded-md bg-white/[0.08] text-[10px] font-mono tracking-widest text-slate-400">
            ⌘K
          </div>
        </button>

        {/* Theme Toggle */}
        <button
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          title="Toggle Theme"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.1] transition-colors shrink-0 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>
    </div>
  );
};
