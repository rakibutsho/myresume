"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Check,
  Copy,
  GitBranch,
  Radio,
  Minus,
  Square,
  X,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

interface LogEntry {
  command: string;
  output: React.ReactNode;
}

interface TerminalHeroCardProps {
  onTerminalReady?: () => void;
}

function getSessionUptime() {
  const launchDate = new Date("2025-04-01T00:00:00Z");
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - launchDate.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeStr = `${hours}:${minutes}:${seconds}`;
  return {
    timeStr,
    days,
    summary: `${timeStr} up ${days} days in production, 1 active user`,
  };
}

export function TerminalHeroCard({ onTerminalReady }: TerminalHeroCardProps) {
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [activeRunChip, setActiveRunChip] = useState<string>("tech-stack");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [bootReady, setBootReady] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const runCommandRef = useRef<((chipKey: string, autoAdvance?: boolean) => void) | null>(null);

  const {
    displayText: typedCommand,
    isTyping,
    typeText,
    setTextImmediate,
    cancel: cancelTyping,
  } = useTypewriter();

  // 3D Perspective Tilt state
  const [tilt, setTilt] = useState({ rotateX: 2, rotateY: -4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -(y / rect.height) * 8,
      rotateY: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 2, rotateY: -4 });
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, typedCommand]);

  const buildCommandOutput = useCallback((cmd: string): React.ReactNode => {
    switch (cmd) {
      case "whoami":
        return (
          <div className="space-y-1 text-slate-200 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white font-bold text-[13px]">
                Md. Rakibul Islam
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/10 border border-sky-500/30 text-sky-400 font-medium">
                Junior Executive, Front End
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Client-facing dashboard modules &amp; production releases @{" "}
              <span className="text-white font-medium">SM Technology</span>
            </p>
            <p className="text-slate-400 text-xs">
              M.Sc. in Computer Science @{" "}
              <span className="text-white font-medium">
                Jahangirnagar University
              </span>
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for engineering opportunities</span>
            </div>
          </div>
        );

      case "tech-stack":
      case "cat tech-stack.json":
        return (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
            <span className="text-slate-500">{"{"}</span>
            <div className="pl-4 space-y-0.5">
              <div>
                <span className="text-sky-300">&quot;frontend&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-slate-200">
                  [&quot;Next.js (App Router)&quot;, &quot;React 19&quot;,
                  &quot;TypeScript&quot;, &quot;Tailwind CSS&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;state&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-slate-200">
                  [&quot;Redux Toolkit&quot;, &quot;RTK Query&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;backend_contribution&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-slate-200">
                  [&quot;Node.js&quot;, &quot;Express&quot;, &quot;PostgreSQL&quot;, &quot;MongoDB&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;tools&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-slate-200">
                  [&quot;Git&quot;, &quot;Docker&quot;, &quot;Vercel&quot;, &quot;Linux&quot;]
                </span>
              </div>
            </div>
            <span className="text-slate-500">{"}"}</span>
          </div>
        );

      case "git log":
      case "git log --oneline -n 3":
        return (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-bold bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">
                a4f19b2
              </span>
              <span className="text-slate-200">
                feat(spidernode): open-source uptime monitoring engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-bold bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">
                c82e301
              </span>
              <span className="text-slate-200">
                feat(smt-dashboards): analytics &amp; client module deployment
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-bold bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">
                9ac21b5
              </span>
              <span className="text-slate-200">
                feat(pawradise): automated invoice and booking workflows
              </span>
            </div>
          </div>
        );

      case "uptime":
      case "uptime --stats": {
        const up = getSessionUptime();
        return (
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-200 bg-white/[0.04] border border-white/[0.08] p-2.5 rounded-lg">
              <span>{up.summary}</span>
            </div>
            <div className="text-[11px] text-slate-400 pl-1 pt-0.5">
              <span>5 products shipped · 1 open-source tool (SpiderNode)</span>
            </div>
          </div>
        );
      }

      case "neofetch":
        return (
          <div className="font-mono text-xs flex flex-col sm:flex-row gap-4 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <pre className="text-sky-400 font-bold text-[11px] leading-tight select-none shrink-0">
              {`   /\\
  /  \\
 / /\\ \\
/ /  \\ \\
/_/    \\_\\`}
            </pre>
            <div className="space-y-1 text-slate-300 text-xs">
              <div className="text-white font-bold">rakib@workspace</div>
              <div className="text-slate-700">----------------------</div>
              <div>
                <span className="text-sky-400 font-semibold">Role: </span>
                <span>Junior Executive, Front End @ SM Technology</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">OS: </span>
                <span>Linux (x86_64)</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Primary: </span>
                <span>Next.js, TypeScript, React, Tailwind CSS</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Location: </span>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <span className="text-slate-400 text-xs font-mono">
            Command not found: {cmd}
          </span>
        );
    }
  }, []);

  const runCommand = useCallback(
    (chipKey: string, autoAdvance = false) => {
      cancelTyping();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);

      setActiveRunChip(chipKey);

      if (chipKey === "clear") {
        setHistory([]);
        setTextImmediate("");
        return;
      }

      const cmdMap: Record<string, string> = {
        whoami: "whoami",
        "tech-stack": "cat tech-stack.json",
        "git log": "git log --oneline -n 3",
        uptime: "uptime",
        neofetch: "neofetch",
      };

      const fullCmd = cmdMap[chipKey] || chipKey;

      typeText(fullCmd, {
        charSpeed: 24,
        jitter: 8,
        onComplete: () => {
          const execTimeout = setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              {
                command: fullCmd,
                output: buildCommandOutput(chipKey),
              },
            ]);
            setTextImmediate("");

            if (autoAdvance) {
              const NEXT_CHIPS = [
                "tech-stack",
                "whoami",
                "git log",
                "uptime",
                "neofetch",
              ];
              const currentIndex = NEXT_CHIPS.indexOf(chipKey);
              const nextChip =
                NEXT_CHIPS[(currentIndex + 1) % NEXT_CHIPS.length];

              autoPlayTimerRef.current = setTimeout(() => {
                runCommandRef.current?.(nextChip, true);
              }, 4200);
            }
          }, 300);

          autoPlayTimerRef.current = execTimeout;
        },
      });
    },
    [cancelTyping, typeText, setTextImmediate, buildCommandOutput],
  );

  useEffect(() => {
    runCommandRef.current = runCommand;
  }, [runCommand]);

  const handleChipClick = (chipKey: string) => {
    setIsPlaying(false);
    runCommand(chipKey, false);
  };

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootReady(true);
      onTerminalReady?.();
      runCommand("tech-stack", true);
    }, 280);

    return () => {
      clearTimeout(bootTimer);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      cancelTyping();
    };
  }, [onTerminalReady, runCommand, cancelTyping]);

  const toggleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      cancelTyping();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    } else {
      setIsPlaying(true);
      runCommand(activeRunChip || "tech-stack", true);
    }
  };

  const copyDossier = () => {
    navigator.clipboard.writeText(
      "Md. Rakibul Islam — Frontend Engineer @ SM Technology — mail@rakibutsho.dev",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative rounded-xl border border-white/[0.1] bg-[#0A0D14] shadow-2xl overflow-hidden select-none"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E121A]">
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="font-mono text-xs font-semibold text-slate-200 truncate">
              rakib@workspace:~
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleAutoPlay}
              title={isPlaying ? "Pause auto-advance" : "Resume auto-advance"}
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              aria-label={isPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => runCommand(activeRunChip || "tech-stack", true)}
              title="Re-run active sequence"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              aria-label="Re-run sequence"
            >
              <Square className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("clear")}
              title="Clear terminal output"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              aria-label="Clear terminal output"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab & Status Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#080A10] px-4 py-1.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-300 font-medium">terminal.sh</span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <div className="hidden sm:flex items-center gap-1.5">
              <GitBranch className="w-3 h-3 text-sky-400" />
              <span className="text-slate-300">main</span>
              <span className="text-white/20">|</span>
              {isTyping ? (
                <span className="text-sky-400">typing...</span>
              ) : isPlaying ? (
                <span className="text-emerald-400">auto loop</span>
              ) : (
                <span>interactive</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleAutoPlay}
                className="p-1 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                title={isPlaying ? "Pause auto loop" : "Play auto loop"}
                aria-label={isPlaying ? "Pause auto loop" : "Play auto loop"}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 text-slate-300" />
                ) : (
                  <Play className="w-3 h-3 text-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={copyDossier}
                title="Copy contact summary"
                className="p-1 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                aria-label="Copy contact summary"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Terminal Canvas Body */}
        <div
          ref={terminalBodyRef}
          className="p-4 font-mono text-xs space-y-3.5 h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 relative z-10"
        >
          <div className="text-[11px] text-slate-500 pb-1 border-b border-white/[0.04] flex items-center justify-between font-mono">
            <span>Linux 6.8.0-generic · Session: rakib@workspace</span>
            <span className="text-[10px] text-emerald-400 font-mono">
              {bootReady ? "[OK] tty1" : "initializing..."}
            </span>
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="shrink-0 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">rakib@box</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-sky-400 font-bold">~</span>
                  <span className="text-slate-300 font-bold">$ </span>
                </span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-3 border-l border-white/[0.1] py-0.5 ml-1">
                {item.output}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 text-slate-400 pt-0.5">
            <span className="shrink-0 font-mono text-xs">
              <span className="text-emerald-400 font-bold">rakib@box</span>
              <span className="text-slate-400">:</span>
              <span className="text-sky-400 font-bold">~</span>
              <span className="text-slate-300 font-bold">$ </span>
            </span>
            <span className="text-sky-300 font-medium">{typedCommand}</span>
            <span
              className="w-1.5 h-3.5 bg-sky-400 terminal-cursor-sync shrink-0 inline-block"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Quick RUN Chips Bar */}
        <div className="px-3 py-2 border-t border-white/[0.08] bg-[#07090F] flex items-center justify-between gap-1.5 relative z-10 overflow-x-auto scrollbar-none select-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 pr-1">
              <Radio className="w-3 h-3 text-sky-400" />
              <span>RUN:</span>
            </span>

            {[
              { id: "whoami", label: "whoami" },
              { id: "tech-stack", label: "tech-stack" },
              { id: "git log", label: "git log" },
              { id: "uptime", label: "uptime" },
              { id: "neofetch", label: "neofetch" },
            ].map((chip) => {
              const isActive = activeRunChip === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                    isActive
                      ? "bg-sky-500/15 text-sky-300 border-sky-500/40"
                      : "border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white hover:border-sky-400/40 hover:bg-sky-400/10"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <button
              type="button"
              onClick={() => handleChipClick("clear")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            >
              clear
            </button>

            <button
              type="button"
              onClick={() => runCommand(activeRunChip || "tech-stack", true)}
              title="Restart automated sequence"
              aria-label="Restart automated sequence"
              className="p-1 rounded border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-sky-400 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
