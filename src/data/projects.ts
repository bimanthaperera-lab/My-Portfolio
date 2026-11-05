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
      "Check a Ride: the real profit of an offer before it's accepted",
      "Trip history, fuel log, expenses and other income",
      "Daily, weekly and monthly reports with Estimated and Cash views",
      "Fuel prices kept up to date from published CPC prices",
      "Multiple vehicles, each trip keeping the rates it was saved with",
      "CSV export, light and dark themes, works fully offline",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Room", "DataStore", "Firebase Auth"],
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
    caseStudy: {
      summary:
        "A local-first Android app that tells ride-hailing drivers what an offer will really earn, then tracks their actual profit day by day.",
      problem:
        "Uber and PickMe drivers in Sri Lanka see a fare, but not what the trip leaves them with after commission, fuel and wear on the vehicle, including the unpaid kilometres to the pickup. They have a few seconds to accept, so an offer that looks fine can lose money, and at the end of the week it's hard to tell what they really earned.",
      goals: [
        "Check an offer in three field edits or fewer, with the result visible without scrolling on a small phone",
        "Numbers that are correct to the cent and always add up",
        "Fully usable offline and without an account",
        "Never read or automate the ride apps: the driver types or confirms every number",
      ],
      decisions: [
        {
          title: "A pure, tested profit calculator",
          body: "All the maths lives in one plain Kotlin class with no Android code. It uses BigDecimal and a written rounding policy, returns typed validation errors instead of throwing (never NaN or Infinity), and is pinned down by golden tests that must pass exactly.",
        },
        {
          title: "Local-first, account optional",
          body: "Trips, vehicles and settings live on the phone in Room and DataStore, so every core screen works with no internet. Signing in with Firebase Auth (email or Google) is optional and never required to use the app.",
        },
        {
          title: "Every trip keeps its own rates",
          body: "A saved trip stores a snapshot of the fuel price, km/L and maintenance reserve it was calculated with, so changing a vehicle or a fuel price later never rewrites past profits.",
        },
        {
          title: "Offers are never income",
          body: "A checked offer is kept apart from completed trips and never counted in earnings. Reports offer an Estimated view and a Cash view, with tests proving nothing is counted twice.",
        },
        {
          title: "Fuel prices from a published file",
          body: "Instead of scraping the CPC website (which would break every installed copy when the site changes), the app reads a small JSON file of official prices, at most every 12 hours, and never overwrites a price the driver typed by hand.",
        },
        {
          title: "No reading of other apps",
          body: "No accessibility-service reading, screen capture or automated taps on Uber or PickMe. Ride apps run anti-automation checks that could flag a driver's account, Play policy restricts those APIs, and constant screen capture drains low-end phones. The driver types or confirms the numbers instead.",
        },
      ],
      flow: {
        title: "How a ride check works",
        steps: [
          { label: "Enter", detail: "Fare, pickup km, trip km and an optional return trip" },
          { label: "Rates", detail: "Fuel price, km/L and reserve pre-filled from the active vehicle" },
          { label: "Calculate", detail: "Commission, fuel and maintenance taken off the fare" },
          { label: "Result", detail: "Net profit, profit per km and a band against the target" },
          { label: "Save", detail: "Keep it as an offer, or mark it taken with its rates" },
        ],
      },
      challenges: [
        {
          title: "Money that always adds up",
          body: "Rounding each part separately can leave the breakdown a cent off the total. Net profit is computed from the already-rounded parts, so what the driver sees always adds up to the figure shown.",
        },
        {
          title: "Updates that never lose data",
          body: "The database has gone through several schema versions. Each change ships a tested Room migration, destructive migrations are banned, and an update never sends an existing driver back through setup.",
        },
        {
          title: "Small screens and large fonts",
          body: "Every screen is checked at 360 × 640 dp and 200% font size. That caught labels like \"Month\" breaking mid-word and weekday labels running together on the report chart.",
        },
      ],
      learned: [
        "Writing the rules and the golden tests before building the UI",
        "Designing a database schema to survive years of app updates",
        "Building accessible, fast screens with Jetpack Compose and Material 3",
      ],
      next: [
        "Screenshot import with on-device text recognition, always confirmed by the driver",
        "A shift notification showing the minimum fare per km worth accepting",
        "Optional cloud backup for signed-in drivers",
        "Release on Google Play",
      ],
    },
  },
];
