// src/data/projects.ts

export type ProjectType = "Frontend" | "Full Stack" | "Backend";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  tech: string[];
  problem: string;
  solution: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrivate: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "dimcprep",
    title: "DIMCPrep",
    subtitle: "Subscription-based Exam Preparation Platform",
    type: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Redux"],
    isPrivate: true,
    liveUrl: "https://www.dimcprep.com/",
    problem:
      "The platform needed a modern learning experience and admin workflow that could handle growing student traffic without UI slowdowns.",
    solution:
      "Built the student-facing app and admin dashboard with Next.js, TypeScript, and Redux. Implemented SEO metadata strategy, dynamic quiz rendering, and resilient API-driven interfaces.",
    results: [
      "Improved Lighthouse SEO score to 92+ on key pages.",
      "Reduced repetitive admin actions with reusable dashboard components.",
      "Increased mobile usability with responsive layouts and cleaner interaction patterns.",
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
    liveUrl: "https://anesthelink.com",
    problem:
      "Hospital staff needed a clearer, faster interface for high-frequency operations and role-based access across multiple dashboards.",
    solution:
      "Implemented a structured dashboard UI with reusable modules, robust API integration, and secure authentication to support daily medical operations.",
    results: [
      "Cut key screen load friction through optimized rendering and state handling.",
      "Improved data visibility for operational teams with cleaner table and form UX.",
      "Delivered responsive admin workflows usable across desktop and tablet devices.",
    ],
    image: "/projects/anesthelink.png",
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
    liveUrl: "https://personalexpencemanager-frontend.vercel.app",
    githubUrl: "https://github.com/rakib-utsho/FullStack_Expence-Manager",
    problem:
      "Many personal finance tools are hard to use and fail to provide quick visibility into spending behavior.",
    solution:
      "Developed a full-stack expense tracker with JWT auth, category-wise analytics, and a dashboard experience focused on fast updates and simple reporting.",
    results: [
      "Enabled users to log, update, and filter expenses in seconds.",
      "Added visual spending trends for better month-over-month decision making.",
      "Shipped complete CRUD flow with secure auth and protected routes.",
    ],
    image: "/projects/expense-manager.png",
  },
  {
    id: "urban-nest",
    title: "Urban Nest",
    subtitle: "Home Rental WebApp (Airbnb-inspired)",
    type: "Full Stack",
    tech: ["EJS", "Bootstrap CSS", "Node.js", "Express.js", "MongoDB"],
    isPrivate: false,
    liveUrl: "https://urbannest-rental-webapp-tbgr.onrender.com",
    githubUrl: "https://github.com/rakib-utsho/UrbanNest-Rental-WebApp",
    problem:
      "Property listing experiences often fail on discoverability and trust, especially when location context is unclear.",
    solution:
      "Built a full-stack rental marketplace with secure authentication, listing/review workflows, and Mapbox-powered location discovery.",
    results: [
      "Improved listing discoverability with location-aware search and map previews.",
      "Supported complete host and renter workflows from listing to review.",
      "Delivered an end-to-end full-stack app with production-ready route handling.",
    ],
    image: "/projects/urban-nest.png",
  },
];
