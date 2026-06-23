import { projects } from "@/data/project";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/modules/Projects/ProjectDetails";

// Generate static routes for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Case Study`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
