import { motion } from "motion/react";
import type { NavItem } from "../../data/navigation";

type NavLinksProps = {
  items: readonly NavItem[];
  active: string | null;
};

/** Desktop links. The pill behind the active link glides between items. */
export function NavLinks({ items, active }: NavLinksProps) {
  return (
    <ul className="flex items-center gap-1">
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`relative isolate block rounded-full px-3.5 py-1.5 whitespace-nowrap font-mono text-xs transition-colors ${
                isActive ? "text-ink-50" : "text-ink-400 hover:text-ink-50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink-800/80 light:bg-accent/12"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="text-accent">{String(i + 1).padStart(2, "0")}.</span> {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
