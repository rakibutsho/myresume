"use client";

import React, { useEffect, useRef } from "react";
import { tools } from "../../../data/work";
import Image from "next/image";
import gsap from "gsap";

const WorkTools = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  // very subtle animation on mount
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".tool-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
      },
    );
    return () => {
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section className="w-full">
      <h2 className="text-4xl sm:text-6xl font-bold mb-8">
        Tools Behind <br />
        <span className="pl-20 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Powerful Apps
        </span>
      </h2>

      <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="tool-card flex items-center gap-4 p-4 rounded-2xl border bg-white/10 border-gray-200 hover:border-black transition"
          >
            {/* Image */}
            <div className="relative w-12 h-12 shrink-0 ">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className="text-base font-semibold leading-tight">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600">{tool.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkTools;
