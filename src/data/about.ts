/**
 * Content for the About section. Edit freely; the component only reads this.
 * Each string in `story` becomes its own paragraph.
 */

export const about = {
  title: "How I got here",
  story: [
    "I'm a software engineer in Colombo, studying for a Higher National Diploma in Software Engineering at ICBT Campus. I didn't start in tech: I did my A/Ls in the science stream, then found my way into software engineering.",
    "Since then I've worked in transport operations and now IT support, which means I see every day how software helps, or gets in the way of, the people running a business. That shapes how I build: start from a real problem, keep it simple, and make sure the numbers are right.",
    "Outside work I build my own products end to end. NexCV, an AI-powered CV builder, is deployed. PickSmart, an Android app for ride-hailing drivers, is in development.",
  ],
  /** Short key/value lines shown in the side card. */
  facts: [
    { label: "based in", value: "Colombo, Sri Lanka" },
    { label: "studying", value: "HND Software Engineering, ICBT" },
    { label: "working", value: "IT Support, Alpha Trading" },
    { label: "shipped", value: "NexCV" },
    { label: "building", value: "PickSmart" },
  ],
  /** How I work, each backed by something in the projects. */
  principles: [
    {
      title: "Real problems first",
      body: "Each product answers one clear question: how do I write a good CV, and what will this ride really pay me?",
    },
    {
      title: "Correct, then fast",
      body: "Money maths in pure, tested code; slow jobs on queues. I'd rather ship something small that's right than something big that isn't.",
    },
    {
      title: "Write it down",
      body: "Architecture notes, runbooks and build plans live next to the code, so the next person (often future me) can pick it up.",
    },
  ],
} as const;
