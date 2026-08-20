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
  Mortarboard01Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const navigationLinks = [
  { name: "Home", href: "/#home", icon: Home01Icon },
  { name: "About", href: "/#about", icon: IdCardLanyardIcon },
  { name: "Skills", href: "/#skills", icon: Wrench01Icon },
  { name: "Education", href: "/#education", icon: Mortarboard01Icon },
  { name: "Experience", href: "/#experience", icon: Backpack02Icon },
  { name: "Projects", href: "/#projects", icon: ModernTvIcon },
  { name: "Testimonials", href: "/#testimonials", icon: BookOpen02Icon },
  { name: "Contact", href: "/#contact", icon: Mail01Icon },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("/#home");
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        // Color shifting effect
        gsap.to(glowRef.current, {
          keyframes: [
            { backgroundColor: "rgba(44, 116, 179, 0.25)", duration: 3 },  // brand blue
            { backgroundColor: "rgba(32, 82, 149, 0.25)", duration: 3 },   // mid blue
            { backgroundColor: "rgba(20, 66, 114, 0.25)", duration: 3 },   // dark blue
            { backgroundColor: "rgba(10, 38, 71, 0.25)",  duration: 3 },   // deep navy
            { backgroundColor: "rgba(44, 116, 179, 0.25)", duration: 3 },  // back to blue
          ],
          repeat: -1,
          ease: "linear",
        });

        // Pulsing scale and opacity
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.6,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

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
      // Dynamic threshold: 30% of the viewport height.
      const threshold = window.innerHeight * 0.3;

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
      {/* GSAP animated glowing shadow behind the navbar */}
      <div 
        ref={glowRef}
        className="absolute inset-0 blur-[24px] rounded-full -z-10 bg-[#2C74B3]/20" 
      />
      <nav className="relative flex items-center gap-1 sm:gap-1.5 p-1.5 bg-[#071626]/70 backdrop-blur-xl border border-[#205295]/30 rounded-full shadow-[0_8px_32px_rgba(10,38,71,0.8)]">
        {navigationLinks.map((link) => {
          const isActive = activeSection === link.href;
          const Icon = link.icon;
          return (
            <div key={link.name} className="relative group">
              <Tooltip title={link.name} placement="top" delay={150} arrow>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 ease-out focus:outline-none ${
                    isActive
                      ? "bg-gradient-to-tr from-[#144272] to-[#2C74B3] text-white shadow-[0_0_15px_rgba(44,116,179,0.4)] border border-[#60A8E0]/20"
                    : "text-[#8B9BB4] hover:text-white hover:bg-[#144272]/40"
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
                    strokeWidth={isActive ? 2 : 1.5}
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
