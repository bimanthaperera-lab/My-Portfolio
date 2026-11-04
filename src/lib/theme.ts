export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const THEME_COLOR: Record<Theme, string> = { dark: "#0a0a0b", light: "#f7f5f0" };

/** The theme currently on <html> (set before first paint by index.html). */
export function currentTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Applies a theme to the page immediately and remembers the choice. */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

/**
 * Switches theme with a circle of the new theme growing out from (x, y),
 * usually the centre of the toggle button. Falls back to an instant switch
 * when the browser lacks View Transitions or the visitor prefers reduced
 * motion.
 *
 * `update` runs inside the transition; it must apply the theme to the DOM
 * synchronously (see useTheme, which wraps its state update in flushSync).
 */
export function switchThemeFrom(x: number, y: number, update: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("startViewTransition" in document) || reduceMotion) {
    update();
    return;
  }

  // Radius that reaches the farthest corner of the viewport from (x, y).
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  root.classList.add("theme-switching");

  const transition = document.startViewTransition(update);

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});

  transition.finished.finally(() => root.classList.remove("theme-switching"));
}
