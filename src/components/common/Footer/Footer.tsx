"use client";

import { Github, Linkedin, Facebook, Mail, Heart } from "lucide-react";
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
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white">
              Md. Rakibul Islam
              <span className="bg-linear-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                .
              </span>
            </h3>
            <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xs">
              A passionate Software Engineer from Dhaka, Bangladesh — building
              clean interfaces & scalable web applications.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  aria-label={social.name}
                  className="
                    group flex h-10 w-10 items-center justify-center rounded-xl
                    border border-white/10 bg-white/5 text-white/60
                    transition-all duration-200
                    hover:bg-white/10 hover:text-white hover:-translate-y-0.5
                  "
                >
                  <social.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/50">📍 Dhaka, Bangladesh</li>
              <li>
                <Link
                  href="mailto:rakibutsho1920@gmail.com"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  ✉️ rakibutsho1920@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+8801707934655"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  📞 +880 1707-934655
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="
                  inline-flex items-center gap-2 text-sm font-medium
                  px-5 py-2.5 rounded-xl
                  bg-linear-to-r from-fuchsia-500 via-purple-500 to-violet-500
                  text-white hover:brightness-110 transition cursor-pointer
                "
              >
                Let&apos;s Work Together <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} Md. Rakibul Islam. Built with{" "}
            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400 inline" />{" "}
            using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};
