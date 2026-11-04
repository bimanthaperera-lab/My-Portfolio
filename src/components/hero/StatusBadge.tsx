import { MapPin } from "lucide-react";

type StatusBadgeProps = {
  available: boolean;
  label: string;
  location: string;
};

export function StatusBadge({ available, label, location }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-ink-400">
      {available && (
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1.5 text-ink-200 backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {label}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <MapPin size={13} aria-hidden />
        {location}
      </span>
    </div>
  );
}
