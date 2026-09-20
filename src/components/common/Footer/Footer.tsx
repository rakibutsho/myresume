"use client";

import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-16 px-6 border-t border-white/[0.08] bg-[#050608]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">
                Md. Rakibul Islam
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-mono text-slate-400">
                Full-Stack Software Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-normal leading-relaxed">
              Building scalable frontend interfaces, micro-services, and cloud architectures. Located in Dhaka, Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
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
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Colophon & Bottom Metadata */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Md. Rakibul Islam. Designed & Crafted with Next.js 15, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Operational · All Systems Normal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
