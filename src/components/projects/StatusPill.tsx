import type { ProjectStatus } from "../../data/projects";

const config: Record<ProjectStatus, { label: string; dot: string; text: string }> = {
  deployed: { label: "Deployed", dot: "bg-accent", text: "text-ink-200" },
  "in-development": { label: "In development", dot: "bg-amber-300 light:bg-amber-500", text: "text-ink-200" },
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const { label, dot, text } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-ink-800 px-2.5 py-1 font-mono text-[11px] ${text}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
