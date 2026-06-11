"use client";

import { Facebook, Github, Heart, Linkedin, Mail, ArrowRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useCallback } from "react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/rakib-utsho",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-rakibutsho-cse",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/rakibulislam.utsho",
    icon: Facebook,
  },
  {
    name: "Email",
    href: "mailto:rakibutsho1920@gmail.com",
    icon: Mail,
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <footer className="relative bg-[#0a0f1a] border-t border-[#1e293b] mt-20 overflow-hidden">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[100px] bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Socials (Col Span 5) */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-bold text-white mb-4">
              Rakibul Islam
              <span className="text-emerald-400">.</span>
            </h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-8 font-medium">
              Full-stack Software Engineer focused on high-performance Next.js products that improve product clarity and conversion. Building reliable experiences from the UI down to the database.
            </p>

            {/* Premium 3D Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    aria-label={social.name}
                    className="
                      group relative flex h-12 w-12 items-center justify-center rounded-2xl
                      bg-[#131b2c] border border-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)]
                      transition-all duration-300
                      hover:border-emerald-500/50 hover:bg-[#152033] hover:-translate-y-1
                    "
                  >
                    <Icon className="h-5 w-5 text-white/60 transition-colors duration-300 group-hover:text-emerald-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links (Col Span 3) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer font-medium"
                  >
                    <span className="w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch (Col Span 4) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              Direct Contact
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-white/50 font-medium">
                <span className="w-8 h-8 rounded-lg bg-[#131b2c] border border-[#1e293b] shadow-inner flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400/80" />
                </span>
                Dhaka, Bangladesh
              </li>
              <li>
                <Link
                  href="mailto:rakibutsho1920@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors font-medium group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#131b2c] border border-[#1e293b] shadow-inner flex items-center justify-center shrink-0 group-hover:border-emerald-500/50 transition-colors">
                    <Mail className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400" />
                  </span>
                  rakibutsho1920@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+8801707934655"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors font-medium group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#131b2c] border border-[#1e293b] shadow-inner flex items-center justify-center shrink-0 group-hover:border-emerald-500/50 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400" />
                  </span>
                  +880 1707-934655
                </Link>
              </li>
            </ul>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="
                inline-flex items-center justify-center gap-2 w-full
                px-6 py-4 rounded-xl text-sm font-bold
                bg-linear-to-r from-emerald-500 to-[#10b981]
                text-slate-900 hover:brightness-110 transition cursor-pointer
                shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
              "
            >
              Hire Me For Your Team <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-16 pt-8 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-medium">
            © {new Date().getFullYear()} Md. Rakibul Islam. All rights reserved.
          </p>
          <p className="text-sm text-white/40 font-medium flex items-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};
