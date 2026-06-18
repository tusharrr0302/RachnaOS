// client/src/pages/freelancer/FreelancerPublicProfilePage.jsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Pencil, Copy, Check, Link2, Save, X } from 'lucide-react'
import clsx from 'clsx'

import { MOCK_PROFILE } from '../../features/freelancer-public-profile/mockProfileData'
import HeroSection         from '../../features/freelancer-public-profile/components/HeroSection'
import StatsBar            from '../../features/freelancer-public-profile/components/StatsBar'
import AboutSection        from '../../features/freelancer-public-profile/components/AboutSection'
import ServicesSection     from '../../features/freelancer-public-profile/components/ServicesSection'
import SkillsSection       from '../../features/freelancer-public-profile/components/SkillsSection'
import WorkStyleSection    from '../../features/freelancer-public-profile/components/WorkStyleSection'
import AvailabilitySection from '../../features/freelancer-public-profile/components/AvailabilitySection'
import ReviewsTeaser       from '../../features/freelancer-public-profile/components/ReviewsTeaser'

const PUBLIC_URL = (username) => `rachna.os/freelancer/${username}`

// ── Toast ──────────────────────────────────────────────────────────────
function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 24, x: '-50%' }}
          className="fixed bottom-24 left-1/2 bg-rachna-dark text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-card-lg z-50 flex items-center gap-2"
        >
          <Check size={15} className="text-green-400" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Mode Toggle ────────────────────────────────────────────────────────
function ModeToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-rachna-border rounded-xl p-1">
      <button onClick={() => onToggle('preview')}
        className={clsx('flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
          mode === 'preview' ? 'bg-rachna-indigo text-white shadow-sm' : 'text-rachna-muted hover:text-rachna-dark')}>
        <Eye size={14} /> Preview
      </button>
      <button onClick={() => onToggle('edit')}
        className={clsx('flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
          mode === 'edit' ? 'bg-rachna-indigo text-white shadow-sm' : 'text-rachna-muted hover:text-rachna-dark')}>
        <Pencil size={14} /> Edit Profile
      </button>
    </div>
  )
}

// ── Profile URL Bar ────────────────────────────────────────────────────
function ProfileURLBar({ username, onCopy, copied }) {
  return (
    <div className="flex items-center gap-3 bg-rachna-surface border border-rachna-border rounded-xl px-4 py-2.5">
      <Link2 size={14} className="text-rachna-muted flex-shrink-0" />
      <span className="text-sm text-rachna-dark flex-1 truncate font-mono">{PUBLIC_URL(username)}</span>
      <button onClick={onCopy}
        className="flex items-center gap-1.5 text-xs text-rachna-indigo font-semibold hover:underline flex-shrink-0">
        {copied ? <><Check size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy</>}
      </button>
    </div>
  )
}

export default function FreelancerPublicProfilePage() {
  const [mode, setMode] = useState('preview')
  const [profile, setProfile]   = useState(() => ({ ...MOCK_PROFILE }))
  const [original, setOriginal] = useState(() => ({ ...MOCK_PROFILE })) // for discard
  const [toast, setToast] = useState({ show: false, message: '' })
  const [urlCopied, setUrlCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  // Nested key update helper (handles top-level keys only — deep path not needed)
  const handleChange = useCallback((key, value) => {
    setProfile(p => ({ ...p, [key]: value }))
  }, [])

  const handleEnterEdit = () => {
    setOriginal({ ...profile }) // snapshot for discard
    setMode('edit')
  }

  const handleSave = async () => {
    // In production: PUT /api/freelancer/public-profile
    setOriginal({ ...profile })
    setMode('preview')
    showToast('Profile saved!')
  }

  const handleDiscard = () => {
    setProfile({ ...original })
    setMode('preview')
    showToast('Changes discarded.')
  }

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2500)
  }

  const copyURL = () => {
    navigator.clipboard.writeText(`https://${PUBLIC_URL(profile.username)}`).catch(() => {})
    setUrlCopied(true)
    setTimeout(() => setUrlCopied(false), 2000)
  }

  const shareProfile = () => {
    navigator.clipboard.writeText(`https://${PUBLIC_URL(profile.username)}`).catch(() => {})
    setShareCopied(true)
    showToast('Profile link copied to clipboard!')
    setTimeout(() => setShareCopied(false), 2000)
  }

  const isEdit = mode === 'edit'

  return (
    <div className="p-6">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-xl">Public Profile</h1>
          <p className="text-sm text-rachna-muted mt-0.5">
            {isEdit ? 'Edit mode — changes are saved locally until you click Save' : 'This is how creators see your profile on the platform'}
          </p>
        </div>
        <ModeToggle mode={mode} onToggle={(m) => m === 'edit' ? handleEnterEdit() : setMode('preview')} />
      </div>

      {/* ── Profile URL (edit mode only) ───────────────────────── */}
      <AnimatePresence>
        {isEdit && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden">
            <ProfileURLBar username={profile.username} onCopy={copyURL} copied={urlCopied} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Profile Content ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="max-w-5xl mx-auto space-y-5"
        >
          {/* Hero */}
          <HeroSection
            profile={profile}
            isEdit={isEdit}
            onChange={handleChange}
            onShare={shareProfile}
            copied={shareCopied}
          />

          {/* Stats Bar (always read-only) */}
          <StatsBar stats={profile.stats} />

          {/* Two-column layout for main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left column (2/3 width) */}
            <div className="lg:col-span-2 space-y-5">
              <AboutSection profile={profile} isEdit={isEdit} onChange={handleChange} />
              <ServicesSection profile={profile} isEdit={isEdit} onChange={handleChange} />
              <WorkStyleSection profile={profile} isEdit={isEdit} onChange={handleChange} />
              <ReviewsTeaser reviews={profile.reviews} />
            </div>

            {/* Right column (1/3 width) */}
            <div className="space-y-5">
              <SkillsSection profile={profile} isEdit={isEdit} onChange={handleChange} />
              <AvailabilitySection profile={profile} isEdit={isEdit} onChange={handleChange} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Floating Save/Discard (edit mode only) ─────────────── */}
      <AnimatePresence>
        {isEdit && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white border border-rachna-border rounded-2xl shadow-card-lg px-4 py-3"
          >
            <span className="text-sm text-rachna-muted font-medium mr-2 hidden sm:block">Unsaved changes</span>
            <button onClick={handleDiscard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-rachna-muted border border-rachna-border hover:border-red-300 hover:text-red-500 transition-all">
              <X size={14} /> Discard
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-rachna-indigo text-white hover:bg-indigo-700 transition-all hover:shadow-glow"
            >
              <Save size={14} /> Save Changes
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast ─────────────────────────────────────────────────── */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  )
}
