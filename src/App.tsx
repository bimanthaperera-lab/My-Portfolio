import { MotionConfig } from "motion/react";
import { Contact } from "./components/contact";
import { Experience } from "./components/experience";
import { Skills } from "./components/skills";
import { Hero } from "./components/hero";
import { Footer, Navbar } from "./components/layout";
import { Projects } from "./components/projects";

export default function App() {
  return (
    // reducedMotion="user" turns transform animations off for people who
    // have "reduce motion" enabled in their OS settings.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
