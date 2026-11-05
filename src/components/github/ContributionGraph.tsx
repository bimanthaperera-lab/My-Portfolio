import { useLayoutEffect, useMemo, useRef } from "react";
import type { ContributionDay } from "../../lib/github";

/** Cell colour per GitHub level (0 = none … 4 = most). Uses the theme accent. */
const LEVEL_CLASS = [
  "bg-ink-800",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
] as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-05" → local Date, without the UTC shift `new Date(str)` would apply. */
const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const dateLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

type Week = (ContributionDay | null)[];

/** Splits the days into Sunday-first weeks, padding the first week. */
function toWeeks(days: readonly ContributionDay[]): Week[] {
  if (days.length === 0) return [];
  const weeks: Week[] = [];
  let week: Week = Array.from({ length: parse(days[0].date).getDay() }, () => null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

/** A month label sits above the first week that starts in that month. */
function monthLabels(weeks: Week[]) {
  let last = -1;
  const labels = weeks.map((week) => {
    const first = week.find((d): d is ContributionDay => d !== null);
    if (!first) return "";
    const month = parse(first.date).getMonth();
    if (month === last) return "";
    last = month;
    return MONTHS[month];
  });
  // Like GitHub, drop a label with no room: too close to the next one, or to the right edge.
  const MIN_GAP = 3;
  return labels.map((label, i) => {
    if (!label) return "";
    if (i > labels.length - MIN_GAP) return "";
    const next = labels.findIndex((l, j) => j > i && l !== "");
    return next !== -1 && next - i < MIN_GAP ? "" : label;
  });
}

export function ContributionGraph({
  days,
  total,
}: {
  days: readonly ContributionDay[];
  total: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const weeks = useMemo(() => toWeeks(days), [days]);
  const months = useMemo(() => monthLabels(weeks), [weeks]);

  // On narrow screens the graph scrolls sideways: show the most recent weeks.
  // Re-applied whenever the box resizes (first layout, rotation), so it holds
  // even if the first measurement happens before the layout settles.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const toEnd = () => {
      el.scrollLeft = el.scrollWidth;
    };
    toEnd();
    const observer = new ResizeObserver(toEnd);
    observer.observe(el);
    return () => observer.disconnect();
  }, [weeks]);

  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={scroller}
        className="overflow-x-auto pb-1"
        role="img"
        aria-label={`${total.toLocaleString("en-US")} GitHub contributions in the last year`}
      >
        <div className="min-w-[680px]" aria-hidden>
          <div className="mb-2 grid gap-[3px] font-mono text-[10px] text-ink-400" style={columns}>
            {months.map((m, i) => (
              <span key={i} className="whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
          <div className="grid gap-[3px]" style={columns}>
            {weeks.map((week, w) => (
              <div key={w} className="grid grid-rows-7 gap-[3px]">
                {week.map((day, d) =>
                  day ? (
                    <span
                      key={d}
                      title={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${dateLabel.format(parse(day.date))}`}
                      className={`aspect-square rounded-[3px] ${LEVEL_CLASS[day.level]}`}
                    />
                  ) : (
                    <span key={d} />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink-400">
        <span>
          <span className="text-ink-50">{total.toLocaleString("en-US")}</span> contributions in the
          last year
        </span>
        <span className="flex items-center gap-1.5" aria-hidden>
          less
          {LEVEL_CLASS.map((c) => (
            <span key={c} className={`size-2.5 rounded-[2px] ${c}`} />
          ))}
          more
        </span>
      </figcaption>
    </figure>
  );
}

export function GraphSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-label="Loading contributions">
      <div className="h-[118px] animate-pulse rounded-lg bg-ink-800/60 sm:h-[128px] lg:h-[150px]" />
      <div className="h-4 w-56 animate-pulse rounded bg-ink-800/60" />
    </div>
  );
}
