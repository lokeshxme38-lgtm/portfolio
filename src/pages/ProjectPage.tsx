import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { getProject, projects } from "@/data";
import type { ProjectImage } from "@/data";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line/50 py-10 md:grid-cols-12 md:gap-10">
      <h2 className="text-xl font-semibold tracking-tight text-fg md:col-span-4">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted md:col-span-8 [&_strong]:text-fg">{children}</div>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  useDocumentMeta(project?.name, project?.description);

  if (!project) return <Navigate to="/404" replace />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const { caseStudy: cs } = project;
  const images: ProjectImage[] = project.gallery;

  return (
    <article className="pt-28 sm:pt-32">
      <div className="container-x">
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All projects
        </Link>

        <motion.header
          className="mt-10 max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono text-sm text-accent">{project.number}</span>
            <span className="mono rounded-full border border-line px-3 py-1.5 text-xs leading-none text-muted">
              {project.status}
            </span>
          </div>
          <h1 className="heading-lg mt-6 text-fg">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>
        </motion.header>

        <motion.div
          className="group card relative mt-12 aspect-[16/9] overflow-hidden lg:mt-16"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartImage image={project.hero} cover={project.cover} sizes="(min-width: 1360px) 1280px, 100vw" priority />
        </motion.div>

        {project.illustrative && (
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Images on this page are illustrative stock photos, not screenshots of finished work.
          </p>
        )}

        <div className="mt-16 lg:mt-24">
          <Block title="Overview">
            <p>{cs.overview}</p>
          </Block>
          <Block title="Problem">
            <p>{cs.problem}</p>
          </Block>
          <Block title="Approach and design">
            <List items={cs.approach} />
          </Block>
          <Block title="My contribution">
            <p>{cs.contribution}</p>
          </Block>
          <Block title="Technologies">
            {project.tech.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="tag cursor-default">
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not decided yet. I will list technologies here only once they are actually chosen and used.</p>
            )}
          </Block>

          {images.length > 0 && (
            <Reveal className="border-t border-line/50 py-10">
              <h2 className="text-xl font-semibold tracking-tight text-fg">Gallery</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {images.map((img) => (
                  <li key={img.src} className="group card relative aspect-[4/3] overflow-hidden">
                    <SmartImage image={img} cover={project.cover} sizes="(min-width: 640px) 50vw, 100vw" />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Block title="Development challenges">
            <List items={cs.challenges} />
          </Block>
          <Block title="Lessons learned">
            <List items={cs.lessons} />
          </Block>
          <Block title="Current status">
            <p>
              <strong>{project.status}.</strong> {cs.currentStatus}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.live ? (
                <Button href={project.links.live}>
                  Live Demo <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button disabled variant="secondary" title="No live preview yet">
                  Live preview: not available yet
                </Button>
              )}
              {project.links.github ? (
                <Button href={project.links.github} variant="secondary">
                  <GitHubIcon size={16} /> Source code
                </Button>
              ) : (
                <Button disabled variant="secondary" title="No public repository yet">
                  Source code: not published yet
                </Button>
              )}
            </div>
          </Block>
        </div>

        <nav aria-label="Next project" className="mt-6 border-t border-line/50 py-16">
          <p className="text-sm text-muted">Next project</p>
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-3 inline-flex items-center gap-4 text-3xl font-semibold tracking-tight text-fg transition-colors hover:text-accent sm:text-5xl"
          >
            {next.name}
            <ArrowRight className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:size-9" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </article>
  );
}
