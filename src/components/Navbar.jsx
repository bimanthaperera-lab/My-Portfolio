import { useEffect, useState } from 'react'
import { IconCode } from './Icons'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact']

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/10 bg-[#070b14]/85 shadow-xl shadow-black/20 backdrop-blur-xl' : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between px-4 text-slate-100 md:px-6">
        <a href="#home" className="text-lg font-semibold tracking-[0.15em]">
          <span className="inline-flex items-center gap-2">
            <IconCode className="h-4 w-4 text-sky-300" />
            Bimantha
          </span>
        </a>

        <button
          type="button"
          className="rounded-md border border-white/15 p-2 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          ☰
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-sky-400/50 bg-sky-400/15 px-4 py-1.5 text-sm font-medium text-sky-200 transition hover:border-sky-300 hover:bg-sky-400/25"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#070b14]/95 px-4 transition-all duration-300 ease-out md:hidden ${isOpen ? 'max-h-72 pb-4 pt-3 opacity-100' : 'max-h-0 pb-0 pt-0 opacity-0'
          }`}
      >
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-2'
            }`}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-200 hover:text-sky-300"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="w-fit rounded-full border border-sky-400/50 bg-sky-400/15 px-3 py-1 text-sm text-sky-200"
            onClick={() => setIsOpen(false)}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
