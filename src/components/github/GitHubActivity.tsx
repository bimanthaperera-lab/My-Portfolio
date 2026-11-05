import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { sectionIndex } from "../../data/navigation";
import { profile } from "../../data/profile";
import {
  fetchGitHubActivity,
  languageColors,
  streaks,
  usernameFromUrl,
  type GitHubActivity as Activity,
} from "../../lib/github";
import { GitHubIcon } from "../icons/BrandIcons";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { ContributionGraph, GraphSkeleton } from "./ContributionGraph";

const username = usernameFromUrl(profile.socials.github);

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: Activity };

export function GitHubActivity() {
  const ref = useRef<HTMLElement>(null);
  // Only call the APIs once the section is close to the screen.
  const near = useInView(ref, { once: true, margin: "600px 0px" });
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!near) return;
    const controller = new AbortController();
    fetchGitHubActivity(username, controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          console.warn("GitHub activity failed to load", err);
          setState({ status: "error" });
        }
      });
    return () => controller.abort();
  }, [near]);

  return (
    <section
      ref={ref}
      id="github"
      aria-labelledby="github-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="github-heading"
          index={sectionIndex("github")}
          label="github"
          title="What I've been shipping"
          description="Live from my GitHub: every commit, pull request and issue over the last year."
        />
        <FadeIn inView delay={0.2}>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs text-ink-400 transition-colors hover:text-ink-50"
          >
            <GitHubIcon size={15} />@{username}
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </FadeIn>
      </div>

      <FadeIn inView delay={0.1} className="mt-14">
        {state.status === "error" ? (
          <ErrorCard />
        ) : (
          <div className="flex flex-col gap-6">
            <Stats data={state.status === "ready" ? state.data : null} />
            <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5 sm:p-6 light:bg-ink-900 light:shadow-card">
              {state.status === "ready" ? (
                <ContributionGraph days={state.data.days} total={state.data.total} />
              ) : (
                <GraphSkeleton />
              )}
            </div>
            <Repos data={state.status === "ready" ? state.data : null} />
          </div>
        )}
      </FadeIn>
    </section>
  );
}

function Stats({ data }: { data: Activity | null }) {
  const s = data ? streaks(data.days) : null;
  const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`;
  const items = [
    { label: "contributions in the last year", value: data?.total.toLocaleString("en-US") },
    { label: "longest streak", value: s && days(s.longest) },
    { label: "current streak", value: s && days(s.current) },
    { label: "public repositories", value: data?.publicRepos.toLocaleString("en-US") },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 rounded-2xl border border-ink-800 bg-ink-900/40 p-5 light:bg-ink-900 light:shadow-card"
        >
          <dt className="order-2 font-mono text-xs text-ink-400">{item.label}</dt>
          <dd className="order-1 text-2xl font-semibold tracking-tight text-ink-50 tabular-nums sm:text-3xl">
            {item.value == null ? (
              <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-ink-800" aria-label="Loading" />
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(iso: string) {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days > -1) return "today";
  if (days > -30) return relative.format(days, "day");
  if (days > -365) return relative.format(Math.round(days / 30), "month");
  return relative.format(Math.round(days / 365), "year");
}

function Repos({ data }: { data: Activity | null }) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-xs tracking-[0.2em] text-ink-600 uppercase">
        Recently pushed
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {data
          ? data.repos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-800 bg-ink-900/40 p-5 transition-colors hover:border-ink-600 light:bg-ink-900 light:shadow-card"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-sm text-ink-50">{repo.name}</span>
                    <ArrowUpRight
                      size={15}
                      aria-hidden
                      className="shrink-0 text-ink-600 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-50"
                    />
                  </span>
                  {repo.description && (
                    <span className="line-clamp-2 text-sm leading-relaxed text-ink-400">
                      {repo.description}
                    </span>
                  )}
                  <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-400">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className="size-2 rounded-full"
                          style={{ background: languageColors[repo.language] ?? "currentColor" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={12} aria-hidden />
                        {repo.stars}
                        <span className="sr-only"> stars</span>
                      </span>
                    )}
                    <span>updated {timeAgo(repo.pushedAt)}</span>
                  </span>
                </a>
              </li>
            ))
          : Array.from({ length: 4 }, (_, i) => (
              <li
                key={i}
                aria-hidden
                className="h-28 animate-pulse rounded-2xl border border-ink-800 bg-ink-900/40"
              />
            ))}
      </ul>
    </div>
  );
}

function ErrorCard() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink-800 bg-ink-900/40 p-6 light:bg-ink-900">
      <p className="text-ink-400">GitHub activity couldn't be loaded right now.</p>
      <a
        href={profile.socials.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-ink-800 px-4 text-sm font-medium text-ink-200 transition-colors hover:border-ink-600 hover:text-ink-50"
      >
        <GitHubIcon size={15} />
        View my GitHub profile
      </a>
    </div>
  );
}
