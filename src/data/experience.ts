/**
 * Work history and education, newest first.
 * `end: null` means the role is current.
 */

export type TimelineEntry = {
  title: string;
  org: string;
  location?: string;
  start: string;
  end: string | null;
  points: readonly string[];
};

export const work: readonly TimelineEntry[] = [
  {
    title: "IT Support Assistant",
    org: "Alpha Trading",
    location: "Colombo",
    start: "May 2025",
    end: null,
    points: [
      "Troubleshoot software, hardware and networking issues that affect day-to-day business operations.",
      "Prepare invoices, quotations and proforma invoices, and verify delivery orders, GRNs and import documents with logistics and warehouse teams.",
      "Handle client billing inquiries and resolve invoice discrepancies.",
    ],
  },
  {
    title: "Transport Assistant",
    org: "SITREK Group",
    location: "Colombo",
    start: "Sep 2024",
    end: "Apr 2025",
    points: [
      "Managed driver payments and supported daily transport operations using Excel and a Transport Management System (TMS).",
      "Coordinated communication between drivers, management and clients.",
    ],
  },
];

export const education: readonly TimelineEntry[] = [
  {
    title: "Higher National Diploma in Software Engineering",
    org: "ICBT Campus",
    start: "2024",
    end: null,
    points: [],
  },
  {
    title: "GCE Advanced Level — Biology, Physics, Chemistry",
    org: "St. Benedict's College, Colombo 13",
    start: "2020",
    end: "2022",
    points: [],
  },
];
