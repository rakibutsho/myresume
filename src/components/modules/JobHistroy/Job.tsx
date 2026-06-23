"use client";

import JobInstitute from "./JobInstitue";

const JobHistory = () => {
  return (
    <section id="experience" className="w-full pt-25 pb-5 relative bg-[#09090b]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Premium Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Professional Journey
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Experience that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
              ships products
            </span>
          </h2>
          
          <p className="text-xl text-[#a1a1aa] font-light leading-relaxed">
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
