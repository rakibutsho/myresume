"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import profileImg from "@/assets/Profile.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCards = [
  {
    title: "Front-end",
    tags: ["TypeScript", "React", "Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  },
  {
    title: "Back-end",
    tags: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io"],
  },
  {
    title: "Databases",
    tags: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose"],
  },
  {
    title: "DevOps & Tools",
    tags: ["Git", "Docker", "VPS Hosting", "CI/CD", "Figma", "Linux"],
  },
];

function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      const cards = containerRef.current?.querySelectorAll("[data-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 78%", toggleActions: "play none none none" },
          }
        );
      }

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="w-full py-28 relative"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Section row header */}
        <div className="flex items-center justify-between mb-16">
          <span className="breadcrumb-label">... /About me ...</span>
        </div>

        {/* Two-column layout */}
        <div ref={containerRef} className="grid lg:grid-cols-[55%_1fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: intro + skill cards ────────────────── */}
          <div ref={leftRef}>

            {/* Intro headline */}
            <p
              className="text-[22px] md:text-[28px] leading-[1.45] mb-10"
              style={{ color: "#F5F5F5", fontFamily: "var(--font-open-sans)" }}
            >
              Hello! I&apos;m Rakibul, I&apos;m a{" "}
              <em className="not-italic font-bold italic" style={{ color: "#FFFFFF" }}>full-stack developer</em>.
              <br />
              More than{" "}
              <em className="not-italic font-bold italic" style={{ color: "#FFFFFF" }}>1.5 years</em>{" "}
              experience.
            </p>

            {/* Skill cards grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCards.map((card) => (
                <div
                  key={card.title}
                  data-card
                  className="skill-card p-5"
                >
                  <h3
                    className="font-mono font-semibold text-[15px] mb-3 text-white"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.8]"
                    style={{ color: "#A6A6A6", fontFamily: "var(--font-open-sans)" }}
                  >
                    {card.tags.join(" / ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: portrait ──────────────────────────── */}
          <div ref={rightRef} className="flex items-center justify-center lg:justify-end relative">
            {/* Large circle background */}
            <div
              className="absolute w-[360px] h-[360px] rounded-full"
              style={{ background: "#1E1E1E", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            />
            {/* Photo */}
            <div
              className="relative w-[300px] h-[360px] rounded-[16px] overflow-hidden z-10"
              style={{ border: "1px solid #3D3D3D" }}
            >
              <Image
                src={profileImg}
                alt="Md. Rakibul Islam"
                fill
                className="object-cover grayscale"
                sizes="300px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
