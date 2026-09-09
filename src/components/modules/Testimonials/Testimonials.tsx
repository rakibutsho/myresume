"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none none" },
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
      className="w-full py-28 relative overflow-hidden"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="flex items-end justify-between mb-16 gap-6">
          <div>
            <span className="breadcrumb-label block mb-4">... /Testimonials ...</span>
            <h2
              className="font-mono font-bold leading-tight text-white"
              style={{
                fontFamily: "var(--font-roboto)",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              Verified by the people<br />who worked with me.
            </h2>
          </div>
        </div>

        {/* Swiper carousel */}
        <div ref={cardsRef}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            loop={true}
            speed={5000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div
                  className="h-full flex flex-col p-6 group"
                  style={{
                    background: "#1E1E1E",
                    border: "1px solid #3D3D3D",
                    borderRadius: "14px",
                    transition: "border-color 0.2s ease",
                    minHeight: "220px",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#A6A6A6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#3D3D3D"; }}
                >
                  {/* Quote */}
                  <p
                    className="font-sans text-[14px] leading-[1.8] flex-grow mb-8"
                    style={{ color: "#F5F5F5" }}
                  >
                    <span style={{ color: "#A6A6A6" }}>&ldquo;</span>
                    {t.message}
                    <span style={{ color: "#A6A6A6" }}>&rdquo;</span>
                  </p>

                  {/* Author */}
                  <div
                    className="flex items-center gap-4 pt-5"
                    style={{ borderTop: "1px solid #3D3D3D" }}
                  >
                    <div
                      className="w-10 h-10 rounded-[8px] flex items-center justify-center font-mono text-xs font-bold shrink-0"
                      style={{ background: "#121212", border: "1px solid #3D3D3D", color: "#F5F5F5" }}
                    >
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-sans font-semibold text-[14px] text-white truncate"
                      >
                        {t.name}
                      </div>
                      <div
                        className="font-mono text-[11px] uppercase tracking-wider truncate"
                        style={{ color: "#A6A6A6", fontFamily: "var(--font-roboto)" }}
                      >
                        {t.role} · {t.company}
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
