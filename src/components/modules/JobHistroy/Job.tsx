"use client";

import JobInstitute from "./JobInstitue";

const JobHistory = () => {
  return (
    <section id="experience" className="w-full py-24 relative bg-[#0a0a0c] font-sans text-white border-t border-white/5">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa] mb-12 uppercase tracking-widest">
          <div>— PROFESSIONAL JOURNEY</div>
          <div>[ CAREER PATH ]</div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 leading-tight">
          <span className="font-serif italic">Building systems that</span> <span className="font-serif italic text-emerald-400">scale.</span>
        </h2>

        {/* Job Cards */}
        <JobInstitute />
      </div>
    </section>
  );
};

export default JobHistory;
