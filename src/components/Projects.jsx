import { IconCode, IconFolder, IconLink } from './Icons'

const projects = [
  {
    title: 'Medicine Availability Checker',
    description:
      'Helps users find nearby pharmacies and check medicine stock quickly during urgent needs.',
    tech: 'React | Node | MongoDB',
  },
  {
    title: 'Student Task Planner',
    description:
      'Tracks assignments and deadlines with reminders so students can manage academic workload better.',
    tech: 'React | Express | Firebase',
  },
]

function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">Projects</p>
      <h2 className="mb-10 text-3xl font-semibold text-white md:text-4xl">Selected work</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="glass-card glass-card-hover group rounded-2xl transition duration-300 hover:border-sky-400/50"
          >
            <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
              <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-slate-400 transition duration-500 group-hover:scale-110 group-hover:text-sky-200">
                Project Preview
              </div>
            </div>
            <div className="space-y-3 p-6">
              <h3 className="inline-flex items-center gap-2 text-xl font-semibold text-white">
                <IconFolder className="h-5 w-5 text-sky-300" />
                {project.title}
              </h3>
              <p className="leading-relaxed text-slate-300">{project.description}</p>
              <p className="text-sm text-sky-200">Tech: {project.tech}</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-2 text-sm font-semibold text-[#04101f]"
                >
                  <IconLink className="h-4 w-4" />
                  Live Demo
                </a>
                <a
                  href="#"
                  className="glass-card-soft inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-100"
                >
                  <IconCode className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="glass-card mt-10 rounded-2xl p-6">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-sky-300">Featured Project</p>
        <h3 className="text-2xl font-semibold text-white">Medicine Availability Checker</h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-slate-200">
          A practical platform that connects users to real-time medicine inventory information,
          reducing delay during emergencies and improving healthcare accessibility.
        </p>
      </div>
    </section>
  )
}

export default Projects
