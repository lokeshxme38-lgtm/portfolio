import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { profileUrls } from "@/lib/env";
import {
  GitHubIcon,
  HackerRankIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/BrandIcons";

export interface SocialItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
  envKey: string;
}

export const socials: SocialItem[] = [
  { key: "github", label: "GitHub", href: profileUrls.github, icon: <GitHubIcon size={18} />, envKey: "VITE_GITHUB_USERNAME" },
  { key: "leetcode", label: "LeetCode", href: profileUrls.leetcode, icon: <LeetCodeIcon size={18} />, envKey: "VITE_LEETCODE_USERNAME" },
  { key: "hackerrank", label: "HackerRank", href: profileUrls.hackerrank, icon: <HackerRankIcon size={18} />, envKey: "VITE_HACKERRANK_USERNAME" },
  { key: "linkedin", label: "LinkedIn", href: profileUrls.linkedin, icon: <LinkedInIcon size={18} />, envKey: "VITE_LINKEDIN_URL" },
];

/**
 * Text links with icons. A profile that is not configured renders as a muted,
 * non-interactive item (never a fake URL).
 */
export function SocialLinks({ className, withIcons = true }: { className?: string; withIcons?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      {socials.map((s) =>
        s.href ? (
          <li key={s.key}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-fg"
            >
              {withIcons && s.icon}
              {s.label}
            </a>
          </li>
        ) : (
          <li key={s.key}>
            <span
              className="inline-flex cursor-not-allowed items-center gap-2 text-sm text-muted/50"
              title={`Not configured yet. Set ${s.envKey} in .env.local`}
            >
              {withIcons && s.icon}
              {s.label}
            </span>
          </li>
        ),
      )}
    </ul>
  );
}
