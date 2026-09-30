"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

const TECH_CHIPS = [
  {
    Icon: SiReact,
    color: "text-[#61dafb]",
    position: "absolute -top-4 -right-4",
    animation: { y: [0, -10, 0], duration: 3, delay: 0 },
  },
  {
    Icon: SiNextdotjs,
    color: "text-white",
    position: "absolute top-16 -left-8",
    animation: { y: [0, 10, 0], duration: 4, delay: 0.5 },
  },
  {
    Icon: SiTypescript,
    color: "text-[#3178c6]",
    position: "absolute bottom-10 -right-8",
    animation: { y: [0, -8, 0], duration: 3.5, delay: 1 },
  },
  {
    Icon: SiTailwindcss,
    color: "text-[#38bdf8]",
    position: "absolute -bottom-6 left-10",
    animation: { y: [0, 8, 0], duration: 4.5, delay: 1.5 },
  },
];

export function HeroImage() {
  return (
    <div className="relative w-full max-w-sm mx-auto sm:max-w-md flex justify-center items-center mt-10 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-64 h-64 sm:w-80 sm:h-80"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-sky-500/30 blur-[80px] rounded-full" />
        
        {/* Rings */}
        <div className="absolute inset-[-20px] rounded-full border border-sky-400/20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-[-40px] rounded-full border border-sky-400/10 animate-[spin_15s_linear_infinite_reverse]" />

        {/* Profile Image Wrapper */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-[#0F1117] shadow-2xl z-10 flex items-center justify-center">
          <Image 
            src="/images/Profile.png" 
            alt="Rakibul Islam" 
            fill
            priority
            sizes="(max-width: 640px) 256px, 320px"
            className="object-cover" 
          />
        </div>

        {/* Floating Tech Chips */}
        {TECH_CHIPS.map((chip, idx) => (
          <motion.div 
            key={idx}
            animate={{ y: chip.animation.y }} 
            transition={{ 
              repeat: Infinity, 
              duration: chip.animation.duration, 
              ease: "easeInOut", 
              delay: chip.animation.delay 
            }}
            className={`bg-[#0A0D14] p-3 rounded-full border border-white/10 shadow-xl z-20 ${chip.color} ${chip.position} will-change-transform`}
          >
            <chip.Icon size={24} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
