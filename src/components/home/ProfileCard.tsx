"use client";

import profile from "@/assets/profile-2.png";
import {
  BadgeCheck,
  Facebook,
  GithubIcon,
  LinkedinIcon,
  Phone,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const social = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/rakibulislam.utsho/",
    icon: Facebook,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801707934655?text=Hello%20I%20want%20to%20know%20more",
    icon: Phone,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-rakibutsho-cse/",
    icon: LinkedinIcon,
  },
  { name: "GitHub", href: "https://github.com/rakib-utsho", icon: GithubIcon },
];

function ProfileCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[360px] md:w-[360px] shrink-0"
    >
      <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#09090b] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] group">
        
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />

        <div className="relative p-8 flex flex-col items-center">
          
          {/* Image Container */}
          <div className="relative mx-auto mb-8">
            <div className="absolute -inset-4 rounded-full bg-emerald-500/10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/10 bg-[#121214] shadow-2xl z-10 group-hover:border-emerald-500/30 transition-colors duration-500">
              <Image
                src={profile}
                alt="Md. Rakibul Islam"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            {/* Online Status Dot */}
            <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#09090b] flex items-center justify-center z-20">
               <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            </div>
          </div>

          {/* Info */}
          <div className="text-center w-full z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2 mb-2">
              Rakibul Islam
              <BadgeCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            </h2>

            <div className="flex flex-col gap-1.5 mb-8">
              <p className="text-sm tracking-wide text-white font-medium uppercase">
                Software Engineer
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#a1a1aa] font-semibold">
                  Next.js • React • Node
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Current Focus Bento */}
            <div className="rounded-2xl border border-white/5 bg-[#121214] p-5 text-left mb-8 shadow-inner hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Current Focus
                </p>
              </div>
              <p className="text-sm text-[#a1a1aa] leading-relaxed font-light">
                Building conversion-focused SaaS dashboards, scalable API architectures, and maintainable design systems.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 mb-8">
              {social.map((app) => {
                const Icon = app.icon;
                return (
                  <Link
                    key={app.name}
                    href={app.href}
                    target="_blank"
                    aria-label={app.name}
                    title={app.name}
                    className="
                      flex h-12 w-12 items-center justify-center rounded-2xl
                      border border-white/5 bg-[#121214] text-[#a1a1aa]
                      transition-all duration-300
                      hover:bg-white hover:text-black hover:border-white hover:scale-110 hover:shadow-xl
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="
                group flex items-center justify-center gap-3 w-full
                rounded-2xl px-6 py-4 text-sm font-semibold tracking-wide uppercase text-black
                bg-white border border-white
                hover:bg-emerald-400 hover:border-emerald-400 hover:text-black transition-all duration-300
                shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]
              "
            >
              Let's Talk
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                 <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
