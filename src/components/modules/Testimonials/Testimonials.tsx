"use client";

import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Card } from "@/components/ui/card";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
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
        }
      );
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 24 },
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
      className="w-full py-28 bg-background border-t border-border overflow-hidden"
    >
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        
        {/* Section Header Indicator */}
        <div ref={headingRef} className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border mb-16 opacity-0">
          <div>
            <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
              <span className="text-accent font-bold">07</span>
              <span className="text-border">/</span>
              <span>TESTIMONIALS & PEER ENDORSEMENTS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
              Client & Peer Verdicts
            </h2>
          </div>
          <span className="text-xs text-fg-subtle font-mono uppercase tracking-widest">
            VERIFIED FEEDBACK
          </span>
        </div>

        {/* Swiper Carousel */}
        <div ref={cardsRef} className="opacity-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
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
                <Card className="h-full flex flex-col justify-between p-8 rounded-2xl border border-border bg-surface hover:border-accent/40 transition-colors min-h-[260px]">
                  <p className="text-sm text-fg-muted font-normal leading-relaxed mb-8">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-5 border-t border-border/80">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center font-mono text-xs font-bold text-foreground shrink-0">
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">
                        {t.name}
                      </div>
                      <div className="font-mono text-2xs uppercase tracking-wider text-fg-subtle truncate">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
