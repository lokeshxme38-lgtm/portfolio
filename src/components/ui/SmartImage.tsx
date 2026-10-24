import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Project, ProjectImage } from "@/data";
import { ProjectCover } from "./ProjectCover";

const WIDTHS = [480, 800, 1200, 1600];

const withWidth = (src: string, w: number) =>
  src.includes("w=") ? src.replace(/([?&])w=\d+/, `$1w=${w}`) : src;

interface SmartImageProps {
  image: ProjectImage;
  cover: Project["cover"];
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Slow zoom on parent hover — pass the parent's `group` name via className. */
  zoom?: boolean;
}

/**
 * Responsive, lazy-loaded photo on top of generated cover art.
 * - Fades in once loaded (no layout shift: parent controls the aspect ratio).
 * - On error the photo is removed and the cover remains, so nothing is broken.
 */
export function SmartImage({ image, cover, sizes, priority, className, zoom = true }: SmartImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <ProjectCover cover={cover} />
      {state !== "failed" && (
        <img
          src={withWidth(image.src, 1200)}
          srcSet={WIDTHS.map((w) => `${withWidth(image.src, w)} ${w}w`).join(", ")}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          referrerPolicy="no-referrer"
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-premium)]",
            state === "loaded" ? "opacity-100" : "opacity-0",
            zoom && "group-hover:scale-[1.035]",
          )}
        />
      )}
      {/* Keeps text readable and unifies photos with different tones. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
