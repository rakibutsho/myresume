"use client";

import { education } from "@/data/education";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Institute = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".edu-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.07,
      },
    );

    return () => {
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <div ref={listRef} className="grid grid-cols-1 gap-4">
      {education.map((insti) => (
        <div
          key={insti.id}
          className="edu-card p-5 rounded-2xl border border-gray-200 bg-white/10 hover:border-black transition"
        >
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-gray-100 bg-white">
              <Image
                src={insti.logo}
                alt={insti.institute}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>

            {/* Main info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base sm:text-lg font-semibold leading-tight">
                  {insti.institute}
                </h3>
                <p className="text-sm text-white">{insti.timeline}</p>
              </div>

              <p className="text-sm text-white mt-1">{insti.degree}</p>

              <h4 className="text-sm font-medium mt-3 text-white">
                {insti.subject}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Institute;
