/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { Download, ArrowUpRight, Code2, Terminal, User, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PdfModal } from "../common/PdfModal/PdfModal";

function Home() {
  const [time, setTime] = useState("");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka",
        }) + " GMT+6"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="w-full pt-28 pb-20 min-h-screen flex flex-col justify-center relative overflow-hidden bg-[#0a0a0c] font-sans text-white">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 z-10 flex flex-col items-center">
        
        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
          
          {/* Left: Text & Intro */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Hello, World!</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Md. Rakibul Islam<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Software Engineer
              </span>
            </h1>
            
            <p className="text-[#a1a1aa] text-lg max-w-lg leading-relaxed">
              Frontend-focused Full Stack Developer specializing in React, Next.js, and scalable web architectures. Building pixel-perfect, high-performance applications.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="#contact" className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Briefcase className="w-4 h-4" />
                Hire Me
              </Link>
              <button onClick={() => setIsPdfModalOpen(true)} className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Resume
              </button>
            </div>
          </div>

          {/* Right: Code Editor Concept */}
          <div className="w-full lg:w-[550px] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-xl blur-xl -z-10 translate-y-2 opacity-50" />
            <div className="bg-[#111113] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-[13px] md:text-sm">
              
              {/* Editor Tabs */}
              <div className="flex items-center bg-[#18181b] border-b border-white/5 px-2">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#111113] border-t-2 border-t-emerald-500 text-emerald-400">
                  <Code2 className="w-4 h-4" />
                  <span>developer.ts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>experience.json</span>
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-6 overflow-x-auto text-[#a1a1aa]">
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="pr-4 text-white/20 select-none text-right border-r border-white/5 mr-4 space-y-1">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
                  </div>
                  {/* Code */}
                  <div className="space-y-1 whitespace-nowrap">
                    <div><span className="text-blue-400">const</span> <span className="text-white">developer</span> = {"{"}</div>
                    <div className="pl-6">
                      <span className="text-emerald-300">name</span>: <span className="text-yellow-300">&apos;Md. Rakibul Islam&apos;</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">role</span>: <span className="text-yellow-300">&apos;Software Engineer&apos;</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">company</span>: <span className="text-yellow-300">&apos;SM Technology&apos;</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-emerald-300">skills</span>: [
                    </div>
                    <div className="pl-12 text-yellow-300">
                      &apos;React&apos;, &apos;Next.js&apos;, &apos;TypeScript&apos;,
                    </div>
                    <div className="pl-12 text-yellow-300">
                      &apos;Node.js&apos;, &apos;Tailwind&apos;, &apos;MongoDB&apos;
                    </div>
                    <div className="pl-6">],</div>
                    <div className="pl-6">
                      <span className="text-emerald-300">passion</span>: <span className="text-yellow-300">&apos;Building scalable web apps&apos;</span>
                    </div>
                    <div>{"};"}</div>
                    <div className="mt-2 text-white/50 italic">// Let&apos;s build something amazing together</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>

        {/* Footer Info Bar */}
        <div className="w-full mt-24 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-6 text-sm text-[#a1a1aa]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{time || "Loading time..."}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-white/5 text-xs text-emerald-400 border border-emerald-500/20">Open to work</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-500" />
            <span>SE @ SM Technology</span>
          </div>
        </div>
        
      </div>

      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="/cv/Rakibul%20Islam.pdf"
      />
    </section>
  );
}

export default Home;
