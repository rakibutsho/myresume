// src/data/projects.ts

export type ProjectType = "Frontend" | "Full Stack" | "Backend";

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
    subtitle: "petcare-booking-platform",
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
      "The client needed a comprehensive booking platform that handles complex pet training scheduling, user profiles, automated invoicing, and role-based administration seamlessly without performance bottlenecks.",
    solution:
      "Developed a full-stack system with an interactive Client Portal for seamless scheduling and a secure Admin Dashboard for session management. Implemented OTP authentication and background jobs via node-cron.",
    results: [
      "Delivered a smooth, interactive booking experience featuring Framer Motion and secure Stripe payments.",
      "Automated invoice generation via Puppeteer and recurring task scheduling, saving hours of manual administrative work.",
      "Ensured high performance and type safety across the stack with Next.js, Node.js, Express, and Prisma ORM.",
    ],
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
    subtitle: "Healthcare-Staffing-Platform",
    type: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Ant Design", "Redux"],
    isPrivate: false,
    githubUrl:
      "https://github.com/rakib-utsho/Healthcare-Staffing-Platform_Frontend",
    liveUrl: "https://anesthelink.com",
    problem:
      "Hospital staff needed a clearer, faster interface for high-frequency operations. A critical challenge was building a performant custom Address Autocomplete component from scratch, avoiding heavy third-party libraries that would slow down the initial page load.",
    solution:
      "Implemented a structured dashboard UI with reusable modules. For the autocomplete challenge: 1) Dynamically injected the Google Maps script only on mount, 2) Added a 250ms debounce on keystrokes to prevent API rate limits and save costs, and 3) Triggered a silent background geocoding request upon selection to seamlessly fetch latitude/longitude.",
    results: [
      "Cut key screen load friction through optimized rendering and state handling.",
      "Improved data visibility for operational teams with cleaner table and form UX.",
      "Delivered responsive admin workflows usable across desktop and tablet devices.",
      "Created a completely seamless user experience for address entry while saving on API costs and optimizing initial page load times.",
    ],
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
    subtitle: "Cross-Border Medicine Delivery Platform",
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
    liveUrl: "https://farmadirect.online", // TODO: Update this
    // githubUrl: "https://github.com/rakib-utsho/saarsip-front-end", // TODO: Update this
    problem:
      "Panamanian customers needed a reliable and accessible way to purchase a wide range of medications from Colombian pharmacies with seamless doorstep delivery.",
    solution:
      "Developed a high-performance frontend for a cross-border e-commerce platform featuring a secure Stripe checkout, a user dashboard, and built-in multi-language support.",
    results: [
      "Integrated secure, international payment processing using Stripe.",
      "Implemented a custom language context for seamless bilingual (English/Spanish) user experiences.",
      "Delivered a premium, highly interactive UI utilizing Framer Motion, GSAP, and Tailwind CSS.",
      "Ensured reliable session management for carts and authentication using Redux Persist.",
    ],
    image: [
      {
        cover:
          "https://drive.google.com/file/d/1Uko9VmPrL-jAUqHRdfDRNAOlszCPzCAx/view?usp=drive_link",
      },
      {
        responsive:
          "https://drive.google.com/file/d/1vDbfplt20v6603JA6B9DDOUJjVFmu0JB/view?usp=drive_link",
      },
      // {
      //   dashboard: [
      //     {
      //       id: 0,
      //       link: "https://drive.google.com/file/d/1e7veyberra6GHQgsEYKDIt674pANFesj/view?usp=drive_link",
      //     },
      //     {
      //       id: 1,
      //       link: "https://drive.google.com/file/d/1YanjYArQxK5M3Cvl-d3UCOTiocWaANYG/view?usp=sharing",
      //     },
      //   ],
      // },
    ],
  },
  {
    id: "bacuff-tournament",
    title: "Crown And Pitch",
    subtitle: "Sports-Management-Multi Role Dashboard",
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
    liveUrl: "https://crownandpitch.com", // Add your live URL
    // githubUrl: "https://github.com/rakib-utsho/NextJs_REDUX_boilerplate", // Update if needed
    problem:
      "Managing complex tournament creation forms and tracking system-wide activity logs required a scalable frontend architecture capable of handling deep API states without performance bottlenecks.",
    solution:
      "Developed a modern frontend dashboard integrating RTK Query for automated caching. Structured complex tournament generation schemas and implemented a paginated, color-coded activity tracking system.",
    results: [
      "Integrated seamless CRUD operations for tournament management with real-time RTK Query cache invalidation.",
      "Built a robust, paginated activity log system providing structured monitoring of user actions and events.",
      "Established a highly scalable, type-safe Next.js boilerplate with persistent state and reusable UI primitives.",
    ],
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
