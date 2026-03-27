"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import {
  BrickWallShield,
  Crown,
  LucideWrench,
  Package,
  Send,
  SquareCode,
} from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "/", icon: Crown },
  { name: "Projects", href: "/projects", icon: SquareCode },
  { name: "Experience", href: "/experience", icon: Package },
  { name: "Tools", href: "/tools", icon: LucideWrench },
  { name: "Activity", href: "/activity", icon: BrickWallShield },
  { name: "Contact", href: "/contact", icon: Send},
];

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

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
    <header className="sticky top-6 z-50 w-full">
      <div ref={navRef} className="mx-auto mt-6 w-fit relative">
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
          <div className="rounded-2xl bg-black/80 px-4 py-3 backdrop-blur">
            <nav className="flex justify-between items-center gap-2">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    aria-label={link.name}
                    title={link.name}
                    className={`
                      relative grid place-items-center
                      h-10 w-10 rounded-full
                      transition-colors
                      ${
                        isActive
                          ? "bg-white/15 text-white shadow-inner"
                          : "text-white/70 hover:text-white"
                      }
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                    `}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
