"use client";

import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-6 border-t border-white/[0.08] bg-[#050608]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white tracking-tight">
                Md. Rakibul Islam
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-mono text-slate-400">
                Frontend Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Building production dashboards and open-source tools from Dhaka,
              Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-slate-400">
            <a
              href="https://github.com/rakibutsho"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/rakibutsho"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:mail@rakibutsho.dev"
              className="hover:text-white transition-colors"
            >
              Email ↗
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <span>
            © {new Date().getFullYear()} Md. Rakibul Islam — built with Next.js
            and TypeScript.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
