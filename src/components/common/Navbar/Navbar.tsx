"use client";

import { Tooltip } from "@/components/base/tooltip/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  IdCardLanyardIcon,
  Wrench01Icon,
  Mail01Icon,
  Backpack02Icon,
  BookOpen02Icon,
  ModernTvIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/#home", icon: Home01Icon },
  { name: "About", href: "/#about", icon: IdCardLanyardIcon },
  { name: "Skills", href: "/#skills", icon: Wrench01Icon },
  { name: "Experience", href: "/#experience", icon: Backpack02Icon },
  { name: "Projects", href: "/#projects", icon: ModernTvIcon },
  { name: "Testimonials", href: "/#testimonials", icon: BookOpen02Icon },
  { name: "Contact", href: "/#contact", icon: Mail01Icon },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("/#home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname !== "/") return;

      const sectionIds = [
        "home",
        ...navigationLinks
          .map((l) => l.href.replace("/#", ""))
          .filter((id) => id !== "home"),
      ];

      let currentActive = "/#home";
      // Dynamic threshold: 60% of the viewport height.
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
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 50
      ) {
        currentActive = "/#contact";
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
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
    <header className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50">
      {/* Subtle glowing shadow behind the navbar */}
      <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full -z-10" />
      <nav className="relative flex items-center gap-1 sm:gap-2 p-2 bg-[#111]/70 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {navigationLinks.map((link) => {
          const isActive = activeSection === link.href;
          const Icon = link.icon;
          return (
            <div key={link.name} className="relative group">
              <Tooltip title={link.name} placement="top" delay={150} arrow>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ease-out focus:outline-none ${
                    isActive
                      ? "bg-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                      : "text-[#a1a1aa] hover:text-white hover:bg-white/10"
                  }`}
                  aria-label={link.name}
                >
                  <HugeiconsIcon
                    icon={Icon}
                    className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] transition-transform duration-300 ease-out ${
                      isActive
                        ? "scale-100"
                        : "group-hover:scale-110 group-hover:-translate-y-0.5"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </a>
              </Tooltip>
            </div>
          );
        })}
      </nav>
    </header>
  );
};
