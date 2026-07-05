import Home from "@/components/home/Home";
import AboutMe from "@/components/modules/AboutMe/AboutMe";
import Contact from "@/components/modules/Contact/Contact";
import Education from "@/components/modules/Education/Education";
import JobHistory from "@/components/modules/JobHistroy/Job";
import ProjectsPage from "@/components/modules/Projects/ProjectsPage";
import Skills from "@/components/modules/Skills/Skills";
import Testimonials from "@/components/modules/Testimonials/Testimonials";

const HomePage = () => {
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
};

export default HomePage;
