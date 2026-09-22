import { BackgroundAnimation } from "@/components/common/BackgroundAnimation";
import { BootSequence } from "@/components/common/BootSequence";
import { Footer } from "@/components/common/Footer/Footer";
import { Navbar } from "@/components/common/Navbar/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen bg-[#08090D] text-slate-100 selection:bg-sky-500/20 selection:text-sky-200">
      <BootSequence />
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
