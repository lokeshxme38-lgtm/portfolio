import { ArrowUpRight, Star } from "lucide-react";
import { env, profileUrls } from "@/lib/env";
import { loadGithub } from "@/lib/platforms";
import type { GithubData } from "@/lib/platforms";
import { useAsync } from "@/lib/useAsync";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ErrorState, NotConnected, SkeletonBlock } from "@/components/ui/StateViews";
import { AnimatedNumber } from "./AnimatedNumber";
import { Heatmap } from "./Heatmap";

function Summary({ data }: { data: GithubData }) {
  return (
    <div className="mt-8 space-y-8">
      <dl className="grid grid-cols-3 gap-4">
        {[
          { label: "Public repos", value: data.profile.publicRepos },
          { label: "Followers", value: data.profile.followers },
          { label: "Contributions (1y)", value: data.totalContributions },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-line/60 bg-bg/40 p-4">
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">
              {item.value === null ? "—" : <AnimatedNumber value={item.value} />}
            </dd>
          </div>
        ))}
      </dl>

      {data.heatmap ? (
        <Heatmap days={data.heatmap} label="GitHub contributions" unit="contributions" />
      ) : (
        <p className="rounded-xl border border-dashed border-line/70 p-4 text-sm text-muted">
          The contribution calendar could not be loaded. The repository data below is still live.
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="mono text-xs text-muted">Featured repositories</p>
          {data.featured.length > 0 ? (
            <ul className="mt-3 divide-y divide-line/40">
              {data.featured.map((repo) => (
                <li key={repo.name} className="py-3">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-fg transition-colors group-hover:text-accent">
                        {repo.name}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-sm text-muted">{repo.description}</span>
                    </span>
                    <span className="mono flex shrink-0 items-center gap-3 text-xs text-muted">
                      {repo.language && <span>{repo.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" aria-hidden="true" />
                        {repo.stars}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">No public repositories yet. They will show up here as soon as you publish one.</p>
          )}
        </div>

        <div className="md:col-span-2">
          <p className="mono text-xs text-muted">Language distribution</p>
          {data.languages.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {data.languages.map((l) => (
                <li key={l.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-fg">{l.name}</span>
                    <span className="mono text-xs text-muted">{Math.round(l.share * 100)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line/40" aria-hidden="true">
                    <div className="h-full rounded-full bg-accent/80" style={{ width: `${l.share * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">Language data appears once repositories have code.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function GithubCard() {
  const username = env.githubUsername;
  const state = useAsync((signal) => loadGithub(username, signal), Boolean(username), [username]);

  return (
    <article className="card h-full p-6 sm:p-8" aria-label="GitHub activity">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-fg">
            <GitHubIcon size={20} />
          </span>
          <div>
            <h3 className="text-base font-medium text-fg">GitHub</h3>
            <p className="mono text-xs text-muted">{username ? `@${username}` : "Public code and activity"}</p>
          </div>
        </div>
        {profileUrls.github && (
          <a
            href={profileUrls.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
          >
            Profile <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>

      {state.status === "idle" && (
        <div className="mt-8 space-y-6">
          <Heatmap days={null} label="GitHub contributions" unit="contributions" />
          <NotConnected
            title="GitHub isn't connected yet"
            hint="Add your username to load your public repositories, language mix and contribution calendar straight from GitHub."
            envKey="VITE_GITHUB_USERNAME"
          />
        </div>
      )}

      {state.status === "loading" && (
        <div className="mt-8 space-y-6" aria-busy="true" aria-live="polite">
          <div className="grid grid-cols-3 gap-4">
            <SkeletonBlock className="h-20" />
            <SkeletonBlock className="h-20" />
            <SkeletonBlock className="h-20" />
          </div>
          <SkeletonBlock className="h-28 w-full" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-6">
          <ErrorState message={`${state.message} GitHub allows 60 unauthenticated requests per hour per visitor, so try again in a bit.`} />
        </div>
      )}

      {state.status === "success" && <Summary data={state.data} />}
    </article>
  );
}
