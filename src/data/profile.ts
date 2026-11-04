/**
 * Single source of truth for personal content.
 * Edit this file to update the portfolio. Components only read from here.
 */

import avatarUrl from "../assets/images/avatar.webp";

export const profile = {
  avatar: avatarUrl,
  firstName: "Bimantha",
  lastName: "Perera",
  role: "Full-stack & Android developer",
  location: "Colombo, Sri Lanka",
  summary:
    "I took NexCV, an AI-powered CV builder, from idea to a deployed product. Right now I'm building PickSmart, an Android app that tells ride-hailing drivers whether a trip is worth taking before they accept it.",
  availability: {
    open: true,
    label: "Open to software engineering roles",
  },
  email: "bimanthaperera55@gmail.com",
  socials: {
    github: "https://github.com/bimanthaperera-lab",
    linkedin: "https://www.linkedin.com/in/bimanthaperera",
  },
} as const;

/* ---------- Code card snippet (purely decorative) ---------- */

export type TokenKind =
  | "keyword"
  | "variable"
  | "property"
  | "string"
  | "boolean"
  | "punct";

export type Token = readonly [kind: TokenKind, text: string];

export type CodeLine = {
  indent?: number;
  tokens: readonly Token[];
};

const prop = (key: string, value: Token[]): CodeLine => ({
  indent: 1,
  tokens: [["property", key], ["punct", ": "], ...value, ["punct", ","]],
});

const str = (s: string): Token => ["string", `"${s}"`];

export const heroSnippet: readonly CodeLine[] = [
  {
    tokens: [
      ["keyword", "const "],
      ["variable", "engineer"],
      ["punct", " = {"],
    ],
  },
  prop("name", [str(`${profile.firstName} ${profile.lastName}`)]),
  prop("location", [str("Colombo, LK")]),
  { indent: 1, tokens: [["property", "stack"], ["punct", ": ["]] },
  { indent: 2, tokens: [str("React"), ["punct", ", "], str("TypeScript"), ["punct", ","]] },
  { indent: 2, tokens: [str("Node.js"), ["punct", ", "], str("Kotlin"), ["punct", ","]] },
  { indent: 1, tokens: [["punct", "],"]] },
  prop("shipped", [str("NexCV")]),
  prop("building", [str("PickSmart")]),
  prop("openToWork", [["boolean", String(profile.availability.open)]]),
  { tokens: [["punct", "};"]] },
];
