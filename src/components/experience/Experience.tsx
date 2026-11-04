import { education, work } from "../../data/experience";
import { sectionIndex } from "../../data/navigation";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { Timeline } from "./Timeline";

function GroupLabel({ children }: { children: string }) {
  return (
    <FadeIn inView y={0}>
      <h3 className="mb-8 font-mono text-xs tracking-[0.2em] text-ink-600 uppercase">{children}</h3>
    </FadeIn>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        {/* Heading stays in view on large screens while the timeline scrolls. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="experience-heading"
            index={sectionIndex("experience")}
            label="experience"
            title="Where I've worked"
            description="Alongside my studies and side projects, I work in IT support, where I see first-hand how software is used in daily business operations."
          />
        </div>

        <div className="flex flex-col gap-20">
          <div>
            <GroupLabel>Work</GroupLabel>
            <Timeline entries={work} />
          </div>
          <div>
            <GroupLabel>Education</GroupLabel>
            <Timeline entries={education} detailed={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
