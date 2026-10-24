import {
  Binary,
  Bot,
  BrainCircuit,
  Braces,
  Cpu,
  GitBranch,
  GraduationCap,
  Layout,
  Layers,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Code,
  Figma,
  Globe,
  Github,
  CircuitBoard,
} from "lucide-react";
import type { PracticeTopic, Service, SkillGroup, TimelineItem } from "./types";

/* Re-exported so components only ever import from "@/data". */
export { projects, getProject } from "./projects";

/* ───────────── Personal details (edit freely) ───────────── */

export const person = {
  name: "Lokesh Yadav",
  shortName: "LOKESH.",
  role: "Developer in progress",
  institution: "Army Institute of Technology, Pune",
  institutionShort: "AIT Pune",
  degree: "BTech, Automation & Robotics Engineering",
  year: "First year",
  availability: "Open to suitable projects and collaborations",
  heroLabel: "HELLO, I'M LOKESH YADAV",
  heroIntro:
    "I'm a developer in progress, C++ problem solver, and Automation & Robotics Engineering student passionate about modern web experiences and intelligent systems.",
  bio: [
    "I'm Lokesh Yadav, a first-year Automation and Robotics Engineering student at Army Institute of Technology, Pune.",
    "I'm building my foundation in software engineering through C++, Data Structures and Algorithms, and responsive web development.",
    "I've achieved five stars on HackerRank and am actively developing my problem-solving abilities through LeetCode.",
    "Beyond coding challenges, I'm interested in creating attractive websites, building practical digital products, and exploring artificial intelligence and robotics software.",
  ],
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
] as const;

/* ───────────── About cards ───────────── */

export const aboutCards = [
  { icon: GraduationCap, label: "Education", value: "Army Institute of Technology, Pune" },
  { icon: Cpu, label: "Degree", value: "BTech Automation & Robotics" },
  { icon: Code, label: "Coding", value: "5-star HackerRank milestone" },
  { icon: Terminal, label: "Current focus", value: "C++ DSA and web development" },
  { icon: BrainCircuit, label: "Interests", value: "AI, Robotics and Software Engineering" },
] as const;

/* ───────────── Problem-solving topics practised ───────────── */

export const practiceTopics: PracticeTopic[] = [
  "Arrays",
  "Strings",
  "Vectors",
  "Sorting",
  "Searching",
  "Two Pointers",
  "Stack Basics",
  "Functions",
  "Loops",
  "Time Complexity",
].map((name) => ({ name }));

/* ───────────── Skills ───────────── */

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    blurb: "The core I practise every week.",
    kind: "practical",
    skills: [
      {
        name: "C++",
        icon: Braces,
        description: "My main language for problem solving.",
        status: "Practising",
      },
      {
        name: "Problem solving",
        icon: Sparkles,
        description: "Breaking problems into small, testable steps.",
        status: "Practising",
      },
      {
        name: "Data Structures",
        icon: Binary,
        description: "Arrays, vectors, strings and stack basics.",
        status: "Learning",
      },
      {
        name: "Algorithms",
        icon: GitBranch,
        description: "Sorting, searching, two pointers, complexity.",
        status: "Learning",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "What I use to build responsive pages.",
    kind: "practical",
    skills: [
      {
        name: "HTML5",
        icon: Globe,
        description: "Semantic, accessible page structure.",
        status: "Practising",
        project: "maharashtra-carpet",
      },
      {
        name: "CSS3",
        icon: Layout,
        description: "Layouts, spacing and responsive styling.",
        status: "Practising",
        project: "maharashtra-carpet",
      },
      {
        name: "Responsive web design",
        icon: MonitorSmartphone,
        description: "Interfaces that work from phone to desktop.",
        status: "Practising",
      },
      {
        name: "Basic JavaScript",
        icon: Code,
        description: "Interactivity and DOM fundamentals.",
        status: "Learning",
      },
    ],
  },
  {
    id: "tools",
    title: "Developer tools",
    blurb: "Day-to-day tooling.",
    kind: "practical",
    skills: [
      { name: "Git", icon: GitBranch, description: "Version control basics.", status: "Practising" },
      { name: "GitHub", icon: Github, description: "Hosting and sharing code.", status: "Practising" },
      { name: "VS Code", icon: Terminal, description: "My everyday editor.", status: "Practising" },
      { name: "Figma", icon: Figma, description: "Layout sketches and prototypes.", status: "Learning" },
    ],
  },
  {
    id: "exploring",
    title: "Currently exploring",
    blurb: "Curiosity, not claimed expertise.",
    kind: "interest",
    skills: [
      {
        name: "ESP32",
        icon: CircuitBoard,
        description: "First steps with the microcontroller.",
        status: "Exploring",
        project: "esp32-robotics-lab",
      },
      {
        name: "Embedded systems",
        icon: Cpu,
        description: "How hardware and software meet.",
        status: "Exploring",
        project: "esp32-robotics-lab",
      },
      { name: "Python", icon: Terminal, description: "Next language on the list.", status: "Planned" },
      {
        name: "AI and Machine Learning",
        icon: BrainCircuit,
        description: "Reading and learning the basics.",
        status: "Planned",
      },
      { name: "Robotics software", icon: Bot, description: "Where my degree meets code.", status: "Exploring" },
      { name: "Backend development", icon: Server, description: "Understanding how APIs work.", status: "Planned" },
    ],
  },
];

