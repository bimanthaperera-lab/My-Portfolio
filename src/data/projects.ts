/**
 * Projects shown in the Projects section, in display order.
 * Add a link by filling in `links` — the card only renders links that exist.
 */

import nexcvShot from "../assets/images/nexcv.webp";
import picksmartShot from "../assets/images/picksmart.webp";

export type ProjectStatus = "deployed" | "in-development";

/** Screenshot shown at the top of a card, framed as a browser or a phone. */
export type ProjectMedia = {
  kind: "browser" | "phone";
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Brand colour used for the soft glow behind the screenshot. */
  glow: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "source";
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  status: ProjectStatus;
  started: string;
  description: string;
  highlights: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
  media?: ProjectMedia;
};

export const projects: readonly Project[] = [
  {
    slug: "nexcv",
    name: "NexCV",
    tagline: "AI-powered CV builder",
    role: "Founder & Lead Developer",
    status: "deployed",
    started: "Feb 2026",
    description:
      "A web app that helps people write a professional CV with AI assistance. I took it from idea to a deployed product, building both the front end and the back end.",
    highlights: [
      "Gemini AI integration for AI-assisted CV writing",
      "Multiple professional templates with live preview",
      "PDF export",
      "Codebase managed through a dedicated GitHub organization",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Gemini AI"],
    media: {
      kind: "browser",
      src: nexcvShot,
      alt: "NexCV landing page: 'AI CV Builder that pops' beside a live CV preview",
      width: 1353,
      height: 862,
      glow: "#8b5cf6",
    },
    links: [
      { label: "Source", href: "https://github.com/Nexcv-dev/AI-CV-Builder", kind: "source" },
      // { label: "Live site", href: "https://…", kind: "live" },
    ],
  },
  {
    slug: "picksmart",
    name: "PickSmart",
    tagline: "Trip profitability for ride-hailing drivers",
    role: "Developer",
    status: "in-development",
    started: "Oct 2026",
    description:
      "An Android app for Uber and PickMe drivers in Sri Lanka. It estimates whether a trip will make or lose money, so drivers can decide before they accept the ride.",
    highlights: [
      "Core profit/loss estimate shown before a ride is accepted",
      "Built natively for Android in Kotlin",
      "Made for Uber and PickMe drivers in Sri Lanka",
    ],
    stack: ["Kotlin", "Android"],
    links: [
      { label: "Source", href: "https://github.com/bimanthaperera-lab/PickSmart", kind: "source" },
    ],
    media: {
      kind: "phone",
      src: picksmartShot,
      alt: "PickSmart home screen showing today's estimated net profit and a Check a Ride button",
      width: 600,
      height: 1336,
      glow: "#fbbf24",
    },
  },
];
