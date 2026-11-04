import { motion, type Variants } from "motion/react";
import type { SkillGroup } from "../../data/skills";
import { DURATION, EASE_OUT } from "../../lib/motion";
import { SkillChip } from "./SkillChip";

export const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

type SkillCardProps = {
  group: SkillGroup;
  usedInProjects: ReadonlySet<string>;
};

export function SkillCard({ group, usedInProjects }: SkillCardProps) {
  return (
    <motion.li
      variants={skillCardVariants}
      className="flex flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-900/40 p-6 transition-colors duration-300 hover:border-ink-600 light:bg-ink-900 light:shadow-card"
    >
      <h3 className="font-mono text-xs text-ink-400">
        <span className="text-ink-600">// </span>
        {group.label}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillChip key={skill} name={skill} highlighted={usedInProjects.has(skill)} />
        ))}
      </ul>
    </motion.li>
  );
}
