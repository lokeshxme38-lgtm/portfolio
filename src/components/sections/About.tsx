import { aboutCards, person, timeline } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/* Bento placement for the five cards on a 6-column grid (md and up). */
const spans = [
  "md:col-span-4", // Education
  "md:col-span-2", // Degree
  "md:col-span-3", // Coding
  "md:col-span-3", // Focus
  "sm:col-span-2 md:col-span-6", // Interests
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="about-title" title="A little about me." />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Biography */}
          <div className="lg:col-span-5">
            <div className="space-y-6 text-lg leading-[1.75] text-muted">
              {person.bio.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={cn(i === 0 && "text-xl text-fg")}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* Subtle vertical journey timeline (full version lives in Achievements). */}
            <Reveal className="mt-12" delay={0.1}>
              <p className="mono text-xs text-muted">The journey so far</p>
              <ol className="mt-6 space-y-5 border-l border-line pl-6">
                {timeline.slice(0, 4).map((item) => (
                  <li key={item.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.55rem] -left-[1.78rem] size-2 rounded-full bg-accent"
                    />
                    <p className="text-sm font-medium text-fg">{item.title}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Bento cards */}
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-6 lg:col-span-7">
            {aboutCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.label} delay={i * 0.05} className={cn(spans[i])}>
                  <div className="card card-hover flex h-full min-h-36 flex-col justify-between p-6">
                    <Icon className="size-5 text-accent" aria-hidden="true" strokeWidth={1.75} />
                    <div className="mt-8">
                      <p className="mono text-xs text-muted">{card.label}</p>
                      <p className="mt-2 text-lg font-medium leading-snug tracking-tight text-fg">{card.value}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
