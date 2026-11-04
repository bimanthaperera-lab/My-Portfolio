import { projects } from "./projects";

export type SkillGroup = {
  label: string;
  skills: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "languages",
    skills: ["TypeScript", "JavaScript", "Kotlin", "Java", "Python", "PHP", "SQL"],
  },
  {
    label: "web",
    skills: ["React", "Node.js", "Express.js", "HTML", "CSS"],
  },
  {
    label: "mobile",
    skills: ["Android", "Kotlin"],
  },
  {
    label: "databases",
    skills: ["MongoDB", "MySQL", "SQL Server"],
  },
  {
    label: "ai & automation",
    skills: ["Gemini AI", "Workflow automation"],
  },
  {
    label: "tools & it support",
    skills: ["Git", "GitHub", "Windows", "Hardware & networking troubleshooting"],
  },
];

/**
 * Every technology listed in a project's stack. Skills in this set get a
 * marker, so visitors can see which skills are backed by real work.
 * Computed from projects.ts — never edit by hand.
 */
export const usedInProjects: ReadonlySet<string> = new Set(
  projects.flatMap((p) => p.stack),
);
