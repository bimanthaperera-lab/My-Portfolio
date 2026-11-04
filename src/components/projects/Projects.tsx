import { motion } from "motion/react";
import { sectionIndex } from "../../data/navigation";
import { projects } from "../../data/projects";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-24 sm:px-10 lg:py-32"
    >
      <SectionHeading
        id="projects-heading"
        index={sectionIndex("projects")}
        label="projects"
        title="Things I've built"
        description="Products I've taken from idea to working software. One is live, the other is on its way."
      />

      <motion.div
        className="mt-14 grid gap-6 lg:grid-cols-2"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
