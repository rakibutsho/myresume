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
import { ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full pt-32 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-emerald-400 to-[#10b981]">
                Case Studies
              </span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Real product problems, scalable solutions, and direct business impact.
            </p>
          </div>
          
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            className="!pb-16"
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
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
