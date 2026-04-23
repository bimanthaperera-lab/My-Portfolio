import { useEffect, useState } from 'react'

function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const duration = 2200
    const interval = 20
    const step = (interval / duration) * 100
    let current = 0

    const timer = setInterval(() => {
      current += step + Math.random() * 1.5
      if (current >= 100) {
        current = 100
        clearInterval(timer)
        setTimeout(() => setFadeOut(true), 300)
        setTimeout(() => onFinish(), 900)
      }
      setProgress(Math.min(current, 100))
    }, interval)

    return () => clearInterval(timer)
  }, [onFinish])

  return (
    <div
      className={`loading-screen ${fadeOut ? 'loading-screen--exit' : ''}`}
      aria-label="Loading"
    >
      {/* Background ambient glow */}
      <div className="loading-bg-glow loading-bg-glow--1" />
      <div className="loading-bg-glow loading-bg-glow--2" />

      <div className="loading-content">
        {/* Orbital rings */}
        <div className="loading-orbit-wrapper">
          <div className="loading-orbit loading-orbit--1" />
          <div className="loading-orbit loading-orbit--2" />
          <div className="loading-orbit loading-orbit--3" />

          {/* Center logo */}
          <div className="loading-logo">
            <span className="loading-logo-text">BP</span>
          </div>
        </div>

        {/* Name text */}
        <h2 className="loading-name">
          <span className="loading-name-first">Bimantha</span>
          <span className="loading-name-last">Perera</span>
        </h2>

        {/* Progress bar */}
        <div className="loading-progress-track">
          <div
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loading-percent">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen
