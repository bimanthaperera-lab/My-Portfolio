import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE_OUT } from "../../lib/motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  /** Distance in px to travel upward while fading in. */
  y?: number;
  /** Start when scrolled into view instead of on page load. */
  inView?: boolean;
  className?: string;
};

/** Small, reusable fade-and-rise entrance. */
export function FadeIn({ children, delay = 0, y = 12, inView = false, className }: FadeInProps) {
  const shown = { opacity: 1, y: 0 };
  const trigger = inView
    ? { whileInView: shown, viewport: { once: true, amount: 0.3 } }
    : { animate: shown };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ delay, duration: DURATION.base, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
