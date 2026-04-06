"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Gauge, Rocket, Users } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Scalable Frontend Architecture",
    desc: "I build component-driven systems and predictable state flows that help teams ship features faster without breaking the UI.",
  },
  {
    icon: Rocket,
    title: "Conversion + UX Performance",
    desc: "I reduce friction with fast load times, clean visual hierarchy, and interface decisions that improve user completion rates.",
  },
  {
    icon: Users,
    title: "Full-Stack Product Mindset",
    desc: "I align frontend and backend decisions with business outcomes, balancing delivery speed, quality, and long-term maintainability.",
  },
  {
    icon: Gauge,
    title: "Quality Under Deadlines",
    desc: "I communicate clearly, estimate honestly, and deliver production-ready features even in fast-moving startup environments.",
  },
];

const funFacts = [
  "I started with pixel-perfect UI tasks and grew into full feature ownership.",
  "I enjoy turning ambiguous product ideas into clear, buildable user flows.",
  "Outside coding, football and long walks help me reset and think clearly.",
  "My favorite projects are where speed, clarity, and business value meet.",
];

function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

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
          cardsRef.current.querySelectorAll<HTMLElement>("[data-about-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Fun facts
      if (factsRef.current) {
        gsap.fromTo(
          factsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: factsRef.current,
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
    <section id="about" ref={sectionRef} className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold">
            About{" "}
            <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
            I am a full-stack engineer who enjoys solving messy product
            problems. Over the past 1.5+ years, I have worked on education and
            healthcare platforms where quality, reliability, and delivery speed
            all mattered. I focus on Next.js products that need clear UX,
            maintainable code, API integration, and strong performance on real
            devices.
          </p>
          <p className="mt-3 text-white/65 max-w-2xl leading-relaxed">
            If your team needs someone who can convert design into polished UI,
            integrate APIs cleanly, and ship features that move business
            metrics, that is the gap I solve.
          </p>
        </div>

        {/* What I Do Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-about-card
                className="
                  group p-6 rounded-2xl
                  border border-white/10 bg-white/5 backdrop-blur-sm
                  hover:bg-white/10 hover:border-white/20
                  transition-all duration-300
                "
              >
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-cyan-400/20 to-amber-200/20 border border-cyan-300/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fun Facts */}
        <div
          ref={factsRef}
          className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Working Style At A Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {funFacts.map((fact, i) => (
              <p key={i} className="text-sm text-white/60">
                {fact}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
