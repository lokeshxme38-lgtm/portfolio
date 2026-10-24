import { practiceTopics } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeforcesCard } from "@/components/dashboard/CodeforcesCard";
import { GithubCard } from "@/components/dashboard/GithubCard";
import { HackerRankCard } from "@/components/dashboard/HackerRankCard";
import { LeetCodeCard } from "@/components/dashboard/LeetCodeCard";

export function CodingDashboard() {
  return (
    <section
      id="achievements"
      aria-labelledby="dashboard-title"
      className="section-y border-t border-line/40 bg-bg-2/40"
    >
      <div className="container-x">
        <SectionHeading
          id="dashboard-title"
          title="Progress, in code."
          description="A growing record of problems solved, skills developed, and milestones achieved."
        />

        <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <HackerRankCard />
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7">
            <LeetCodeCard />
          </Reveal>
          <Reveal className="lg:col-span-8">
            <GithubCard />
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4">
            <CodeforcesCard />
          </Reveal>

          <Reveal className="lg:col-span-12">
            <div className="card p-6 sm:p-8">
              <h3 className="text-base font-medium text-fg">Problem-solving topics I&apos;ve practised</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {practiceTopics.map((t) => (
                  <li key={t.name} className="tag cursor-default">
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
