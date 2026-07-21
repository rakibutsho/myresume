/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import {
  Download,
  ArrowRight,
  BadgeCheck,
  GithubIcon,
  LinkedinIcon,
  MapPin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PdfModal } from "../common/PdfModal/PdfModal";
import Image from "next/image";
import profileImg from "@/assets/profile-2.png";

function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="w-full pt-32 pb-24 min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans text-white"
    >
      {/* Dynamic Background Glows */}

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Badge */}
          <div className="fade-up-element flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-xl hover:bg-white/10 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-sm font-medium text-white/90">
              Available for new opportunities
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="fade-up-element text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tighter leading-[1.05] mb-8 font-serif max-w-2xl">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 drop-shadow-sm">
              digital products
            </span>{" "}
            <br className="hidden lg:block" />
            that ship and scale.
          </h1>

          {/* Subheadline */}
          <p className="fade-up-element text-lg md:text-xl text-white/80 max-w-[600px] mb-10 leading-relaxed font-medium">
            I'm a Full-Stack Software Engineer specializing in React, Next.js,
            and modern web architecture. I turn complex problems into elegant,
            high-performance solutions.
          </p>

          {/* Action Buttons */}
          <div className="fade-up-element flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-10">
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Download className="w-4 h-4" /> Download Résumé
            </button>
          </div>

          {/* Social Connections */}
          <div className="fade-up-element flex items-center gap-6">
            <Link
              href="https://www.linkedin.com/in/rakibutsho"
              target="_blank"
              className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors font-mono text-sm group"
            >
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              linkedin.in/rakibutsho
            </Link>
            <Link
              href="https://github.com/rakibutsho"
              target="_blank"
              className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors font-mono text-sm group"
            >
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                <GithubIcon className="w-4 h-4" />
              </div>
              github/rakibutsho
            </Link>
          </div>
        </div>

        {/* Right Column: Modern Profile Card */}
        <div className="fade-up-element w-full max-w-[400px] lg:max-w-[460px] relative">
          <div className="w-full bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-2xl overflow-hidden relative group hover:border-emerald-500/30 transition-all duration-500">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 md:mb-6 border border-white/5 bg-[#121214]">
              <Image
                src={profileImg}
                alt="Rakibul Islam"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90" />

              {/* Overlay Details */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl tracking-wide mb-1">
                    Md. Rakibul Islam
                  </span>
                  <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                    Software Engineer
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                  <BadgeCheck className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Quick Info & Socials inside Card */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-white/90">
                    Dhaka, Bangladesh
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="https://github.com/rakibutsho"
                    target="_blank"
                    className="p-2 rounded-xl bg-white/5 text-[#a1a1aa] hover:text-emerald-400 hover:bg-white/10 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/rakibutsho"
                    target="_blank"
                    className="p-2 rounded-xl bg-white/5 text-[#a1a1aa] hover:text-blue-400 hover:bg-white/10 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center group-hover:bg-white/10 transition-colors">
                  <span className="text-white font-bold text-2xl font-serif">
                    2+
                  </span>
                  <span className="text-[#a1a1aa] text-[10px] uppercase tracking-widest font-mono text-center mt-1">
                    Years
                    <br />
                    Experience
                  </span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center group-hover:bg-white/10 transition-colors">
                  <span className="text-white font-bold text-2xl font-serif">
                    20+
                  </span>
                  <span className="text-[#a1a1aa] text-[10px] uppercase tracking-widest font-mono text-center mt-1">
                    Projects
                    <br />
                    Shipped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="https://drive.google.com/file/d/1CeJfS4sSUnfe7zyOhBE9g5WYwHV-1nux/view?usp=drive_link"
      />
    </section>
  );
}

export default Home;
