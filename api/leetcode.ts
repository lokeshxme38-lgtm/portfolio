/**
 * Vercel Function — GET /api/leetcode?username=<handle>
 *
 * LeetCode has no official public API and its GraphQL endpoint does not
 * allow browser (CORS) requests, so we query it server-side and return a
 * small, normalised JSON payload. No API keys are involved.
 *
 * LeetCode may change or restrict this endpoint at any time. If that happens
 * the function returns a 502 and the site shows an honest "unavailable" state.
 */

const ENDPOINT = "https://leetcode.com/graphql";

const QUERY = /* GraphQL */ `
  query portfolioStats($username: String!) {
    allQuestionsCount { difficulty count }
    matchedUser(username: $username) {
      username
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      userCalendar { submissionCalendar }
    }
    recentAcSubmissionList(username: $username, limit: 8) { title titleSlug timestamp }
  }
`;

interface Count { difficulty: string; count: number }

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extra },
  });

function level(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  const r = count / Math.max(max, 1);
  if (r > 0.75) return 4;
  if (r > 0.5) return 3;
  if (r > 0.25) return 2;
  return 1;
}

export async function GET(request: Request): Promise<Response> {
  const username = new URL(request.url).searchParams.get("username")?.trim() ?? "";
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(username)) {
    return json({ message: "A valid LeetCode username is required." }, 400);
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: "https://leetcode.com",
        "user-agent": "Mozilla/5.0 (compatible; portfolio-stats/1.0)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });
  } catch {
    return json({ message: "Could not reach LeetCode." }, 502);
  }
  if (!res.ok) return json({ message: `LeetCode responded with ${res.status}.` }, 502);

  const payload = (await res.json()) as {
    data?: {
      allQuestionsCount?: Count[];
      matchedUser?: {
        username: string;
        submitStatsGlobal: { acSubmissionNum: Count[] };
        userCalendar: { submissionCalendar: string };
      } | null;
      recentAcSubmissionList?: Array<{ title: string; titleSlug: string; timestamp: string }> | null;
    };
  };

  const user = payload.data?.matchedUser;
  if (!user) return json({ message: "LeetCode user not found." }, 404);

  const pick = (list: Count[] | undefined, d: string) => list?.find((c) => c.difficulty === d)?.count ?? 0;
  const solvedList = user.submitStatsGlobal.acSubmissionNum;
  const totalList = payload.data?.allQuestionsCount;

  // submissionCalendar is a JSON string: { "<unix seconds>": count, ... }
  let raw: Record<string, number> = {};
  try {
    raw = JSON.parse(user.userCalendar.submissionCalendar) as Record<string, number>;
  } catch {
    raw = {};
  }
  const byDay = new Map<string, number>();
  for (const [ts, count] of Object.entries(raw)) {
    const day = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + count);
  }
  const max = Math.max(0, ...byDay.values());
  const today = new Date();
  const heatmap: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }> = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const date = d.toISOString().slice(0, 10);
    const count = byDay.get(date) ?? 0;
    heatmap.push({ date, count, level: level(count, max) });
  }

  return json(
    {
      username: user.username,
      solved: {
        all: pick(solvedList, "All"),
        easy: pick(solvedList, "Easy"),
        medium: pick(solvedList, "Medium"),
        hard: pick(solvedList, "Hard"),
      },
      totals: {
        all: pick(totalList, "All"),
        easy: pick(totalList, "Easy"),
        medium: pick(totalList, "Medium"),
        hard: pick(totalList, "Hard"),
      },
      heatmap,
      activeDays: heatmap.filter((d) => d.count > 0).length,
      recent: (payload.data?.recentAcSubmissionList ?? []).map((s) => ({
        title: s.title,
        slug: s.titleSlug,
        timestamp: Number(s.timestamp),
      })),
    },
    200,
    { "cache-control": "s-maxage=1800, stale-while-revalidate=3600" },
  );
}
