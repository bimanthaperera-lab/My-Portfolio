type SkillChipProps = {
  name: string;
  /** Marks skills that appear in a project's stack. */
  highlighted?: boolean;
};

export function SkillChip({ name, highlighted = false }: SkillChipProps) {
  return (
    <li
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        highlighted
          ? "border-ink-600 bg-ink-800/50 text-ink-50 light:border-accent/30 light:bg-accent/10 light:text-emerald-900"
          : "border-ink-800 text-ink-400 hover:text-ink-200"
      }`}
    >
      {highlighted && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {name}
      {highlighted && <span className="sr-only"> (used in my projects)</span>}
    </li>
  );
}
