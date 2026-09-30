import { BackgroundAnimation } from "@/components/common/BackgroundAnimation";
import { Footer } from "@/components/common/Footer/Footer";
import { Navbar } from "@/components/common/Navbar/Navbar";
import React from "react";
import { ClientParticleBackground } from "@/components/common/ClientParticleBackground";

export default function CommonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen bg-[#08090D] text-slate-100 selection:bg-sky-500/20 selection:text-sky-200">
      <div className="fixed inset-0 pointer-events-none z-0">
        <ClientParticleBackground />
      </div>
      <div className="bg-grid"></div>
      <div className="bg-aurora"></div>
      <div className="bg-noise"></div>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
