"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Terminal, Check, Copy, Sparkles, RefreshCw } from "lucide-react";

interface CommandOutput {
  cmd: string;
  res: React.ReactNode;
}

const PRESET_COMMANDS: Record<string, React.ReactNode> = {
  whoami: (
    <div className="space-y-1 text-slate-300">
      <span className="text-amber-400 font-semibold">Md. Rakibul Islam</span>
      <p className="text-xs text-slate-400">
        Full-Stack Software Engineer @{" "}
        <span className="text-white font-medium">SM Technology</span>
      </p>
      <p className="text-xs text-slate-400">
        M.Sc. in CSE @{" "}
        <span className="text-white font-medium">Jahangirnagar University</span>{" "}
        (CGPA 3.75)
      </p>
      <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Status: Available for Full-time & Entry Roles</span>
      </div>
    </div>
  ),
  "cat skills.json": (
    <pre className="text-[11px] text-sky-300 font-mono overflow-x-auto">
      {`{
  "frontend": ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
  "backend":  ["Node.js", "Express.js", "Socket.io", "REST APIs"],
  "database": ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis"],
  "devops":   ["Docker", "CI/CD", "Linux VPS", "Vercel"]
}`}
    </pre>
  ),
  "git log --oneline -n 3": (
    <div className="space-y-1 text-xs font-mono text-slate-300">
      <div className="flex items-center gap-2">
        <span className="text-amber-400 font-bold">4f8a1e2</span>
        <span className="text-slate-200">
          feat(spider-node): ship sub-second uptime monitor
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-amber-400 font-bold">9c3b7d1</span>
        <span className="text-slate-200">
          perf(dashboard): optimize 50k+ row data table
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-amber-400 font-bold">1b0f4a8</span>
        <span className="text-slate-200">
          refactor(auth): implement rotating JWT refresh tokens
        </span>
      </div>
    </div>
  ),
  uptime: (
    <div className="text-xs font-mono text-emerald-300">
      1.5+ years production engineering, 20+ shipped systems, 100% test coverage
      target.
    </div>
  ),
};

export function TerminalHeroCard() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { cmd: "whoami", res: PRESET_COMMANDS["whoami"] },
    { cmd: "cat skills.json", res: PRESET_COMMANDS["cat skills.json"] },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // 3D perspective tilt calculations
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

  const runCommand = (command: string) => {
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const res = PRESET_COMMANDS[command] || (
      <span className="text-red-400 text-xs font-mono">
        bash: command not found: {command}. Try &quot;whoami&quot;, &quot;cat
        skills.json&quot;, &quot;uptime&quot;, or &quot;clear&quot;.
      </span>
    );
    setHistory((prev) => [...prev, { cmd: command, res }]);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const copyTerminalOutput = () => {
    navigator.clipboard.writeText(
      "Md. Rakibul Islam — Full-Stack Software Engineer — mail@rakibutsho.dev",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="relative w-full max-w-lg mx-auto rounded-2xl border border-white/[0.12] bg-[#0B0D13]/90 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.08)] overflow-hidden"
    >
      {/* Top Window Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.5)] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.5)] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.5)] cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-200 font-medium">
            rakib@portfolio: ~ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalOutput}
            title="Copy technical summary"
            className="p-1 rounded hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={terminalBodyRef}
        className="p-5 font-mono text-xs space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sky-400 font-semibold">rakib@dev:~$</span>
              <span className="text-white font-medium">{item.cmd}</span>
            </div>
            <div className="pl-4 border-l-2 border-white/[0.06] py-0.5">
              {item.res}
            </div>
          </div>
        ))}

        {/* Active Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!currentInput.trim()) return;
            runCommand(currentInput.trim().toLowerCase());
            setCurrentInput("");
          }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="text-sky-400 font-semibold shrink-0">
            rakib@dev:~$
          </span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="type 'whoami', 'uptime' or click pills below..."
            className="bg-transparent text-white focus:outline-none w-full text-xs font-mono placeholder:text-slate-600"
          />
          <span className="w-2 h-4 bg-amber-400 animate-pulse shrink-0" />
        </form>
      </div>

      {/* Interactive Quick Command Action Pills */}
      <div className="p-3 border-t border-white/[0.08] bg-white/[0.01] flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">
          Quick:
        </span>
        {Object.keys(PRESET_COMMANDS).map((cmd) => (
          <button
            key={cmd}
            onClick={() => runCommand(cmd)}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-400/10 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => runCommand("clear")}
          className="px-2 py-1 rounded-md text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer ml-auto"
        >
          clear
        </button>
      </div>
    </motion.div>
  );
}
