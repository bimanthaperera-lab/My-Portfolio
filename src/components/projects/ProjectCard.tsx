import type { MouseEvent } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { DURATION, EASE_OUT } from "../../lib/motion";
import { GitHubIcon } from "../icons/BrandIcons";
import { ProjectMedia } from "./ProjectMedia";
import { StatusPill } from "./StatusPill";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

/** Moves the hover spotlight by writing the cursor position to CSS variables. */
function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

/** Technologies shown on a compact card before collapsing to "+N". */
const MAX_STACK = 5;

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Opens the case study; the button only shows when this is given. */
  onOpenCaseStudy?: () => void;
};

export function ProjectCard({ project, index, onOpenCaseStudy }: ProjectCardProps) {
  const { name, tagline, role, status, started, description, highlights, stack, links } = project;
  const headingId = `project-${project.slug}`;

  // With a case study, the card stays a short teaser: features move into the
  // case study and only the first few technologies are listed here.
  const compact = Boolean(onOpenCaseStudy);
  const shownStack = compact ? stack.slice(0, MAX_STACK) : stack;
  const hiddenStack = stack.length - shownStack.length;

  return (
    <motion.article
      variants={cardVariants}
      aria-labelledby={headingId}
      onMouseMove={trackPointer}
      className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 p-6 transition-colors duration-300 hover:border-ink-600 sm:p-8 light:bg-ink-900 light:shadow-card"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(126 231 135 / 0.06), transparent 60%)",
        }}
      />

      {project.media && <ProjectMedia media={project.media} />}

      <div className="flex items-center justify-between gap-4 font-mono text-xs text-ink-600">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <StatusPill status={status} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 id={headingId} className="text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
          {name}
        </h3>
        <p className="text-ink-200">{tagline}</p>
        <p className="font-mono text-xs text-ink-400">
          {role} <span className="text-ink-600">·</span>{" "}
          <span className="whitespace-nowrap">since {started}</span>
        </p>
      </div>

      <p className="leading-relaxed text-ink-400">{description}</p>

      {!compact && (
        <ul className="flex flex-col gap-2 text-sm text-ink-200">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="font-mono text-accent" aria-hidden>
                →
              </span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* mt-auto pins tags + links to the bottom so cards in a row line up */}
      <div className="mt-auto flex flex-col gap-6">
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {shownStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-ink-800 bg-ink-950/60 px-2 py-1 font-mono text-[11px] text-ink-400"
            >
              {tech}
            </li>
          ))}
          {hiddenStack > 0 && (
            <li className="px-1 py-1 font-mono text-[11px] text-ink-600">
              +{hiddenStack}
              <span className="sr-only"> more, listed in the case study</span>
            </li>
          )}
        </ul>

        {(links.length > 0 || onOpenCaseStudy) && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink-800 pt-5">
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={onOpenCaseStudy}
                aria-haspopup="dialog"
                aria-label={`Read the ${name} case study`}
                className="group/cs inline-flex h-9 items-center gap-2 rounded-full bg-ink-50 px-4 text-sm font-medium text-ink-950 transition-colors hover:bg-ink-200 light:bg-accent light:text-white light:hover:bg-emerald-700"
              >
                Read case study
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-200 group-hover/cs:translate-x-0.5"
                />
              </button>
            )}
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink-200 transition-colors hover:text-ink-50"
              >
                {link.kind === "source" && <GitHubIcon size={15} />}
                {link.label}
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
