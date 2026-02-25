// src/app/projects/page.tsx

import React from "react";
import ProjectsGrid from "./ProjectsGrid";
import { projects } from "@/data/project";

export const metadata = {
  title: "Projects",
  description: "A selection of projects built with Next.js and modern tools.",
};

export default function ProjectsPage() {
  return (
    <section className="w-full mt-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-4xl sm:text-6xl font-bold">
            My <br />
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mt-4 text-white/75 max-w-2xl">
            A selection of projects I’ve built—focused on performance,
            maintainability, and clean UI.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
