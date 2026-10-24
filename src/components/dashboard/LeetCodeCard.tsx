import { ArrowUpRight } from "lucide-react";
import { env, profileUrls } from "@/lib/env";
import { loadLeetCode } from "@/lib/platforms";
import type { LeetCodeData } from "@/lib/platforms";
import { useAsync } from "@/lib/useAsync";
import { LeetCodeIcon } from "@/components/ui/BrandIcons";
import { ErrorState, NotConnected, SkeletonBlock } from "@/components/ui/StateViews";
import { AnimatedNumber } from "./AnimatedNumber";
import { Heatmap } from "./Heatmap";
import { ProgressRing } from "./ProgressRing";

const difficulty = [
  { key: "easy", label: "Easy", bar: "bg-emerald-400/80" },
  { key: "medium", label: "Medium", bar: "bg-amber-400/80" },
  { key: "hard", label: "Hard", bar: "bg-rose-400/80" },
] as const;

function timeAgo(unixSeconds: number): string {
  const diff = Math.max(0, Date.now() / 1000 - unixSeconds);
  if (diff < 3600) return `${Math.max(1, Math.round(diff / 60))}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

function Header({ username }: { username?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-accent">
          <LeetCodeIcon size={20} />
        </span>
        <div>
          <h3 className="text-base font-medium text-fg">LeetCode</h3>
          <p className="mono text-xs text-muted">{username ? `@${username}` : "Problem-solving activity"}</p>
        </div>
      </div>
      {profileUrls.leetcode && (
        <a
          href={profileUrls.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
        >
          Profile <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function Stats({ data }: { data: LeetCodeData | null }) {
  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
        <ProgressRing value={data ? data.solved.all : null} total={data ? data.totals.all : null} />
        <ul className="w-full space-y-4">
          {difficulty.map((d) => {
            const solved = data ? data.solved[d.key] : null;
            const total = data ? data.totals[d.key] : null;
            const pct = solved !== null && total ? Math.min((solved / total) * 100, 100) : 0;
            return (
              <li key={d.key}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted">{d.label}</span>
                  <span className="mono text-fg">
                    {solved !== null ? <AnimatedNumber value={solved} /> : "—"}
                    {total ? <span className="text-muted"> / {total.toLocaleString()}</span> : null}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/40" aria-hidden="true">
                  <div
                    className={`h-full rounded-full ${d.bar} transition-[width] duration-1000 ease-[var(--ease-premium)]`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 border-t border-line/50 pt-6">
        <Heatmap days={data ? data.heatmap : null} label="LeetCode submissions" unit="submissions" />
      </div>

      <div className="mt-6">
        <p className="mono text-xs text-muted">Recent accepted submissions</p>
        {data && data.recent.length > 0 ? (
          <ul className="mt-3 divide-y divide-line/40">
            {data.recent.slice(0, 5).map((s) => (
              <li key={`${s.slug}-${s.timestamp}`} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <a
                  href={`https://leetcode.com/problems/${s.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-fg transition-colors hover:text-accent"
                >
                  {s.title}
                </a>
                <span className="mono shrink-0 text-xs text-muted">{timeAgo(s.timestamp)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">
            {data ? "No recent accepted submissions to show." : "Accepted submissions will appear here once your account is connected."}
          </p>
        )}
      </div>
    </>
  );
}

export function LeetCodeCard() {
  const username = env.leetcodeUsername;
  const state = useAsync((signal) => loadLeetCode(username, signal), Boolean(username), [username]);

  return (
    <article className="card h-full p-6 sm:p-8" aria-label="LeetCode statistics">
      <Header username={username || undefined} />

      {state.status === "idle" && (
        <>
          <Stats data={null} />
          <div className="mt-6">
            <NotConnected
              title="LeetCode isn't connected yet"
              hint="Add your username to show solved counts, activity and recent submissions. Numbers appear only when they are real."
              envKey="VITE_LEETCODE_USERNAME"
            />
          </div>
        </>
      )}

      {state.status === "loading" && (
        <div className="mt-8 space-y-6" aria-busy="true" aria-live="polite">
          <div className="flex gap-8">
            <SkeletonBlock className="size-40 rounded-full" />
            <div className="flex-1 space-y-4 pt-3">
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
            </div>
          </div>
          <SkeletonBlock className="h-24 w-full" />
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-6">
          <ErrorState message={`${state.message} The LeetCode module needs the /api/leetcode function, which runs on Vercel (or with "vercel dev" locally).`} />
        </div>
      )}

      {state.status === "success" && <Stats data={state.data} />}
    </article>
  );
}
