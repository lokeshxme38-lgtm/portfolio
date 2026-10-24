import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeading({ id, title, description, className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-4xl", className)}>
      <Reveal>
        <h2 id={id} className="heading-lg text-fg">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
