import type { ProjectMedia as Media } from "../../data/projects";

/**
 * Screenshot "stage" at the top of a project card. The device frame is
 * taller than the stage, so it peeks up from the bottom edge and lifts a
 * little when the card is hovered.
 */
export function ProjectMedia({ media }: { media: Media }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink-800 bg-ink-950">
      {/* Brand-coloured glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(70% 60% at 50% 100%, ${media.glow}55, transparent 70%)`,
        }}
      />
      {media.kind === "browser" ? <BrowserFrame media={media} /> : <PhoneFrame media={media} />}
    </div>
  );
}

function Screenshot({ media, className }: { media: Media; className?: string }) {
  return (
    <img
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading="lazy"
      decoding="async"
      className={`block h-auto w-full ${className ?? ""}`}
    />
  );
}

function BrowserFrame({ media }: { media: Media }) {
  return (
    <div className="absolute inset-x-5 top-6 overflow-hidden rounded-t-lg border border-b-0 border-ink-600/60 bg-ink-900 shadow-2xl shadow-black/60 transition-transform light:shadow-black/20 duration-500 ease-out group-hover:-translate-y-1.5 sm:inset-x-8 sm:top-8">
      <div aria-hidden className="flex h-6 items-center gap-1.5 border-b border-ink-800 px-3">
        <span className="size-2 rounded-full bg-ink-600" />
        <span className="size-2 rounded-full bg-ink-600" />
        <span className="size-2 rounded-full bg-ink-600" />
      </div>
      <Screenshot media={media} />
    </div>
  );
}

function PhoneFrame({ media }: { media: Media }) {
  return (
    <div className="absolute top-6 left-1/2 w-[42%] max-w-[240px] -translate-x-1/2 rounded-[1.9rem] bg-black p-1.5 shadow-2xl shadow-black/60 ring-1 light:shadow-black/25 ring-ink-600/60 transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:top-8">
      <Screenshot media={media} className="rounded-[1.5rem]" />
    </div>
  );
}
