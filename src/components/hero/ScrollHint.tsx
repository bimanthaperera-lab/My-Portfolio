import { motion } from "motion/react";

type ScrollHintProps = {
  href: string;
  delay?: number;
};

export function ScrollHint({ href, delay = 0 }: ScrollHintProps) {
  return (
    <motion.a
      href={href}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-ink-400 uppercase transition-colors hover:text-ink-50 md:tall:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      scroll
      <span className="relative h-10 w-px overflow-hidden bg-ink-800">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-ink-200"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
        />
      </span>
    </motion.a>
  );
}
