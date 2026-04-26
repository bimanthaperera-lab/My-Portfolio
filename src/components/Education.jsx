import { IconCode, IconFolder } from './Icons'

const education = [
  {
    period: 'Jan 2024 – Ongoing',
    degree: 'Higher National Diploma (HND) in Software Engineering',
    institution: 'ICBT Campus',
    description:
      'Currently pursuing a Higher National Diploma in Software Engineering, building expertise in full-stack development, software design patterns, and modern web technologies.',
    highlights: ['Software Engineering', 'Full-Stack Dev', 'Ongoing'],
  },
  {
    period: 'Jan 2020 – Jan 2022',
    degree: 'GCE Advanced Level (A/L) – Biology, Physics, Chemistry',
    institution: 'St. Benedict\'s College, Colombo-13',
    description:
      'Completed Advanced Level studies in the Biological Science stream with Biology, Physics, and Chemistry.',
    highlights: ['Biology', 'Physics', 'Chemistry'],
  },
  {
    period: '',
    degree: 'GCE Ordinary Level (O/L)',
    institution: 'Christ King College, Wattala',
    description:
      'Completed Ordinary Level examination, establishing a strong academic foundation across core subjects.',
    highlights: ['O/L Completed', 'Core Subjects'],
  },
]

function IconGraduation(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  )
}

function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function Education() {
  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">Education</p>
      <h2 className="mb-10 text-3xl font-semibold text-white md:text-4xl">Academic journey</h2>

      <div className="relative space-y-6 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px before:bg-gradient-to-b before:from-sky-300/0 before:via-sky-300/50 before:to-sky-300/0 md:before:left-1/2">
        {education.map((item, index) => (
          <article
            key={item.degree}
            className={`glass-card glass-card-hover relative ml-12 rounded-2xl p-6 md:ml-0 md:w-[48%] ${
              index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
            }`}
          >
            {/* Timeline dot */}
            <span
              className={`absolute -left-[2.05rem] top-8 h-3.5 w-3.5 rounded-full border-2 border-sky-200/50 bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.8)] md:left-auto md:top-8 md:-translate-x-1/2 md:translate-y-0 ${
                index % 2 === 0 ? 'md:right-[-8.6%]' : 'md:left-[-8.6%]'
              }`}
            />

            {/* Period badge */}
            {item.period && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
                <IconCalendar className="h-3 w-3" />
                {item.period}
              </span>
            )}

            {/* Degree */}
            <h3 className="mt-2 flex items-start gap-2 text-lg font-semibold text-white">
              <IconGraduation className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-300" />
              {item.degree}
            </h3>

            {/* Institution */}
            <p className="ml-7 mt-1 flex items-center gap-1.5 text-sm text-sky-200/80">
              <IconFolder className="h-3.5 w-3.5" />
              {item.institution}
            </p>

            {/* Description */}
            <p className="ml-7 mt-3 text-sm leading-relaxed text-slate-300">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="ml-7 mt-4 flex flex-wrap gap-2">
              {item.highlights.map((tag) => (
                <span
                  key={tag}
                  className="glass-card-soft rounded-full px-3 py-1 text-xs text-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Education
