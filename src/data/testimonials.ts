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
      "Rakibul is an exceptional frontend developer. His attention to detail and ability to translate designs into pixel-perfect interfaces is impressive. He consistently delivers clean, maintainable code and is always eager to learn new technologies.",
    avatar: "SH",
  },
  {
    id: 2,
    name: "Tanvir Rahman",
    role: "Senior Developer",
    company: "Trodev",
    message:
      "Working with Rakibul was a great experience. He quickly grasps complex requirements and delivers high-quality code. His proficiency in React and Next.js, combined with his problem-solving skills, makes him a valuable team member.",
    avatar: "TR",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    company: "SM Technology",
    message:
      "Rakibul has an excellent eye for design implementation. He always ensures the final product matches the design mockups perfectly. His communication skills and collaborative spirit make the design-to-development handoff seamless.",
    avatar: "NJ",
  },
  {
    id: 4,
    name: "Mahfuzur Rahman",
    role: "Team Lead",
    company: "Bangladesh Computer Council",
    message:
      "During his internship, Rakibul showed remarkable dedication and a strong willingness to learn. His analytical approach to software testing and quality assurance was beyond what we expected from an intern.",
    avatar: "MR",
  },
];
