"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Check,
  Copy,
  Cpu,
  GitBranch,
  Radio,
  Zap,
  Minus,
  Square,
  X,
  Activity,
  Server,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

interface LogEntry {
  command: string;
  output: React.ReactNode;
}

interface TerminalHeroCardProps {
  onTerminalReady?: () => void;
}

// Calculate dynamic uptime relative to site launch milestone
function getDynamicUptime() {
  const launchDate = new Date("2024-01-15T00:00:00Z");
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
    summary: `${timeStr} up ${days} days, ${hours}:${minutes}, 1 user, load average: 0.09, 0.04, 0.01`,
  };
}

export function TerminalHeroCard({ onTerminalReady }: TerminalHeroCardProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "system">("terminal");
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [activeRunChip, setActiveRunChip] = useState<string>("tech-stack");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [bootReady, setBootReady] = useState<boolean>(false);

  // Live Sys-Metrics State
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [simulatedCpu, setSimulatedCpu] = useState<number>(18);
  const [simulatedRam, setSimulatedRam] = useState<number>(2148);

  const cardRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Shared Typewriter Hook for command prompt input
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
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -(y / rect.height) * 10,
      rotateY: (x / rect.width) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 2, rotateY: -4 });
  };

  // Auto-scroll terminal body to bottom whenever history or typed input changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, typedCommand]);

  // Command Output Builder (Data-driven and authentic)
  const buildCommandOutput = useCallback((cmd: string): React.ReactNode => {
    switch (cmd) {
      case "whoami":
        return (
          <div className="space-y-1 text-slate-200 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-amber-400 font-bold text-[13px]">
                Md. Rakibul Islam
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                Full-Stack Software Engineer
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Frontend workflows &amp; high-scale client dashboards @{" "}
              <span className="text-white font-medium">SM Technology</span>
            </p>
            <p className="text-slate-400 text-xs">
              M.Sc. in CSE @{" "}
              <span className="text-white font-medium">
                Jahangirnagar University
              </span>{" "}
              (CGPA 3.75/4.0)
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: Available for Full-Time Engineering Roles</span>
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
                <span className="text-emerald-300">
                  [&quot;Next.js 15&quot;, &quot;React 19&quot;,
                  &quot;TypeScript&quot;, &quot;Tailwind CSS&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;backend&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-emerald-300">
                  [&quot;Node.js&quot;, &quot;Express&quot;,
                  &quot;Socket.io&quot;, &quot;REST APIs&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;database&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-emerald-300">
                  [&quot;PostgreSQL&quot;, &quot;MongoDB&quot;, &quot;Prisma
                  ORM&quot;, &quot;Redis&quot;]
                </span>
                <span className="text-slate-500">,</span>
              </div>
              <div>
                <span className="text-sky-300">&quot;devops&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-emerald-300">
                  [&quot;Docker&quot;, &quot;Linux VPS&quot;, &quot;CI/CD&quot;,
                  &quot;Vercel&quot;]
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
              <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                a4f19b2
              </span>
              <span className="text-slate-200">
                feat(spidernode): sub-second dual-cron check engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                c82e301
              </span>
              <span className="text-slate-200">
                perf(database): in-memory batch write cutting DB load by 40%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                9ac21b5
              </span>
              <span className="text-slate-200">
                feat(pawradise): automated invoice generation with Puppeteer
              </span>
            </div>
          </div>
        );

      case "uptime":
      case "uptime --stats": {
        const up = getDynamicUptime();
        return (
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <div className="text-emerald-300 bg-emerald-500/[0.08] border border-emerald-500/20 p-2.5 rounded-lg flex items-center justify-between">
              <span>{up.summary}</span>
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 pl-1 pt-0.5">
              <span className="text-sky-400 font-semibold">Track Record:</span>
              <span>
                1.5+ years production • 20+ shipped platforms • zero dropped
                healthchecks
              </span>
            </div>
          </div>
        );
      }

      case "neofetch":
        return (
          <div className="font-mono text-xs flex flex-col sm:flex-row gap-4 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            {/* Monospace ASCII mark */}
            <pre className="text-emerald-400 font-bold text-[11px] leading-tight select-none shrink-0">
              {`   /\\
  /  \\
 / /\\ \\
/ /  \\ \\
/_/    \\_\\`}
            </pre>
            <div className="space-y-1 text-slate-300 text-xs">
              <div className="text-emerald-400 font-bold">rakib@linux-box</div>
              <div className="text-slate-600">----------------------</div>
              <div>
                <span className="text-sky-400 font-semibold">OS: </span>
                <span>Ubuntu 24.04 LTS (x86_64)</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Host: </span>
                <span>SM Technology Workstation</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Kernel: </span>
                <span>6.8.0-generic</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Shell: </span>
                <span>bash 5.2.21</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Stack: </span>
                <span>Next.js 15, TypeScript, PostgreSQL, Docker</span>
              </div>
              <div>
                <span className="text-sky-400 font-semibold">Location: </span>
                <span>Dhaka, Bangladesh (UTC+6)</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <span className="text-slate-300 text-xs font-mono">
            Executed command: {cmd}
          </span>
        );
    }
  }, []);

  // Execute a command: types it in prompt, then outputs to history
  const runCommand = useCallback(
    (chipKey: string, autoAdvance = false) => {
      cancelTyping();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);

      setActiveTab("terminal");
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
        charSpeed: 28,
        jitter: 12,
        onComplete: () => {
          // Short pause after command finishes typing before output renders
          const execTimeout = setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              {
                command: fullCmd,
                output: buildCommandOutput(chipKey),
              },
            ]);
            setTextImmediate("");

            // Auto-advance loop if in automated presentation mode
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
                runCommand(nextChip, true);
              }, 4200);
            }
          }, 320);

          autoPlayTimerRef.current = execTimeout;
        },
      });
    },
    [cancelTyping, typeText, setTextImmediate, buildCommandOutput],
  );

  // Manual RUN Chip Click handler
  const handleChipClick = (chipKey: string) => {
    setIsPlaying(false); // Disable auto-play on explicit user click
    runCommand(chipKey, false);
  };

  // Connected Initial Boot Sequence
  useEffect(() => {
    // 1. Initial micro-delay for terminal to mount
    const bootTimer = setTimeout(() => {
      setBootReady(true);
      if (onTerminalReady) {
        onTerminalReady();
      }

      // 2. Start initial default view: "cat tech-stack.json"
      runCommand("tech-stack", true);
    }, 320);

    return () => {
      clearTimeout(bootTimer);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      cancelTyping();
    };
  }, [onTerminalReady, runCommand, cancelTyping]);

  // Live Sys-Metrics Timer (Active ONLY when sys-metrics tab is open)
  useEffect(() => {
    if (activeTab !== "system") return;

    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);

      // Smooth jitter for CPU usage between 14% and 29%
      setSimulatedCpu(Math.floor(18 + Math.sin(Date.now() / 1500) * 8));

      // Micro variance in memory consumption (2,140 MB - 2,165 MB)
      setSimulatedRam(2140 + Math.floor(Math.random() * 25));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

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
      "Md. Rakibul Islam — Full-Stack Software Engineer — mail@rakibutsho.dev",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSessionTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Ambient Breathing Neon Glow behind the terminal */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/25 via-emerald-500/15 to-amber-500/20 rounded-3xl blur-2xl opacity-75 -z-10 animate-pulse pointer-events-none" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative rounded-2xl border border-white/[0.14] bg-[#0A0D14]/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.12)] overflow-hidden select-none"
      >
        {/* Subtle CRT Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-20 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
          aria-hidden="true"
        />

        {/* 1. Linux GNOME Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-[#0E121A] relative z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-mono text-xs font-semibold text-slate-200 truncate">
              rakib@linux-box:~
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline shrink-0">
              (bash)
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={toggleAutoPlay}
              title={isPlaying ? "Pause auto-loop" : "Resume auto-loop"}
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => runCommand(activeRunChip || "tech-stack", true)}
              title="Re-run active sequence"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <Square className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => handleChipClick("clear")}
              title="Clear terminal canvas"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E01B24] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. GNOME Terminal Tab Bar & Status Strip */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07090F] relative z-10">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all cursor-pointer border-r border-white/[0.08] ${
                activeTab === "terminal"
                  ? "bg-[#0A0D14] text-emerald-300 font-semibold border-b-2 border-b-emerald-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
              }`}
            >
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>terminal.sh</span>
              {isPlaying && activeTab === "terminal" && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all cursor-pointer border-r border-white/[0.08] ${
                activeTab === "system"
                  ? "bg-[#0A0D14] text-amber-300 font-semibold border-b-2 border-b-amber-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
              }`}
            >
              <Cpu className="w-3 h-3 text-amber-400" />
              <span>sys-metrics</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 px-3 text-xs font-mono text-slate-400">
            <div className="hidden sm:flex items-center gap-2 text-[11px]">
              <GitBranch className="w-3 h-3 text-purple-400" />
              <span className="text-slate-300 font-medium">main</span>
              <span className="text-white/20">|</span>
              {isTyping ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>typing...</span>
                </span>
              ) : isPlaying ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>live loop</span>
                </span>
              ) : (
                <span className="text-slate-500">interactive</span>
              )}
            </div>

            <div className="flex items-center gap-1 pl-2 sm:border-l border-white/[0.08]">
              <button
                onClick={toggleAutoPlay}
                className="p-1 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={
                  isPlaying ? "Pause automated loop" : "Resume automated loop"
                }
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>

              <button
                onClick={copyDossier}
                title="Copy developer dossier"
                className="p-1 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Terminal Canvas Body */}
        {activeTab === "terminal" ? (
          <div
            ref={terminalBodyRef}
            className="p-5 font-mono text-xs space-y-4 h-[310px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 relative z-10"
          >
            {/* Initial Boot String */}
            <div className="text-[11px] text-slate-500 pb-1 border-b border-white/[0.04] flex items-center justify-between font-mono">
              <span>
                Linux 6.8.0-generic (x86_64) • Session: rakib@linux-box
              </span>
              <span className="text-[10px] text-emerald-400/80 font-mono">
                {bootReady ? "[OK] tty1" : "booting..."}
              </span>
            </div>

            {/* Historical Output Stack */}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="shrink-0 font-mono text-xs">
                    <span className="text-emerald-400 font-bold">
                      rakib@linux-box
                    </span>
                    <span className="text-slate-400">:</span>
                    <span className="text-sky-400 font-bold">~</span>
                    <span className="text-slate-200 font-bold">$ </span>
                  </span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-3.5 border-l border-white/[0.1] py-0.5 ml-1">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Live Active Typing Prompt */}
            <div className="flex items-center gap-2 text-slate-400 pt-0.5">
              <span className="shrink-0 font-mono text-xs">
                <span className="text-emerald-400 font-bold">
                  rakib@linux-box
                </span>
                <span className="text-slate-400">:</span>
                <span className="text-sky-400 font-bold">~</span>
                <span className="text-slate-200 font-bold">$ </span>
              </span>
              <span className="text-amber-300 font-semibold">
                {typedCommand}
              </span>
              {/* Synchronized Terminal Cursor */}
              <span
                className="w-2 h-4 bg-emerald-400 terminal-cursor-sync shrink-0 inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          /* Live Sys-Metrics Tab */
          <div className="p-5 font-mono text-xs space-y-4 h-[310px] overflow-y-auto relative z-10 text-slate-300">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Live Workstation Telemetry</span>
              </div>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Session: {formatSessionTime(sessionSeconds)}</span>
              </span>
            </div>

            {/* Metric Gauges Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Simulated CPU Load</span>
                  <span className="text-emerald-400 font-bold">
                    {simulatedCpu}%
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-700"
                    style={{ width: `${simulatedCpu}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500">
                  8 Cores Active • 0 Throttling
                </div>
              </div>

              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Memory Buffer</span>
                  <span className="text-sky-400 font-bold">
                    {((simulatedRam / 32768) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-sky-400 h-full transition-all duration-700"
                    style={{ width: `${(simulatedRam / 32768) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500">
                  {simulatedRam} MB / 32,768 MB
                </div>
              </div>
            </div>

            {/* Target Role & Academic Standing */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="text-[11px] text-slate-400">Target Role</div>
                <div className="text-white font-semibold mt-1">
                  Full-Stack / Frontend
                </div>
              </div>

              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="text-[11px] text-slate-400">M.Sc. CSE CGPA</div>
                <div className="text-emerald-400 font-semibold mt-1">
                  3.75 / 4.00
                </div>
              </div>
            </div>

            {/* Network & Protocol Status */}
            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-300">
                  HTTP/2 Edge Delivery • TLS 1.3
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>12ms Latency</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Interactive Quick RUN Command Chips Bar */}
        <div className="px-3 py-2 border-t border-white/[0.08] bg-[#07090F]/90 backdrop-blur-md flex items-center justify-between gap-1.5 relative z-10 overflow-x-auto scrollbar-none select-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 pr-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>RUN:</span>
            </span>

            {[
              { id: "whoami", label: "whoami" },
              { id: "tech-stack", label: "tech-stack" },
              { id: "git log", label: "git log" },
              { id: "uptime", label: "uptime" },
              { id: "neofetch", label: "neofetch" },
            ].map((chip) => {
              const isActive =
                activeRunChip === chip.id && activeTab === "terminal";
              return (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer shrink-0 active:scale-95 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm"
                      : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <button
              onClick={() => handleChipClick("clear")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              clear
            </button>

            <button
              onClick={() => runCommand(activeRunChip || "tech-stack", true)}
              title="Restart automated sequence"
              className="p-1 rounded border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
