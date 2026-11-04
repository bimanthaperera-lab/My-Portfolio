import { motion } from "motion/react";
import { sectionIndex } from "../../data/navigation";
import { skillGroups, usedInProjects } from "../../data/skills";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { techStack } from "../../data/techStack";
import { SkillCard } from "./SkillCard";
import { TechMarquee } from "./TechMarquee";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="skills-heading"
          index={sectionIndex("skills")}
          label="skills"
          title="What I work with"
        />
        <FadeIn inView delay={0.2}>
          <p className="flex items-center gap-2 font-mono text-xs text-ink-400">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            used in my projects
          </p>
        </FadeIn>
      </div>

      <motion.ul
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {skillGroups.map((group) => (
          <SkillCard key={group.label} group={group} usedInProjects={usedInProjects} />
        ))}
      </motion.ul>

      <FadeIn inView delay={0.2} className="mt-16">
        <TechMarquee items={techStack} />
      </FadeIn>
    </section>
  );
}
