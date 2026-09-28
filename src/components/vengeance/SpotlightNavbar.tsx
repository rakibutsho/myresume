"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  activeIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/#home" },
    { label: "Work", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Skills", href: "/#skills" },
    { label: "About", href: "/#about" },
  ],
  className,
  onItemClick,
  activeIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const spotlightX = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeItem = nav.querySelector(
      `[data-index="${activeIndex}"]`,
    ) as HTMLElement | null;
    if (activeItem) {
      const rect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - rect.left + itemRect.width / 2;
      spotlightX.current = targetX;
      nav.style.setProperty("--spotlight-x", `${targetX}px`);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      const currentActiveItem = nav.querySelector(
        `[data-index="${activeIndex}"]`,
      ) as HTMLElement | null;
      if (currentActiveItem) {
        const rect = nav.getBoundingClientRect();
        const itemRect = currentActiveItem.getBoundingClientRect();
        const targetX = itemRect.left - rect.left + itemRect.width / 2;
        animate(spotlightX.current, targetX, {
          duration: 0.4,
          ease: "easeOut",
          onUpdate: (v) => {
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  return (
    <div
      ref={navRef}
      className={cn(
        "relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-1 py-1",
        className,
      )}
      style={
        {
          "--spotlight-x": "50%",
        } as React.CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
        aria-hidden
      >
        <span
          className="absolute top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent transition-none"
          style={{ left: "var(--spotlight-x)" }}
        />
      </span>

      {items.map((item, i) => (
        <Link
          key={item.href}
          data-index={i}
          href={item.href}
          onClick={() => {
            onItemClick?.(item, i);
          }}
          className={cn(
            "relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
            i === activeIndex
              ? "text-white bg-white/[0.08]"
              : "text-slate-400 hover:text-white",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
