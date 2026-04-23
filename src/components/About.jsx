import { IconCode, IconFolder, IconUser } from './Icons'

function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">About</p>
      <h2 className="mb-10 text-3xl font-semibold text-white md:text-4xl">Who I am</h2>

      <div className="relative group mx-auto w-full">
        {/* Animated Snake Border Layers */}
        <div className="snake-border-glow" />
        <div className="snake-border-mask" />

        <div className="relative z-10 grid items-center gap-8 rounded-3xl border border-white/10 bg-[#070b14]/80 p-6 shadow-[0_14px_30px_rgba(3,8,20,0.28)] backdrop-blur-2xl transition-colors duration-500 group-hover:border-transparent md:grid-cols-[240px_1fr] md:p-10">

          {/* Subtle inner ambient glow on hover */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sky-500/10 blur-[60px] transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[60px] transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

          {/* Left Avatar / Graphic */}
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-8 md:min-h-[260px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.25)] transition-transform duration-500 group-hover:scale-110">
              <IconUser className="h-10 w-10" />
            </div>
            <p className="mt-5 text-center text-sm font-semibold tracking-[0.2em] text-sky-200">
              BIMANTHA
            </p>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-300 md:text-[1.1rem]">
              I am a Software Engineering student who enjoys building modern, user-focused web
              applications. My goal is to combine clean interface design with practical engineering
              so products are both beautiful and useful.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-sky-300">
                  <IconUser className="h-4 w-4" />
                  Profile
                </span>
                <p className="text-sm text-slate-400">Based in Sri Lanka</p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-300">
                  <IconCode className="h-4 w-4" />
                  Focus
                </span>
                <p className="text-sm text-slate-400">Full-stack Web Dev</p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-300">
                  <IconFolder className="h-4 w-4" />
                  Goal
                </span>
                <p className="text-sm text-slate-400">Real-world Products</p>
              </div>
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-6 py-2.5 text-sm font-semibold text-sky-200 transition-all hover:border-sky-400/50 hover:bg-sky-400/20"
            >
              View my recent projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
