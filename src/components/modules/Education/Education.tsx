"use client";

import React, { useEffect, useRef } from "react";
import Institute from "./Institute";
import gsap from "gsap";

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
    <section id="education" className="w-full">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Heading */}
          <div ref={headingRef} className="lg:col-span-4">
            <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
              Educational <br />
              <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            <p className="text-gray-500 mt-3 max-w-sm">
              A snapshot of my academic background and the path that shaped my
              skills.
            </p>
          </div>

          {/* Right: Institutes */}
          <div className="lg:col-span-8">
            <Institute />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
