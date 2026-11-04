import { FadeIn } from "./FadeIn";
import { RevealText } from "./RevealText";

type SectionHeadingProps = {
  /** Shown as a mono label, e.g. "01". */
  index: string;
  /** Mono label next to the index, e.g. "projects". */
  label: string;
  title: string;
  description?: string;
  /** id for the <h2>, so the section can use aria-labelledby. */
  id: string;
};

/** Shared heading for every section after the hero. */
export function SectionHeading({ index, label, title, description, id }: SectionHeadingProps) {
  return (
    <header className="flex flex-col gap-4">
      <FadeIn inView y={0}>
        <p className="flex items-center gap-3 font-mono text-xs text-ink-400">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-ink-800" aria-hidden />
          {label}
        </p>
      </FadeIn>
      <RevealText
        as="h2"
        id={id}
        text={title}
        inView
        className="text-3xl font-semibold tracking-[-0.03em] text-ink-50 sm:text-5xl"
      />
      {description && (
        <FadeIn inView delay={0.2}>
          <p className="max-w-xl text-base leading-relaxed text-ink-400">{description}</p>
        </FadeIn>
      )}
    </header>
  );
}
