// import Image from "next/image";
// import jobImag from "@/assets/1691048235170.gif";
import JobInstitute from "./JobInstitue";

const highlights = [
  { label: "Roles", value: "3" },
  { label: "Years in Product Work", value: "1.5+" },
  { label: "Focus", value: "Frontend Delivery" },
];

const JobHistory = () => {
  return (
    <section id="experience" className="w-full mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 rounded-4xl border border-cyan-300/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
            Professional Journey
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-6xl font-bold leading-tight text-white">
                Experience that{" "}
                <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
                  ships products
                </span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                I have worked across frontend engineering, UI implementation,
                backend-aware product workflows, and quality/testing
                environments. The common thread is building reliable product
                experiences, keeping handoffs clear, and shipping code that
                teams can maintain.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:min-w-85">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-cyan-300/15 bg-black/20 px-4 py-3 text-center"
                >
                  <p className="text-cyan-200 text-lg sm:text-xl font-semibold">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <JobInstitute />
      </div>
    </section>
  );
};

export default JobHistory;
