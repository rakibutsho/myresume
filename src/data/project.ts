// src/data/projects.ts

export type ProjectType = string;

export type ProjectImageObj =
  | { cover: string }
  | { responsive: string }
  | { dashboard: Array<{ id: number; link: string }> };

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
  image?: string | ProjectImageObj[];
};

export const projects: Project[] = [
  {
    id: "spidernode",
    title: "SpiderNode",
    subtitle: "Open Source Uptime Monitoring Platform",
    type: "Full Stack",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux Toolkit",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Telegram Bot API",
      "node-cron",
      "System Design",
    ],
    isPrivate: false,
    githubUrl: "https://github.com/rakibutsho/SPIDER_NODE-uptime-tracker",
    liveUrl: "https://spidernode.site/",
    problem:
      "Engineered a production-ready SaaS uptime monitoring platform featuring a Dual-Cron architecture for resilient polling and a high-concurrency check engine. Designed an in-memory write batching pipeline to prevent database throttling and integrated real-time Telegram alerts via webhooks.",
    solution:
      "🚀 Built a highly scalable, free uptime monitor with sub-second accuracy and instant Telegram alerts.",
    results: [],
    image: [
      {
        cover: "/projects/spidernode.png",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "/projects/spidernode.png",
          },
        ],
      },
    ],
  },
  {
    id: "Pawradise",
    title: "Pawradise",
    subtitle: "Petcare Booking Platform",
    type: "Full Stack",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Redux",
      "JWT Auth",
      "Prisma",
      "Express",
      "Node.js",
      "REST API",
      "Nodemailer",
      "Shadcn UI",
      "Vercel",
      "VPS Hosting",
      "Git",
      "CI/CD Basics",
      "System Design",
    ],
    isPrivate: false,
    githubUrl: "https://github.com/rakib-utsho/petcare-booking-platform",
    liveUrl: "https://pawradise.lu/",
    problem:
      "Developed a comprehensive, high-performance petcare booking platform handling complex scheduling, user profiles, and role-based administration. Implemented secure payment processing, OTP authentication, and automated invoicing via Puppeteer to seamlessly streamline administrative workflows.",
    solution:
      "✨ Automated invoice generation & task scheduling, saving hours of manual work.",
    results: [],
    image: [
      {
        cover: "/projects/pawradise.webp",
      },
      {
        responsive: "/projects/pawradise.webp",
      },
    ],
  },
  {
    id: "anesthelink",
    title: "Anesthelink",
    subtitle: "Healthcare Staffing Platform",
    type: "Frontend",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Redux",
      "NextAuth",
      "Framer Motion",
      "WebSocket",
      "Shadcn UI",
      "Vercel",
      "VPS Hosting",
      "Git",
      "CI/CD Basics",
      "System Design",
    ],
    isPrivate: true,
    githubUrl:
      "https://github.com/rakib-utsho/Healthcare-Staffing-Platform_Frontend",
    liveUrl: "https://anesthelink.com",
    problem:
      "Built a performant, structured dashboard UI for high-frequency healthcare staffing operations. Implemented a custom, optimized address autocomplete component that drastically cut initial load times and reduced third-party API costs.",
    solution:
      "⚡ Cut key screen load friction through highly optimized state handling.",
    results: [],
    image: [
      {
        cover: "/projects/anesthelink.png",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "/projects/anesthelink.png",
          },
        ],
      },
    ],
  },
  {
    id: "farmadirect",
    title: "FarmaDirect",
    subtitle: "Cross-Border Medicine Delivery",
    type: "Frontend",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Stripe",
      "Framer Motion",
      "Vercel",
      "VPS Hosting",
      "Git",
      "CI/CD Basics",
      "System Design",
      "WebSocket",
      "NextAuth",
      "React Hook Form",
    ],
    isPrivate: true,
    liveUrl: "https://farmadirect.online",
    problem:
      "Developed a high-performance frontend for a cross-border e-commerce platform serving Panamanian customers from Colombian pharmacies. Integrated secure Stripe checkout, seamless bilingual language support, and interactive UI animations.",
    solution:
      "🌍 Delivered a premium bilingual user experience with international Stripe processing.",
    results: [],
    image: [
      {
        cover: "/projects/farmadirect.png",
      },
      {
        responsive: "/projects/farmadirect.png",
      },
    ],
  },
  {
    id: "bacuff-tournament",
    title: "Crown And Pitch",
    subtitle: "Sports Management Dashboard",
    type: "Frontend",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "shadcn/ui",
      "Vercel",
      "VPS Hosting",
      "Git",
      "CI/CD Basics",
      "System Design",
      "Stripe",
    ],
    isPrivate: true,
    liveUrl: "https://crownandpitch.com",
    problem:
      "Engineered a scalable frontend architecture capable of handling deep API states without performance bottlenecks for a complex tournament creation platform. Structured robust data schemas and implemented a color-coded activity tracking system.",
    solution:
      "🚀 Established a robust, type-safe Next.js boilerplate with RTK Query caching.",
    results: [],
    image: [
      {
        cover: "/projects/crown-pitch.png",
      },
      {
        responsive: "/projects/crown-pitch.png",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "/projects/crown-pitch.png",
          },
          {
            id: 1,
            link: "/projects/crown-pitch.png",
          },
        ],
      },
    ],
  },
];
