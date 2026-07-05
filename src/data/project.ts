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
    ],
    isPrivate: false,
    githubUrl: "https://github.com/rakib-utsho/petcare-booking-platform",
    liveUrl: "https://pawradise.lu/",
    problem:
      "Developed a comprehensive, high-performance petcare booking platform handling complex scheduling, user profiles, and role-based administration. Implemented secure payment processing, OTP authentication, and automated invoicing via Puppeteer to seamlessly streamline administrative workflows.",
    solution: "✨ Automated invoice generation & task scheduling, saving hours of manual work.",
    results: [],
    image: [
      {
        cover:
          "https://drive.google.com/file/d/1tdEVgSnPg4FLfNiaQ8hVUZoDiZV9YXUY/view?usp=drive_link",
      },
      {
        responsive:
          "https://drive.google.com/file/d/1Y9udRx6WSgBy9WUDZJM3ut_pAXzsnf3H/view?usp=drive_link",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "https://drive.google.com/file/d/1VBgRi2QM5BCy-qXhaPR1BI0ZPYy-EoYZ/view?usp=drive_link",
          },
          {
            id: 1,
            link: "https://drive.google.com/file/d/1bit-RLSZyLYE08QYnA1qFMWJZkCw40ZC/view?usp=drive_link",
          },
          {
            id: 2,
            link: "https://drive.google.com/file/d/13mO06Ex1FSCbuo-C9ZQQUe0F5Evs6LIa/view?usp=drive_link",
          },
        ],
      },
    ],
  },
  {
    id: "anesthelink",
    title: "Anesthelink",
    subtitle: "Healthcare Staffing Platform",
    type: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Redux"],
    isPrivate: false,
    githubUrl:
      "https://github.com/rakib-utsho/Healthcare-Staffing-Platform_Frontend",
    liveUrl: "https://anesthelink.com",
    problem:
      "Built a performant, structured dashboard UI for high-frequency healthcare staffing operations. Implemented a custom, optimized address autocomplete component that drastically cut initial load times and reduced third-party API costs.",
    solution: "⚡ Cut key screen load friction through highly optimized state handling.",
    results: [],
    image: [
      {
        cover:
          "https://drive.google.com/file/d/1lzncONQctN5fcog1gJFeWi7qJYUz_87B/view?usp=sharing",
      },
      {
        responsive:
          "https://drive.google.com/file/d/1Bme4DwKKw7ZfsdY_yDKzPZgmtLsYP3zh/view?usp=drive_link",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "https://drive.google.com/file/d/1e7veyberra6GHQgsEYKDIt674pANFesj/view?usp=drive_link",
          },
          {
            id: 1,
            link: "https://drive.google.com/file/d/1YanjYArQxK5M3Cvl-d3UCOTiocWaANYG/view?usp=sharing",
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
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Stripe",
      "Framer Motion",
      "GSAP",
    ],
    isPrivate: true,
    liveUrl: "https://farmadirect.online",
    problem:
      "Developed a high-performance frontend for a cross-border e-commerce platform serving Panamanian customers from Colombian pharmacies. Integrated secure Stripe checkout, seamless bilingual language support, and interactive UI animations.",
    solution: "🌍 Delivered a premium bilingual user experience with international Stripe processing.",
    results: [],
    image: [
      {
        cover:
          "https://drive.google.com/file/d/1Uko9VmPrL-jAUqHRdfDRNAOlszCPzCAx/view?usp=drive_link",
      },
      {
        responsive:
          "https://drive.google.com/file/d/1vDbfplt20v6603JA6B9DDOUJjVFmu0JB/view?usp=drive_link",
      },
    ],
  },
  {
    id: "bacuff-tournament",
    title: "Crown And Pitch",
    subtitle: "Sports Management Dashboard",
    type: "Frontend",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "shadcn/ui",
    ],
    isPrivate: true,
    liveUrl: "https://crownandpitch.com",
    problem:
      "Engineered a scalable frontend architecture capable of handling deep API states without performance bottlenecks for a complex tournament creation platform. Structured robust data schemas and implemented a color-coded activity tracking system.",
    solution: "🚀 Established a robust, type-safe Next.js boilerplate with RTK Query caching.",
    results: [],
    image: [
      {
        cover:
          "https://drive.google.com/file/d/18OzG4ozs-89uQaHcOtyf54_Vg2ovSKuq/view?usp=drive_link",
      },
      {
        responsive:
          "https://drive.google.com/file/d/1pnyWE-sn2W51TCLMbYdFCx9Tss3HCXoq/view?usp=drive_link",
      },
      {
        dashboard: [
          {
            id: 0,
            link: "https://drive.google.com/file/d/1UVG8oW5yMaNjb0caGJiAlzgf-o8vwfP2/view?usp=drive_link",
          },
          {
            id: 1,
            link: "https://drive.google.com/file/d/1BIvTRDQBcKsT1IH1ia5l1YqryX4gN8si/view?usp=drive_link",
          },
        ],
      },
    ],
  },
];
