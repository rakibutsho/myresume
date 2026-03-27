"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import {
  Crown,
  Send,
  SquareCode,
  Briefcase,
  User,
  GraduationCap,
  MessageSquareQuote,
  Cpu,
} from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "#home", icon: Crown },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Experience", href: "#experience", icon: Briefcase },
  // { name: "Tools", href: "#tools", icon: LucideWrench },
  { name: "Projects", href: "#projects", icon: SquareCode },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { name: "Contact", href: "#contact", icon: Send },
];

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState("#home");

  // Smooth scroll handler
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection(href);
    },
    [],
  );

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = navigationLinks.map((l) => l.href.replace("#", ""));

    const onScroll = () => {
      const scrollY = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(`#${sectionIds[i]}`);
          return;
        }
      }
      setActiveSection("#home");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const border = borderRef.current;
    if (!nav || !border) return;

    // Intro animation
    gsap.fromTo(
      nav,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );

    // Animated gradient border
    gsap.to(border, {
      backgroundPosition: "200% 50%",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    // --- Magnetic hover ---
    const strength = 16;

    const qx = itemRefs.current.map((el) =>
      el ? gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" }) : null,
    );
    const qy = itemRefs.current.map((el) =>
      el ? gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" }) : null,
    );

    const onMove = (i: number) => (e: MouseEvent) => {
      const el = itemRefs.current[i];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      const x = (relX / (rect.width / 2)) * strength;
      const y = (relY / (rect.height / 2)) * strength;

      qx[i]?.(x);
      qy[i]?.(y);

      gsap.to(el, { scale: 1.08, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = (i: number) => () => {
      const el = itemRefs.current[i];
      if (!el) return;

      qx[i]?.(0);
      qy[i]?.(0);

      gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    const cleanups: Array<() => void> = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const move = onMove(i);
      const leave = onLeave(i);

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);

      cleanups.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <header className="sticky top-4 z-50 w-full">
      <div ref={navRef} className="mx-auto mt-4 w-fit relative">
        {/* Animated border glow */}
        <div
          ref={borderRef}
          className="
            absolute -inset-px rounded-full blur-md opacity-50
            bg-size-[200%_200%]
            bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500
          "
          style={{ backgroundPosition: "0% 50%" }}
        />

        {/* Border */}
        <div className="relative rounded-2xl p-px bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500">
          {/* Inner surface */}
          <div className="rounded-2xl bg-black/80 px-3 py-2.5 backdrop-blur-xl">
            <nav className="flex justify-between items-center gap-1.5">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    aria-label={link.name}
                    title={link.name}
                    className={`
                      relative grid place-items-center
                      h-9 w-9 rounded-full
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-white/15 text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                    `}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
