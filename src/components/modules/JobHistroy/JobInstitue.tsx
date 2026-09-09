"use client";

import { jobs } from "@/data/job";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function JobInstitute() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const tableRef    = useRef<HTMLDivElement>(null);
  const [activeJob, setActiveJob] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = tableRef.current?.querySelectorAll("[data-row]");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: tableRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Total experience calc
  const totalMonths = 21; // approx
  const totalYears  = Math.floor(totalMonths / 12);
  const remMonths   = totalMonths % 12;
  const totalLabel  = `${totalYears} year${totalYears !== 1 ? "s" : ""} ${remMonths} month${remMonths !== 1 ? "s" : ""}`;

  return (
    <div ref={sectionRef} className="w-full">

      {/* Chapter word + breadcrumb header */}
      <div className="flex items-end justify-between mb-12 gap-6">
        <span className="breadcrumb-label">... /Experience ...</span>
        <div className="chapter-word hidden md:block">Work</div>
      </div>

      {/* Full-width table */}
      <div ref={tableRef}>
        {/* Table header */}
        <div
          className="hidden md:grid grid-cols-[140px_1fr_1fr] gap-6 pb-4 mb-2"
          style={{ borderBottom: "1px solid #3D3D3D" }}
        >
          <span className="text-[11px] uppercase tracking-[0.15em] font-mono" style={{ color: "#A6A6A6" }}>Period</span>
          <span className="text-[11px] uppercase tracking-[0.15em] font-mono" style={{ color: "#A6A6A6" }}>Company</span>
          <span className="text-[11px] uppercase tracking-[0.15em] font-mono" style={{ color: "#A6A6A6" }}>Role</span>
        </div>

        {jobs.map((job) => {
          const isActive = activeJob === job.id;
          return (
            <div key={job.id} data-row>
              {/* Main row */}
              <button
                onClick={() => setActiveJob(isActive ? null : job.id)}
                className="w-full text-left cursor-pointer transition-all duration-200 group"
                style={{
                  borderBottom: "1px solid #3D3D3D",
                  background: isActive ? "#FFFFFF" : "transparent",
                }}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-2 md:gap-6 py-5 px-1 md:px-0"
                >
                  {/* Period column */}
                  <div>
                    <span
                      className="font-mono text-[13px] font-medium"
                      style={{ color: isActive ? "#3D3D3D" : "#F5F5F5", fontFamily: "var(--font-roboto)" }}
                    >
                      {job.timeline.split(" - ")[0]}
                      {job.timeline.includes("Present") ? " –" : ` – ${job.timeline.split(" - ")[1] ?? ""}`}
                    </span>
                    <span
                      className="block text-[11px] mt-0.5 font-sans"
                      style={{ color: isActive ? "#A6A6A6" : "#A6A6A6" }}
                    >
                      {job.type}
                    </span>
                  </div>

                  {/* Company column */}
                  <div className="flex items-start gap-3">
                    {job.timeline.toLowerCase().includes("present") && (
                      <span
                        className="hidden md:block mt-0.5 shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm"
                        style={{
                          background: isActive ? "#121212" : "#1E1E1E",
                          color: isActive ? "#F5F5F5" : "#A6A6A6",
                          border: `1px solid ${isActive ? "#3D3D3D" : "#3D3D3D"}`,
                        }}
                      >
                        Now
                      </span>
                    )}
                    <span
                      className="font-mono font-semibold text-[15px]"
                      style={{ color: isActive ? "#121212" : "#FFFFFF", fontFamily: "var(--font-roboto)" }}
                    >
                      {job.companyName}
                    </span>
                  </div>

                  {/* Role column */}
                  <div className="flex items-center justify-between">
                    <span
                      className="font-sans text-[14px]"
                      style={{ color: isActive ? "#3D3D3D" : "#F5F5F5" }}
                    >
                      {job.position}
                      <span
                        className="mx-2 font-light"
                        style={{ color: isActive ? "#A6A6A6" : "#3D3D3D" }}
                      >|</span>
                      <span
                        className="text-[13px]"
                        style={{ color: isActive ? "#A6A6A6" : "#A6A6A6" }}
                      >
                        {job.stack.slice(0, 3).join(" & ")}
                      </span>
                    </span>
                    {/* Expand indicator */}
                    <span
                      className="shrink-0 ml-4 font-mono text-[16px] transition-transform duration-200"
                      style={{
                        color: isActive ? "#3D3D3D" : "#A6A6A6",
                        transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </button>

              {/* Accordion: highlights */}
              {isActive && (
                <div
                  className="px-1 md:pl-[164px] py-6"
                  style={{ borderBottom: "1px solid #3D3D3D", background: "#121212" }}
                >
                  <ul className="space-y-3 mb-6">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] font-sans leading-relaxed" style={{ color: "#F5F5F5" }}>
                        <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: "#A6A6A6" }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-sm"
                        style={{
                          border: "1px solid #3D3D3D",
                          color: "#A6A6A6",
                          fontFamily: "var(--font-roboto)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="flex justify-end mt-6">
        <p className="font-sans italic text-[13px]" style={{ color: "#A6A6A6" }}>
          Work experience{" "}
          <span className="not-italic font-semibold" style={{ color: "#F5F5F5" }}>
            {totalLabel}
          </span>
        </p>
      </div>
    </div>
  );
}

export default JobInstitute;
