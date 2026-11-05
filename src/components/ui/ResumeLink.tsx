import { Download } from "lucide-react";
import { resume } from "../../data/resume";

type ResumeLinkProps = {
  /** "pill" = outlined button, "compact" = small navbar button. */
  variant?: "pill" | "compact";
  className?: string;
};

/** "Download CV" link. Renders nothing until a PDF is in src/assets/cv/. */
export function ResumeLink({ variant = "pill", className = "" }: ResumeLinkProps) {
  if (!resume) return null;

  const styles =
    variant === "compact"
      ? "h-9 gap-1.5 px-3.5 text-xs"
      : "h-11 gap-2 px-5 text-sm";

  return (
    <a
      href={resume.url}
      download={resume.fileName}
      className={`group inline-flex items-center rounded-full border border-ink-800 font-medium text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50 ${styles} ${className}`}
    >
      <Download
        size={variant === "compact" ? 14 : 16}
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-y-0.5"
      />
      {variant === "compact" ? "CV" : "Download CV"}
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}
