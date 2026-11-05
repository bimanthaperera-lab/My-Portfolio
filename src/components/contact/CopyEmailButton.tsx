import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

/** Modern Clipboard API first, then the legacy textarea trick. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

/** Icon-only button that copies the email, with a brief "copied" tag. */
export function CopyEmailButton({ email, className = "relative" }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    if (await copyText(email)) {
      setCopied(true);
    } else {
      // Both clipboard paths were blocked: open the mail app instead.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email"}
      // className must include a position (relative/absolute) for the "copied" tag
      className={`flex size-9 items-center justify-center rounded-full border border-ink-800 text-ink-400 transition-colors hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50 ${className}`}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={copied ? "check" : "copy"}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
        </motion.span>
      </AnimatePresence>

      {/* Little "copied" tag that pops up above the icon */}
      <AnimatePresence>
        {copied && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-ink-800 bg-ink-900 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-accent"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            copied
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
