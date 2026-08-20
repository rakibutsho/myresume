"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-24 relative overflow-hidden font-sans text-white"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">

        {/* Section identifier */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-mono text-[#2C74B3]">06</span>
          <div className="w-8 h-[1px] bg-[#205295]/50" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2C74B3] font-bold">Testimonials</span>
        </div>

        {/* Heading & Nav */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div ref={headingRef} className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-serif">
              <span className="text-white">Kind words from</span>{" "}
              <span className="text-[#2C74B3]">colleagues.</span>
            </h2>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-4 pb-2">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 hover:bg-[#205295]/10 transition-all cursor-pointer z-10"
            >
              <svg aria-hidden className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-[#1E3A5F] flex items-center justify-center text-[#4A6274] hover:text-[#2C74B3] hover:border-[#2C74B3]/50 hover:bg-[#205295]/10 transition-all cursor-pointer z-10"
            >
              <svg aria-hidden className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div ref={cardsRef} className="w-full">
          <Swiper
            onSwiper={setSwiperInstance}
            style={{ "--swiper-pagination-color": "#2C74B3" } as React.CSSProperties}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-16"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div className="h-full group relative p-8 md:p-10 rounded-2xl bg-[#0A2647]/40 border border-[#1E3A5F] hover:border-[#2C74B3]/40 hover:bg-[#144272]/20 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#2C74B3] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Message */}
                  <div className="mb-12">
                    <Quote className="h-6 w-6 text-[#1E3A5F] mb-6 group-hover:text-[#2C74B3]/50 transition-colors" />
                    <p className="text-[15px] text-[#8B9BB4] leading-relaxed font-sans">
                      &quot;{t.message}&quot;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 mt-auto border-t border-[#1E3A5F]">
                    <div className="w-12 h-12 rounded-full bg-[#0D1421] border border-[#1E3A5F] flex items-center justify-center text-[#8B9BB4] font-mono text-sm font-bold group-hover:text-[#2C74B3] group-hover:border-[#2C74B3]/40 transition-colors">
                      {t.avatar}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[15px] font-semibold text-white tracking-wide group-hover:text-[#2C74B3] transition-colors font-sans">
                        {t.name}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-[#4A6274]">
                        {t.role} <span className="text-[#1E3A5F] mx-1">|</span> {t.company}
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
