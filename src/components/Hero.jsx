import { useEffect, useState } from 'react'

const roles = ['Software Engineering Student', 'Web Developer', 'Problem Solver']

function Hero() {
  const [displayRole, setDisplayRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentRole.slice(0, displayRole.length + 1)
          setDisplayRole(nextText)
          if (nextText === currentRole) {
            setIsDeleting(true)
          }
        } else {
          const nextText = currentRole.slice(0, displayRole.length - 1)
          setDisplayRole(nextText)
          if (!nextText) {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 90,
    )

    return () => clearTimeout(timeout)
  }, [displayRole, isDeleting, roleIndex])

  return (
    <section id="home" className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-28 md:grid-cols-2 md:px-6">
      <div className="space-y-7">
        <p className="float-soft inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1 text-sm text-sky-200">
          Software Engineering Portfolio
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
          Bimantha Perera
        </h1>
        <p className="h-8 text-lg text-slate-300">
          {displayRole}
          <span className="ml-1 animate-pulse text-sky-300">|</span>
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-slate-300">
          I design and build polished web applications focused on real-world impact, performance,
          and clean user experience.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="btn-glow rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-6 py-3 text-center font-semibold text-[#04101f]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="glass-card-soft rounded-xl px-6 py-3 text-center font-semibold text-white hover:border-sky-300/40 hover:bg-sky-400/10"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md group">
        <div className="float-soft absolute -left-12 top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="float-soft-delay absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Animated Border Layers */}
        <div className="profile-border-glow blur-glow" />
        <div className="profile-border-glow" />

        {/* Profile Card */}
        <div className="relative z-10 rounded-3xl border border-white/10 bg-[#070b14]/80 p-8 shadow-[0_14px_30px_rgba(3,8,20,0.28)] backdrop-blur-2xl">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Profile Card</span>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              Open to Work
            </span>
          </div>
          <div className="flex h-32 items-center justify-center rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.02] text-4xl font-semibold text-sky-200 backdrop-blur-[18px]">
            BP
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-3 backdrop-blur-[18px]">
              <p className="text-slate-400">Focus</p>
              <p className="mt-1 text-slate-200">Full-stack Apps</p>
            </div>
            <div className="rounded-xl border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-3 backdrop-blur-[18px]">
              <p className="text-slate-400">Location</p>
              <p className="mt-1 text-slate-200">Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

