import {
  BarChart3,
  BrainCircuit,
  Camera,
  Code2,
  LucideIcon,
  Megaphone,
  PenTool,
} from "lucide-react";

export type CourseCategory = "Design" | "AI" | "Marketing" | "Data" | "Code" | "Creator";

export type Course = {
  id: number;
  title: string;
  category: CourseCategory;
  duration: string;
  level: string;
  price: number;
  rating: number;
  students: string;
  color: string;
  accent: string;
  icon: LucideIcon;
  outcome: string;
  modules: string[];
};

export const categories: Array<CourseCategory | "All"> = [
  "All",
  "Design",
  "AI",
  "Marketing",
  "Data",
  "Code",
  "Creator",
];

export const courses: Course[] = [
  {
    id: 1,
    title: "AI Product Strategy",
    category: "AI",
    duration: "6 weeks",
    level: "Advanced",
    price: 249,
    rating: 4.9,
    students: "18.4k",
    color: "#f46242",
    accent: "#fff1e4",
    icon: BrainCircuit,
    outcome: "Ship sharper AI features with research, evals, and product judgment.",
    modules: ["Market signals", "Prompt systems", "Evaluation loops", "Launch review"],
  },
  {
    id: 2,
    title: "Visual Systems for Web",
    category: "Design",
    duration: "5 weeks",
    level: "Intermediate",
    price: 189,
    rating: 4.8,
    students: "11.2k",
    color: "#176b87",
    accent: "#e3f7f6",
    icon: PenTool,
    outcome: "Design interfaces with stronger hierarchy, rhythm, and conversion flow.",
    modules: ["Layout craft", "Type systems", "Component polish", "Portfolio teardown"],
  },
  {
    id: 3,
    title: "Analytics That Sell",
    category: "Data",
    duration: "4 weeks",
    level: "Beginner",
    price: 139,
    rating: 4.7,
    students: "9.8k",
    color: "#275d38",
    accent: "#eaf6df",
    icon: BarChart3,
    outcome: "Turn raw metrics into persuasive dashboards and decisions.",
    modules: ["Metric trees", "SQL patterns", "Story charts", "Exec dashboard"],
  },
  {
    id: 4,
    title: "Launch Copy Studio",
    category: "Marketing",
    duration: "3 weeks",
    level: "Intermediate",
    price: 119,
    rating: 4.8,
    students: "7.5k",
    color: "#8b4b1f",
    accent: "#fff0d2",
    icon: Megaphone,
    outcome: "Write landing pages, emails, and ads that feel specific and sell.",
    modules: ["Offer shape", "Landing copy", "Email arcs", "Ad testing"],
  },
  {
    id: 5,
    title: "React Interface Lab",
    category: "Code",
    duration: "8 weeks",
    level: "Advanced",
    price: 279,
    rating: 4.9,
    students: "15.1k",
    color: "#244cc4",
    accent: "#e9efff",
    icon: Code2,
    outcome: "Build polished app screens with state, motion, and maintainable components.",
    modules: ["Design tokens", "State patterns", "Motion polish", "QA workflow"],
  },
  {
    id: 6,
    title: "Creator Business Kit",
    category: "Creator",
    duration: "4 weeks",
    level: "Beginner",
    price: 99,
    rating: 4.6,
    students: "6.7k",
    color: "#b0355f",
    accent: "#ffe7ee",
    icon: Camera,
    outcome: "Package knowledge into a paid offer with content, community, and sales.",
    modules: ["Niche map", "Offer ladder", "Content flywheel", "Community launch"],
  },
];

export const learningPath = [
  { label: "Discover", detail: "Match your goal to a curated path", progress: 100 },
  { label: "Practice", detail: "Complete applied studio assignments", progress: 68 },
  { label: "Review", detail: "Get expert critique and peer feedback", progress: 42 },
  { label: "Launch", detail: "Publish a capstone with proof of skill", progress: 18 },
];
