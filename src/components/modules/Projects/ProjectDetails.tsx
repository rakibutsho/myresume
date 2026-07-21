import { Project, ProjectImageObj } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, ArrowUpRight } from "lucide-react";

type Props = { project: Project };

// Helper to get Google Drive direct image link if possible, else return original
const getImageUrl = (url: string) => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

// Helper to safely render image using Next Image component
const renderImage = (src: string, alt: string, className?: string) => {
  return (
    <Image
      src={getImageUrl(src)}
      alt={alt}
      fill
      quality={100}
      className={`object-cover object-top ${className || ""}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default function ProjectDetails({ project }: Props) {
  const isArray = Array.isArray(project.image);
  
  let coverImage = "";
  let responsiveImage = "";
  let dashboardImages: { id: number; link: string }[] = [];

  if (isArray) {
    (project.image as ProjectImageObj[]).forEach((img) => {
      if ("cover" in img) coverImage = img.cover;
      if ("responsive" in img) responsiveImage = img.responsive;
      if ("dashboard" in img) dashboardImages = img.dashboard;
    });
  } else if (typeof project.image === "string") {
    coverImage = project.image;
  }

  return (
    <article className="w-full pt-32 pb-20 relative min-h-screen bg-[#09090b]">
      {/* Background ambient glow */}

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Navigation */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-[#a1a1aa] hover:text-white transition-colors mb-16"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Projects
        </Link>

        {/* Hero Section */}
        <header className="mb-20 max-w-4xl">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {project.type} Case Study
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-white leading-[1.1] tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#a1a1aa] font-light max-w-3xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </header>

        {/* Massive Image Display - Window Frame Style */}
        {coverImage && (
          <div className="relative w-full h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden bg-[#121214] border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] mb-32 flex items-end justify-center group">
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-[0.2]"
              style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
                backgroundSize: '32px 32px' 
              }} 
            />
            
            {/* The Image Window */}
            <div className="relative w-[90%] h-[90%] rounded-t-2xl overflow-hidden border-t border-l border-r border-white/10 shadow-2xl bg-[#09090b] z-10 transform transition-transform duration-1000 group-hover:-translate-y-4">
               {/* Browser Header */}
               <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/10 flex items-center px-6 gap-2 z-20 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
              </div>
              <div className="relative w-full h-full pt-10">
                {renderImage(coverImage, `${project.title} Cover`, "transition-transform duration-1000")}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Context */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Problem section */}
            <section className="relative">
              <div className="absolute -left-8 top-2 text-6xl font-bold text-white/5 select-none hidden md:block">01</div>
              <h2 className="text-3xl font-semibold text-white mb-8 tracking-tight">The Challenge</h2>
              <div className="text-lg md:text-xl text-[#a1a1aa] font-light leading-relaxed space-y-6">
                <p>{project.problem}</p>
              </div>
            </section>

            {/* Solution section */}
            <section className="relative">
              <div className="absolute -left-8 top-2 text-6xl font-bold text-white/5 select-none hidden md:block">02</div>
              <h2 className="text-3xl font-semibold text-white mb-8 tracking-tight">The Solution</h2>
              <div className="text-lg md:text-xl text-[#a1a1aa] font-light leading-relaxed space-y-6">
                <p>{project.solution}</p>
              </div>
            </section>

            {/* Additional Images Section */}
            {(responsiveImage || dashboardImages.length > 0) && (
              <section className="relative">
                <div className="absolute -left-8 top-2 text-6xl font-bold text-white/5 select-none hidden md:block">03</div>
                <h2 className="text-3xl font-semibold text-white mb-8 tracking-tight">Interface & Details</h2>
                <div className="space-y-8">
                  {responsiveImage && (
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#121214]">
                      {renderImage(responsiveImage, "Responsive Interface")}
                    </div>
                  )}
                  {dashboardImages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {dashboardImages.map((img) => (
                        <div key={img.id} className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-white/10 bg-[#121214] group">
                           {renderImage(img.link, `Dashboard View ${img.id + 1}`, "group-hover:scale-105 transition-transform duration-700")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Results section */}
            <section className="relative">
              <div className="absolute -left-8 top-2 text-6xl font-bold text-white/5 select-none hidden md:block">
                {responsiveImage || dashboardImages.length > 0 ? "04" : "03"}
              </div>
              <h2 className="text-3xl font-semibold text-white mb-8 tracking-tight">Impact & Results</h2>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10">
                <ul className="space-y-6">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-5">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mt-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-lg text-[#a1a1aa] font-light leading-relaxed">
                        {result}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column: Meta & Links Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Tech Stack Bento Box */}
              <div className="p-8 rounded-[2rem] bg-[#121214] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} 
                />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1a1aa] mb-8 relative z-10">
                  Technologies
                </h3>
                <div className="flex flex-col gap-4 relative z-10">
                  {project.tech.map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                      <span className="text-sm font-medium tracking-wider text-white uppercase">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links Bento Box */}
              <div className="p-8 rounded-[2rem] bg-[#121214] border border-white/5 shadow-2xl flex flex-col gap-4">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1a1aa] mb-4">
                  Project Links
                </h3>

                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center w-full px-6 py-5 rounded-2xl bg-white text-black font-semibold hover:bg-emerald-400 transition-colors duration-300 group"
                  >
                    <span className="flex items-center gap-3 text-sm tracking-wide uppercase">
                      <ExternalLink className="w-4 h-4" />
                      Live App
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                )}

                {project.isPrivate ? (
                  <div className="flex items-center justify-center w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-medium text-sm tracking-wide uppercase">
                    Private Repo
                  </div>
                ) : (
                  project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-between items-center w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300 group"
                    >
                      <span className="flex items-center gap-3 text-sm tracking-wide uppercase">
                        <Github className="w-4 h-4" />
                        Source
                      </span>
                      <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Link>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
