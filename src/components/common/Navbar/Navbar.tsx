"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Active section tracker
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname !== "/") return;
      const sectionIds = ["home", "about", "skills", "education", "experience", "projects", "testimonials", "contact"];
      let current = "/#home";
      const threshold = window.innerHeight * 0.3;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = `/#${sectionIds[i]}`;
          break;
        }
      }
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        current = "/#contact";
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
      className="fixed top-0 left-0 right-0 z-50 opacity-0"
      style={{ borderBottom: "1px solid #3D3D3D" }}
    >
      <div
        className="w-full backdrop-blur-md"
        style={{ background: "rgba(18,18,18,0.85)" }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* Brand */}
          <a
            href="/#home"
            onClick={(e) => handleClick(e, "/#home")}
            className="font-mono text-base font-semibold tracking-tight transition-colors"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-roboto)" }}
          >
            Rakibul Islam
            <span className="cursor-blink ml-0.5" style={{ color: "#A6A6A6" }}>_</span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative text-[14px] font-sans transition-colors duration-200 group"
                  style={{ color: isActive ? "#FFFFFF" : "#A6A6A6" }}
                >
                  {link.name}
                  {/* Underline slide */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                    style={{
                      background: "#FFFFFF",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "#A6A6A6" }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Resume CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn-outline text-[13px] py-2 px-5"
            >
              Résumé ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-300"
                style={{
                  background: "#F5F5F5",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)"
                    : menuOpen && i === 1 ? "scaleX(0)"
                    : menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden flex flex-col px-6 pb-6 gap-5"
            style={{ borderTop: "1px solid #3D3D3D" }}
          >
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-[15px] font-sans py-1 transition-colors"
                  style={{ color: isActive ? "#FFFFFF" : "#A6A6A6" }}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn-outline text-[13px] self-start"
            >
              Résumé ↗
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
