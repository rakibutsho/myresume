"use client";

import { education } from "@/data/education";
import Image from "next/image";
import { GraduationCap, Calendar, Award } from "lucide-react";

export default function Institute() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {education.map((insti) => (
        <div
          key={insti.id}
          className="glow-card p-7 rounded-2xl border border-white/[0.08] bg-[#0F1117] flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            {/* Top Logo & Timeline */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center p-2">
                <Image
                  src={insti.logo}
                  alt={insti.institute}
                  width={36}
                  height={36}
                  className="object-contain w-8 h-8"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{insti.timeline}</span>
              </div>
            </div>

            {/* Degree & Major */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {insti.degree}
              </h3>
              <p className="text-xs font-medium text-sky-400">
                {insti.subject}
              </p>
              <p className="text-xs text-slate-400 font-normal pt-1">
                {insti.institute}
              </p>
            </div>
          </div>

          {/* Bottom Grade/CGPA Badge */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Grade / Standing:</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              {"CGPA" in insti ? insti.CGPA : ("GPA" in insti ? insti.GPA : "Completed")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
