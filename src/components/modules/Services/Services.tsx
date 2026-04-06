"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutDashboard, Rocket, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: LayoutDashboard,
    title: "Full-Stack Product Development",
    outcome:
      "Launch polished, responsive product interfaces and supporting backend flows that reduce friction from the first screen to the last action.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    outcome:
      "Improve Core Web Vitals and page speed so users stay longer, bounce less, and convert more consistently.",
  },
  {
    icon: Wrench,
    title: "Refactor And Rescue",
    outcome:
      "Stabilize messy codebases, remove UI bugs, and rebuild critical frontend-backend flows without halting your product roadmap.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 26 },
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-service-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
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

  return (
    <section id="services" ref={sectionRef} className="w-full mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold">
            Services That {}
            <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
              Move Metrics
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
            I do not just ship pages. I help teams improve activation,
            engagement, and delivery speed with reliable full-stack engineering.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                data-service-card
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-300/30 transition-colors duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-cyan-400/20 to-amber-200/20 border border-cyan-300/25 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>

                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{service.outcome}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
