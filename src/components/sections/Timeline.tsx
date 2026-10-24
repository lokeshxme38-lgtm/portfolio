import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { timeline } from "@/data";
import type { TimelineItem } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const stateLabel: Record<TimelineItem["state"], string> = {
  done: "Completed",
  current: "In progress",
  planned: "Planned",
};

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <section id="journey" aria-labelledby="journey-title" className="section-y border-t border-line/40">
      <div className="container-x">
        <SectionHeading
          id="journey-title"
          title="Milestones along the way."
          description="Dates are added only when I can verify them. Everything below is my own account of the journey so far."
        />

        <ol ref={ref} className="relative mt-16 max-w-3xl lg:mt-20">
          {/* Track + scroll-linked progress line */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-line/70" />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent"
            style={{ scaleY: progress }}
          />

          {timeline.map((item, i) => (
            <motion.li
              key={item.title}
              className="relative pb-12 pl-12 last:pb-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.55, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[0.35rem] left-0 grid size-[15px] place-items-center rounded-full border bg-bg",
                  item.state === "done" && "border-accent",
                  item.state === "current" && "border-accent",
                  item.state === "planned" && "border-dashed border-muted",
                )}
              >
                {item.state === "done" && <span className="size-[7px] rounded-full bg-accent" />}
                {item.state === "current" && <span className="pulse-dot size-[7px] rounded-full bg-accent" />}
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight text-fg">{item.title}</h3>
                <span
                  className={cn(
                    "mono rounded-full border px-2 py-1 text-[0.65rem] leading-none",
                    item.state === "planned" ? "border-dashed border-line text-muted" : "border-line text-muted",
                  )}
                >
                  {item.date ?? stateLabel[item.state]}
                </span>
              </div>
              <p className="mt-2 max-w-xl text-muted">{item.description}</p>
              <span className="sr-only">Milestone {i + 1} of {timeline.length}. Status: {stateLabel[item.state]}.</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
