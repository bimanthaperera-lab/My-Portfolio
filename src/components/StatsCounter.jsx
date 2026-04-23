import { useEffect, useRef, useState } from 'react'
import { IconCode, IconFolder, IconLink, IconUser } from './Icons'

const stats = [
  {
    label: 'Projects Completed',
    value: 10,
    suffix: '+',
    Icon: IconFolder,
    accent: 'from-sky-400 to-cyan-400',
    accentBg: 'bg-sky-400',
  },
  {
    label: 'Technologies Used',
    value: 14,
    suffix: '+',
    Icon: IconCode,
    accent: 'from-violet-400 to-purple-400',
    accentBg: 'bg-violet-400',
  },
  {
    label: 'GitHub Repos',
    value: 15,
    suffix: '+',
    Icon: IconLink,
    accent: 'from-emerald-400 to-teal-400',
    accentBg: 'bg-emerald-400',
  },
  {
    label: 'Happy Clients',
    value: 5,
    suffix: '+',
    Icon: IconUser,
    accent: 'from-amber-400 to-orange-400',
    accentBg: 'bg-amber-400',
  },
]

function useCountUp(target, inView) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, target])

  return count
}

function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, inView)

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
      }}
    >
      {/* Top accent line */}
      <div
        className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${stat.accent} opacity-60 transition-opacity group-hover:opacity-100`}
      />

      {/* Icon */}
      <stat.Icon className="mb-4 h-5 w-5 text-slate-500 transition group-hover:text-slate-300" />

      {/* Number */}
      <p className="text-4xl font-bold tabular-nums text-white md:text-5xl">
        {count}
        <span className="text-slate-500">{stat.suffix}</span>
      </p>

      {/* Label */}
      <p className="mt-2 text-sm text-slate-500 transition group-hover:text-slate-400">
        {stat.label}
      </p>

      {/* Subtle corner glow on hover */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${stat.accentBg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10`}
      />
    </div>
  )
}

function StatsCounter() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <StatCard key={stat.label} stat={stat} index={idx} inView={inView} />
        ))}
      </div>
    </section>
  )
}

export default StatsCounter
