import { sectionIndex } from "../../data/navigation";
import { profile } from "../../data/profile";
import { FadeIn } from "../ui/FadeIn";
import { ResumeLink } from "../ui/ResumeLink";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactLinks } from "./ContactLinks";
import { CopyEmailButton } from "./CopyEmailButton";

export function Contact() {
  const { email, socials, availability } = profile;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contact-heading"
            index={sectionIndex("contact")}
            label="contact"
            title="Let's build something"
            description={
              availability.open
                ? "I'm open to software engineering roles and interesting projects. Email is the fastest way to reach me."
                : "Email is the fastest way to reach me."
            }
          />

          <FadeIn inView delay={0.3} className="flex flex-col gap-5">
            <a
              href={`mailto:${email}`}
              className="w-fit text-xl font-medium tracking-tight break-all text-ink-50 underline decoration-ink-600 decoration-1 underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl lg:text-4xl"
            >
              {email}
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-11 items-center rounded-full bg-ink-50 px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-ink-200 light:bg-accent light:text-white light:shadow-lg light:shadow-emerald-600/25 light:hover:bg-emerald-700"
              >
                Send an email
              </a>
              <CopyEmailButton email={email} />
              <ResumeLink />
            </div>
          </FadeIn>
        </div>

        <FadeIn inView delay={0.4}>
          <ContactLinks github={socials.github} linkedin={socials.linkedin} />
        </FadeIn>
      </div>
    </section>
  );
}
