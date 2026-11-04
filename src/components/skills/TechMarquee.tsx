import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";

/**
 * Brand colour per theme. Logos too dark for the dark page (Express, GitHub)
 * or too pale for the light page (JavaScript yellow) use the text colour
 * instead, which is near-white in dark mode and near-black in light mode.
 */
function brandColors(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const text = "var(--color-ink-50)";
  return {
    "--brand": luminance < 0.2 ? text : `#${hex}`,
    "--brand-light": luminance > 0.75 ? text : `#${hex}`,
  } as CSSProperties;
}

function Row({ items, duplicate = false }: { items: readonly SimpleIcon[]; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : "Tech stack"}
      className={`flex shrink-0 items-center gap-10 pr-10 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 ${
        duplicate ? "motion-reduce:hidden" : ""
      }`}
    >
      {items.map((icon) => (
        <li
          key={icon.slug}
          className="group/icon flex items-center gap-2.5 text-ink-200 transition-colors duration-200 hover:text-ink-50"
          style={brandColors(icon.hex)}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-6 fill-(--brand) transition-transform light:fill-(--brand-light) duration-200 group-hover/icon:scale-115"
          >
            <path d={icon.path} />
          </svg>
          <span className="font-mono text-sm whitespace-nowrap">{icon.title}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Endless horizontal strip of logos. The list is rendered twice and the
 * track slides by exactly half its width, so the loop has no visible seam.
 * Hovering pauses it; with reduced motion it becomes a static, wrapped list.
 */
export function TechMarquee({ items }: { items: readonly SimpleIcon[] }) {
  return (
    <div className="group/marquee relative overflow-hidden border-y border-ink-800 py-7 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
        <Row items={items} />
        <Row items={items} duplicate />
      </div>
    </div>
  );
}
