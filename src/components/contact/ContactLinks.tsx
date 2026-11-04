import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

type ContactLinksProps = {
  github: string;
  linkedin: string;
};

type Row = {
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
};

/** Turns "https://github.com/name" into "github.com/name" for display. */
const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export function ContactLinks({ github, linkedin }: ContactLinksProps) {
  const rows: Row[] = [
    { label: "GitHub", href: github, Icon: GitHubIcon },
    { label: "LinkedIn", href: linkedin, Icon: LinkedInIcon },
  ];

  return (
    <ul className="divide-y divide-ink-800 border-y border-ink-800">
      {rows.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 py-5 transition-colors"
          >
            <span className="text-ink-400 transition-colors group-hover:text-ink-50">
              <Icon size={18} />
            </span>
            <span className="shrink-0 text-ink-50">{label}</span>
            <span className="ml-auto min-w-0 truncate font-mono text-xs text-ink-400 transition-colors group-hover:text-ink-200">
              {pretty(href)}
            </span>
            <ArrowUpRight
              size={16}
              aria-hidden
              className="shrink-0 text-ink-600 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-50"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
