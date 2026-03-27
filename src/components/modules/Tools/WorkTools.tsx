"use client";

import React, { useEffect, useRef } from "react";
import { tools } from "../../../data/work";
import Image from "next/image";
import gsap from "gsap";

const WorkTools = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const track = el.querySelector(".scroll-track") as HTMLElement;

    // duplicate items for infinite loop
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden">
      {/* Wrapper */}
      <div ref={listRef} className="w-full overflow-hidden">
        {/* Track */}
        <div className="scroll-track flex gap-4 w-max">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="tool-card flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 transition min-w-62.5"
            >
              {/* Image */}
              <div className="relative w-12 h-12 shrink-0">
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
                <p className="text-sm text-white/50">{tool.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkTools;
