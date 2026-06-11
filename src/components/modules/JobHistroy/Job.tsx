"use client";

import JobInstitute from "./JobInstitue";

const JobHistory = () => {
  return (
    <section id="experience" className="w-full pt-32 pb-20 relative">
      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Premium Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Professional Journey
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            Experience that{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              ships products
            </span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            I have worked across frontend engineering, UI implementation, and quality testing. The common thread is building reliable product experiences and shipping code that teams can scale.
          </p>
        </div>

        {/* Timeline Component */}
        <JobInstitute />
      </div>
    </section>
  );
};

export default JobHistory;
