import { motion } from "motion/react";
import { EASE_OUT } from "../../lib/motion";

type AvatarProps = {
  /** Transparent cut-out image whose circle centre sits at the collar line. */
  src: string;
  alt: string;
  /** Shows a small green dot, e.g. when open to work. */
  online?: boolean;
  delay?: number;
};

/**
 * "Pop-out" avatar: the figure is clipped by the circle below its centre,
 * but the head rises above the circle's top edge.
 *
 * How it works: the frame is taller than it is wide (same ratio as the
 * image). The circle fills the bottom square. The image layer has a fully
 * rounded bottom, so anything below the circle's centre is cut to the
 * circle, while the area above it is open.
 */
export function Avatar({ src, alt, online = false, delay = 0 }: AvatarProps) {
  return (
    <span className="group relative inline-block aspect-[360/476] w-24 shrink-0 sm:w-28 lg:w-36">
      {/* Circle */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-linear-to-b from-ink-800 to-ink-900 ring-1 ring-ink-600/50 transition-[box-shadow] duration-500 group-hover:ring-accent/40 light:from-emerald-100 light:to-sky-100 light:ring-emerald-200"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-[radial-gradient(circle_at_50%_85%,var(--color-accent-dim),transparent_65%)]"
      />

      {/* Figure, rising out of the circle on load */}
      <span className="absolute inset-0 overflow-hidden rounded-b-full">
        <motion.img
          src={src}
          alt={alt}
          width={360}
          height={476}
          decoding="async"
          className="absolute inset-0 size-full object-contain transition-[translate] duration-500 ease-out group-hover:-translate-y-1.5"
          initial={{ y: "22%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay, duration: 0.9, ease: EASE_OUT }}
        />
      </span>

      {online && (
        <span
          aria-hidden
          className="absolute right-[9%] bottom-[7%] size-4 rounded-full bg-accent ring-4 ring-ink-950"
        />
      )}
    </span>
  );
}
