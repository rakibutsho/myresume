"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Rocket, Users, Coffee } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Clean Code Advocate",
    desc: "I write maintainable, well-structured code following best practices and modern design patterns.",
  },
  {
    icon: Rocket,
    title: "Performance Focused",
    desc: "I optimize for speed — from lazy loading and code splitting to efficient rendering strategies.",
  },
  {
    icon: Users,
    title: "Team Player",
    desc: "I thrive in collaborative environments, communicating clearly and contributing to team success.",
  },
  {
    icon: Coffee,
    title: "Continuous Learner",
    desc: "Currently exploring Go for backend development while deepening my expertise in the JavaScript ecosystem.",
  },
];

const funFacts = [
  "⚽ Love playing football in my free time",
  "📚 Always reading tech blogs & documentation",
  "🎮 Enjoy problem-solving through competitive programming",
  "☕ Powered by coffee and curiosity",
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
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
            I&apos;m Md. Rakibul Islam — a passionate Software Engineer based in
            Dhaka, Bangladesh. I specialize in building modern web applications
            with{" "}
            <span className="text-white font-medium">
              JavaScript, React, Next.js
            </span>{" "}
            and the{" "}
            <span className="text-white font-medium">MERN Stack</span>. I care
            deeply about user experience, clean architecture, and writing code
            that scales.
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
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-fuchsia-400" />
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
            Fun Facts About Me
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
