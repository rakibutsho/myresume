"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootLine {
  text: string;
  delay: number;
  highlight?: string;
}

const BOOT_LOGS: BootLine[] = [
  {
    text: "[    0.000000] Linux rakib-core 6.8.0-generic (x86_64)",
    delay: 80,
    highlight: "text-slate-400",
  },
  {
    text: "[    0.180214] Initializing runtime memory subsystems... OK",
    delay: 320,
    highlight: "text-emerald-400",
  },
  {
    text: "[    0.410921] Authenticating session: rakib@linux-box... GRANTED",
    delay: 650,
    highlight: "text-cyan-400",
  },
  {
    text: "[    0.720110] Mounting /projects, /experience, /skills... OK",
    delay: 1000,
    highlight: "text-emerald-400",
  },
  {
    text: "[    1.080412] Starting portfolio.service [PID 1337]... OK",
    delay: 1350,
    highlight: "text-amber-400",
  },
  {
    text: "[    1.450000] Interactive developer environment ready.",
    delay: 1700,
    highlight: "text-emerald-300 font-semibold",
  },
];

export const BootSequence: React.FC = () => {
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(0);

  const completeBoot = useCallback(() => {
    try {
      sessionStorage.setItem("rakib_boot_completed", "true");
    } catch {
      // Ignore in private/restricted storage modes
    }
    setIsBooting(false);
  }, []);

  useEffect(() => {
    let hasBooted = false;
    try {
      hasBooted = sessionStorage.getItem("rakib_boot_completed") === "true";
    } catch {
      hasBooted = false;
    }

    if (!hasBooted) {
      setIsBooting(true);

      const timers: NodeJS.Timeout[] = [];

      BOOT_LOGS.forEach((line, index) => {
        const timer = setTimeout(() => {
          setVisibleCount(index + 1);
        }, line.delay);
        timers.push(timer);
      });

      // Complete automatically after last line + short pause
      const endTimer = setTimeout(() => {
        completeBoot();
      }, 2150);
      timers.push(endTimer);

      const handleKeyDown = (e: KeyboardEvent) => {
        completeBoot();
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        timers.forEach((t) => clearTimeout(t));
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [completeBoot]);

  if (!isBooting) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="boot-sequence"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.995 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onClick={completeBoot}
        className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#07090E] p-6 sm:p-12 font-mono text-xs sm:text-sm text-slate-300 cursor-pointer overflow-hidden select-none"
        role="dialog"
        aria-label="System Boot Sequence"
      >
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top header bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 font-semibold tracking-wider">
              GNU/Linux GRUB Bootloader
            </span>
            <span className="text-slate-600">// v2.12</span>
          </div>
          <span className="hidden sm:inline-block text-slate-500">
            tty1: rakib@workspace
          </span>
        </div>

        {/* Boot messages container */}
        <div className="relative z-10 my-auto py-6 max-w-3xl space-y-2.5">
          {BOOT_LOGS.slice(0, visibleCount).map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed tracking-tight ${log.highlight || "text-slate-300"}`}
            >
              {log.text}
            </motion.div>
          ))}

          {visibleCount > 0 && (
            <div className="flex items-center gap-2 text-emerald-400 pt-1">
              <span>rakib@linux-box:~$</span>
              <span className="inline-block w-2.5 h-4 bg-emerald-400 terminal-cursor-sync" />
            </div>
          )}
        </div>

        {/* Bottom helper prompt */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">
              ESC / SPACE / CLICK
            </span>
            <span className="text-slate-400">to skip boot sequence</span>
          </div>
          <span className="font-mono text-slate-600 text-[11px]">
            Mem: 32768MB OK
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
