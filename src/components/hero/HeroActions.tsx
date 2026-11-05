import { ArrowRight } from "lucide-react";
import { ResumeLink } from "../ui/ResumeLink";

type HeroActionsProps = {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export function HeroActions({ primary, secondary }: HeroActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={primary.href}
        className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink-50 px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-ink-200 light:bg-accent light:text-white light:shadow-lg light:shadow-emerald-600/25 light:hover:bg-emerald-700"
      >
        {primary.label}
        <ArrowRight
          size={16}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
      <a
        href={secondary.href}
        className="inline-flex h-11 items-center rounded-full border border-ink-800 px-5 text-sm font-medium text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50"
      >
        {secondary.label}
      </a>
      <ResumeLink />
    </div>
  );
}
