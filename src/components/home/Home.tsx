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
import { BadgeCheckIcon, Github01Icon, GithubFreeIcons, Linkedin02Icon, Mail01FreeIcons, MailAccountFreeIcons, NewReleasesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="w-full pt-32 pb-10 min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans text-white"
    >
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-20">
        
        {/* Left Column: Modern Profile Card */}
        <div className="fade-up-element w-full max-w-[340px] relative shrink-0 mx-auto lg:mx-0 flex flex-col">
          <div className="absolute -inset-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-70"></div>
          <div className="w-full h-full bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative group flex flex-col items-center text-center shadow-2xl">
            {/* Open to work badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-medium text-white/90 tracking-wide uppercase">Open to work</span>
            </div>

            {/* Profile Image - Square with rounded corners */}
            <div className="relative w-60 h-60 mt-6 mb-5">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-[#1a1a1a]">
                <Image
                  src={profileImg}
                  alt="Md. Rakibul Islam"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 240px"
                  priority
                />
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex items-center gap-1.5 mb-1">
              <h2 className="text-[22px] font-bold text-white tracking-wide">Md. Rakibul Islam</h2>
              <HugeiconsIcon icon={NewReleasesIcon} className="w-5 h-5 text-blue-500" />
            </div>
            
            <h3 className="text-emerald-400 font-medium text-sm mb-4">Software Engineer</h3>
            
            <div className="text-[#a1a1aa] text-xs space-y-1.5 mb-7 font-medium">
              <p>2+ yrs • Dhaka, Bangladesh</p>
              <p>Available for new opportunities</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 mb-7 w-full">
              <Link href="https://github.com/rakibutsho" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                <HugeiconsIcon icon={GithubFreeIcons} className="w-4 h-4" />
              </Link>
              <Link href="https://www.linkedin.com/in/rakibutsho" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                <HugeiconsIcon icon={Linkedin02Icon} className="w-4 h-4" />
              </Link>
              <Link href="mailto:rakib@example.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                <HugeiconsIcon icon={Mail01FreeIcons} className="w-4 h-4" />
              </Link>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-3 mt-auto">
              <Link href="#contact" className="w-full py-3.5 bg-emerald-400 text-black font-bold rounded-xl hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                Get in touch <ArrowRight className="w-4 h-4" />
              </Link>
              <button onClick={() => setIsPdfModalOpen(true)} className="w-full py-3.5 bg-black/50 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer">
                Résumé <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
          
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-8 bg-emerald-500/50"></div>
             <span className="text-emerald-500 text-xs font-bold tracking-[0.2em] uppercase">Full-Stack Software Engineer</span>
          </div>

          <h1 className="fade-up-element text-[42px] sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-8 font-serif">
            Transforming ideas into<br className="hidden sm:block" />
            scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">digital solutions.</span>
          </h1>

          <p className="fade-up-element text-lg md:text-xl text-[#a1a1aa] max-w-[600px] mb-12 leading-relaxed font-medium">
            I'm a Full-Stack Software Engineer specializing in React, Next.js,
            and modern web architecture. I turn complex problems into elegant,
            high-performance solutions.
          </p>

          {/* Stats Row */}
          <div className="mt-auto fade-up-element w-full grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-10">
             <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif text-white font-bold">2+</span>
                <span className="text-[#a1a1aa] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">Years Experience</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif text-white font-bold">20+</span>
                <span className="text-[#a1a1aa] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">Projects Shipped</span>
             </div>
             <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <span className="text-4xl md:text-5xl font-serif text-white font-bold">10+</span>
                <span className="text-[#a1a1aa] text-[10px] md:text-[11px] font-bold tracking-widest uppercase">Apps Delivered</span>
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
