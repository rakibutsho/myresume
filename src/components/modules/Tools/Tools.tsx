"use client";

import React from "react";
import Image from "next/image";
import WorkTools from "./WorkTools";
import workGif from "@/assets/gif/coding.gif";

function Tools() {
  return (
    <section id="tools" className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: GIF */}
          <div className="hidden md:block lg:col-span-4">
            <div className="relative w-full h-65 sm:h-80 lg:h-105 ">
              <Image
                src={workGif} // <-- change this path
                alt="Programmer animation"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
                unoptimized // recommended for GIFs in next/image
                priority={false}
              />
            </div>
          </div>

          {/* Right: Tools */}
          <div className="lg:col-span-8">
            <WorkTools />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tools;
