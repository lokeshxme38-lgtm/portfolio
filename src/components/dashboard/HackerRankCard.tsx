import { motion } from "motion/react";
import { Star } from "lucide-react";
import { platformMeta } from "@/data";
import { profileUrls } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { HackerRankIcon } from "@/components/ui/BrandIcons";

export function HackerRankCard() {
  return (
    <article className="card flex h-full flex-col justify-between gap-10 p-6 sm:p-8" aria-labelledby="hr-title">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-accent">
          <HackerRankIcon size={22} />
        </span>
        <span className="text-sm text-muted">{platformMeta.hackerrank.label}</span>
      </div>

      <div>
        <div className="flex gap-2" role="img" aria-label="Five out of five stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.09, type: "spring", stiffness: 260, damping: 16 }}
            >
              <Star className="size-9 fill-accent text-accent sm:size-10" strokeWidth={1.5} aria-hidden="true" />
            </motion.span>
          ))}
        </div>
        <h3 id="hr-title" className="mt-6 text-2xl font-semibold tracking-tight text-fg">
          HackerRank — 5-Star Milestone
        </h3>
        <p className="mono mt-3 text-sm text-muted">
          Programming focus: <span className="text-fg">{platformMeta.hackerrank.focus}</span>
        </p>
      </div>

      {profileUrls.hackerrank ? (
        <Button href={profileUrls.hackerrank} variant="secondary" className="self-start">
          View Profile
        </Button>
      ) : (
        <div className="self-start">
          <Button variant="secondary" disabled title="Set VITE_HACKERRANK_USERNAME in .env.local">
            View Profile
          </Button>
          <p className="mono mt-2 text-[0.7rem] text-muted">Link appears once VITE_HACKERRANK_USERNAME is set.</p>
        </div>
      )}
    </article>
  );
}
