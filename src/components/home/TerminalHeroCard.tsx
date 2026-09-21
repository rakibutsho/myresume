"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Check,
  Copy,
  Sparkles,
  Cpu,
  GitBranch,
  Radio,
  Zap,
  Minus,
  Square,
  X,
} from "lucide-react";

interface ScriptStep {
  command: string;
  output: React.ReactNode;
  duration?: number; // pause after output in ms
}

const TERMINAL_SCRIPTS: ScriptStep[] = [
  {
    command: "whoami",
    output: (
      <div className="space-y-1 text-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold text-[13px]">
            Md. Rakibul Islam
          </span>
          <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            Full-Stack Engineer
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Building high-throughput frontend workflows @{" "}
          <span className="text-white font-medium">SM Technology</span>
        </p>
        <p className="text-xs text-slate-400">
          M.Sc. in CSE @{" "}
          <span className="text-white font-medium">
            Jahangirnagar University
          </span>{" "}
          (CGPA 3.75/4.0)
        </p>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status: Open for High-Impact Software Engineering Roles</span>
        </div>
      </div>
    ),
    duration: 3200,
  },
  {
    command: "cat tech-stack.json",
    output: (
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
              [&quot;Node.js&quot;, &quot;Express&quot;, &quot;Socket.io&quot;,
              &quot;REST APIs&quot;]
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
              [&quot;Docker&quot;, &quot;CI/CD&quot;, &quot;Linux VPS&quot;,
              &quot;Vercel&quot;]
            </span>
          </div>
        </div>
        <span className="text-slate-500">{"}"}</span>
      </div>
    ),
    duration: 3400,
  },
  {
    command: "git log --oneline -n 2",
    output: (
      <div className="space-y-1.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
            4f8a1e2
          </span>
          <span className="text-slate-200">
            feat(spider-node): implement sub-second dual-cron check engine
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
            9c3b7d1
          </span>
          <span className="text-slate-200">
            perf(dashboard): cut initial payload by 42% via SSR & streaming
          </span>
        </div>
      </div>
    ),
    duration: 3000,
  },
  {
    command: "curl -I https://spidernode.site",
    output: (
      <div className="space-y-1 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">HTTP/2 200 OK</span>
          <span className="text-slate-500">|</span>
          <span className="text-sky-400">Response: 11ms</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400">SSL: Valid (TLS 1.3)</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Uptime Engine: Dual-cron scheduler active • Zero dropped healthchecks
        </p>
      </div>
    ),
    duration: 3000,
  },
  {
    command: "uptime --stats",
    output: (
      <div className="font-mono text-xs text-emerald-300 bg-emerald-500/[0.06] border border-emerald-500/20 p-2.5 rounded-lg flex items-center justify-between">
        <span>
          up 1.5+ years production • 20+ shipped platforms • 100% commit
          diligence
        </span>
        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />
      </div>
    ),
    duration: 3500,
  },
];

interface LogEntry {
  command: string;
  output: React.ReactNode;
}

