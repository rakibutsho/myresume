"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

interface Glyph {
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
}

const GLYPH_CHARS = [
  "{ }",
  "</>",
  "=>",
  "01",
  "git",
  "async",
  "const",
  "fn()",
  "&&",
  "[]",
  "/>",
];

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles count
    const particleCount = Math.min(Math.floor((width * height) / 12000), 95);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }

    // Floating Code Glyphs
    const glyphCount = Math.min(Math.floor(width / 110), 16);
    const glyphs: Glyph[] = [];
    for (let i = 0; i < glyphCount; i++) {
      glyphs.push({
        text: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(Math.random() * 0.35 + 0.15),
        alpha: Math.random() * 0.2 + 0.08,
        size: Math.floor(Math.random() * 3) + 11,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const maxConnectDist = 135;
      const mouseRadius = 170;

      // 1. Render Floating Code Glyphs
      ctx.font = "500 12px 'Fira Code', monospace";
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        g.y += g.vy;
        if (g.y < -20) {
          g.y = height + 20;
          g.x = Math.random() * width;
          g.text = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
        }
        ctx.fillStyle = `rgba(56, 189, 248, ${g.alpha})`;
        ctx.fillText(g.text, g.x, g.y);
      }

      // 2. Update & Draw Constellation Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Subtle mouse push
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 0.045;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Connect particle to mouse with amber laser lines
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouseRadius) {
            const mLineAlpha = (1 - mdist / mouseRadius) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${mLineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 origin-left z-[100] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        style={{ scaleX }}
      />

      {/* Atmospheric Ambient Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[980px] h-[480px] bg-gradient-to-b from-sky-500/12 via-amber-500/8 to-transparent blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -left-48 w-[450px] h-[360px] bg-purple-600/6 blur-[130px]" />
        <div className="absolute top-2/3 -right-48 w-[450px] h-[360px] bg-emerald-500/6 blur-[130px]" />
      </div>

      {/* Particle & Code Glyphs Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      />

      {/* Fine SVG Grain / Grid Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
    </>
  );
}
