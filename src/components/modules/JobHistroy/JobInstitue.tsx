"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { jobs } from "@/data/job";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JobInstitute() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeJobId, setActiveJobId] = useState<number>(jobs[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hybrid-exp-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const items = sectionRef.current?.querySelectorAll("[data-animate-item]");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const q = searchQuery.toLowerCase();
    return jobs.filter(
      (job) =>
        job.companyName.toLowerCase().includes(q) ||
        job.position.toLowerCase().includes(q) ||
        job.stack.some((tech) => tech.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeJob = jobs.find((j) => j.id === activeJobId) ?? jobs[0];

  return (
    <div ref={sectionRef} className="w-full">
      
      {/* Section Header Indicator */}
      <div className="hybrid-exp-header flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16 opacity-0">
        <div>
          <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
            <span className="text-accent font-bold">03</span>
            <span className="text-border">/</span>
            <span>CHRONOLOGY & RECORDED APPOINTMENTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
            Work Experience
          </h2>
        </div>
        <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
          2024 — PRESENT [VERIFIED]
        </span>
      </div>

      {/* Accessible Tabs and Search Filter */}
      <Tabs defaultValue="table" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-4">
          <TabsList className="h-auto border-none p-0 bg-transparent flex gap-8">
            <TabsTrigger
              value="table"
              className="text-2xs font-bold uppercase tracking-widest text-fg-subtle data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none pb-2"
            >
              01 / Full Chronology
            </TabsTrigger>
            <TabsTrigger
              value="detail"
              className="text-2xs font-bold uppercase tracking-widest text-fg-subtle data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none pb-2"
            >
              02 / Company Focus
            </TabsTrigger>
          </TabsList>

          {/* Accessible shadcn Input for technology filtering */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-fg-subtle pointer-events-none" />
            <Input
              type="text"
              placeholder="FILTER STACK OR ROLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-9 text-2xs uppercase tracking-wider bg-surface border-border placeholder:text-fg-subtle focus-visible:ring-accent rounded-lg"
              aria-label="Filter experience by tech or role"
            />
          </div>
        </div>

        {/* ── TAB 1: CHRONOLOGY TABLE ── */}
        <TabsContent value="table" className="mt-8 space-y-0">
          <div className="hidden md:grid grid-cols-[160px_220px_1fr_40px] gap-6 border-t-2 border-foreground border-b border-border py-3 text-2xs font-bold uppercase tracking-widest text-fg-subtle font-mono">
            <span>Period</span>
            <span>Company</span>
            <span>Position & Technologies</span>
            <span className="text-right">Details</span>
          </div>

          {filteredJobs.map((job) => {
            const isSelected = activeJobId === job.id;
            const isNow = job.timeline.toLowerCase().includes("present");

            return (
              <div key={job.id} data-animate-item className="group">
                <button
                  type="button"
                  onClick={() => setActiveJobId(isSelected ? 0 : job.id)}
                  aria-expanded={isSelected}
                  className={`w-full text-left grid grid-cols-1 md:grid-cols-[160px_220px_1fr_40px] gap-2 md:gap-6 py-5 border-b border-border transition-colors hover:bg-surface/50 cursor-pointer ${
                    isSelected ? "border-l-2 border-l-accent pl-4 bg-surface/30" : "pl-0"
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs text-fg-subtle block">
                      {job.timeline.replace(" - ", " – ")}
                    </span>
                    {isNow && (
                      <span className="mt-1 inline-block text-2xs font-bold uppercase tracking-widest text-accent font-mono">
                        Active Role
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-display text-base font-semibold tracking-tight text-foreground">
                      {job.companyName}
                    </span>
                    <span className="block text-2xs text-fg-subtle uppercase tracking-wider mt-0.5 font-mono">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {job.position}
                    </span>
                    <span className="text-border" aria-hidden="true">|</span>
                    <span className="text-xs text-fg-subtle">
                      {job.stack.slice(0, 4).join(" · ")}
                    </span>
                  </div>

                  <div className="hidden md:flex items-center justify-end">
                    <span
                      className={`text-sm font-light transition-transform duration-200 ${
                        isSelected ? "rotate-45 text-accent" : "text-fg-subtle"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>

                {isSelected && (
                  <Card className="rounded-xl border-t-0 border-b border-l-2 border-r-0 border-border border-l-accent bg-surface/40 p-6 md:pl-10 mt-2 mb-4">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xs font-mono uppercase tracking-widest text-fg-subtle font-bold">
                        Key Accomplishments & Production Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <ul className="space-y-3">
                        {job.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-fg-muted leading-relaxed">
                            <span className="text-accent select-none font-bold" aria-hidden="true">—</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
                        <span className="text-2xs font-mono font-bold uppercase tracking-widest text-fg-subtle mr-2">
                          Stack:
                        </span>
                        {job.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-background border border-border text-2xs font-mono uppercase tracking-wider text-fg-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="py-12 text-center text-sm text-fg-subtle border-b border-border">
              No matching records for &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </TabsContent>

        {/* ── TAB 2: COMPANY FOCUS ── */}
        <TabsContent value="detail" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <div className="flex flex-col border-t border-border">
              {jobs.map((job) => (
                <Button
                  key={job.id}
                  variant="ghost"
                  onClick={() => setActiveJobId(job.id)}
                  className={`w-full justify-between py-5 px-4 rounded-none border-b border-border text-left h-auto ${
                    activeJobId === job.id
                      ? "border-l-2 border-l-accent bg-surface font-semibold text-foreground"
                      : "text-fg-subtle hover:text-foreground"
                  }`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-semibold">{job.companyName}</span>
                    <span className="text-2xs uppercase tracking-widest text-fg-subtle mt-0.5 font-mono">
                      {job.timeline.split(" - ")[0]}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${activeJobId === job.id ? "text-accent" : "opacity-30"}`} />
                </Button>
              ))}
            </div>

            <Card className="rounded-xl border border-border bg-surface p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
                <div>
                  <div className="text-2xs font-mono font-bold uppercase tracking-widest text-accent mb-1">
                    {activeJob.type}
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase">
                    {activeJob.position}
                  </h3>
                  <div className="text-sm font-medium text-fg-muted mt-1">
                    {activeJob.companyName}
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider text-fg-subtle font-mono">
                  {activeJob.timeline}
                </span>
              </div>

              <div className="mt-6">
                <h4 className="text-2xs font-mono font-bold uppercase tracking-widest text-fg-subtle mb-4">
                  Responsibilities & System Ownership
                </h4>
                <ul className="space-y-3">
                  {activeJob.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-fg-muted leading-relaxed">
                      <span className="text-accent select-none font-bold" aria-hidden="true">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-2xs font-mono font-bold uppercase tracking-widest text-fg-subtle mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeJob.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-2xs font-mono uppercase tracking-wider border border-border text-fg-muted bg-background"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Footer */}
      <div className="mt-12 pt-4 border-t border-border flex justify-between items-center text-2xs uppercase tracking-widest text-fg-subtle font-mono">
        <span>Curated Roles (2024 – Present)</span>
        <span className="text-foreground font-semibold">1 Year 9 Months Active Experience</span>
      </div>
    </div>
  );
}
