export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  level: number; // 0-100
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "HTML / CSS", level: 92 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Redux", level: 80 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 72 },
      { name: "Go (Learning)", level: 40 },
      { name: "REST APIs", level: 80 },
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 60 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Firebase", level: 68 },
      { name: "Prisma ORM", level: 65 },
      { name: "Figma (UI/UX)", level: 60 },
      { name: "Linux / CLI", level: 65 },
      { name: "Agile / Scrum", level: 70 },
    ],
  },
];
