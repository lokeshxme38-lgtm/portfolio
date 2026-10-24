import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y border-t border-line/40 bg-bg-2/40">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          title="What I can build for you."
          description="Frontend work I'm confident delivering as a student developer: focused, responsive and honest about scope."
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.title} delay={(i % 2) * 0.07}>
                <article className="card card-hover flex h-full flex-col p-7 sm:p-9">
                  <Icon className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-10 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">{service.title}</h3>
                  <p className="mt-3 max-w-md text-muted">{service.description}</p>
                  <ul className="mt-8 space-y-2.5 border-t border-line/50 pt-6">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-fg/90">
                        <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line/70 p-8 sm:flex-row sm:items-center sm:p-10">
          <p className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Have an idea? Let&apos;s bring it to life.</p>
          <Button to="/#contact">
            Start a project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
