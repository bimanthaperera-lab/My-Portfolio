import { IconCode, IconLink, IconMail } from './Icons'

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#070b14] pb-8 pt-12">
      {/* Subtle top glow */}
      <div className="absolute left-1/2 top-0 h-[1px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      <div className="absolute left-1/2 top-0 h-32 w-1/2 -translate-x-1/2 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          
          {/* Left Info */}
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2 text-xl font-bold tracking-wider text-white">
              <IconCode className="h-5 w-5 text-sky-400" />
              Bimantha
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Building polished, scalable web applications with a focus on real-world impact and clean user experience.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://github.com/bimanthaperera-lab" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <IconCode className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/bimantha-perera-733a46320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <IconLink className="h-4 w-4" />
            </a>
            <a href="mailto:bimantha@example.com" aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <IconMail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Bimantha Perera. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="font-medium text-sky-400">React</span> & <span className="font-medium text-sky-400">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
