// src/data/projects.ts

export type ProjectType = "Frontend" | "Full Stack" | "Backend";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrivate: boolean;
  image?: string; // optional: store images in /public/projects/...
};

export const projects: Project[] = [
  {
    id: "dimcprep",
    title: "DIMCPrep",
    subtitle: "Subscription-based Exam Preparation Platform",
    type: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Redux"],
    isPrivate: true,
    liveUrl: "https://www.dimcprep.com/", // replace with real
    highlights: [
      "Developed and maintained the frontend and admin dashboard of an online exam preparation platform.",
      "Improved website SEO using Next.js metadata optimization and sitemap.xml generation.",
      "Built responsive, performance-optimized user interfaces using Next.js and TypeScript.",
      "Implemented quiz modules with dynamic question rendering and real-time feedback.",
      "Integrated secure Google Authentication using Firebase.",
      "Consumed and managed data from RESTful APIs to display dynamic content.",
      "Collaborated with backend developers using Git and version control workflow.",
    ],
    image: "/projects/dimcprep.png",
  },
  {
    id: "anesthelink",
    title: "Anesthelink",
    subtitle: "Hospital Management Platform",
    type: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Redux"],
    isPrivate: true,
    liveUrl: "https://anesthelink.com", // replace with real
    highlights: [
      "Developed and maintained the frontend and admin dashboard of a hospital management platform.",
      "Improved website SEO using Next.js metadata optimization and sitemap.xml generation.",
      "Built responsive, performance-optimized user interfaces using Next.js and TypeScript.",
      "Integrated secure Google Authentication using Firebase.",
      "Consumed and managed data from RESTful APIs to display dynamic content.",
      "Collaborated with backend developers using Git and version control workflow.",
    ],
    // image: "/projects/anesthelink.png",
  },
  {
    id: "expense-manager",
    title: "Expense Manager",
    subtitle: "Full Stack Expense Tracking App",
    type: "Full Stack",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Prisma",
    ],
    isPrivate: false,
    liveUrl: "https://personalexpencemanager-frontend.vercel.app", // replace with real
    githubUrl: "https://github.com/rakib-utsho/FullStack_Expence-Manager", // replace with real
    highlights: [
      "Implemented user authentication and authorization using JWT.",
      "Developed expense tracking with date and category-wise organization.",
      "Built category-based expense statistics with interactive charts.",
      "Enabled update and delete functionality for expenses.",
    ],
    // image: "/projects/expense-manager.png",
  },
  {
    id: "urban-nest",
    title: "Urban Nest",
    subtitle: "Home Rental WebApp (Airbnb-inspired)",
    type: "Full Stack",
    tech: ["EJS", "Bootstrap CSS", "Node.js", "Express.js", "MongoDB"],
    isPrivate: false,
    liveUrl: "https://urbannest-rental-webapp.onrender.com/listings", // replace with real
    githubUrl: "https://github.com/rakib-utsho/UrbanNest-Rental-WebApp", // replace with real
    highlights: [
      "Developed a full-stack hotel and house rental web application inspired by Airbnb.",
      "Implemented user authentication and authorization using Passport.js.",
      "Enabled users to list, browse, and review rental properties.",
      "Integrated Mapbox for interactive location mapping and property visualization.",
      "Designed a responsive and user-friendly interface for enhanced user experience.",
    ],
    image: "/projects/urban-nest.png",
  },
];
