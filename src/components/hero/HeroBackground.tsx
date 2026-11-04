import { motion } from "motion/react";

/**
 * Decorative layer behind the hero: a faint grid plus soft colour glows.
 * Dark mode uses one subtle green glow; light mode adds violet and sky
 * glows so the page has colour instead of plain black-on-white.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="bg-grid absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Green — both themes */}
        <div className="absolute -top-48 right-[-15%] size-[560px] rounded-full bg-accent/[0.07] blur-[120px] light:bg-emerald-300/40" />
        {/* Violet + sky — light theme only */}
        <div className="absolute -top-40 -left-40 hidden size-[520px] rounded-full bg-violet-300/35 blur-[120px] light:block" />
        <div className="absolute right-[10%] bottom-[-10%] hidden size-[420px] rounded-full bg-sky-300/30 blur-[120px] light:block" />
      </motion.div>

      {/* Fade the bottom edge into the next section. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  );
}
