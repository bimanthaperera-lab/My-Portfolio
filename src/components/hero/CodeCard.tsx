import { motion } from "motion/react";
import type { CodeLine, Token, TokenKind } from "../../data/profile";
import { useTypewriter } from "../../hooks/useTypewriter";
import { DURATION, EASE_OUT } from "../../lib/motion";

/* Dark: restrained, mostly greys. Light: a colourful editor-style theme. */
const tokenClass: Record<TokenKind, string> = {
  keyword: "text-ink-400 light:text-violet-600",
  variable: "text-ink-50 light:text-rose-600",
  property: "text-ink-200 light:text-blue-700",
  string: "text-accent",
  boolean: "text-sky-300 light:text-orange-600",
  punct: "text-ink-600",
};

const lineLength = (line: CodeLine) =>
  line.tokens.reduce((sum, [, text]) => sum + text.length, 0);

/** Renders the first `count` characters of a line, keeping each token's colour. */
function TypedTokens({ tokens, count }: { tokens: readonly Token[]; count: number }) {
  let remaining = count;
  return tokens.map(([kind, text], i) => {
    if (remaining <= 0) return null;
    const part = text.slice(0, remaining);
    remaining -= part.length;
    return (
      <span key={i} className={tokenClass[kind]}>
        {part}
      </span>
    );
  });
}

function Cursor({ blinking }: { blinking: boolean }) {
  // Solid while typing, blinks once idle — like a real editor.
  return (
    <span
      className={`-ml-px font-semibold text-accent ${
        blinking ? "animate-blink motion-reduce:animate-none" : ""
      }`}
    >
      |
    </span>
  );
}

type CodeCardProps = {
  filename: string;
  lines: readonly CodeLine[];
  delay?: number;
  className?: string;
};

/** Editor-style card that types its code out line by line. Decorative only. */
export function CodeCard({ filename, lines, delay = 0, className }: CodeCardProps) {
  const lengths = lines.map(lineLength);
  // Start typing once the card has mostly finished sliding in.
  const { typed, done } = useTypewriter(lengths, { delay: delay + 0.6 });

  // Where each line begins in the overall character count.
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));
  // The cursor's line: the last one that has begun (line 0 before anything is typed).
  const cursorLine = starts.reduce((current, start, i) => (start < typed ? i : current), 0);

  return (
    <motion.figure
      aria-hidden
      className={`overflow-hidden rounded-xl border border-ink-800 bg-ink-900/70 shadow-2xl shadow-black/40 backdrop-blur light:bg-ink-900 light:shadow-card ${className ?? ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: DURATION.slow, ease: EASE_OUT }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-ink-800 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ink-800" />
          <span className="size-2.5 rounded-full bg-ink-800" />
          <span className="size-2.5 rounded-full bg-ink-800" />
        </div>
        <span className="font-mono text-xs text-ink-400">{filename}</span>
      </div>

      {/* Code. Every line is always rendered so the card never changes size;
          lines not reached yet are kept invisible. */}
      <ol className="overflow-x-auto py-4 font-mono text-[13px] leading-6">
        {lines.map((line, i) => {
          const reached = i <= cursorLine;
          const shown = Math.min(Math.max(typed - starts[i], 0), lengths[i]);
          return (
            <li key={i} className={`flex whitespace-pre pr-6 ${reached ? "" : "invisible"}`}>
              <span className="w-10 shrink-0 select-none pr-4 text-right text-ink-600">
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${(line.indent ?? 0) * 2}ch` }}>
                {/* Unreached lines render in full (but invisible) to reserve their width. */}
                <TypedTokens tokens={line.tokens} count={reached ? shown : lengths[i]} />
                {i === cursorLine && <Cursor blinking={done} />}
              </span>
            </li>
          );
        })}
      </ol>
    </motion.figure>
  );
}
