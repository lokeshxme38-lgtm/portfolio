import { ArrowUpRight } from "lucide-react";
import { env, profileUrls } from "@/lib/env";
import { loadCodeforces } from "@/lib/platforms";
import { useAsync } from "@/lib/useAsync";
import { CodeforcesIcon } from "@/components/ui/BrandIcons";
import { ErrorState, SkeletonBlock } from "@/components/ui/StateViews";

/**
 * Optional module. Without a handle it explains itself briefly and shows no
 * rating or rank — those only appear for a connected account.
 */
export function CodeforcesCard() {
  const handle = env.codeforcesHandle;
  const state = useAsync((signal) => loadCodeforces(handle, signal), Boolean(handle), [handle]);

  return (
    <article className="card flex h-full flex-col p-6 sm:p-8" aria-label="Codeforces">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-fg">
            <CodeforcesIcon size={20} />
          </span>
          <div>
            <h3 className="text-base font-medium text-fg">Codeforces</h3>
            <p className="mono text-xs text-muted">{handle ? `@${handle}` : "Optional"}</p>
          </div>
        </div>
        {profileUrls.codeforces && (
          <a
            href={profileUrls.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
          >
            Profile <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="mt-8 flex flex-1 flex-col justify-center">
        {state.status === "idle" && (
          <div>
            <p className="font-medium text-fg">Not connected</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              No rating or rank is shown until a Codeforces account is linked. Contest practice is on the roadmap.
            </p>
            <code className="mono mt-3 inline-block rounded-md bg-bg px-2 py-1 text-xs text-accent">VITE_CODEFORCES_HANDLE</code>
          </div>
        )}
        {state.status === "loading" && (
          <div className="space-y-3" aria-busy="true">
            <SkeletonBlock className="h-8 w-32" />
            <SkeletonBlock className="h-4 w-48" />
          </div>
        )}
        {state.status === "error" && <ErrorState message={state.message} />}
        {state.status === "success" && (
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-muted">Rating</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-fg">{state.data.rating ?? "Unrated"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Rank</dt>
              <dd className="mt-1 text-lg font-medium capitalize text-fg">{state.data.rank ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Max rating</dt>
              <dd className="mono mt-1 text-fg">{state.data.maxRating ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Contests</dt>
              <dd className="mono mt-1 text-fg">{state.data.contests}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}
