import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Skills from './components/Skills'
import StatsCounter from './components/StatsCounter'

function App() {
  const [isDark] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.2 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <div className={isDark ? 'dark' : ''} style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#070b14] text-slate-100">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-140px] top-[-120px] h-[320px] w-[320px] rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute bottom-[-160px] right-[-100px] h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-3xl" />
          </div>

          <Navbar />
          <main className="relative z-10 flex-1">
            <div data-reveal className="reveal">
              <Hero />
            </div>
            <div data-reveal className="reveal">
              <About />
            </div>
            <div data-reveal className="reveal">
              <StatsCounter />
            </div>
            <div data-reveal className="reveal">
              <Education />
            </div>
            <div data-reveal className="reveal">
              <Skills />
            </div>
            <div data-reveal className="reveal">
              <Projects />
            </div>
            <div data-reveal className="reveal">
              <Resume />
            </div>
            <div data-reveal className="reveal">
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
