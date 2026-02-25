import React from "react";

import Image from "next/image";
import jobImag from "@/assets/1691048235170.gif";
import JobInstitute from "./JobInstitue";

const JobHistory = () => {
  return (
    <section className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <JobInstitute />
          </div>

          <div className="hidden md:block lg:col-span-4">
            <div className="relative w-full h-65 sm:h-80 lg:h-105 ">
              <Image
                src={jobImag} // <-- change this path
                alt="Programmer animation"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
                unoptimized // recommended for GIFs in next/image
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobHistory;
