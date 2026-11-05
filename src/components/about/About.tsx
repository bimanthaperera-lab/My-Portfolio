import { motion } from "motion/react";
import { about } from "../../data/about";
import { sectionIndex } from "../../data/navigation";
import { DURATION, EASE_OUT } from "../../lib/motion";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="about-heading"
            index={sectionIndex("about")}
            label="about"
            title={about.title}
          />
          <FadeIn inView delay={0.2} className="flex max-w-2xl flex-col gap-5">
            {about.story.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink-400 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </FadeIn>
        </div>

        {/* Quick facts, styled like a terminal readout */}
        <FadeIn inView delay={0.3} className="lg:self-end">
          <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 light:bg-ink-900 light:shadow-card">
            <p className="border-b border-ink-800 px-5 py-3 font-mono text-xs text-ink-400">
              <span className="text-accent">~</span>
              <span className="text-ink-600"> $ </span>
              cat about.txt
            </p>
            <dl className="flex flex-col gap-3 p-5 font-mono text-sm">
              {about.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3">
                  <dt className="text-ink-600">{fact.label}</dt>
                  <dd className="text-ink-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>

      <div className="mt-16">
        <FadeIn inView y={0}>
          <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-ink-600 uppercase">
            How I work
          </h3>
        </FadeIn>
        <motion.ul
          className="grid gap-4 md:grid-cols-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {about.principles.map((p, i) => (
            <motion.li
              key={p.title}
              variants={item}
              className="flex flex-col gap-3 rounded-2xl border border-ink-800 bg-ink-900/40 p-6 light:bg-ink-900 light:shadow-card"
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="text-lg font-medium tracking-tight text-ink-50">{p.title}</h4>
              <p className="text-sm leading-relaxed text-ink-400">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
