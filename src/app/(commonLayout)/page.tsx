import Home from "@/components/home/Home";
import AboutMe from "@/components/modules/AboutMe/AboutMe";
import Contact from "@/components/modules/Contact/Contact";
import Education from "@/components/modules/Education/Education";
import JobHistory from "@/components/modules/JobHistroy/Job";
import ProjectsPage from "@/components/modules/Projects/ProjectsPage";
import Services from "@/components/modules/Services/Services";
import Skills from "@/components/modules/Skills/Skills";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import Tools from "@/components/modules/Tools/Tools";

const HomePage = () => {
  return (
    <div>
      <div id="home">
        <Home />
        <Tools />
      </div>
      <AboutMe />
      <Services />
      <Skills />
      <section id="experience">
        <JobHistory />
      </section>
      {/* <Tools /> */}
      <section id="projects">
        <ProjectsPage />
      </section>
      <Education />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default HomePage;
