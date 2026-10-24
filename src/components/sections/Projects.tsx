import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import type { Project } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";

export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 text-sm", className)}>
      <Link
        to={`/projects/${project.slug}`}
        className="group/link inline-flex items-center gap-1.5 font-medium text-fg transition-colors hover:text-accent"
      >
        View Case Study
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
      </Link>
      {project.links.live && (
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
          Live Demo <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
      {project.links.github && (
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
          <GitHubIcon size={15} /> GitHub
        </a>
      )}
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="mono text-sm text-accent">{project.number}</span>
        <span className="mono rounded-full border border-line px-3 py-1.5 text-xs leading-none text-muted">
          {project.status}
        </span>
      </div>
      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{project.name}</h3>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{project.description}</p>
      {project.tech.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="tag cursor-default">
              {t}
            </li>
          ))}
        </ul>
      )}
      <ProjectLinks project={project} className="mt-7" />
    </>
  );
}

function Illustrative() {
  return (
    <span className="mono absolute top-4 left-4 z-10 rounded-full border border-line/80 bg-bg/70 px-3 py-1.5 text-[0.65rem] leading-none text-muted backdrop-blur">
      Illustrative image, not a screenshot
    </span>
  );
}

/** Full-width featured project. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group card card-hover grid overflow-hidden lg:grid-cols-12" aria-label={project.name}>
        <Link
          to={`/projects/${project.slug}`}
          className="relative block aspect-[16/10] overflow-hidden lg:col-span-8 lg:aspect-auto lg:min-h-[28rem]"
          aria-label={`Open the ${project.name} case study`}
          tabIndex={-1}
        >
          <SmartImage image={project.hero} cover={project.cover} sizes="(min-width: 1024px) 66vw, 100vw" />
          {project.illustrative && <Illustrative />}
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-4">
          <Meta project={project} />
        </div>
      </article>
    </Reveal>
  );
}

/** Half-width card for the two-column rows. */
function GridCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group card card-hover flex h-full flex-col overflow-hidden" aria-label={project.name}>
        <Link
          to={`/projects/${project.slug}`}
          className="relative block aspect-[16/11] overflow-hidden"
          aria-label={`Open the ${project.name} case study`}
          tabIndex={-1}
        >
          <SmartImage image={project.hero} cover={project.cover} sizes="(min-width: 1024px) 50vw, 100vw" />
          {project.illustrative && <Illustrative />}
        </Link>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <Meta project={project} />
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [first, ...rest] = projects;
  const pair = rest.slice(0, 2);
  const last = rest[2];

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y border-t border-line/40">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          title="Selected work & explorations."
          description="Concepts and early experiments, labelled honestly. Photos are illustrative references until real screenshots exist."
        />

        <div className="mt-16 space-y-4 lg:mt-20 lg:space-y-6">
          {first && <FeaturedCard project={first} />}
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {pair.map((p, i) => (
              <GridCard key={p.slug} project={p} delay={i * 0.08} />
            ))}
          </div>
          {last && <FeaturedCard project={last} />}
        </div>
      </div>
    </section>
  );
}