/* ───────────── Achievements timeline ───────────── */
/* Dates are intentionally omitted until you add the real ones. */

export const timeline: TimelineItem[] = [
  {
    title: "Joined AIT Pune",
    description: "Started BTech in Automation & Robotics Engineering at Army Institute of Technology.",
    state: "done",
  },
  {
    title: "Started C++ and problem solving",
    description: "Began learning C++ and working through beginner programming problems.",
    state: "done",
  },
  {
    title: "Practised DSA on HackerRank",
    description: "Built momentum on arrays, strings, sorting and searching problems.",
    state: "done",
  },
  {
    title: "Reached five stars on HackerRank",
    description: "A C++ milestone and a good proof that consistent practice works.",
    state: "done",
  },
  {
    title: "Began LeetCode practice",
    description: "Moving from basics towards interview-style problems.",
    state: "current",
  },
  {
    title: "Exploring web development",
    description: "Learning responsive layouts and modern frontend tooling through concept projects.",
    state: "current",
  },
  {
    title: "Planning AI and robotics projects",
    description: "ESP32 experiments first, then robotics software and machine learning basics.",
    state: "planned",
  },
];

/* ───────────── Services ───────────── */

export const services: Service[] = [
  {
    title: "Responsive websites",
    description: "Clean, fast sites that look right on every screen size.",
    icon: MonitorSmartphone,
    includes: ["Mobile-first layouts", "Accessible markup", "Deployed and handed over"],
  },
  {
    title: "Modern landing pages",
    description: "Focused single pages that explain an idea and ask for one action.",
    icon: Rocket,
    includes: ["Clear content structure", "Tasteful motion", "Contact or sign-up form"],
  },
  {
    title: "Interactive frontend interfaces",
    description: "Dashboards, forms and small tools built with React.",
    icon: Layers,
    includes: ["Reusable components", "Loading and error states", "TypeScript"],
  },
  {
    title: "Website design and prototyping",
    description: "Layout, type and colour direction before any code is written.",
    icon: PenTool,
    includes: ["Figma prototype", "Style guide", "Responsive previews"],
  },
];

/* ───────────── Contact / socials (never invented) ───────────── */

export const platformMeta = {
  hackerrank: { label: "HackerRank", focus: "C++" },
  leetcode: { label: "LeetCode" },
  github: { label: "GitHub" },
  linkedin: { label: "LinkedIn" },
  codeforces: { label: "Codeforces" },
} as const;

export const projectInquiryTypes = [
  "Responsive website",
  "Landing page",
  "Frontend interface",
  "Design / prototype",
  "Internship or collaboration",
  "Something else",
] as const;
