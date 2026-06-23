"use client";

import { Facebook, Github, Heart, Linkedin, Mail, ArrowUpRight, MapPin, Phone } from "lucide-react";
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
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export const Footer = () => {
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // If not on the homepage, let standard Next.js routing handle it
      if (window.location.pathname !== "/") {
        return;
      }
      
      e.preventDefault();
      const id = href.replace(/.*#/, "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <footer className="relative bg-[#09090b] border-t border-white/5 mt-0 overflow-hidden">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[100px] bg-emerald-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Socials (Col Span 5) */}
          <div className="md:col-span-5">
            <h3 className="text-4xl font-bold tracking-tight text-white mb-6">
              Rakibul Islam
              <span className="text-emerald-400">.</span>
            </h3>
            <p className="text-base text-[#a1a1aa] leading-relaxed max-w-sm mb-10 font-light">
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
                      group flex h-14 w-14 items-center justify-center rounded-2xl
                      bg-[#121214] border border-white/5
                      transition-all duration-300
                      hover:bg-white hover:text-black hover:border-white hover:scale-110 hover:shadow-xl
                      text-[#a1a1aa]
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links (Col Span 3) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-white mb-8 text-[11px] uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="group inline-flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-white transition-colors duration-300 cursor-pointer font-medium tracking-wide"
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
            <h4 className="font-bold text-white mb-8 text-[11px] uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Direct Contact
            </h4>
            <ul className="space-y-5 mb-10">
              <li className="flex items-center gap-4 text-sm text-[#a1a1aa] font-medium tracking-wide">
                <span className="w-10 h-10 rounded-[14px] bg-[#121214] border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </span>
                Dhaka, Bangladesh
              </li>
              <li>
                <Link
                  href="mailto:rakibutsho1920@gmail.com"
                  className="flex items-center gap-4 text-sm text-[#a1a1aa] hover:text-white transition-colors font-medium tracking-wide group"
                >
                  <span className="w-10 h-10 rounded-[14px] bg-[#121214] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-white/10 transition-colors">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </span>
                  rakibutsho1920@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+8801707934655"
                  className="flex items-center gap-4 text-sm text-[#a1a1aa] hover:text-white transition-colors font-medium tracking-wide group"
                >
                  <span className="w-10 h-10 rounded-[14px] bg-[#121214] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-white/10 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </span>
                  +880 1707-934655
                </Link>
              </li>
            </ul>

            <a
              href="/#contact"
              onClick={(e) => handleScroll(e, "/#contact")}
              className="
                group flex items-center justify-center gap-3 w-full
                rounded-2xl px-6 py-4 text-sm font-semibold tracking-wide uppercase text-black
                bg-white border border-white
                hover:bg-emerald-400 hover:border-emerald-400 hover:text-black transition-all duration-300
                shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]
              "
            >
              Hire Me
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                 <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#a1a1aa] font-medium tracking-wide">
            © {new Date().getFullYear()} Rakibul Islam. All rights reserved.
          </p>
          <p className="text-sm text-[#a1a1aa] font-medium flex items-center gap-2 tracking-wide">
            Crafted with <Heart className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400 animate-pulse" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};
