import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getProject, skillGroups } from "@/data";
import type { SkillGroup, SkillStatus } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const statusStyle: Record<SkillStatus, string> = {
  Practising: "text-accent border-accent/40 bg-accent/10",
  Learning: "text-fg border-line bg-bg-2",
  Exploring: "text-muted border-line bg-bg-2",
  Planned: "text-muted/80 border-dashed border-line bg-transparent",
};

const layout: Record<string, string> = {
  programming: "lg:col-span-7",
  frontend: "lg:col-span-5",
  tools: "lg:col-span-5",
  exploring: "lg:col-span-7",
};

function Panel({ group, index }: { group: SkillGroup; index: number }) {
  const isInterest = group.kind === "interest";
  return (
    <Reveal delay={index * 0.06} className={cn("md:col-span-2", layout[group.id])}>
      <section
        aria-labelledby={`skills-${group.id}`}
        className={cn("card h-full p-6 sm:p-8", isInterest && "border-dashed bg-bg-2/60")}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 id={`skills-${group.id}`} className="text-2xl font-semibold tracking-tight text-fg">
            {group.title}
          </h3>
          <p className="text-sm text-muted">{group.blurb}</p>
        </div>

        <ul className={cn("mt-8 grid gap-3", isInterest ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2")}>
          {group.skills.map((skill) => {
            const Icon = skill.icon;
            const project = skill.project ? getProject(skill.project) : undefined;
            return (
              <li
                key={skill.name}
                className="group flex flex-col gap-3 rounded-xl border border-line/60 bg-bg/40 p-4 transition-colors duration-300 hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon className="size-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <span className={cn("mono rounded-full border px-2 py-1 text-[0.65rem] leading-none", statusStyle[skill.status])}>
                    {skill.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-fg">{skill.name}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{skill.description}</p>
                </div>
                {project && (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="mono mt-auto inline-flex items-center gap-1 text-[0.7rem] text-muted transition-colors hover:text-accent"
                  >
                    {project.name.split(" & ")[0]}
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y border-t border-line/40">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          title="Tools, technologies & curiosity."
          description="The first three panels are what I use today. The dashed panel is what I am still learning, so nothing there is claimed as expertise."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:mt-20">
          {skillGroups.map((group, i) => (
            <Panel key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
