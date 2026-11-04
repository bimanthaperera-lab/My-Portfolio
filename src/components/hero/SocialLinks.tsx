import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

type SocialLinksProps = {
  github: string;
  linkedin: string;
  email: string;
};

type LinkItem = {
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
  external: boolean;
};

export function SocialLinks({ github, linkedin, email }: SocialLinksProps) {
  const links: LinkItem[] = [
    { label: "GitHub", href: github, Icon: GitHubIcon, external: true },
    { label: "LinkedIn", href: linkedin, Icon: LinkedInIcon, external: true },
    { label: "Email", href: `mailto:${email}`, Icon: Mail, external: false },
  ];

  return (
    <ul className="flex items-center gap-1">
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external && { target: "_blank", rel: "noreferrer" })}
            className="flex size-10 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-900 hover:text-ink-50"
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
