import { useId } from "react";
import type { Project } from "@/data";

/**
 * Generated cover art used underneath photos and whenever a photo fails to
 * load. Purely decorative, so it is hidden from assistive technology.
 */
export function ProjectCover({ cover }: { cover: Project["cover"] }) {
  const id = useId().replace(/:/g, "");
  const h = cover.hue;
  const c1 = `hsl(${h} 45% 16%)`;
  const c2 = `hsl(${h} 35% 9%)`;
  const line = `hsl(${h} 70% 70% / 0.22)`;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <pattern id={`p${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          {cover.pattern === "weave" && (
            <path d="M0 20 L20 0 L40 20 L20 40 Z M20 0 V40 M0 20 H40" stroke={line} fill="none" />
          )}
          {cover.pattern === "grid" && <path d="M40 0H0V40" stroke={line} fill="none" />}
          {cover.pattern === "map" && (
            <>
              <path d="M0 10 Q10 0 20 10 T40 10" stroke={line} fill="none" />
              <path d="M0 30 Q10 20 20 30 T40 30" stroke={line} fill="none" />
            </>
          )}
          {cover.pattern === "circuit" && (
            <>
              <path d="M0 20H14L20 14H40" stroke={line} fill="none" />
              <circle cx="20" cy="14" r="2" fill={line} />
              <path d="M20 40V28L26 22" stroke={line} fill="none" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#g${id})`} />
      <rect width="800" height="500" fill={`url(#p${id})`} />
    </svg>
  );
}
