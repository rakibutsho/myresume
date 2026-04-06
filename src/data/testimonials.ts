export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string; // initials as fallback
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sajid Hasan",
    role: "Project Manager",
    company: "SM Technology",
    message:
      "Rakibul consistently delivered production-ready frontend modules before deadlines. He improved handoff quality between design and engineering and reduced UI revision cycles across our releases.",
    avatar: "SH",
  },
  {
    id: 2,
    name: "Tanvir Rahman",
    role: "Senior Developer",
    company: "Trodev",
    message:
      "He quickly understood technical constraints and translated requirements into clean React components. His pull requests were easy to review and usually needed minimal rework.",
    avatar: "TR",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    company: "SM Technology",
    message:
      "Rakibul is one of the few developers I worked with who truly respects design detail. He matched spacing, hierarchy, and interaction intent with high accuracy while keeping the UI fast.",
    avatar: "NJ",
  },
  {
    id: 4,
    name: "Mahfuzur Rahman",
    role: "Team Lead",
    company: "Bangladesh Computer Council",
    message:
      "Even as an intern, he approached testing tasks with strong ownership and structure. He documented issues clearly and helped the team resolve defects faster.",
    avatar: "MR",
  },
];
