import Home from "@/components/home/Home";
import AboutMe from "@/components/modules/AboutMe/AboutMe";
import Skills from "@/components/modules/Skills/Skills";
import Education from "@/components/modules/Education/Education";
import JobHistory from "@/components/modules/JobHistroy/Job";
import ProjectsPage from "@/components/modules/Projects/ProjectsPage";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import Contact from "@/components/modules/Contact/Contact";

export default function HomePage() {
  return (
    <div>
      <Home />
      <AboutMe />
      <Skills />
      <Education />
      <JobHistory />
      <ProjectsPage />
      <Testimonials />
      <Contact />
    </div>
  );
}
