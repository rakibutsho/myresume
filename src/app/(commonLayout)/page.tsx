import Home from "@/components/home/Home";
import BentoProfile from "@/components/home/BentoProfile";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import ProjectsPage from "@/components/modules/Projects/ProjectsPage";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import Contact from "@/components/modules/Contact/Contact";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Home />
      <BentoProfile />
      <ExperienceTimeline />
      <ProjectsPage />
      <TestimonialsMarquee />
      <Contact />
    </div>
  );
}

