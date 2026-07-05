"use client";

import profile from "@/assets/profile-2.png";
import {
  BadgeCheck,
  Facebook,
  GithubIcon,
  LinkedinIcon,
  Phone,
  ArrowUpRight,
  Trophy,
  Award,
  Code2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import React from "react";

const social = [
  { name: "Facebook", href: "https://www.facebook.com/rakibulislam.utsho/", icon: Facebook },
  { name: "WhatsApp", href: "https://wa.me/8801707934655", icon: Phone },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-rakibutsho-cse/", icon: LinkedinIcon },
  { name: "GitHub", href: "https://github.com/rakib-utsho", icon: GithubIcon },
];

function ProfileCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[360px] md:w-[360px] shrink-0"
      style={{ perspective: 1000 }}
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[32px] overflow-hidden border border-white/20 bg-gradient-to-b from-[#1a1a1f] to-[#09090b] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] group cursor-crosshair"
      >
        {/* Holographic Glare Effect */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
          }}
        />

        {/* Microchip / Circuit Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16,185,129,1) 1px, transparent 0)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        
        {/* Glowing Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 opacity-80" />

        <div className="relative p-8 flex flex-col items-center" style={{ transform: 'translateZ(30px)' }}>
          
          {/* Header ID */}
          <div className="w-full flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Dev-ID: 88-017</span>
            </div>
            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
               <span className="text-[9px] font-bold tracking-wider text-white uppercase">Active</span>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative mx-auto mb-6">
            <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-emerald-400/30 bg-[#121214] shadow-2xl z-10">
              <Image
                src={profile}
                alt="Md. Rakibul Islam"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center w-full z-10 mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2 mb-1">
              Rakibul Islam
              <BadgeCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            </h2>
            <p className="text-xs tracking-widest text-emerald-300/80 font-mono uppercase mb-4">
              Software Engineer
            </p>
          </div>

          {/* Verified Credentials Strip */}
          <div className="w-full rounded-xl bg-black/40 border border-white/10 p-4 mb-6 backdrop-blur-md">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 text-left">Verified Credentials</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">ICPC Regional Contestant</p>
                  <p className="text-[10px] text-white/50">Asia Dhaka • Problem Solving</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <Code2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">HackerRank Certified</p>
                  <p className="text-[10px] text-white/50">Problem Solving & React</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                  <Award className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Great Learning Certified</p>
                  <p className="text-[10px] text-white/50">Front End Web Development</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-2 mb-6 w-full">
            {social.map((app) => {
              const Icon = app.icon;
              return (
                <Link
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  className="flex-1 h-10 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 text-[#a1a1aa] hover:bg-emerald-400/10 hover:text-emerald-400 hover:border-emerald-400/30 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="group relative w-full overflow-hidden rounded-xl bg-white p-[1px] transition-all hover:scale-[1.02]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#047857_50%,#10b981_100%)]" />
            <div className="relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white transition-colors group-hover:bg-transparent group-hover:text-black">
              Let's Talk
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProfileCard;
