/**
 * Sections linked from the navbar, in page order.
 * `id` must match the section's id attribute. The order here also sets the
 * "01", "02"… numbers shown in the navbar and in each section heading.
 */
export const navItems = [
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
] as const;

export type NavItem = (typeof navItems)[number];
export type SectionId = NavItem["id"];

/** "01", "02"… for a section, based on its position in navItems. */
export function sectionIndex(id: SectionId) {
  return String(navItems.findIndex((n) => n.id === id) + 1).padStart(2, "0");
}
