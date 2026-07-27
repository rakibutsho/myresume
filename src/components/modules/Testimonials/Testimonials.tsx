"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Slider fade in
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="w-full py-24 relative overflow-hidden font-sans text-white">
      {/* Modern Background Glows */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Identifier */}
        <div className="fade-up-element flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-emerald-400">06</span>
          <div className="w-8 h-[1px] bg-emerald-500/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">Testimonials</span>
        </div>

        {/* Heading & Nav */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div ref={headingRef} className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-serif">
              <span className="text-white">Kind words from</span>{" "}
              <span className="text-emerald-400">colleagues.</span>
            </h2>
          </div>
          
          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-4 pb-2">
            <button 
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all cursor-pointer z-10"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all cursor-pointer z-10"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Testimonial Cards Slider */}
        <div ref={cardsRef} className="w-full">
          <Swiper
            onSwiper={setSwiperInstance}
            style={{
              "--swiper-pagination-color": "#34d399",
            } as React.CSSProperties}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ 
              clickable: true, 
              dynamicBullets: true 
            }}
            className="pb-16" // Padding for pagination bullets
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div
                  className="h-full group relative p-8 md:p-10 rounded-2xl bg-[#0f0f11] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Message */}
                  <div className="mb-12">
                    <Quote className="h-6 w-6 text-[#3f3f46] mb-6 group-hover:text-emerald-400/50 transition-colors" />
                    <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                      "{t.message}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center text-[#a1a1aa] font-mono text-sm font-bold group-hover:text-emerald-400 group-hover:border-white/20 transition-colors">
                      {t.avatar}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[15px] font-semibold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                        {t.name}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-[#6b7280]">
                        {t.role} <span className="text-white/10 mx-1">|</span> {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
      </div>
    </section>
  );
}

export default Testimonials;

