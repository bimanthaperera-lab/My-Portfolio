import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { DURATION, EASE_OUT } from "../../lib/motion";
import { GitHubIcon } from "../icons/BrandIcons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

const MENU_ID = "mobile-menu";
// "home" is observed too, so nothing is highlighted while the hero is on screen.
const OBSERVED = ["home", ...navItems.map((n) => n.id)];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(OBSERVED);
  const close = () => setOpen(false);

  // Close the mobile menu with Escape, or when the screen grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-ink-800 bg-ink-950/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <Logo onClick={close} />

        <div className="flex items-center gap-1 md:gap-3">
          {/* Desktop links */}
          <div className="hidden items-center gap-3 md:flex">
            <NavLinks items={navItems} active={active} />
            <span className="h-4 w-px bg-ink-800" aria-hidden />
          </div>

          {/* One toggle for every screen size, so its state never splits */}
          <ThemeToggle />

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden size-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-900 hover:text-ink-50 md:flex"
          >
            <GitHubIcon size={17} />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-10 items-center justify-center rounded-full text-ink-200 transition-colors hover:bg-ink-900 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <MobileMenu id={MENU_ID} open={open} items={navItems} active={active} onNavigate={close} />
    </motion.header>
  );
}
