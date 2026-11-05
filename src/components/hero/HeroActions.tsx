import { ArrowRight } from "lucide-react";
import { ResumeLink } from "../ui/ResumeLink";

type HeroActionsProps = {
  primary: { label: string; href: string };
};

export function HeroActions({ primary }: HeroActionsProps) {
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
      <ResumeLink />
    </div>
  );
}
