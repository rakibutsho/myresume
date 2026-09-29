"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightLinesProps {
  className?: string;
  linesOpacity?: number;
  lightsOpacity?: number;
  speedMultiplier?: number;
  gradientFrom?: string;
  gradientTo?: string;
  lightColor?: string;
  lineColor?: string;
  children?: React.ReactNode;
}

interface AnimatedLightRef {
  element: SVGPathElement | null;
  from: number;
  to: number;
  duration: number;
}

export function LightLines({
  className,
  linesOpacity = 0.05,
  lightsOpacity = 0.7,
  speedMultiplier = 1,
  gradientFrom = "#38bdf8",
  gradientTo = "#0ea5e9",
  lineColor = "#fff",
  children,
}: LightLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<AnimatedLightRef[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lightsDown = [
      { selector: ".light4", from: -1080, to: 1080 },
      { selector: ".light5", from: -1080, to: 1080 },
      { selector: ".light6", from: -1080, to: 1080 },
      { selector: ".light7", from: -1080, to: 1080 },
      { selector: ".light8", from: -1080, to: 1080 },
      { selector: ".light11", from: -1080, to: 1080 },
      { selector: ".light12", from: -1080, to: 1080 },
      { selector: ".light13", from: -1080, to: 1080 },
      { selector: ".light14", from: -1080, to: 1080 },
      { selector: ".light15", from: -1080, to: 1080 },
      { selector: ".light16", from: -1080, to: 1080 },
    ];

    const lightsUp = [
      { selector: ".light1", from: 1080, to: -1080 },
      { selector: ".light2", from: 1080, to: -1080 },
      { selector: ".light3", from: 1080, to: -1080 },
      { selector: ".light9", from: 1080, to: -1080 },
      { selector: ".light10", from: 1080, to: -1080 },
      { selector: ".light17", from: 1080, to: -1080 },
    ];

    const container = containerRef.current;
    if (!container) return;

    const allLights = [...lightsDown, ...lightsUp];
    animationsRef.current = allLights.map((light) => {
      const element = container.querySelector(
        light.selector,
      ) as SVGPathElement | null;
      const duration =
        (Math.floor(Math.random() * 59) + 2) * 0.5 * (1 / speedMultiplier) +
        0.5;
      return { element, from: light.from, to: light.to, duration };
    });

    let lastTime: number | null = null;
    const progresses = animationsRef.current.map(() => Math.random());

    const animate = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      animationsRef.current.forEach((anim, i) => {
        if (!anim.element) return;
        progresses[i] = (progresses[i] + delta / anim.duration) % 1;
        const y = anim.from + (anim.to - anim.from) * progresses[i];
        anim.element.style.transform = `translateY(${y}px)`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [speedMultiplier]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity="0" />
            <stop offset="50%" stopColor={gradientFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientTo} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[108, 216, 324, 432, 540, 648, 756, 864, 972].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="1080"
            stroke={lineColor}
            strokeOpacity={linesOpacity}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 17 }, (_, i) => {
          const x = ((i % 9) + 1) * 108;
          return (
            <path
              key={i}
              className={`light${i + 1}`}
              d={`M${x} 0 L${x} 120`}
              stroke="url(#lg1)"
              strokeWidth="2"
              strokeOpacity={lightsOpacity}
              fill="none"
            />
          );
        })}
      </svg>
      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </div>
  );
}
