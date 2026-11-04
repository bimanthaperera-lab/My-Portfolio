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
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
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
      className="inline-flex h-11 items-center gap-2 rounded-full border border-ink-800 px-4 font-mono text-xs text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900 hover:text-ink-50"
    >
      <span className="relative size-4">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
