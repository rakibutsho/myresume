"use client";

import Institute from "./Institute";

export default function Education() {
  return (
    <section
      id="education"
      className="w-full py-28 bg-background border-t border-border"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
              <span className="text-accent font-bold">06</span>
              <span className="text-border">/</span>
              <span>ACADEMIC FOUNDATION & DEGREES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
              Formal Education
            </h2>
          </div>
          <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
            ACADEMIC CREDENTIALS
          </span>
        </div>

        <Institute />
      </div>
    </section>
  );
}
