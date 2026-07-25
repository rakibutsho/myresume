import Home from "@/components/home/Home";
import dynamic from "next/dynamic";

const AboutMe = dynamic(() => import("@/components/modules/AboutMe/AboutMe"), { ssr: true });
const Skills = dynamic(() => import("@/components/modules/Skills/Skills"), { ssr: true });
const Education = dynamic(() => import("@/components/modules/Education/Education"), { ssr: true });
const JobHistory = dynamic(() => import("@/components/modules/JobHistroy/Job"), { ssr: true });
const ProjectsPage = dynamic(() => import("@/components/modules/Projects/ProjectsPage"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/modules/Testimonials/Testimonials"), { ssr: true });
const Contact = dynamic(() => import("@/components/modules/Contact/Contact"), { ssr: true });

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
