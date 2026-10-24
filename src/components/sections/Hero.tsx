import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { person } from "@/data";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";

const ease = [0.22, 1, 0.36, 1] as const;

/** Each headline line reveals from a clipped mask; lines are staggered. */
const lines: Array<Array<{ text: string; accent?: boolean }>> = [
  [{ text: "Building" }, { text: "Digital" }],
  [{ text: "Experiences" }],
  [{ text: "Through" }, { text: "Code.", accent: true }],
];

export function Hero() {
  let wordIndex = 0;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Faint engineering grid, fades out towards the edges. Static: no scroll cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(41 48 64 / 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(41 48 64 / 0.35) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 45%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 45%, #000 20%, transparent 75%)",
        }}
      />

      <div className="container-x relative">
        <motion.p
          className="mono flex items-center gap-3 text-xs tracking-[0.18em] text-muted sm:text-[0.8rem]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.span
            aria-hidden="true"
            className="block h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          />
          {person.heroLabel}
        </motion.p>

        <h1 id="hero-title" className="heading-xl mt-8 max-w-[15ch] text-fg sm:mt-10 sm:max-w-none">
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              {line.map((word) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={word.text}
                    className={`mr-[0.22em] inline-block last:mr-0 ${word.accent ? "text-accent" : ""}`}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.15 + i * 0.09, ease }}
                  >
                    {word.text}
                    {word.accent && <span className="caret" aria-hidden="true" />}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
        >
          <div className="lg:col-span-6">
            <p className="max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl">{person.heroIntro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/#projects">View My Work</Button>
              <Button to="/#contact" variant="secondary">
                Let&apos;s Connect
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-7 lg:col-span-5 lg:col-start-8">
            <SocialLinks />
            <p className="inline-flex items-center gap-3 text-sm text-muted">
              <span className="relative flex size-2.5">
                <span className="pulse-dot absolute inline-flex size-full rounded-full bg-accent" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
              {person.availability}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        className="mono absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] text-muted transition-colors hover:text-fg md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        scroll
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
