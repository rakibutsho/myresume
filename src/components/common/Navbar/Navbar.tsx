"use client";

import { Download, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111827]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-1"
        >
          Rakibul Islam<span className="text-[#10b981]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  isActive ? "text-emerald-400" : "text-white/70"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/cv/Rakibul_Islam.pdf"
            download="Rakibul_Islam.pdf"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-white/80 hover:text-white transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-[#111827] border-l-white/10 w-[80vw] sm:w-[350px]">
                <div className="flex flex-col gap-6 mt-10">
                  <Link
                    href="#home"
                    onClick={(e) => handleClick(e, "#home")}
                    className="text-2xl font-bold tracking-tight text-white mb-4"
                  >
                    Rakib<span className="text-[#10b981]">.</span>
                  </Link>
                  {navigationLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className={`text-lg font-medium transition-colors ${
                          isActive
                            ? "text-emerald-400"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <a
                    href="/cv/Rakibul_Islam.pdf"
                    download="Rakibul_Islam.pdf"
                    className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
