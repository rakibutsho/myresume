"use client";

import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";
import { PdfModal } from "../PdfModal/PdfModal";

const signatureFont = Dancing_Script({ subsets: ["latin"], weight: "700" });

const navigationLinks = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Education", href: "/#education" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.location.pathname !== "/") return;

      const sectionIds = [
        "home",
        ...navigationLinks.map((l) => l.href.replace("/#", "")),
      ];

      let currentActive = "/#home";
      // Dynamic threshold: 60% of the viewport height. 
      // This means a section becomes active when its top edge crosses the lower middle of the screen.
      const threshold = window.innerHeight * 0.6;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = `/#${sectionIds[i]}`;
            break;
          }
        }
      }

      // If we've scrolled to the absolute bottom, activate the last section
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        currentActive = "/#contact";
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
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
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "top-4 px-4" : "top-0 px-0"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 w-full ${
            scrolled
              ? "max-w-[1000px] bg-[#0f0f11]/90 backdrop-blur-lg border border-white/10 rounded-full py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "max-w-[1200px] bg-transparent py-6 px-4 md:px-8 border-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/#home"
            onClick={(e) => handleClick(e, "/#home")}
            className={`text-2xl md:text-3xl font-bold tracking-wide text-white flex items-center gap-1 hover:text-emerald-400 transition-colors shrink-0 ${signatureFont.className}`}
          >
            Rakibul<span className="text-[#10b981]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <div
                  key={link.name}
                  className="relative group flex items-center"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`text-[11px] font-bold tracking-widest uppercase transition-colors hover:text-white ${
                      isActive ? "text-white" : "text-[#a1a1aa]"
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className={`hidden md:flex items-center gap-2 rounded-full font-bold uppercase tracking-widest transition-all group ${
                scrolled
                  ? "bg-white/10 text-white hover:bg-emerald-400 hover:text-black px-4 py-2 text-[10px]"
                  : "bg-white text-black hover:bg-emerald-400 hover:text-black px-5 py-2.5 text-xs"
              }`}
            >
              Resume
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Nav */}
            <div className="xl:hidden">
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
              href="/#home"
              onClick={(e) => {
                handleClick(e, "/#home");
                setMobileMenuOpen(false);
              }}
              className={`text-3xl font-bold tracking-wide text-white ${signatureFont.className}`}
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
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-transparent"}`}
                  />
                  {link.name}
                </a>
              );
            })}

            <div className="mt-auto pt-6 border-t border-white/10 pb-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPdfModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-full bg-white hover:bg-emerald-400 text-black font-bold uppercase tracking-widest transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="/cv/Rakibul%20Islam.pdf"
      />
    </>
  );
};
