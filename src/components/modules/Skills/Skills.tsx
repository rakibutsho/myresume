"use client";

import { skillCategories } from "@/data/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Each category card
      categoryRefs.current.forEach((catEl) => {
        if (!catEl) return;

        gsap.fromTo(
          catEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: catEl,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );

        // Animate skill bars inside this category
        const bars = catEl.querySelectorAll<HTMLElement>("[data-skill-fill]");
        bars.forEach((bar) => {
          const width = bar.getAttribute("data-skill-fill") || "0";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${width}%`,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryGradient = (id: string) => {
    switch (id) {
      case "frontend":
        return "from-cyan-400 to-sky-400";
      case "backend":
        return "from-sky-400 to-emerald-300";
      case "tools":
        return "from-cyan-300 to-amber-200";
      default:
        return "from-cyan-300 to-amber-200";
    }
  };

  const getCategoryGlow = (id: string) => {
    switch (id) {
      case "frontend":
        return "from-cyan-400/20 to-sky-400/20";
      case "backend":
        return "from-sky-400/20 to-emerald-300/20";
      case "tools":
        return "from-cyan-300/20 to-amber-200/20";
      default:
        return "from-cyan-300/20 to-amber-200/20";
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="w-full mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold">
            Technical{" "}
            <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl">
            A breakdown of my technical expertise across different areas of
            software development.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <div
              key={cat.id}
              ref={(el) => {
                categoryRefs.current[catIndex] = el;
              }}
              className="
                p-6 rounded-2xl
                border border-white/10 bg-white/5 backdrop-blur-sm
                hover:border-white/20 transition-colors duration-300
              "
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`h-3 w-3 rounded-full bg-linear-to-r ${getCategoryGradient(cat.id)}`}
                />
                <h3 className="text-xl font-semibold text-white">
                  {cat.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white/80 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-xs text-white/50">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        data-skill-fill={skill.level}
                        className={`h-full rounded-full bg-linear-to-r ${getCategoryGradient(cat.id)} shadow-[0_0_12px_rgba(255,255,255,0.15)]`}
                        style={{ width: 0 }}
                      />
                    </div>
                    {/* Subtle glow under bar */}
                    <div
                      className={`h-1 rounded-full bg-linear-to-r ${getCategoryGlow(cat.id)} blur-sm -mt-1`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
