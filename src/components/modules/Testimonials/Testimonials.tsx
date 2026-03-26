"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Cards stagger
      if (cardsRef.current) {
        const cards =
          cardsRef.current.querySelectorAll<HTMLElement>("[data-testimonial]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.12,
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

  const avatarGradients = [
    "from-cyan-500 to-blue-500",
    "from-fuchsia-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold">
            What People{" "}
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl">
            Kind words from colleagues and people I&apos;ve had the pleasure of
            working with.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              data-testimonial
              className="
                group relative p-6 rounded-2xl
                border border-white/10 bg-white/5 backdrop-blur-sm
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300
              "
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5">
                <Quote className="h-8 w-8 text-white/[0.06]" />
              </div>

              {/* Message */}
              <p className="text-sm text-white/70 leading-relaxed italic pr-8">
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                {/* Avatar */}
                <div
                  className={`
                    h-11 w-11 rounded-full shrink-0
                    bg-linear-to-br ${avatarGradients[i % avatarGradients.length]}
                    flex items-center justify-center
                    text-white text-sm font-bold
                    shadow-lg
                  `}
                >
                  {t.avatar}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
