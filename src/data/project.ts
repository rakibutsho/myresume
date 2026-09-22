// src/data/projects.ts

export type ProjectType = string;

export type ProjectImageObj =
  | { cover: string }
  | { responsive: string }
  | { dashboard: Array<{ id: number; link: string }> };

export type ProjectMilestone = {
  hash: string;
  type: "architecture" | "feature" | "perf" | "launch";
  title: string;
  description: string;
  date?: string;
};

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
  perms?: string;
  size?: string;
  date?: string;
  category?: string;
  milestones?: ProjectMilestone[];
};

export const projects: Project[] = [
  {
    id: "spidernode",
    title: "SpiderNode",
    subtitle: "Open Source Uptime Monitoring Platform",
    type: "Full Stack",
    perms: "drwxr-xr-x",
    size: "4.2K",
    date: "2024-08",
    category: "OPEN SOURCE",
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
    milestones: [
      {
        hash: "a4f19b2",
        type: "architecture",
        title: "Core Scheduling Engine & Dual-Cron Daemon",
        description:
          "Separated worker cron from polling dispatcher to prevent cascading timeouts across concurrent target health checks.",
        date: "2024-08-02",
      },
      {
        hash: "c82e301",
        type: "feature",
        title: "Real-time Telegram Bot & Webhook Alerting",
        description:
          "Implemented asynchronous bot notification pipeline with retry logic on connection dropouts.",
        date: "2024-08-11",
      },
      {
        hash: "e719bc4",
        type: "perf",
        title: "In-Memory Batch Pipeline (40% DB load reduction)",
        description:
          "Buffered high-frequency metric pings into batched Prisma bulk inserts, drastically eliminating write thrashing.",
        date: "2024-08-19",
      },
      {
        hash: "f019a28",
        type: "launch",
        title: "v1.0 Production Release & Open-Source Artifact",
        description:
          "Published public repo, Dockerized deployment flow, and automated SSL health evaluation.",
        date: "2024-08-25",
      },
    ],
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
    perms: "drwxr-xr-x",
    size: "8.1K",
    date: "2024-05",
    category: "PRODUCTION",
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
    milestones: [
      {
        hash: "b1049ea",
        type: "architecture",
        title: "Multi-Role RBAC & Entity Schema Design",
        description:
          "Structured MongoDB document relations for pet owners, care providers, calendar bookings, and medical history.",
        date: "2024-05-04",
      },
      {
        hash: "d4920fc",
        type: "feature",
        title: "Headless Automated Invoicing via Puppeteer",
        description:
          "Generated pixel-perfect PDF receipts server-side upon checkout and delivered via Nodemailer with OTP validation.",
        date: "2024-05-15",
      },
      {
        hash: "6e2891a",
        type: "perf",
        title: "SSR Hydration Caching & Dynamic Slot Memoization",
        description:
          "Optimized availability calendar rendering by pre-aggregating day-part time blocks on edge routes.",
        date: "2024-05-22",
      },
      {
        hash: "9ac21b5",
        type: "launch",
        title: "European Production Rollout (pawradise.lu)",
        description:
          "Deployed to high-availability VPS cluster with Nginx reverse proxy and continuous uptime tracking.",
        date: "2024-05-30",
      },
    ],
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
    perms: "drwxr-xr-x",
    size: "6.4K",
    date: "2024-03",
    category: "ENTERPRISE",
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
    milestones: [
      {
        hash: "318af90",
        type: "architecture",
        title: "Enterprise Staffing State Architecture",
        description:
          "Architected Redux store with normalized slices handling shift scheduling, nurse certifications, and facility contracts.",
        date: "2024-03-05",
      },
      {
        hash: "55cb1e2",
        type: "perf",
        title: "Optimized Address Autocomplete & Geo-Lookup",
        description:
          "Designed debounce caching and local token memoization, cutting Map API consumption by 65% and boosting latency.",
        date: "2024-03-14",
      },
      {
        hash: "7f4019a",
        type: "feature",
        title: "Real-time Shift Dispatch via WebSocket",
        description:
          "Implemented live bid synchronization so hospital managers receive instantaneous acceptance confirmations.",
        date: "2024-03-24",
      },
      {
        hash: "82de410",
        type: "launch",
        title: "Live Medical Staffing Production Deployment",
        description:
          "Launched secure HIPAA-compliant frontend dashboard with granular role permissions.",
        date: "2024-03-31",
      },
    ],
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
    perms: "drwxr-xr-x",
    size: "3.9K",
    date: "2024-01",
    category: "ENTERPRISE",
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
    milestones: [
      {
        hash: "18e209a",
        type: "architecture",
        title: "Cross-Border Multicurrency Checkout Engine",
        description:
          "Engineered international payment pipeline supporting localized pricing and custom customs tax calculations.",
        date: "2024-01-08",
      },
      {
        hash: "42a9b31",
        type: "feature",
        title: "Bilingual Localization & Dynamic Prescription Upload",
        description:
          "Implemented reactive ES/EN language engine and multi-step prescription validation workflow.",
        date: "2024-01-18",
      },
      {
        hash: "70ab19c",
        type: "perf",
        title: "Asset Optimization & Edge Image Serving",
        description:
          "Streamlined pharmaceutical catalog rendering, achieving sub-second LCP on low-bandwidth mobile devices.",
        date: "2024-01-26",
      },
      {
        hash: "91e082b",
        type: "launch",
        title: "Central American Market Launch",
        description:
          "Went live across Panama and Colombia with automated courier dispatch notifications.",
        date: "2024-02-02",
      },
    ],
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
    perms: "drwxr-xr-x",
    size: "5.2K",
    date: "2023-11",
    category: "ENTERPRISE",
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
    milestones: [
      {
        hash: "0a1829e",
        type: "architecture",
        title: "Tournament Bracket State Machine & RTK Query",
        description:
          "Structured double-elimination knockout trees and league ladder states with optimistic updates.",
        date: "2023-11-10",
      },
      {
        hash: "29cb102",
        type: "feature",
        title: "Live Match Event Timeline & Card Logging",
        description:
          "Built interactive referee logging panel for goals, penalty cards, and substitutions with instant audit replay.",
        date: "2023-11-20",
      },
      {
        hash: "58e19ba",
        type: "perf",
        title: "Virtualization of High-Volume Match Tables",
        description:
          "Integrated table row virtualization preventing DOM memory leaks during multi-day league tournaments.",
        date: "2023-11-29",
      },
      {
        hash: "77a8291",
        type: "launch",
        title: "Tournament Management SaaS Deployment",
        description:
          "Delivered white-labeled platform enabling sports organizations to run end-to-end tournaments.",
        date: "2023-12-08",
      },
    ],
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
