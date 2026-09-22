"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNavMode,
  setProjectViewMode,
  addShellHistory,
} from "@/redux/features/ui/uiSlice";
import {
  Terminal,
  CornerDownLeft,
  Sparkles,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const COMMAND_MAP: Record<
  string,
  { targetId?: string; viewMode?: "filesystem" | "bento"; description: string }
> = {
  "cat about.md": {
    targetId: "about",
    description: "Display personal introduction & bio",
  },
  "ls skills/": {
    targetId: "skills",
    description: "List technology stack & competencies",
  },
  "cat education.json": {
    targetId: "education",
    description: "View degrees and academic foundation",
  },
  "cat experience.log": {
    targetId: "experience",
    description: "View chronological work history",
  },
  "ls projects/": {
    targetId: "projects",
    viewMode: "filesystem",
    description: "Explore project directory tree",
  },
  "./contact.sh": {
    targetId: "contact",
    description: "Execute direct communication channel",
  },
  "cat resume.pdf": {
    description: "Download curriculum vitae (PDF)",
  },
  ls: {
    description: "List sections and directory items",
  },
  "cd <section>": {
    description: "Navigate to section (about, skills, projects...)",
  },
  whoami: {
    description: "Print current developer credentials & role",
  },
  uptime: {
    description: "Show system uptime and production record",
  },
  help: { description: "Print available shell commands & syntax" },
  "sudo hire-rakib": {
    targetId: "contact",
    description: "Grant root access & initialize hiring protocol",
  },
  gui: { description: "Switch interface to traditional GUI navigation" },
  clear: { description: "Clear current terminal feedback output" },
};

const SUGGESTIONS: Record<string, string> = {
  about: "cat about.md",
  bio: "cat about.md",
  "cat about": "cat about.md",
  skills: "ls skills/",
  skill: "ls skills/",
  "ls skill": "ls skills/",
  experience: "cat experience.log",
  jobs: "cat experience.log",
  work: "cat experience.log",
  history: "cat experience.log",
  "cat exp": "cat experience.log",
  projects: "ls projects/",
  project: "ls projects/",
  "ls project": "ls projects/",
  education: "cat education.json",
  edu: "cat education.json",
  contact: "./contact.sh",
  "contact.sh": "./contact.sh",
  email: "./contact.sh",
  resume: "cat resume.pdf",
  "download resume": "cat resume.pdf",
  cv: "cat resume.pdf",
  "cat cv": "cat resume.pdf",
  hire: "sudo hire-rakib",
  "hire-rakib": "sudo hire-rakib",
  "sudo hire": "sudo hire-rakib",
  dir: "ls",
  "ls -la": "ls",
  "ls -l": "ls",
};

interface DirectoryItem {
  name: string;
  type: "dir" | "file";
  action: string;
  meta?: string;
}

interface ShellFeedback {
  type: "info" | "success" | "error" | "easter-egg" | "help";
  message: string;
  suggestion?: string;
  items?: DirectoryItem[];
}

interface ShellProps {
  onCommandRun?: (cmd: string) => void;
  className?: string;
}

export const Shell: React.FC<ShellProps> = ({
  onCommandRun,
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const shellHistory = useAppSelector((state) => state.ui.shellHistory);

  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [feedback, setFeedback] = useState<ShellFeedback | null>(null);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Global hotkey listeners: "/" or "Ctrl+K" / "Cmd+K" or "Ctrl+`" to focus shell
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (
        (e.key === "/" &&
          (e.target as HTMLElement).tagName !== "INPUT" &&
          (e.target as HTMLElement).tagName !== "TEXTAREA") ||
        ((e.ctrlKey || e.metaKey) &&
          (e.key === "`" || e.key.toLowerCase() === "k"))
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTarget = (id: string) => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Pulse animation highlight on target section
      el.classList.add(
        "ring-1",
        "ring-emerald-500/40",
        "transition-all",
        "duration-500",
      );
      setTimeout(() => {
        el.classList.remove("ring-1", "ring-emerald-500/40");
      }, 1500);
    }
  };

  const setFeedbackWithTimer = (fb: ShellFeedback, duration = 5000) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(fb);
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(null);
    }, duration);
  };

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    dispatch(addShellHistory(cmd));
    setHistoryIndex(-1);
    setInputVal("");
    if (onCommandRun) onCommandRun(cmd);

    // 1. Clear
    if (cmd === "clear" || cmd === "cls") {
      setFeedback(null);
      setShowHelpDropdown(false);
      return;
    }

    // 2. Help
    if (cmd === "help" || cmd === "man" || cmd === "--help" || cmd === "-h") {
      setShowHelpDropdown(true);
      setFeedbackWithTimer(
        {
          type: "help",
          message: "Available shell commands & navigation routes:",
        },
        9000,
      );
      return;
    }

    // 3. GUI Mode
    if (cmd === "gui" || cmd === "exit" || cmd === "startx") {
      dispatch(setNavMode("gui"));
      setFeedbackWithTimer(
        {
          type: "info",
          message: "Interface switched to GUI Mode.",
        },
        3000,
      );
      return;
    }

    // 4. Easter egg: sudo hire-rakib
    if (cmd === "sudo hire-rakib" || cmd === "sudo hire" || cmd === "hire") {
      scrollToTarget("contact");
      setFeedbackWithTimer(
        {
          type: "easter-egg",
          message:
            "[ROOT CLEARANCE GRANTED] Priority recruiter channel initialized. Let's build something phenomenal.",
        },
        7000,
      );
      return;
    }

    // 5. Directory list: ls / dir
    if (
      cmd === "ls" ||
      cmd === "dir" ||
      cmd === "ls -la" ||
      cmd === "ls -l" ||
      cmd === "ls -a"
    ) {
      setFeedbackWithTimer(
        {
          type: "info",
          message: "Directory contents of ~/ (portfolio root):",
          items: [
            { name: "about.md", type: "file", action: "cat about.md" },
            { name: "skills/", type: "dir", action: "ls skills/" },
            {
              name: "education.json",
              type: "file",
              action: "cat education.json",
            },
            {
              name: "experience.log",
              type: "file",
              action: "cat experience.log",
            },
            { name: "projects/", type: "dir", action: "ls projects/" },
            { name: "contact.sh", type: "file", action: "./contact.sh" },
            { name: "resume.pdf", type: "file", action: "cat resume.pdf" },
          ],
        },
        8000,
      );
      return;
    }

    // 6. Navigation: cd <section>
    if (cmd === "cd" || cmd.startsWith("cd ")) {
      const rawTarget = cmd.slice(2).trim();
      const target = rawTarget.replace(/^\/+|\/+$/g, "");

      if (!target || target === "~" || target === "home" || target === "..") {
        scrollToTarget("home");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/ (Home)",
          },
          3000,
        );
        return;
      }
      if (target === "about" || target === "about.md") {
        scrollToTarget("about");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/about",
          },
          3000,
        );
        return;
      }
      if (target === "skills") {
        scrollToTarget("skills");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/skills",
          },
          3000,
        );
        return;
      }
      if (target === "education" || target === "education.json") {
        scrollToTarget("education");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/education",
          },
          3000,
        );
        return;
      }
      if (
        target === "experience" ||
        target === "experience.log" ||
        target === "jobs" ||
        target === "work"
      ) {
        scrollToTarget("experience");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/experience",
          },
          3000,
        );
        return;
      }
      if (target === "projects") {
        dispatch(setProjectViewMode("filesystem"));
        scrollToTarget("projects");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/projects (filesystem mode active)",
          },
          3000,
        );
        return;
      }
      if (target === "contact" || target === "contact.sh") {
        scrollToTarget("contact");
        setFeedbackWithTimer(
          {
            type: "success",
            message: "Changed directory to ~/contact",
          },
          3000,
        );
        return;
      }

      setFeedbackWithTimer(
        {
          type: "error",
          message: `bash: cd: ${rawTarget}: No such directory. Run 'ls' to view entries.`,
          suggestion: "ls",
        },
        5000,
      );
      return;
    }

    // 7. Resume download: cat resume.pdf
    if (
      cmd === "cat resume.pdf" ||
      cmd === "cat resume" ||
      cmd === "cat cv" ||
      cmd === "cat cv.pdf" ||
      cmd === "download resume"
    ) {
      if (typeof window !== "undefined") {
        window.open("/cv/Rakibul_Islam_Resume.pdf", "_blank");
      }
      setFeedbackWithTimer(
        {
          type: "success",
          message:
            "[DOWNLOAD] Opening Rakibul_Islam_Resume.pdf in browser viewer...",
        },
        4500,
      );
      return;
    }

    // 8. Specific cat handlers with rich summary output
    if (cmd === "cat about.md" || cmd === "cat bio") {
      scrollToTarget("about");
      setFeedbackWithTimer(
        {
          type: "success",
          message:
            "Md. Rakibul Islam — Full-Stack Software Engineer @ SM Technology. M.Sc. CSE @ JU (3.75 CGPA). Specialized in Next.js, TypeScript, PostgreSQL, and distributed architectures.",
        },
        6000,
      );
      return;
    }

    if (cmd === "cat education.json") {
      scrollToTarget("education");
      setFeedbackWithTimer(
        {
          type: "success",
          message:
            "M.Sc. in CSE @ Jahangirnagar University (3.75) • B.Sc. in CSE @ BUBT (3.66)",
        },
        5000,
      );
      return;
    }

    if (cmd === "cat experience.log") {
      scrollToTarget("experience");
      setFeedbackWithTimer(
        {
          type: "success",
          message:
            "SM Technology (Frontend Engineer, 2025-Present) • Trodev (Junior Dev) • BCC (Software QA)",
        },
        5000,
      );
      return;
    }

    // 9. System telemetry queries
    if (cmd === "whoami") {
      setFeedbackWithTimer(
        {
          type: "info",
          message:
            "rakib: Md. Rakibul Islam — Full-Stack Software Engineer @ SM Technology. Status: Available for full-time roles.",
        },
        5500,
      );
      return;
    }

    if (cmd === "uptime") {
      setFeedbackWithTimer(
        {
          type: "info",
          message:
            "up 1.5+ years production experience • 20+ shipped systems • 0 dropped healthchecks • load: 0.08, 0.03, 0.01",
        },
        5500,
      );
      return;
    }

    // 10. Exact Command Match from COMMAND_MAP
    const matched = COMMAND_MAP[cmd];
    if (matched) {
      if (matched.viewMode) {
        dispatch(setProjectViewMode(matched.viewMode));
      }
      if (matched.targetId) {
        scrollToTarget(matched.targetId);
      }
      setShowHelpDropdown(false);
      setFeedbackWithTimer(
        {
          type: "success",
          message: `Executing: ${cmd} -> Navigating to /${matched.targetId || ""}`,
        },
        3500,
      );
      return;
    }

    // 11. Suggestion or Fuzzy Match
    const suggestion = SUGGESTIONS[cmd];
    if (suggestion) {
      setFeedbackWithTimer(
        {
          type: "error",
          message: `bash: ${cmd}: command not found.`,
          suggestion,
        },
        6000,
      );
      return;
    }

    const closest = Object.keys(COMMAND_MAP).find(
      (k) => k.includes(cmd) || cmd.includes(k.split(" ")[0]),
    );

    setFeedbackWithTimer(
      {
        type: "error",
        message: `bash: ${cmd}: command not found. Type 'help' or 'ls' for valid commands.`,
        suggestion: closest,
      },
      5500,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter key: Execute
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
      return;
    }

    // Tab key: Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;

      if (current.startsWith("cd ")) {
        const cdArg = current.slice(3).trim();
        const dirs = [
          "about/",
          "skills/",
          "education/",
          "experience/",
          "projects/",
          "contact/",
          "~",
        ];
        const match = dirs.find((d) => d.startsWith(cdArg));
        if (match) {
          setInputVal(`cd ${match}`);
          return;
        }
      }

      if (current.startsWith("cat ")) {
        const catArg = current.slice(4).trim();
        const files = [
          "about.md",
          "education.json",
          "experience.log",
          "resume.pdf",
          "contact.sh",
        ];
        const match = files.find((f) => f.startsWith(catArg));
        if (match) {
          setInputVal(`cat ${match}`);
          return;
        }
      }

      if (current.startsWith("ls ")) {
        const lsArg = current.slice(3).trim();
        const lsTargets = ["skills/", "projects/", "-la"];
        const match = lsTargets.find((t) => t.startsWith(lsArg));
        if (match) {
          setInputVal(`ls ${match}`);
          return;
        }
      }

      const allTokens = [
        "help",
        "ls",
        "ls -la",
        "cd about",
        "cd skills",
        "cd education",
        "cd experience",
        "cd projects",
        "cd contact",
        "cat about.md",
        "ls skills/",
        "cat education.json",
        "cat experience.log",
        "ls projects/",
        "./contact.sh",
        "cat resume.pdf",
        "whoami",
        "uptime",
        "gui",
        "clear",
        "sudo hire-rakib",
      ];

      const candidates = allTokens.filter((c) => c.startsWith(current));
      if (candidates.length > 0) {
        setInputVal(candidates[0]);
      } else {
        const sug = Object.keys(SUGGESTIONS).find((s) => s.startsWith(current));
        if (sug && SUGGESTIONS[sug]) {
          setInputVal(SUGGESTIONS[sug]);
        }
      }
      return;
    }

    // Up Arrow: History backward
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (shellHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? shellHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(shellHistory[nextIndex] || "");
      return;
    }

    // Down Arrow: History forward
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= shellHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(shellHistory[nextIndex]);
      }
      return;
    }

    // Escape: clear input / dismiss feedback
    if (e.key === "Escape") {
      setInputVal("");
      setFeedback(null);
      setShowHelpDropdown(false);
      inputRef.current?.blur();
      return;
    }
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Active Shell Prompt Container */}
      <div className="group relative flex items-center w-full min-w-[280px] sm:min-w-[380px] md:min-w-[440px] px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-[#0c1017]/90 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.08)] transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-[0_0_25px_rgba(16,185,129,0.2)]">
        {/* Terminal Icon & Prompt String */}
        <div className="flex items-center gap-1.5 font-mono text-xs select-none pr-1.5">
          <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-400 hidden sm:inline">rakib@box:~$</span>
          <span className="text-emerald-400 sm:hidden">&gt;</span>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="cat about.md | ls projects/ | help"
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500/70 tracking-tight ml-1"
          aria-label="Interactive portfolio shell navigation"
          role="combobox"
          aria-expanded={showHelpDropdown || !!feedback}
          aria-autocomplete="list"
          spellCheck={false}
          autoComplete="off"
        />

        {/* Right Action Hint / Run Icon */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono shrink-0 pl-1">
          {inputVal.trim() ? (
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-1 rounded text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
              title="Execute command (Enter)"
            >
              <CornerDownLeft className="w-3 h-3" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-slate-700/60 bg-slate-800/40 text-slate-400 text-[9px]">
              TAB complete
            </span>
          )}
        </div>
      </div>

      {/* Floating Output & Suggestions Popover */}
      <AnimatePresence>
        {(feedback || showHelpDropdown) && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-slate-800 bg-[#090c12]/95 backdrop-blur-xl p-3 font-mono text-xs shadow-2xl overflow-hidden"
          >
            {/* Feedback Message */}
            {feedback && (
              <div className="flex items-start gap-2 mb-2 pb-2 border-b border-slate-800/60 last:border-b-0 last:mb-0 last:pb-0">
                {feedback.type === "success" && (
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                )}
                {feedback.type === "error" && (
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                )}
                {feedback.type === "easter-egg" && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                )}
                {feedback.type === "info" && (
                  <HelpCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                )}

                <div className="flex-1 space-y-1">
                  <div
                    className={
                      feedback.type === "error"
                        ? "text-rose-300"
                        : feedback.type === "easter-egg"
                          ? "text-amber-300 font-semibold"
                          : feedback.type === "success"
                            ? "text-emerald-300"
                            : "text-slate-300"
                    }
                  >
                    {feedback.message}
                  </div>

                  {feedback.suggestion && (
                    <div className="text-slate-400 flex items-center gap-1.5 pt-0.5">
                      <span>Did you mean:</span>
                      <button
                        type="button"
                        onClick={() => executeCommand(feedback.suggestion!)}
                        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-semibold cursor-pointer"
                      >
                        {feedback.suggestion}
                      </button>
                    </div>
                  )}

                  {feedback.items && feedback.items.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60 mt-2">
                      {feedback.items.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => executeCommand(item.action)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] hover:bg-emerald-500/15 border border-white/[0.08] hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer active:scale-95"
                        >
                          <span
                            className={
                              item.type === "dir"
                                ? "text-sky-400 font-semibold"
                                : "text-emerald-400"
                            }
                          >
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Help Cheat Sheet */}
            {showHelpDropdown && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800/60 font-semibold">
                  <span>COMMAND CHEATSHEET</span>
                  <button
                    onClick={() => setShowHelpDropdown(false)}
                    className="text-slate-500 hover:text-slate-300 text-[10px]"
                  >
                    [close]
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pt-1.5 pr-1">
                  {Object.entries(COMMAND_MAP).map(([command, info]) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => executeCommand(command)}
                      className="flex flex-col items-start p-1.5 rounded bg-slate-900/60 hover:bg-emerald-500/10 border border-slate-800/80 hover:border-emerald-500/30 text-left transition-colors group/cmd"
                    >
                      <span className="text-emerald-400 group-hover/cmd:text-emerald-300 font-bold text-[11px]">
                        $ {command}
                      </span>
                      <span className="text-slate-500 text-[10px] leading-tight">
                        {info.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
