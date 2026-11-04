import { ArrowUp } from "lucide-react";
import { profile } from "../../data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 font-mono text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {year} {profile.firstName} {profile.lastName}
        </p>
        <p className="text-ink-600">Built with React, TypeScript, Tailwind & Motion</p>
        <a
          href="#home"
          className="group inline-flex w-fit items-center gap-1.5 transition-colors hover:text-ink-50"
        >
          back to top
          <ArrowUp
            size={13}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
