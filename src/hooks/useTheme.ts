import { useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { applyTheme, currentTheme, switchThemeFrom, type Theme } from "../lib/theme";

/**
 * Current theme plus a click handler that toggles it, revealing the new
 * theme as a circle spreading out from the clicked element.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  function toggle(e: MouseEvent<HTMLElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const rect = e.currentTarget.getBoundingClientRect();

    switchThemeFrom(rect.left + rect.width / 2, rect.top + rect.height / 2, () => {
      applyTheme(next);
      // Commit React state synchronously so the snapshot shows the new icon.
      flushSync(() => setTheme(next));
    });
  }

  return { theme, toggle };
}
