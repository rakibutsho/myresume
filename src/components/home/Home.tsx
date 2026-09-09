"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PdfModal } from "../common/PdfModal/PdfModal";
import gsap from "gsap";

const metrics = [
  { value: 1.5, suffix: "+", label: "Years Experience", sub: "Production Full-Stack" },
  { value: 20,  suffix: "+", label: "Deployed Builds",  sub: "Client & SaaS Systems" },
  { value: 10,  suffix: "+", label: "Client Partners",  sub: "International Delivery" },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/rakibutsho"          },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rakibutsho" },
  { label: "Email",    href: "mailto:mail@rakibutsho.dev"             },
];

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const metricValues = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hybrid-meta-top",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      tl.fromTo(
        ".hybrid-hero-headline",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.2"
      );
      tl.fromTo(
        ".hybrid-editorial-body",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
      tl.fromTo(
        ".hybrid-dispatch-card",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.7 },
        "-=0.5"
      );
      tl.fromTo(
        ".hybrid-metrics-shelf",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

      metricValues.current.forEach((el, i) => {
        if (!el) return;
        const isFloat = metrics[i].value % 1 !== 0;
        tl.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: String(metrics[i].value),
            duration: 1.3,
            ease: "power1.out",
            snap: { textContent: isFloat ? 0.1 : 1 },
          },
          "-=1.1"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background pt-28 pb-20 overflow-hidden"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        
        {/* ── TOP EDITORIAL SUB-BAR (Direction A + B Masthead) ───── */}
        <div className="hybrid-meta-top pb-6 border-b border-border flex flex-wrap items-center justify-between gap-4 font-mono text-2xs uppercase tracking-widest text-fg-subtle opacity-0">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">VOL. 04</span>
            <span className="text-border">/</span>
            <span>FOLIO 2026</span>
            <span className="text-border">/</span>
            <span>DHAKA, BD [23.8103° N]</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-foreground font-semibold">ENGINEERING PRODUCTION SYSTEMS</span>
          </div>
        </div>

        {/* ── MAIN HERO GRID: ASYMMETRIC 12-COLUMN BROADSHEET ────── */}
        <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left 8 Cols: Monumental Display Headline + Cashmere Lead */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Selected Works · Full-Stack Craft</span>
              </div>

              <h1 className="hybrid-hero-headline font-display text-hero uppercase tracking-tighter text-foreground leading-none opacity-0">
                SOFTWARE<br />
                <span className="text-accent">ENGINEER</span><br />
                CRAFTED.
              </h1>
            </div>

            <p className="hybrid-editorial-body text-base md:text-lg text-fg-muted font-normal leading-relaxed max-w-2xl opacity-0">
              Transforming ambitious product requirements into dependable, pixel-surgical software. Specialized in scalable React & Next.js client systems, low-latency Node API backends, and robust TypeScript architectures.
            </p>

            {/* Social & Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest font-semibold">
              {SOCIAL_LINKS.map((item, idx) => (
                <div key={item.label} className="flex items-center gap-6">
                  {idx > 0 && <span className="text-border select-none">—</span>}
                  <Button variant="swiss" size="none" asChild>
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  </Button>
                </div>
              ))}
              <span className="text-border select-none">—</span>
              <Button
                variant="swiss"
                size="none"
                onClick={() => setIsPdfModalOpen(true)}
              >
                Curriculum Vitae ↗
              </Button>
            </div>
          </div>

          {/* Right 4 Cols: Live Dispatch Log Box (shadcn Card) ── */}
          <div className="hybrid-dispatch-card lg:col-span-4 lg:border-l lg:border-border lg:pl-8 space-y-6 opacity-0">
            <Card className="rounded-xl border border-border bg-surface p-6">
              <CardHeader className="p-0 pb-4 border-b border-border flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-2xs font-mono font-bold uppercase tracking-widest text-accent">
                  DISPATCH_LOG // LIVE
                </CardTitle>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </CardHeader>
              
              <CardContent className="p-0 pt-4 space-y-4 font-mono text-xs text-fg-muted leading-relaxed">
                <div>
                  <span className="text-foreground block font-bold text-2xs uppercase tracking-wider mb-0.5">
                    Current Engagement:
                  </span>
                  <span className="text-fg-subtle">Frontend Engineer @ SM Technology</span>
                </div>
                <div className="border-t border-border/70 pt-3">
                  <span className="text-foreground block font-bold text-2xs uppercase tracking-wider mb-0.5">
                    Primary Domain:
                  </span>
                  <span className="text-fg-subtle">Scalable Next.js UI, High-Concurrency APIs</span>
                </div>
                <div className="border-t border-border/70 pt-3">
                  <span className="text-foreground block font-bold text-2xs uppercase tracking-wider mb-0.5">
                    Availability:
                  </span>
                  <span className="text-accent font-bold">Open for Full-Stack & Engineering Roles</span>
                </div>

                <div className="pt-4 border-t border-border flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 rounded-lg text-2xs uppercase tracking-wider font-bold h-9"
                    asChild
                  >
                    <a href="#projects">View Works ↗</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-2xs uppercase tracking-wider font-bold h-9 px-4"
                    onClick={() => setIsPdfModalOpen(true)}
                  >
                    Preview CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Micro Metadata Shelf */}
            <div className="p-4 rounded-xl border border-border/60 bg-surface/50 space-y-2 font-mono text-2xs uppercase tracking-widest text-fg-subtle">
              <div className="flex justify-between">
                <span>Core Frameworks</span>
                <span className="text-foreground font-semibold">Next.js · React · Node</span>
              </div>
              <div className="flex justify-between">
                <span>Data Infrastructure</span>
                <span className="text-foreground font-semibold">PostgreSQL · MongoDB</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── HORIZONTAL METRIC SHELF (Direction B Quiet Craft) ────── */}
        <div className="hybrid-metrics-shelf mt-6 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-0">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="p-6 rounded-xl border border-border bg-surface/40 flex flex-col justify-between space-y-2"
            >
              <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                <span ref={(el) => { metricValues.current[i] = el; }}>
                  {m.value}
                </span>
                <span className="text-accent ml-0.5">{m.suffix}</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-foreground">
                  {m.label}
                </div>
                <div className="text-2xs text-fg-subtle uppercase tracking-wider mt-0.5 font-mono">
                  {m.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Accessible shadcn Dialog CV Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="https://drive.google.com/file/d/1OSnuS-Yo-3X8LQ5Iqs99af9vMAfj6uRX/view?usp=sharing"
      />
    </section>
  );
}
