import { IconDownload } from './Icons'

function Resume() {
  return (
    <section id="resume" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <div className="glass-card rounded-3xl p-8 text-center md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">Resume</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Download My Resume</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Explore my technical skills, project experience, and academic journey in one page.
        </p>
        <a
          href="#"
          className="btn-glow mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-7 py-3 font-semibold text-[#04101f]"
        >
          <IconDownload className="h-4 w-4" />
          Download CV
        </a>
      </div>
    </section>
  )
}

export default Resume
