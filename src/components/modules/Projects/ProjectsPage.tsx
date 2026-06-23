"use client";

import { projects } from "@/data/project";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full pt-20 pb-5 relative bg-[#09090b]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Portfolio
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
                Case Studies
              </span>
            </h2>
            <p className="text-xl text-[#a1a1aa] font-light leading-relaxed max-w-xl">
              Real product problems, scalable architectures, and direct business impact.
            </p>
          </div>
          
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm tracking-wide font-semibold hover:bg-white hover:text-black transition-all duration-300 group shadow-lg"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            className="!pb-20 projects-swiper"
          >
            {projects.map((p) => (
              <SwiperSlide key={p.id} className="h-auto">
                <ProjectCard project={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm tracking-wide font-semibold hover:bg-white hover:text-black transition-all duration-300 group shadow-lg"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </section>
  );
}
