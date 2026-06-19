import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Academy', href: '#academy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-rachna-border'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="RachnaOS Logo" className="h-2 w-auto object-contain transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link font-medium text-sm text-rachna-dark/70 hover:text-rachna-indigo transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/sign-in')}
              className="btn-ghost text-sm py-2 px-4"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className="btn-indigo-solid"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-rachna-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-16 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-1 pt-6">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-lg font-display font-semibold text-rachna-dark border-b border-rachna-border hover:text-rachna-indigo transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => { navigate('/sign-in'); setMobileOpen(false) }}
                className="btn-ghost w-full justify-center py-3"
              >
                Log In
              </button>
              <button
                onClick={() => { navigate('/sign-up'); setMobileOpen(false) }}
                className="btn-primary w-full justify-center py-3"
              >
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
