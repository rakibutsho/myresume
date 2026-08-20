"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Code2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

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

        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 relative">
          <div ref={headingRef} className="max-w-2xl relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-serif text-white">
              Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A8E0] to-[#2C74B3] drop-shadow-[0_0_15px_rgba(44,116,179,0.5)]">User Logs.</span>
            </h2>
            <div className="absolute -inset-4 bg-[#2C74B3]/5 blur-3xl -z-10 rounded-full" />
          </div>
        </div>

        {/* Testimonial Infinite Marquee */}
        <div ref={cardsRef} className="w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            loop={true}
            speed={6000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper py-8"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto pb-8">
                <div className="h-full group relative p-6 sm:p-8 rounded-xl bg-[#0A2647]/50 backdrop-blur-md border border-[#205295]/50 hover:border-[#60A8E0]/50 hover:bg-[#144272]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(10,38,71,0.5)] hover:shadow-[0_0_30px_rgba(44,116,179,0.3)]">
                  
                  {/* Subtle scanline on hover */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl mix-blend-overlay" />

                  {/* Top Header Badge */}
                  <div className="flex justify-between items-center mb-8 border-b border-[#205295]/40 pb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#60A8E0]" />
                      <span className="font-mono text-[11px] text-[#8B9BB4] uppercase tracking-wider">
                        system.log
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                  </div>

                  {/* Message */}
                  <div className="mb-10 flex-grow relative">
                    <Code2 className="absolute -top-3 -left-3 h-8 w-8 text-[#1E3A5F]/40 -z-10 group-hover:text-[#60A8E0]/20 transition-colors" />
                    <p className="text-[14px] sm:text-[15px] text-[#8B9BB4] group-hover:text-[#b4cbe4] leading-relaxed font-mono transition-colors">
                      <span className="text-[#60A8E0]">"</span>
                      {t.message}
                      <span className="text-[#60A8E0]">"</span>
                    </p>
                  </div>

                  {/* Author Meta Info */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 pt-4 mt-auto border-t border-[#1E3A5F]/60 bg-[#071626]/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-4 sm:py-5">
                    <div className="w-10 h-10 rounded bg-[#0D1421] border border-[#205295]/50 flex items-center justify-center text-[#60A8E0] font-mono text-xs font-bold group-hover:bg-[#144272] group-hover:border-[#60A8E0]/40 transition-colors shrink-0">
                      {t.avatar}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="text-[14px] font-bold text-white tracking-wide group-hover:text-[#60A8E0] transition-colors truncate">
                        {t.name}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A6274] truncate">
                        {t.role} <span className="text-[#1E3A5F] mx-1">|</span> <span className="text-[#8B9BB4]">{t.company}</span>
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
