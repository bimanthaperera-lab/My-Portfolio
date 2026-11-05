import { AnimatePresence, motion } from "motion/react";
import type { NavItem } from "../../data/navigation";
import { EASE_OUT } from "../../lib/motion";

type MobileMenuProps = {
  id: string;
  open: boolean;
  items: readonly NavItem[];
  active: string | null;
  onNavigate: () => void;
};

/** Drop-down panel shown under the bar on small screens. */
export function MobileMenu({ id, open, items, active, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          className="absolute inset-x-0 top-full border-b border-ink-800 bg-ink-950 lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4 sm:px-10">
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`flex items-center gap-3 py-3 font-mono text-base transition-colors ${
                    active === item.id ? "text-ink-50" : "text-ink-400 hover:text-ink-50"
                  }`}
                >
                  <span className="text-sm text-accent">{String(i + 1).padStart(2, "0")}.</span>
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
