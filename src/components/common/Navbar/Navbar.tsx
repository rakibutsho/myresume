"use client";

import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section
      const sectionIds = [
        "home",
        ...navigationLinks.map((l) => l.href.replace("#", "")),
      ];
      const scrollY = window.scrollY + 100;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(`#${sectionIds[i]}`);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-1 hover:text-emerald-400 transition-colors"
        >
          Rakibul<span className="text-[#10b981]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
               <div key={link.name} className="relative group flex items-center">
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-[#a1a1aa]"
                  }`}
                >
                  {link.name}
                </a>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/cv/Rakibul_Islam.pdf"
            download="Rakibul_Islam.pdf"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all group"
          >
            Resume
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -mr-2 text-white hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Drawer */}
      <div 
        className="lg:hidden"
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 bottom-0 right-0 z-[101] w-[85vw] sm:w-[350px] bg-[#09090b] border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <Link
              href="#home"
              onClick={(e) => {
                handleClick(e, "#home");
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-bold tracking-tight text-white"
            >
              Rakibul<span className="text-emerald-400">.</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl text-sm tracking-widest font-bold uppercase transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-[#a1a1aa] hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-transparent"}`} />
                  {link.name}
                </a>
              );
            })}

            <div className="mt-auto pt-6 border-t border-white/10 pb-4">
              <a
                href="/cv/Rakibul_Islam.pdf"
                download="Rakibul_Islam.pdf"
                className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-full bg-white hover:bg-emerald-400 text-black font-bold uppercase tracking-widest transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
