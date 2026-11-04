import { heroSnippet, profile } from "../../data/profile";
import { HERO_TIMELINE as T } from "../../lib/motion";
import { FadeIn } from "../ui/FadeIn";
import { RevealText } from "../ui/RevealText";
import { Avatar } from "./Avatar";
import { CodeCard } from "./CodeCard";
import { HeroActions } from "./HeroActions";
import { HeroBackground } from "./HeroBackground";
import { ScrollHint } from "./ScrollHint";
import { SocialLinks } from "./SocialLinks";
import { StatusBadge } from "./StatusBadge";

export function Hero() {
  const { firstName, lastName, role, summary, availability, location } = profile;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:py-32">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          <FadeIn delay={T.badge}>
            <StatusBadge
              available={availability.open}
              label={availability.label}
              location={location}
            />
          </FadeIn>

          <div className="flex flex-col gap-5">
            {/* Avatar on the left, prompt + name on the right */}
            <div className="flex items-end gap-4 sm:gap-6">
              <Avatar
                src={profile.avatar}
                alt={`${firstName} ${lastName}`}
                online={availability.open}
                delay={T.prompt + 0.15}
              />

              <div className="flex min-w-0 flex-col gap-3 pb-1">
                <FadeIn delay={T.prompt} y={0}>
                  <p className="font-mono text-sm text-ink-400">
                    <span className="text-accent">~</span>
                    <span className="text-ink-600"> $ </span>
                    whoami
                  </p>
                </FadeIn>

                <h1
                  id="hero-heading"
                  className="text-[2.5rem] leading-[0.95] font-semibold tracking-[-0.04em] text-ink-50 sm:text-6xl lg:text-7xl"
                >
                  <RevealText text={firstName} split="chars" delay={T.name} className="block" />
                  <RevealText
                    text={lastName}
                    split="chars"
                    delay={T.name + firstName.length * 0.025}
                    className="block"
                  />
                </h1>
              </div>
            </div>

            <RevealText
              as="p"
              text={role}
              delay={T.role}
              className="text-2xl leading-tight font-normal tracking-tight text-ink-400 sm:text-3xl"
            />
          </div>

          <FadeIn delay={T.summary}>
            <p className="max-w-xl text-base leading-relaxed text-ink-400 sm:text-lg">
              {summary}
            </p>
          </FadeIn>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <FadeIn delay={T.actions}>
              <HeroActions
                primary={{ label: "View my work", href: "#projects" }}
                secondary={{ label: "Get in touch", href: `mailto:${profile.email}` }}
              />
            </FadeIn>
            <FadeIn delay={T.socials}>
              <SocialLinks
                github={profile.socials.github}
                linkedin={profile.socials.linkedin}
                email={profile.email}
              />
            </FadeIn>
          </div>
        </div>

        {/* Right: code card (hidden on small phones to keep focus on the copy) */}
        <CodeCard
          filename="engineer.ts"
          lines={heroSnippet}
          delay={T.codeCard}
          className="hidden sm:block"
        />
      </div>

      <ScrollHint href="#projects" delay={T.scrollHint} />
    </section>
  );
}
