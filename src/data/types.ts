import type { LucideIcon } from "lucide-react";

export type SkillStatus = "Practising" | "Learning" | "Exploring" | "Planned";

export interface Skill {
  name: string;
  icon: LucideIcon;
  description: string;
  status: SkillStatus;
  /** Slug of a related project, when one honestly exists. */
  project?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  /** "practical" = used today; "interest" = still being learned. */
  kind: "practical" | "interest";
  skills: Skill[];
}

export interface ProjectImage {
  /** Remote photo. Falls back to the generated cover if it fails to load. */
  src: string;
  alt: string;
  /** Unsplash / Pexels page for attribution and replacement. */
  credit?: string;
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  /** True for every project whose visuals are stock references, not screenshots. */
  illustrative: boolean;
  /** Only technologies that are verified for the project. Empty = not decided yet. */
  tech: string[];
  /** Fallback cover styling (used when the photo fails or is still loading). */
  cover: { hue: number; pattern: "weave" | "grid" | "map" | "circuit" };
  hero: ProjectImage;
  gallery: ProjectImage[];
  links: { live?: string; github?: string };
  caseStudy: {
    overview: string;
    problem: string;
    approach: string[];
    contribution: string;
    challenges: string[];
    lessons: string[];
    currentStatus: string;
  };
}

export interface TimelineItem {
  title: string;
  description: string;
  /** Only set when the real date is known. */
  date?: string;
  state: "done" | "current" | "planned";
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  includes: string[];
}

export interface PracticeTopic {
  name: string;
}
