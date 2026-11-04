import { Fragment, type ElementType } from "react";
import { motion, type Variants } from "motion/react";
import { DURATION, EASE_OUT } from "../../lib/motion";

type RevealTextProps = {
  text: string;
  /** Element to render, e.g. "h1", "p". Defaults to "span". */
  as?: ElementType;
  /** Animate each word, or each character. */
  split?: "words" | "chars";
  /** Seconds before the first piece starts moving. */
  delay?: number;
  /** Seconds between pieces. */
  stagger?: number;
  duration?: number;
  /** Start when scrolled into view instead of on page load. */
  inView?: boolean;
  id?: string;
  className?: string;
};

/**
 * Masked text reveal: every word sits in an overflow-hidden box and its
 * contents slide up from below the baseline.
 *
 * Screen readers get the plain string once (sr-only); the split, animated
 * copy is aria-hidden so it isn't read letter by letter.
 */
export function RevealText({
  text,
  as: Tag = "span",
  split = "words",
  delay = 0,
  stagger,
  duration = DURATION.slow,
  inView = false,
  id,
  className,
}: RevealTextProps) {
  const trigger = inView
    ? { whileInView: "visible", viewport: { once: true, amount: 0.6 } }
    : { animate: "visible" };

  const step = stagger ?? (split === "chars" ? 0.025 : 0.07);

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: step } },
  };

  const piece: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: EASE_OUT },
    },
  };

  const words = text.split(" ");

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="block"
        variants={container}
        initial="hidden"
        {...trigger}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/* Vertical padding keeps descenders/ascenders from being clipped. */}
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              {split === "words" ? (
                <motion.span variants={piece} className="inline-block">
                  {word}
                </motion.span>
              ) : (
                Array.from(word).map((char, j) => (
                  <motion.span key={j} variants={piece} className="inline-block">
                    {char}
                  </motion.span>
                ))
              )}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
