import Home from "@/components/home/Home";
import Education from "@/components/modules/Education/Education";
import JobHistory from "@/components/modules/JobHistroy/Job";
import ProjectsPage from "@/components/modules/Projects/ProjectsPage";
import Tools from "@/components/modules/Tools/Tools";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Home />
      <JobHistory />
      <Tools />
      <Education />
      <ProjectsPage />
    </div>
  );
};

export default HomePage;
