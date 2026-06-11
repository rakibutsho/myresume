import { projects } from "@/data/project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";

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

  return (
    <article className="w-full pt-32 pb-20 relative min-h-screen">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/5 blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4">
        
        {/* Navigation */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <header className="mb-16">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-300">
                {project.type} Case Study
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl">
              {project.subtitle}
            </p>
          </div>
        </header>

        {/* Massive Image Display */}
        {project.image && (
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden border border-[#1e293b] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] mb-20 group">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Context (Problem, Solution, Results) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Problem section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400">01.</span>
                The Challenge
              </h2>
              <div className="p-8 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-inner text-lg text-white/70 leading-relaxed">
                {project.problem}
              </div>
            </section>

            {/* Solution section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-[#10b981]">02.</span>
                The Solution
              </h2>
              <div className="p-8 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-inner text-lg text-white/70 leading-relaxed">
                {project.solution}
              </div>
            </section>

            {/* Results section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">03.</span>
                Business Impact & Results
              </h2>
              <div className="p-8 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-inner">
                <ul className="space-y-6">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-lg text-white/80 leading-relaxed">{result}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          {/* Right Column: Meta & Links Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack Card */}
            <div className="p-8 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm px-4 py-2 rounded-xl bg-[#0f172a] border border-white/5 text-white/80 shadow-inner"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links Card */}
            <div className="p-8 rounded-[2rem] bg-[#131b2c] border border-[#1e293b] shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-2">
                Project Links
              </h3>
              
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-between items-center w-full px-6 py-4 rounded-xl bg-linear-to-r from-emerald-500 to-[#10b981] text-slate-900 font-bold hover:brightness-110 transition shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] group"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Live Application
                  </span>
                  <ArrowLeft className="w-5 h-5 rotate-135 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              )}

              {project.isPrivate ? (
                <div className="flex items-center gap-2 w-full px-6 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium">
                  Private Repository
                </div>
              ) : (
                project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center w-full px-6 py-4 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white/80 hover:text-white hover:border-emerald-500/50 hover:bg-[#152033] transition-all shadow-inner group"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      View Source Code
                    </span>
                    <ArrowLeft className="w-5 h-5 rotate-135 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                )
              )}
            </div>
            
          </aside>
        </div>

      </div>
    </article>
  );
}
