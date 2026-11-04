/** Shared animation tokens so every section moves with the same feel. */

/** Strong ease-out: fast start, long soft landing. Good for reveals. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

/**
 * Entrance timeline for the hero (seconds from page load).
 * Tweak here to re-pace the whole sequence.
 */
export const HERO_TIMELINE = {
  badge: 0,
  prompt: 0.1,
  name: 0.25,
  role: 0.7,
  summary: 0.9,
  actions: 1.05,
  socials: 1.15,
  codeCard: 0.5,
  scrollHint: 1.6,
} as const;
