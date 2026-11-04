import { useEffect, useMemo, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";

type TypewriterOptions = {
  /** Seconds before typing starts. */
  delay?: number;
  /** Seconds per character. */
  charDuration?: number;
  /** Seconds to rest at the end of each line, like a typist hitting Enter. */
  linePause?: number;
};

/**
 * Builds Motion keyframes for a character counter: it climbs through each
 * line at a steady pace, then holds for `linePause` before the next line.
 */
function buildTimeline(lineLengths: readonly number[], charDuration: number, linePause: number) {
  const values = [0];
  const times = [0];
  let elapsed = 0;
  let total = 0;

  for (const length of lineLengths) {
    total += length;
    elapsed += length * charDuration;
    values.push(total);
    times.push(elapsed);

    elapsed += linePause;
    values.push(total);
    times.push(elapsed);
  }

  return {
    values,
    times: times.map((t) => t / elapsed), // Motion wants 0–1 offsets
    duration: elapsed,
    total,
  };
}

/**
 * Animates "how many characters are typed" from 0 to the total, line by line,
 * using a Motion value. Returns the current count and whether typing is done.
 * With reduced motion, everything is shown immediately.
 */
export function useTypewriter(
  lineLengths: readonly number[],
  { delay = 0, charDuration = 0.028, linePause = 0.16 }: TypewriterOptions = {},
) {
  const reduceMotion = useReducedMotion();
  // Callers usually pass a fresh array each render; key on its contents instead.
  const key = lineLengths.join(",");
  const timeline = useMemo(
    () => buildTimeline(key ? key.split(",").map(Number) : [], charDuration, linePause),
    [key, charDuration, linePause],
  );

  const count = useMotionValue(0);
  const [typed, setTyped] = useState(0);
  useMotionValueEvent(count, "change", (v) => setTyped(Math.floor(v)));

  useEffect(() => {
    if (reduceMotion) {
      setTyped(timeline.total);
      return;
    }
    count.set(0);
    const controls = animate(count, timeline.values, {
      duration: timeline.duration,
      times: timeline.times,
      ease: "linear",
      delay,
    });
    return () => controls.stop();
  }, [count, timeline, delay, reduceMotion]);

  return { typed, done: typed >= timeline.total };
}
