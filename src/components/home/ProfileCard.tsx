"use client";

import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/portfolio.png";
import {
  Facebook,
  GithubIcon,
  LinkedinIcon,
  Phone,
  BadgeCheck,
} from "lucide-react";

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
    <div className="w-[320px] shrink-0">
      {/* Gradient border */}
      <div className="relative rounded-3xl p-px bg-linear-to-b from-white/1 via-white/2 to-white/1">
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl blur-xl" />

        {/* Card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          {/* Image */}
          <div className="relative mx-auto">
            <div className="absolute -inset-2 rounded-2xl bg-white/10 blur-lg" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={profile}
                alt="Md. Rakibul Islam"
                className="h-75 w-150 object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
              Md. Rakibul Islam
              <BadgeCheck className="h-5 w-5 text-sky-400" />
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Software Engineer •{" "}
              <span className="bg-linear-to-r from-fuchsia-400 via-purple-400 to-violet-300 bg-clip-text text-transparent font-medium">
                JavaScript • MERN • Next.js • Golang
              </span>
            </p>

            <p className="mt-2 text-sm text-white/55">Dhaka, Bangladesh</p>
          </div>

          {/* Social */}
          <div className="mt-5 flex justify-center gap-3">
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
                    group flex h-11 w-11 items-center justify-center rounded-2xl
                    border border-white/10 bg-white/5 text-white/70
                    transition-all duration-200
                    hover:bg-white/10 hover:text-white hover:-translate-y-0.5
                  "
                >
                  <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-6 w-full mx-auto flex justify-center">
            <Link
              href="#contact"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full px-5 py-3 text-sm font-semibold text-white
                bg-linear-to-r from-fuchsia-500 via-purple-500 to-violet-500
                hover:brightness-110 transition
              "
            >
              Let’s Connect <span className="translate-y-px">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
