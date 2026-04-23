import { useEffect, useRef, useState } from 'react'
import { IconCode, IconDatabase, IconServer, IconWrench } from './Icons'

const skillGroups = [
  {
    title: 'Frontend',
    description: 'Building interactive UIs',
    Icon: IconCode,
    accent: 'from-sky-400 to-cyan-400',
    accentBg: 'bg-sky-400',
    dotColor: 'bg-sky-400',
    items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind'],
  },
  {
    title: 'Backend',
    description: 'Server-side logic & APIs',
    Icon: IconServer,
    accent: 'from-violet-400 to-purple-400',
    accentBg: 'bg-violet-400',
    dotColor: 'bg-violet-400',
    items: ['Node.js', 'Express', 'REST APIs'],
  },
  {
    title: 'Database',
    description: 'Data storage & management',
    Icon: IconDatabase,
    accent: 'from-emerald-400 to-teal-400',
    accentBg: 'bg-emerald-400',
    dotColor: 'bg-emerald-400',
    items: ['MongoDB', 'MySQL', 'Firebase'],
  },
  {
    title: 'Tools',
    description: 'Development workflow',
    Icon: IconWrench,
    accent: 'from-amber-400 to-orange-400',
    accentBg: 'bg-amber-400',
    dotColor: 'bg-amber-400',
    items: ['Git', 'GitHub', 'Figma', 'Vite'],
  },
]

function Skills() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.15 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">Skills</p>
      <h2 className="mb-3 text-3xl font-semibold text-white md:text-4xl">Technology stack</h2>
      <p className="mb-10 max-w-lg text-slate-500">
        Tools and technologies I work with to bring ideas to life.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, gIdx) => (
          <div
            key={group.title}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${gIdx * 120}ms`,
            }}
          >
            {/* Top accent line */}
            <div
              className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${group.accent} opacity-50 transition-opacity group-hover:opacity-100`}
            />

            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-white/20 group-hover:bg-white/8">
                  <group.Icon className="h-5 w-5 text-slate-400 transition group-hover:text-slate-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{group.title}</h3>
                  <p className="text-xs text-slate-500">{group.description}</p>
                </div>
              </div>
              <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${group.dotColor} opacity-60`} />
                {group.items.length}
              </span>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, iIdx) => (
                <span
                  key={item}
                  className="cursor-default rounded-lg border border-white/6 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(8px)',
                    transition: `all 0.4s ease ${gIdx * 120 + iIdx * 60 + 200}ms`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Corner glow on hover */}
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${group.accentBg} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.08]`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
