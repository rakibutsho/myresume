"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Institute from "./Institute";

const Education = () => {
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, []);

  return (
    <section id="education" className="w-full mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="">
          {/* Left: Heading */}
          <div ref={headingRef} className=" mb-12">
            <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
              Educational {""}
              <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            <p className="mt-4 text-white/70 max-w-2xl">
              A snapshot of my academic background and the path that shaped my
              skills.
            </p>
          </div>

          {/* Right: Institutes */}
          <div className="lg:col-span-8 mt-3 md:mt-0">
            <Institute />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
