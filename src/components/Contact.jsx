import { useState } from 'react'
import { IconCode, IconLink, IconMail } from './Icons'

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState({ show: false, exiting: false })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    setIsSending(true)

    // Simulate sending (replace with actual API call later)
    setTimeout(() => {
      setIsSending(false)
      setFormData({ name: '', email: '', message: '' })
      setToast({ show: true, exiting: false })

      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setToast({ show: true, exiting: true })
        setTimeout(() => setToast({ show: false, exiting: false }), 400)
      }, 4000)
    }, 1200)
  }

  const dismissToast = () => {
    setToast({ show: true, exiting: true })
    setTimeout(() => setToast({ show: false, exiting: false }), 400)
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <div className="glass-card grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Contact</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Let&apos;s work together</h2>
          <p className="leading-relaxed text-slate-300">
            If you have an idea or project, I would love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <a
              href="mailto:bimantha@example.com"
              className="glass-card-soft inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:text-sky-300"
            >
              <IconMail className="h-3.5 w-3.5" />
              Email
            </a>
            <a href="#" className="glass-card-soft inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:text-sky-300">
              <IconCode className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a href="#" className="glass-card-soft inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:text-sky-300">
              <IconLink className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="glass-card-soft w-full rounded-xl px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="glass-card-soft w-full rounded-xl px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
          <textarea
            rows="4"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="glass-card-soft w-full rounded-xl px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
          <button
            type="submit"
            disabled={isSending}
            className="btn-glow w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 px-6 py-3 font-semibold text-[#04101f] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#04101f] border-t-transparent" />
                Sending...
              </span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-[#0c1524]/95 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition-all duration-400 ${
            toast.exiting
              ? 'translate-y-4 opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
          style={{ animation: toast.exiting ? 'none' : 'toastSlideIn 0.4s ease-out' }}
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-400/30">
            <IconCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Message Sent! ✨</p>
            <p className="text-xs text-slate-400">Thank you! I'll get back to you soon.</p>
          </div>
          <button
            type="button"
            onClick={dismissToast}
            className="ml-3 text-slate-500 transition hover:text-white"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}

export default Contact
