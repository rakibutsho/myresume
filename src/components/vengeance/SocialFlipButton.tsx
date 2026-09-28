"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const DEFAULT_ITEMS: SocialItem[] = [
  {
    letter: "G",
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/rakibutsho",
  },
  {
    letter: "L",
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rakibutsho",
  },
  {
    letter: "E",
    icon: <FaEnvelope />,
    label: "Email",
    href: "mailto:mail@rakibutsho.dev",
  },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const content = (
    <>
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateX: isHovered ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-sm font-mono font-semibold text-slate-300",
            frontClassName,
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400",
            backClassName,
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
        >
          {item.icon}
        </div>
      </motion.div>
      <AnimatePresence>
        {tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("relative h-10 w-10 cursor-pointer block", itemClassName)}
        style={{ perspective: "1000px" }}
        onMouseEnter={() => setTooltipIndex(index)}
        onMouseLeave={() => setTooltipIndex(null)}
        aria-label={item.label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={cn(
        "relative h-10 w-10 cursor-pointer block p-0 bg-transparent border-0",
        itemClassName,
      )}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
      aria-label={item.label}
    >
      {content}
    </button>
  );
};

export function SocialFlipButton({
  items,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const resolved = items ?? DEFAULT_ITEMS;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {resolved.map((item, i) => (
        <SocialFlipNode
          key={item.label}
          item={item}
          index={i}
          isHovered={hoveredIndex === i}
          setTooltipIndex={setHoveredIndex}
          tooltipIndex={hoveredIndex}
          itemClassName={itemClassName}
          frontClassName={frontClassName}
          backClassName={backClassName}
        />
      ))}
    </div>
  );
}
