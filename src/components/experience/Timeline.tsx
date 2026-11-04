import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "motion/react";
import type { TimelineEntry } from "../../data/experience";
import { DURATION, EASE_OUT } from "../../lib/motion";

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

type TimelineProps = {
  entries: readonly TimelineEntry[];
  /** Larger titles and bullet points; use false for compact lists like education. */
  detailed?: boolean;
};

/**
 * Vertical timeline. The accent line fills in as the list scrolls past,
 * and each entry fades up when it enters the viewport.
 */
export function Timeline({ entries, detailed = true }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative flex flex-col gap-12 pl-8">
      {/* Track + progress fill */}
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-ink-800" />
      <motion.span
        aria-hidden
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent/70"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {entries.map((entry) => {
        const current = entry.end === null;
        return (
          <motion.li
            key={`${entry.title}-${entry.start}`}
            className="relative"
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Dot on the line */}
            <span aria-hidden className="absolute top-1.5 -left-8 flex size-[11px]">
              {current && (
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50 motion-reduce:animate-none" />
              )}
              <span
                className={`relative size-[11px] rounded-full border ${
                  current ? "border-accent bg-accent" : "border-ink-600 bg-ink-950"
                }`}
              />
            </span>

            <p className="font-mono text-xs text-ink-400">
              {entry.start} — {current ? <span className="text-accent">Present</span> : entry.end}
              {entry.location && (
                <>
                  <span className="text-ink-600"> · </span>
                  {entry.location}
                </>
              )}
            </p>

            <h4
              className={`mt-2 font-semibold tracking-tight text-ink-50 ${
                detailed ? "text-xl sm:text-2xl" : "text-lg"
              }`}
            >
              {entry.title}
            </h4>
            <p className="mt-1 text-ink-200">{entry.org}</p>

            {detailed && entry.points.length > 0 && (
              <ul className="mt-4 flex max-w-2xl flex-col gap-2 text-[15px] leading-relaxed text-ink-400">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-600" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
