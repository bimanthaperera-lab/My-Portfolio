/**
 * Public GitHub data for the activity section, fetched in the browser.
 *
 * - Contribution calendar: github-contributions-api.jogruber.de (GitHub's own
 *   calendar needs an auth token; this free API scrapes the public one).
 * - Repositories: GitHub's REST API, unauthenticated (60 requests/hour per IP).
 *
 * Results are cached in sessionStorage for an hour so moving around the page
 * or reloading doesn't spend the rate limit.
 */

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GitHubActivity = {
  total: number;
  days: ContributionDay[];
  repos: Repo[];
  publicRepos: number;
};

const CACHE_MS = 60 * 60 * 1000;
const RECENT_REPOS = 4;

/** "https://github.com/name" → "name". */
export const usernameFromUrl = (url: string) => new URL(url).pathname.split("/").filter(Boolean)[0];

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json() as Promise<T>;
}

type CalendarResponse = { total: { lastYear: number }; contributions: ContributionDay[] };
type RepoResponse = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};
type UserResponse = { public_repos: number };

export async function fetchGitHubActivity(
  username: string,
  signal: AbortSignal,
): Promise<GitHubActivity> {
  const key = `gh-activity:${username}`;
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { at, data } = JSON.parse(cached) as { at: number; data: GitHubActivity };
      if (Date.now() - at < CACHE_MS) return data;
    }
  } catch {
    /* storage blocked or corrupt: fetch fresh */
  }

  const user = encodeURIComponent(username);
  const [calendar, repos, profile] = await Promise.all([
    getJson<CalendarResponse>(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, signal),
    getJson<RepoResponse[]>(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=12`, signal),
    getJson<UserResponse>(`https://api.github.com/users/${user}`, signal),
  ]);

  const data: GitHubActivity = {
    total: calendar.total.lastYear,
    days: calendar.contributions,
    publicRepos: profile.public_repos,
    repos: repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, RECENT_REPOS)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
  };

  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ignore */
  }
  return data;
}

/** Longest run of days with at least one contribution, and the run ending today/yesterday. */
export function streaks(days: readonly ContributionDay[]) {
  // The calendar runs to the end of the current week, so drop future days.
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const past = days.filter((d) => d.date <= today);

  let longest = 0;
  let run = 0;
  for (const d of past) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  // Today not committed yet shouldn't break the current streak.
  let i = past.length - 1;
  if (i >= 0 && past[i].count === 0) i--;
  let current = 0;
  for (; i >= 0 && past[i].count > 0; i--) current++;

  return { longest, current };
}

/** GitHub's colours for the languages likely to show up here. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Kotlin: "#a97bff",
  Java: "#b07219",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4f5d95",
  Dockerfile: "#384d54",
  Shell: "#89e051",
};