export function TerminalHeroCard() {
  const [activeTab, setActiveTab] = useState<"terminal" | "system" | "about">(
    "terminal",
  );
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [currentTypedCommand, setCurrentTypedCommand] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userCustomInput, setUserCustomInput] = useState("");
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt state
  const [tilt, setTilt] = useState({ rotateX: 2, rotateY: -4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -(y / rect.height) * 12,
      rotateY: (x / rect.width) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 2, rotateY: -4 });
  };

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, currentTypedCommand]);

  // Continuous automated typewriter engine
  useEffect(() => {
    if (!isPlaying) return;

    let timeoutId: NodeJS.Timeout;
    const currentStep = TERMINAL_SCRIPTS[activeStepIndex];
    const fullCommand = currentStep.command;
    let charIndex = 0;

    setIsTyping(true);
    setCurrentTypedCommand("");

    const typeNextChar = () => {
      if (charIndex < fullCommand.length) {
        setCurrentTypedCommand(fullCommand.slice(0, charIndex + 1));
        charIndex++;
        // Varied typing delay for realistic human-like cadence
        const randomDelay = Math.floor(Math.random() * 35) + 40;
        timeoutId = setTimeout(typeNextChar, randomDelay);
      } else {
        // Command typing finished: short pause before executing
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { command: fullCommand, output: currentStep.output },
          ]);
          setCurrentTypedCommand("");

          // Pause after execution to let visitor read the output
          timeoutId = setTimeout(() => {
            setActiveStepIndex((prev) => (prev + 1) % TERMINAL_SCRIPTS.length);
          }, currentStep.duration || 3000);
        }, 400);
      }
    };

    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, [activeStepIndex, isPlaying]);

  const handleManualCommand = (cmd: string) => {
    setIsPlaying(false);
    setIsTyping(false);
    setCurrentTypedCommand("");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "uname" || cmd === "uname -a") {
      const output = (
        <div className="text-slate-300 font-mono text-xs">
          Linux rakib-workstation 6.8.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC
          x86_64 GNU/Linux
        </div>
      );
      setHistory((prev) => [...prev, { command: cmd, output }]);
      return;
    }

    if (cmd === "neofetch") {
      const output = (
        <div className="font-mono text-xs space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold">rakib@linux-box</div>
          <div className="text-slate-500">------------------</div>
          <div>
            <span className="text-sky-400 font-semibold">OS: </span>
            <span>Ubuntu 24.04 LTS (x86_64)</span>
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
            <span>Next.js 15, TypeScript, Tailwind, PostgreSQL</span>
          </div>
        </div>
      );
      setHistory((prev) => [...prev, { command: cmd, output }]);
      return;
    }

    const matchedStep = TERMINAL_SCRIPTS.find(
      (s) => s.command.toLowerCase() === cmd.toLowerCase(),
    );
    const output = matchedStep ? (
      matchedStep.output
    ) : (
      <span className="text-red-400 text-xs font-mono">
        bash: command not found: {cmd}. Type &apos;whoami&apos;, &apos;cat
        tech-stack.json&apos;, &apos;uptime&apos;, &apos;neofetch&apos;, or
        click pills.
      </span>
    );

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const restartLoop = () => {
    setHistory([]);
    setActiveStepIndex(0);
    setIsPlaying(true);
    setCurrentTypedCommand("");
  };

  const copyDossier = () => {
    navigator.clipboard.writeText(
      "Md. Rakibul Islam — Full-Stack Software Engineer — mail@rakibutsho.dev",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Ambient Breathing Neon Glow behind the terminal */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/25 via-emerald-500/15 to-amber-500/20 rounded-3xl blur-2xl opacity-75 -z-10 animate-pulse pointer-events-none" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative rounded-2xl border border-white/[0.14] bg-[#0A0D14]/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.12)] overflow-hidden"
      >
        {/* Subtle CRT Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-20 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
          aria-hidden="true"
        />

        {/* 1. Linux Window Title Bar (GNOME / Ubuntu Window Header) */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-[#0E121A] relative z-10 select-none">
          {/* Linux window title & icon */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-mono text-xs font-semibold text-slate-200 truncate">
              rakib@linux-box:~
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline shrink-0">
              (bash)
            </span>
          </div>

          {/* Linux Window Action Buttons (Minimize, Maximize, Close) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? "Pause auto-typing" : "Resume auto-typing"}
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={restartLoop}
              title="Restart automated sequence"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <Square className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => setHistory([])}
              title="Clear terminal output"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E01B24] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. GNOME Terminal Tab Bar & Status Strip */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07090F] relative z-10 select-none">
          {/* Terminal Tabs */}
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
              {isPlaying && (
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
            </button>
          </div>

          {/* Right Status & Tools (Branch, Live Loop, Play/Pause, Copy) */}
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
                  <span>live loop active</span>
                </span>
              ) : (
                <span>idle</span>
              )}
            </div>

            <div className="flex items-center gap-1 pl-2 sm:border-l border-white/[0.08]">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? "Pause auto-typing" : "Resume auto-typing"}
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

        {/* 2. Main Terminal Content Area */}
        {activeTab === "terminal" ? (
          <div
            ref={terminalBodyRef}
            className="p-5 font-mono text-xs space-y-4 h-[310px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 relative z-10"
          >
            {/* Initial Boot Message */}
            <div className="text-[11px] text-slate-400 pb-1 border-b border-white/[0.04] flex items-center justify-between font-mono">
              <span>Linux 6.8.0-generic (x86_64-linux-gnu) • bash 5.2.21</span>
              <span className="text-[10px] text-emerald-400/80 font-mono">
                tty1
              </span>
            </div>

            {/* Historical Output */}
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

            {/* Live Typing Line */}
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
                {currentTypedCommand}
              </span>
              <span className="w-2 h-4 bg-emerald-400 animate-pulse shrink-0 inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
          </div>
        ) : (
          /* System Metrics Tab */
          <div className="p-5 font-mono text-xs space-y-4 h-[310px] overflow-y-auto relative z-10 text-slate-300">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>System &amp; Workstation Environment</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
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
              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="text-[11px] text-slate-400">
                  Current Company
                </div>
                <div className="text-white font-semibold mt-1">
                  SM Technology
                </div>
              </div>
              <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="text-[11px] text-slate-400">
                  Production Systems
                </div>
                <div className="text-sky-400 font-semibold mt-1">
                  20+ Shipped
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2">
              <div className="text-[11px] text-slate-400">
                Core Runtime Health
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span>Next.js 15 &amp; React 19 Engine</span>
                  <span className="text-emerald-400">100% Operational</span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[98%]" />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 3. Interactive Quick Command Pills Bar */}
        <div className="px-3 py-2 border-t border-white/[0.08] bg-[#07090F]/90 backdrop-blur-md flex items-center justify-between gap-1.5 relative z-10 overflow-x-auto scrollbar-none select-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 pr-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Run:</span>
            </span>

            <button
              onClick={() => handleManualCommand("whoami")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              whoami
            </button>

            <button
              onClick={() => handleManualCommand("cat tech-stack.json")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              tech-stack
            </button>

            <button
              onClick={() => handleManualCommand("git log --oneline -n 2")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-pointer shrink-0 active:scale-95 hidden sm:inline-block"
            >
              git log
            </button>

            <button
              onClick={() => handleManualCommand("uptime --stats")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              uptime
            </button>

            <button
              onClick={() => handleManualCommand("neofetch")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-pointer shrink-0 active:scale-95 hidden sm:inline-block"
            >
              neofetch
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <button
              onClick={() => handleManualCommand("clear")}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              clear
            </button>

            <button
              onClick={restartLoop}
              title="Loop automated sequence"
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
