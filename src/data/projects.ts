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

/** A titled paragraph inside a case study (a decision, a challenge…). */
export type CaseStudyPoint = {
  title: string;
  body: string;
};

/** One step in the "how it fits together" flow. */
export type CaseStudyStep = {
  label: string;
  detail: string;
};

/**
 * The long-form write-up opened from a project card.
 * Every list is optional: a section only renders when it has content.
 */
export type CaseStudy = {
  /** One-line hook shown under the title. */
  summary: string;
  problem: string;
  /** Who it's for / what success looks like. */
  goals?: readonly string[];
  decisions?: readonly CaseStudyPoint[];
  flow?: { title: string; steps: readonly CaseStudyStep[] };
  challenges?: readonly CaseStudyPoint[];
  learned?: readonly string[];
  next?: readonly string[];
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
  caseStudy?: CaseStudy;
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
    stack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Gemini AI", "AWS Lambda", "SQS", "S3"],
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
    caseStudy: {
      summary:
        "A full-stack CV builder where the slow, expensive work (OCR, AI parsing, PDF rendering) runs on queues instead of inside the web server.",
      problem:
        "Writing a good CV is slow, and most free builders either lock the PDF behind a paywall or produce documents that break when printed. I wanted a builder that lets anyone start writing straight away, uses AI to draft and polish the wording, can read in an existing CV, and exports a PDF that looks exactly like the preview.",
      goals: [
        "Guest-first: start editing without creating an account",
        "Live preview that matches the exported PDF",
        "AI help for summaries and wording, plus import from an existing PDF, image or LinkedIn export",
        "An admin side to manage templates, users, plans and support without redeploying",
      ],
      decisions: [
        {
          title: "Monorepo with shared contracts",
          body: "The web app, the Express API and the workers live in one pnpm + Turborepo workspace. Error codes, queue payloads and API response types sit in shared packages, so the frontend, backend and workers can't drift apart.",
        },
        {
          title: "Heavy jobs go to SQS and Lambda",
          body: "CV import (OCR + AI parsing) and PDF export can take many seconds. Instead of blocking a request, the API saves a job in MongoDB, puts its ID on an SQS queue and returns. A worker Lambda does the work and the browser polls for the result.",
        },
        {
          title: "One CV model, many templates",
          body: "CV data is normalised before rendering, so built-in templates, admin-uploaded HTML/CSS templates stored in S3, and the PDF renderer all read the same shape. Validation scripts catch missing files, unsafe markup and missing print rules before a template ships.",
        },
        {
          title: "Production hardening from the start",
          body: "Session cookies, Helmet, CORS, rate limits on auth routes, role-based admin permissions with audit logs, an admin IP allowlist and circuit breakers around Gemini and the PDF Lambda.",
        },
      ],
      flow: {
        title: "How a PDF export works",
        steps: [
          { label: "Request", detail: "Browser calls POST /api/pdf-jobs" },
          { label: "Check", detail: "API checks access, plan and quota, then saves a PdfJob" },
          { label: "Queue", detail: "Job ID is sent to an SQS queue" },
          { label: "Render", detail: "Worker Lambda renders the PDF and stores it in S3" },
          { label: "Download", detail: "Browser polls the job, then downloads the file" },
        ],
      },
      challenges: [
        {
          title: "Keeping the web server responsive",
          body: "OCR and PDF rendering can take long enough to tie up the API and hit request timeouts. Behind queues, the main app only does quick reads and writes, and a slow job can't drag the rest of the site down with it.",
        },
        {
          title: "Preview and PDF looking the same",
          body: "Templates had to render identically in the browser and in a headless renderer. A single normalised data model, an S3/local fallback for template assets and print-rule validation for every template keep the two in step.",
        },
        {
          title: "Payments for a Sri Lankan audience",
          body: "Local users pay through PayHere, so checkout, IPN verification and LKR rounding are kept in one helper, with Lemon Squeezy alongside for international payments.",
        },
      ],
      learned: [
        "Designing for failure: timeouts, retries and circuit breakers around every external service",
        "Splitting a product into an app, an API and background workers",
        "Writing docs and runbooks so the system can be operated, not just built",
      ],
      next: ["Launch checklist and QA pass", "Payment readiness", "More templates"],
    },
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
    // TODO(Bimantha): add the decisions, challenges and how-it-works steps
    // once they're settled. Empty sections are hidden automatically.
    caseStudy: {
      summary:
        "A native Android app that answers one question for ride-hailing drivers: is this trip worth taking?",
      problem:
        "Uber and PickMe drivers in Sri Lanka see a fare, but not what the trip will actually leave them with once their running costs are taken out. They have a few seconds to accept a ride, so a trip that looks fine can end up losing money.",
      goals: [
        "Show a clear profit or loss estimate before the driver accepts a ride",
        "Keep it fast and simple enough to use in the few seconds a ride request is on screen",
        "Track the day's estimated net profit at a glance",
      ],
      next: ["Finish the core estimate flow", "Test with working drivers", "Release on Google Play"],
    },
  },
];
