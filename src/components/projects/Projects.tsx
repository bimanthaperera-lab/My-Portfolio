import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { sectionIndex } from "../../data/navigation";
import { projects } from "../../data/projects";
import { SectionHeading } from "../ui/SectionHeading";
import { CaseStudyDialog } from "./CaseStudyDialog";
import { ProjectCard } from "./ProjectCard";

/** Case studies get a shareable link like /#projects/nexcv. */
const HASH_PREFIX = "#projects/";

const slugFromHash = () =>
  window.location.hash.startsWith(HASH_PREFIX)
    ? window.location.hash.slice(HASH_PREFIX.length)
    : null;

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openIndex = projects.findIndex((p) => p.slug === openSlug && p.caseStudy);
  const open = openIndex >= 0 ? projects[openIndex] : null;

  // Open from a shared link, and follow back/forward between hashes.
  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const show = useCallback((slug: string) => {
    history.replaceState(null, "", `${HASH_PREFIX}${slug}`);
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", "#projects");
    setOpenSlug(null);
  }, []);

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
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            onOpenCaseStudy={project.caseStudy ? () => show(project.slug) : undefined}
          />
        ))}
      </motion.div>

      <CaseStudyDialog
        project={open}
        index={Math.max(openIndex, 0)}
        onClose={close}
      />
    </section>
  );
}
