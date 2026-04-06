// src/app/projects/page.tsx

import { projects } from "@/data/project";
import ProjectsGrid from "./ProjectsGrid";

export const metadata = {
  title: "Projects",
  description:
    "Case studies focused on business outcomes, product UX, and performance.",
};

export default function ProjectsPage() {
  return (
    <section className="w-full mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-bold">
            Selected {}
            <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-amber-200 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>

          <p className="mt-4 text-white/75 max-w-2xl">
            Each project highlights a real product problem, the solution I
            built, and the business or user impact it delivered.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
