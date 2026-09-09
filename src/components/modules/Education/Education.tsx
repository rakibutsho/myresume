"use client";

import Institute from "./Institute";

const Education = () => {
  return (
    <section
      id="education"
      className="w-full py-28 relative"
      style={{ background: "#121212" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="breadcrumb-label block mb-4">... /Education ...</span>
            <h2
              className="font-mono font-bold text-white leading-tight"
              style={{
                fontFamily: "var(--font-roboto)",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              Academic foundation.
            </h2>
          </div>
          <div className="chapter-word hidden md:block">Study</div>
        </div>

        <Institute />
      </div>
    </section>
  );
};

export default Education;
