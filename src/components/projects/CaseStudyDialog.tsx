import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import type { CaseStudy, CaseStudyPoint, Project } from "../../data/projects";
import { DURATION, EASE_OUT } from "../../lib/motion";
import { GitHubIcon } from "../icons/BrandIcons";
import { ProjectMedia } from "./ProjectMedia";
import { StatusPill } from "./StatusPill";

type CaseStudyDialogProps = {
  /** The project to show, or null when closed. Must have a case study. */
  project: Project | null;
  index: number;
  onClose: () => void;
};

/**
 * Full write-up for a project, shown in a native modal <dialog> so focus is
 * trapped, the page behind is inert and Escape works for free. The dialog
 * stays open until the exit animation finishes, then closes for real.
 */
export function CaseStudyDialog({ project, index, onClose }: CaseStudyDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !project) return;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
  }, [project]);

  const finishClose = () => {
    ref.current?.close();
    document.documentElement.style.overflow = "";
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="case-study-title"
      // Escape: run our exit animation instead of closing instantly.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-ink-200 backdrop:bg-transparent"
    >
      <AnimatePresence onExitComplete={finishClose}>
        {project?.caseStudy && (
          <motion.div
            key={project.slug}
            className="relative min-h-full px-4 py-6 sm:px-6 sm:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop: clicking it closes */}
            <div
              aria-hidden
              onClick={onClose}
              className="fixed inset-0 bg-ink-950/85 light:bg-ink-50/45"
            />

            <motion.article
              // overflow-clip (not hidden) so the sticky header sticks to the dialog's scroll
              className="relative mx-auto max-w-3xl overflow-clip rounded-2xl border border-ink-800 bg-ink-950 shadow-2xl shadow-black/60 light:bg-ink-900 light:shadow-black/15"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // Leave faster than we arrive, so closing feels instant.
              exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
            >
              <Content project={project} caseStudy={project.caseStudy} index={index} onClose={onClose} />
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function Content({
  project,
  caseStudy: cs,
  index,
  onClose,
}: {
  project: Project;
  caseStudy: CaseStudy;
  index: number;
  onClose: () => void;
}) {
  const { name, tagline, role, status, started, stack, links, media, highlights } = project;

  return (
    <>
      {/* Sticky bar so the close button is always reachable */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink-800 bg-ink-950/85 px-5 py-3 backdrop-blur-xl light:bg-ink-900/85 sm:px-8">
        <p className="font-mono text-xs text-ink-400">
          <span className="text-accent">case-study</span>
          <span className="text-ink-600"> / </span>
          {String(index + 1).padStart(2, "0")}-{project.slug}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close case study"
          className="-mr-2 flex size-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-900 hover:text-ink-50 light:hover:bg-ink-950"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-12 px-5 py-8 sm:px-8 sm:py-10">
        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-400">
            <StatusPill status={status} />
            <span>
              {role} <span className="text-ink-600">·</span>{" "}
              <span className="whitespace-nowrap">since {started}</span>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h2
              id="case-study-title"
              className="text-3xl font-semibold tracking-tight text-ink-50 sm:text-5xl"
            >
              {name}
            </h2>
            <p className="text-lg text-ink-200">{tagline}</p>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-ink-400 sm:text-lg">
            {cs.summary}
          </p>
          <StackList stack={stack} />
        </header>

        {media && (
          <div className="group">
            <ProjectMedia media={media} />
          </div>
        )}

        <Section title="The problem">
          <p className="leading-relaxed text-ink-200">{cs.problem}</p>
        </Section>

        {highlights.length > 0 && (
          <Section title="Key features">
            <ul className="grid gap-x-6 gap-y-3 text-ink-200 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span className="font-mono text-accent" aria-hidden>
                    →
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {cs.goals && cs.goals.length > 0 && (
          <Section title="Goals">
            <ul className="flex flex-col gap-3 text-ink-200">
              {cs.goals.map((g) => (
                <li key={g} className="flex gap-3 leading-relaxed">
                  <span className="font-mono text-accent" aria-hidden>
                    →
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {cs.decisions && cs.decisions.length > 0 && (
          <Section title="Key decisions">
            <PointGrid points={cs.decisions} />
          </Section>
        )}

        {cs.flow && cs.flow.steps.length > 0 && (
          <Section title={cs.flow.title}>
            <ol className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
              {cs.flow.steps.map((step, i) => (
                <li
                  key={step.label}
                  className="relative flex gap-4 rounded-xl border border-ink-800 bg-ink-900/50 p-4 sm:flex-col sm:gap-2 light:bg-ink-950"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-ink-50">{step.label}</span>
                    <span className="text-sm leading-snug text-ink-400">{step.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {cs.challenges && cs.challenges.length > 0 && (
          <Section title="Challenges">
            <PointGrid points={cs.challenges} />
          </Section>
        )}

        {cs.learned && cs.learned.length > 0 && (
          <Section title="What I learned">
            <BulletList items={cs.learned} />
          </Section>
        )}

        {cs.next && cs.next.length > 0 && (
          <Section title="What's next">
            <BulletList items={cs.next} />
          </Section>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 border-t border-ink-800 pt-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex h-11 items-center gap-2 rounded-full border border-ink-800 px-5 text-sm font-medium text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50 light:hover:bg-ink-950"
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
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h3 className="font-mono text-sm text-ink-400">
        <span className="text-accent">//</span> {title}
      </h3>
      {children}
    </section>
  );
}

function PointGrid({ points }: { points: readonly CaseStudyPoint[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {points.map((p) => (
        <div
          key={p.title}
          className="flex flex-col gap-2 rounded-xl border border-ink-800 bg-ink-900/50 p-5 light:bg-ink-950"
        >
          <h4 className="font-medium text-ink-50">{p.title}</h4>
          <p className="text-sm leading-relaxed text-ink-400">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-ink-200">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span className="font-mono text-ink-600" aria-hidden>
            -
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function StackList({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-ink-800 bg-ink-900/60 px-2 py-1 font-mono text-[11px] text-ink-400 light:bg-ink-950"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
