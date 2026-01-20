export const projects = [
  {
    id: "dimcprep",
    title: "DIMCPrep",
    subtitle: "Subscription-Based Exam Preparation Platform",
    overview:
      "DIMCPrep is a subscription-based exam preparation platform that helps students prepare for the Diploma in Immediate Medical Care (DIMC). It includes a modern student interface and a powerful admin dashboard for managing exams and users.",
    role: "Frontend Developer",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Redux",
      "Firebase Authentication",
    ],
    features: [
      "Subscription-based exam access",
      "Dynamic quiz system with real-time feedback",
      "Admin dashboard for question and user management",
      "Leaderboard and performance tracking",
      "User feedback and analytics",
      "Google authentication with Firebase",
    ],
    responsibilities: [
      "Developed and maintained the frontend and admin dashboard",
      "Built responsive and performance-optimized UI components",
      "Implemented dynamic quiz modules and real-time result feedback",
      "Integrated Firebase Google Authentication",
      "Consumed RESTful APIs for dynamic data handling",
      "Collaborated with backend developers using Git workflows",
    ],
    challengesAndLearnings: [
      "Learned how to improve SEO in a Next.js application",
      "Implemented sitemap.xml generation using the next-sitemap package",
      "Optimized metadata and routing for better search engine visibility",
    ],
    seo: {
      optimized: true,
      techniques: ["Next.js metadata", "next-sitemap"],
    },
    images: [
      {
        id: 1,
        url: "image.1",
        alt: "DIMCPrep student dashboard",
      },
      {
        id: 2,
        url: "image.2",
        alt: "DIMCPrep admin dashboard",
      },
    ],
    status: "Completed",
  },
  {
    id: "pawradise",
    title: "PAWRADISE",
    subtitle: "Pet Training Appointment Booking Platform",
    overview:
      "PAWRADISE is a full-stack pet training appointment booking platform. Pet training centers can offer both group and individual training sessions, while pet owners can book appointments and manage their training schedules.",
    role: "Full Stack Developer",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Nodemailer",
      "Cron Job",
    ],
    features: [
      "Appointment-based booking system",
      "Admin dashboard for creating and managing group training sessions",
      "Automatic invoice generation after appointment completion",
      "Email delivery of invoice PDF to clients",
      "Group email functionality for notifying all users",
      "Automatic cancellation of expired appointments",
    ],
    responsibilities: [
      "Designed and developed a responsive frontend dashboard for the platform",
      "Implemented booking workflows for individual and group training sessions with validation",
      "Integrated frontend components with backend RESTful APIs",
      "Handled database CRUD operations and booking status management",
      "Improved application state management using Redux",
    ],
    challengesAndLearnings: [
      "Optimized backend API performance",
      "Implemented cron jobs for automated appointment cancellation",
      "Built automated email workflows using Nodemailer",
    ],
    images: [
      {
        id: 1,
        url: "image.1",
        alt: "PAWRADISE booking dashboard",
      },
      {
        id: 2,
        url: "image.2",
        alt: "PAWRADISE admin management panel",
      },
    ],
    status: "Completed",
  },
];
