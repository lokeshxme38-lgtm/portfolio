/**
 * Platform data loaders. Every function returns real data or throws a clear
 * Error — nothing is ever fabricated.
 *
 * GitHub      → official public REST API (no key, 60 req/h per visitor IP)
 *               + jogruber's open contributions API for the heatmap
 *                 (GitHub's REST API does not expose contribution calendars).
 * LeetCode    → no public CORS API exists, so we call our own serverless
 *               function at /api/leetcode (see /api/leetcode.ts).
 * Codeforces  → official public API (CORS enabled), optional.
 */

export interface HeatDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json")) {
    throw new Error("Data source is not available in this environment.");
  }
  if (!res.ok) {
    let detail = "";
    try {
      const body = (await res.json()) as { message?: string; error?: string; comment?: string };
      detail = body.message ?? body.error ?? body.comment ?? "";
    } catch {
      /* ignore */
    }
    throw new Error(detail || `Request failed (${res.status}).`);
  }
  return (await res.json()) as T;
}

/* ───────────────────────── GitHub ───────────────────────── */

interface GhUser {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}
interface GhRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics?: string[];
}

export interface GithubData {
  profile: { login: string; name: string | null; publicRepos: number; followers: number; url: string };
  featured: Array<{
    name: string;
    url: string;
    description: string;
    language: string | null;
    stars: number;
    updated: string;
  }>;
  languages: Array<{ name: string; count: number; share: number }>;
  totalContributions: number | null;
  heatmap: HeatDay[] | null;
}

export async function loadGithub(username: string, signal: AbortSignal): Promise<GithubData> {
  const base = "https://api.github.com";
  const [user, repos] = await Promise.all([
    getJson<GhUser>(`${base}/users/${encodeURIComponent(username)}`, signal),
    getJson<GhRepo[]>(
      `${base}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      signal,
    ),
  ]);

  const own = repos.filter((r) => !r.fork && !r.archived);
  const featured = [...own]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 4)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description ?? "No description added yet.",
      language: r.language,
      stars: r.stargazers_count,
      updated: r.pushed_at,
    }));

  const langCounts = new Map<string, number>();
  for (const r of own) if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  const langTotal = [...langCounts.values()].reduce((a, b) => a + b, 0);
  const languages = [...langCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, share: langTotal ? count / langTotal : 0 }));

  // Contribution calendar: optional. Failure here must not break the rest.
  let heatmap: HeatDay[] | null = null;
  let totalContributions: number | null = null;
  try {
    const cal = await getJson<{
      total: Record<string, number>;
      contributions: HeatDay[];
    }>(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, signal);
    heatmap = cal.contributions;
    totalContributions = Object.values(cal.total).reduce((a, b) => a + b, 0);
  } catch {
    heatmap = null;
  }

  return {
    profile: {
      login: user.login,
      name: user.name,
      publicRepos: user.public_repos,
      followers: user.followers,
      url: user.html_url,
    },
    featured,
    languages,
    totalContributions,
    heatmap,
  };
}

/* ───────────────────────── LeetCode ───────────────────────── */

export interface LeetCodeData {
  username: string;
  solved: { all: number; easy: number; medium: number; hard: number };
  totals: { all: number; easy: number; medium: number; hard: number };
  heatmap: HeatDay[];
  activeDays: number;
  recent: Array<{ title: string; slug: string; timestamp: number }>;
}

export async function loadLeetCode(username: string, signal: AbortSignal): Promise<LeetCodeData> {
  return getJson<LeetCodeData>(`/api/leetcode?username=${encodeURIComponent(username)}`, signal);
}

/* ───────────────────────── Codeforces ───────────────────────── */

export interface CodeforcesData {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  contests: number;
}

interface CfEnvelope<T> {
  status: "OK" | "FAILED";
  comment?: string;
  result: T;
}

export async function loadCodeforces(handle: string, signal: AbortSignal): Promise<CodeforcesData> {
  const info = await getJson<
    CfEnvelope<Array<{ handle: string; rating?: number; maxRating?: number; rank?: string }>>
  >(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`, signal);
  if (info.status !== "OK" || !info.result[0]) throw new Error(info.comment ?? "Codeforces user not found.");

  let contests = 0;
  try {
    const rating = await getJson<CfEnvelope<unknown[]>>(
      `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`,
      signal,
    );
    if (rating.status === "OK") contests = rating.result.length;
  } catch {
    contests = 0;
  }
  const u = info.result[0];
  return {
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null,
    rank: u.rank ?? null,
    contests,
  };
}
