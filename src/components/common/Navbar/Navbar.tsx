"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  LayoutGrid,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleNavMode, setNavMode } from "@/redux/features/ui/uiSlice";
import { Shell } from "@/components/common/Shell";

const NAV_ITEMS = [
  { name: "about.md", href: "/#about" },
  { name: "skills/", href: "/#skills" },
  { name: "education.json", href: "/#education" },
  { name: "experience.log", href: "/#experience" },
  { name: "projects/", href: "/#projects" },
  { name: "contact.sh", href: "/#contact" },
];

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navMode = useAppSelector((state) => state.ui.navMode);

  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("/#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global hotkeys to switch to Shell Mode: "/", Ctrl+K, or Ctrl+`
  useEffect(() => {
    const handleGlobalHotkey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (
        e.key === "/" ||
        ((e.ctrlKey || e.metaKey) &&
          (e.key === "`" || e.key.toLowerCase() === "k"))
      ) {
        e.preventDefault();
        dispatch(setNavMode("shell"));
      }
    };
    window.addEventListener("keydown", handleGlobalHotkey);
    return () => window.removeEventListener("keydown", handleGlobalHotkey);
  }, [dispatch]);

  const isShellMode = mounted && navMode === "shell";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (typeof window === "undefined" || window.location.pathname !== "/")
        return;

      // Bottom of page detection (ensure contact is marked active when scrolled to bottom)
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("/#contact");
        return;
      }

      // Exact vertical DOM sequence of sections on the home page
      const sectionIds = [
        "home",
        "about",
        "skills",
        "education",
        "experience",
        "projects",
        "contact",
      ];

      let current = "/#home";
      const threshold = Math.min(window.innerHeight * 0.35, 260);

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
          ? "bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand */}
        <a
          href="/#home"
          onClick={(e) => handleNavClick(e, "/#home")}
          className="flex items-center gap-2 text-white group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center font-mono text-xs text-sky-400 group-hover:border-sky-400/50 group-hover:bg-sky-400/10 transition-all duration-300">
            &gt;_
          </div>
          <div className="hidden sm:flex items-center font-mono text-xs sm:text-sm tracking-tight">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-slate-100 font-semibold ml-1.5 group-hover:text-white transition-colors">
              rakib
            </span>
            <span className="text-slate-500">@</span>
            <span className="text-sky-400 font-medium">box</span>
            <span className="text-slate-500">:~</span>
            <span className="inline-block w-1.5 h-3.5 bg-amber-400 animate-pulse ml-1" />
          </div>
        </a>

        {/* Center: Shell Prompt or Traditional GUI Pills */}
        <div className="flex-1 max-w-2xl mx-2 hidden md:flex justify-center">
          {isShellMode ? (
            <Shell className="w-full" />
          ) : (
            <nav className="flex items-center gap-0.5 lg:gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-2.5 lg:px-3.5 py-1 rounded-full text-xs font-medium font-mono transition-all duration-200 ${
                      isActive
                        ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right CTA & Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mode Switcher Button */}
          <button
            type="button"
            onClick={() => dispatch(toggleNavMode())}
            title={
              isShellMode ? "Switch to GUI Mode" : "Switch to Shell Mode (/)"
            }
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
          >
            {isShellMode ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline text-[11px]">GUI Mode</span>
              </>
            ) : (
              <>
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">Shell Mode</span>
                <span className="hidden lg:inline text-[9px] text-slate-500 px-1 rounded bg-slate-800 border border-slate-700">
                  /
                </span>
              </>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-medium border-white/[0.1] bg-white/[0.03] hover:bg-white hover:text-black hover:border-white transition-all duration-300 h-8 sm:h-9 px-3 sm:px-4 gap-1.5 cursor-pointer"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </Button>

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
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#08090D]/98 backdrop-blur-xl px-4 py-5 space-y-4">
          {/* Shell in mobile drawer */}
          {mounted && (
            <div className="pt-1 pb-2">
              <Shell
                className="w-full"
                onCommandRun={() => setMenuOpen(false)}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t border-b border-white/[0.06] py-2.5">
            <span className="text-xs font-mono text-slate-400">
              Navigation Mode
            </span>
            <button
              onClick={() => dispatch(toggleNavMode())}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 text-xs font-mono text-emerald-400 border border-slate-700"
            >
              {isShellMode ? "Switch to GUI" : "Switch to Shell"}
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="text-slate-600">&gt;</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.08]">
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
