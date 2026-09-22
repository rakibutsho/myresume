"use client";

import { motion } from "motion/react";
import React from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  showCursor?: boolean;
}

export function BlurText({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  highlightClass = "text-shimmer",
  as = "h1",
  showCursor = false,
}: BlurTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: customDelay,
      },
    }),
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const Tag = motion[as];

  return (
    <Tag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={delay}
      className={className}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase(),
        );

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className={`inline-block mr-[0.26em] ${
              isHighlighted ? highlightClass : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}

      {showCursor && (
        <span
          className="inline-block w-2 sm:w-2.5 h-[1.1em] bg-emerald-400 align-middle ml-1 terminal-cursor-sync"
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}
