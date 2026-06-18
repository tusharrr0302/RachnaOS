// client/src/pages/auth/OnboardingPage.jsx
// 3-step wizard: role → profile → username+bio
// After step 3: POST /api/auth/set-role → Supabase upsert → navigate to dashboard

import { useState, useEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Upload, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import { supabase } from '../../config/supabase'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const ROLES = [
  {
    id: 'creator',
    emoji: '🎬',
    label: 'Creator',
    desc: 'I make content and want to grow my channel, protect my deals, and build a team.',
    color: '#4540C8',
    bg: '#EDE9FF',
  },
  {
    id: 'freelancer',
    emoji: '✂️',
    label: 'Freelancer',
    desc: 'I edit videos, design thumbnails, write scripts, or help creators in any way.',
    color: '#1D9E75',
    bg: '#F0FDF4',
  },
  {
    id: 'expert',
    emoji: '🎯',
    label: 'Expert',
    desc: 'I have industry experience to share via calls (YouTube strategy, brand deals, etc.).',
    color: '#E08820',
    bg: '#FFF7ED',
  },
  {
    id: 'manager',
    emoji: '💼',
    label: 'Manager',
    desc: 'I manage creator careers, book deals, and oversee talent portfolios.',
    color: '#9B7FD8',
    bg: '#F3F0FF',
  },
]

const NICHES = [
  'Finance', 'Gaming', 'Tech', 'Lifestyle', 'Comedy',
  'Education', 'Travel', 'Cooking', 'Fitness', 'Music',
  'Fashion', 'Vlogs', 'News', 'Motivation', 'Other',
]

const PLATFORMS = ['YouTube', 'Instagram', 'Shorts', 'Multi']

const FREELANCER_SKILLS = [
  'Video Editing', 'Thumbnail Design', 'Script Writing',
  'Research', 'SEO Optimization', 'Community Management',
  'Motion Graphics', 'Color Grading', 'Voiceover', 'Subtitles',
]

const EXPERT_TAGS = [
  'YouTube Strategy', 'Brand Deals', 'Thumbnail', 'Growth',
  'Monetization', 'Legal', 'Audience Building',
]

const STEPS = ['Choose Role', 'Your Profile', 'Username & Bio']

const ROLE_DASHBOARD = {
  creator:    '/creator/workspace',
  freelancer: '/freelancer/dashboard',
  expert:     '/expert/dashboard',
  manager:    '/manager/dashboard',
}

export default function OnboardingPage() {
  const { user } = useUser()
  const { getToken } = useClerkAuth()
  const navigate  = useNavigate()

  // Already onboarded → skip wizard, go to dashboard
  useEffect(() => {
    const onboardingDone = user?.publicMetadata?.onboarding_done
    const role = user?.publicMetadata?.role
    if (onboardingDone && role) {
      navigate(ROLE_DASHBOARD[role] || '/', { replace: true })
    }
  }, [user?.publicMetadata?.onboarding_done, user?.publicMetadata?.role])

  const [step, setSaveStep] = useState(0)
  const [role, setRole]     = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  // ── Profile fields ──
  const [profile, setProfile] = useState({
    name:            user?.firstName || '',
    platform:        'YouTube',
    niche:           '',
    channelUrl:      '',
    subscribers:     10000,
    skills:          [],
    hourlyRate:      '',
    portfolioUrl:    '',
    expertise:       [],
    ratePerCall:     '',
    expertBio:       '',
    experience:      '',
    managedCreators: '',
    companyName:     '',
  })

  // ── Step 3 fields ──
  const [photoPreview, setPhotoPreview] = useState(null)
  const [username, setUsername]         = useState('')
  const [bio, setBio]                   = useState('')

  const setStep = (n) => { setError(''); setSaveStep(n) }

  function toggleArray(key, value) {
    const arr = profile[key]
    setProfile({
      ...profile,
      [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
    })
  }

  const subLabel = (val) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`
    if (val >= 1_000)     return `${Math.round(val / 1_000)}K`
    return val.toString()
  }

  async function finishOnboarding() {
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    setSaving(true)
    setError('')

    try {
      // 1. Get Clerk JWT
      const token = await getToken()

      // 2. Set role in Clerk public metadata via backend
      await axios.post(
        `${API_BASE}/api/auth/set-role`,
        { role, onboarding_done: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // 3. Upsert into Supabase profiles
      const profilePayload = {
        clerk_user_id:   user.id,
        role,
        display_name:    profile.name,
        username:        username.toLowerCase().trim(),
        bio,
        avatar_url:      user.imageUrl || null,
        onboarding_done: true,
        ...(role === 'creator' && {
          niche:       profile.niche,
          platform:    profile.platform,
          channel_url: profile.channelUrl,
          subscribers: parseInt(profile.subscribers) || 0,
        }),
        ...(role === 'freelancer' && {
          skills:        profile.skills,
          hourly_rate:   parseInt(profile.hourlyRate) || 0,
          portfolio_url: profile.portfolioUrl,
        }),
        ...(role === 'expert' && {
          skills:       profile.expertise,
          hourly_rate:  parseInt(profile.ratePerCall) || 0,
          bio:          profile.expertBio || bio,
        }),
        ...(role === 'manager' && {
          company_name: profile.companyName,
          bio:          profile.experience || bio,
        }),
      }

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert(profilePayload, { onConflict: 'clerk_user_id' })

      if (dbError) throw new Error(dbError.message)

      // 4. Navigate to role dashboard
      navigate(ROLE_DASHBOARD[role] || '/')

    } catch (err) {
      console.error('[Onboarding] error:', err)
      setError(err.response?.data?.error || err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-rachna-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-rachna-indigo flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">र</span>
            </div>
            <span className="font-display font-bold text-rachna-dark text-2xl">रचनाOS</span>
          </div>

          {/* Progress stepper */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                  i < step  ? 'bg-rachna-success text-white'
                  : i === step ? 'bg-rachna-indigo text-white'
                  : 'bg-rachna-border text-rachna-muted'
                )}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={clsx(
                    'w-12 h-0.5 transition-all duration-500',
                    i < step ? 'bg-rachna-success' : 'bg-rachna-border'
                  )} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-rachna-muted">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 0: Choose Role ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="font-display font-bold text-rachna-dark text-2xl mb-2">I am a...</h2>
                <p className="text-rachna-muted text-sm mb-6">Choose the role that best describes you. You can always change this later.</p>

                <div className="grid grid-cols-2 gap-4">
                  {ROLES.map(r => (
                    <button
                      key={r.id}
                      id={`role-${r.id}`}
                      onClick={() => setRole(r.id)}
                      className={clsx(
                        'p-5 rounded-2xl border-2 text-left transition-all duration-200',
                        role === r.id
                          ? 'border-rachna-indigo bg-rachna-lavender'
                          : 'border-rachna-border hover:border-rachna-violet hover:bg-rachna-surface'
                      )}
                    >
                      <span className="text-3xl mb-3 block">{r.emoji}</span>
                      <p className="font-display font-semibold text-rachna-dark mb-1">{r.label}</p>
                      <p className="text-xs text-rachna-muted leading-relaxed">{r.desc}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => role && setStep(1)}
                  disabled={!role}
                  className="w-full btn-primary justify-center mt-6 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Role-specific Profile ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="font-display font-bold text-rachna-dark text-2xl mb-2">
                  {role === 'creator'    && 'Your Channel'}
                  {role === 'freelancer' && 'Your Skills'}
                  {role === 'expert'     && 'Your Expertise'}
                  {role === 'manager'    && 'Your Work'}
                </h2>
                <p className="text-rachna-muted text-sm mb-6">Help us personalise your RachnaOS experience.</p>

                <div className="space-y-5">
                  {/* Name — all roles */}
                  <div>
                    <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      className="input"
                      placeholder="Ankit Verma"
                      id="onboard-name"
                    />
                  </div>

                  {/* CREATOR fields */}
                  {role === 'creator' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Primary Platform</label>
                        <div className="flex flex-wrap gap-2">
                          {PLATFORMS.map(p => (
                            <button
                              key={p}
                              onClick={() => setProfile({ ...profile, platform: p })}
                              className={clsx(
                                'px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all',
                                profile.platform === p
                                  ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo'
                                  : 'border-rachna-border text-rachna-muted hover:border-rachna-violet'
                              )}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Niche</label>
                        <select
                          value={profile.niche}
                          onChange={e => setProfile({ ...profile, niche: e.target.value })}
                          className="input"
                          id="onboard-niche"
                        >
                          <option value="">Select your niche</option>
                          {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Channel / Profile URL</label>
                        <input
                          type="url"
                          value={profile.channelUrl}
                          onChange={e => setProfile({ ...profile, channelUrl: e.target.value })}
                          className="input"
                          placeholder="https://youtube.com/@yourchannel"
                          id="onboard-channel-url"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-rachna-dark">Approximate Subscribers</label>
                          <span className="text-sm font-bold text-rachna-indigo">{subLabel(profile.subscribers)}</span>
                        </div>
                        <input
                          type="range" min={0} max={1_000_000} step={1_000}
                          value={profile.subscribers}
                          onChange={e => setProfile({ ...profile, subscribers: +e.target.value })}
                          className="w-full accent-rachna-indigo"
                          id="onboard-subs"
                        />
                        <div className="flex justify-between text-xs text-rachna-muted mt-1">
                          <span>0</span><span>100K</span><span>500K</span><span>1M+</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* FREELANCER fields */}
                  {role === 'freelancer' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Skills (select all that apply)</label>
                        <div className="flex flex-wrap gap-2">
                          {FREELANCER_SKILLS.map(s => (
                            <button
                              key={s}
                              onClick={() => toggleArray('skills', s)}
                              className={clsx(
                                'px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all',
                                profile.skills.includes(s)
                                  ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo'
                                  : 'border-rachna-border text-rachna-muted hover:border-rachna-violet'
                              )}
                            >
                              {profile.skills.includes(s) && '✓ '}{s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Hourly Rate (₹)</label>
                        <input
                          type="number"
                          value={profile.hourlyRate}
                          onChange={e => setProfile({ ...profile, hourlyRate: e.target.value })}
                          className="input"
                          placeholder="e.g. 1500"
                          id="onboard-hourly"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Portfolio URL (optional)</label>
                        <input
                          type="url"
                          value={profile.portfolioUrl}
                          onChange={e => setProfile({ ...profile, portfolioUrl: e.target.value })}
                          className="input"
                          placeholder="https://yourportfolio.com"
                          id="onboard-portfolio"
                        />
                      </div>
                    </>
                  )}

                  {/* EXPERT fields */}
                  {role === 'expert' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Expertise Areas</label>
                        <div className="flex flex-wrap gap-2">
                          {EXPERT_TAGS.map(t => (
                            <button
                              key={t}
                              onClick={() => toggleArray('expertise', t)}
                              className={clsx(
                                'px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all',
                                profile.expertise.includes(t)
                                  ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo'
                                  : 'border-rachna-border text-rachna-muted hover:border-rachna-violet'
                              )}
                            >
                              {profile.expertise.includes(t) && '✓ '}{t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Rate per 15-min call (₹)</label>
                        <input
                          type="number"
                          value={profile.ratePerCall}
                          onChange={e => setProfile({ ...profile, ratePerCall: e.target.value })}
                          className="input"
                          placeholder="e.g. 799"
                          id="onboard-expert-rate"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your story (2-3 lines)</label>
                        <textarea
                          value={profile.expertBio}
                          onChange={e => setProfile({ ...profile, expertBio: e.target.value })}
                          className="input h-20 resize-none"
                          placeholder="I've worked with 50M+ creators to optimize their YouTube strategy..."
                          id="onboard-expert-bio"
                        />
                      </div>
                    </>
                  )}

                  {/* MANAGER fields */}
                  {role === 'manager' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Company / Agency Name (optional)</label>
                        <input
                          type="text"
                          value={profile.companyName}
                          onChange={e => setProfile({ ...profile, companyName: e.target.value })}
                          className="input"
                          placeholder="e.g. Verma Talent Agency"
                          id="onboard-company"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your Experience</label>
                        <textarea
                          value={profile.experience}
                          onChange={e => setProfile({ ...profile, experience: e.target.value })}
                          className="input h-24 resize-none"
                          placeholder="I've managed creators across finance and tech niches for 4 years..."
                          id="onboard-manager-exp"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Creators you manage (optional)</label>
                        <input
                          type="text"
                          value={profile.managedCreators}
                          onChange={e => setProfile({ ...profile, managedCreators: e.target.value })}
                          className="input"
                          placeholder="e.g. @financebyrakesh, @techguruvlogs"
                          id="onboard-managed"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-ghost flex-1 justify-center py-3">Back</button>
                  <button
                    onClick={() => profile.name.trim() && setStep(2)}
                    disabled={!profile.name.trim()}
                    className="btn-primary flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Username + Bio ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="font-display font-bold text-rachna-dark text-2xl mb-2">Almost there!</h2>
                <p className="text-rachna-muted text-sm mb-6">Set your username and a short bio.</p>

                {/* Avatar row */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-rachna-lavender flex items-center justify-center overflow-hidden flex-shrink-0">
                    {photoPreview
                      ? <img src={photoPreview} alt="avatar" className="w-full h-full object-cover" />
                      : user?.imageUrl
                      ? <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
                      : <span className="text-2xl text-rachna-indigo font-bold">{profile.name?.[0] || 'A'}</span>
                    }
                  </div>
                  <div>
                    <label className="btn-ghost cursor-pointer text-sm py-2 px-4 inline-flex items-center gap-2" id="photo-upload-label">
                      <Upload size={14} /> Upload Photo
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files[0]
                        if (file) setPhotoPreview(URL.createObjectURL(file))
                      }} />
                    </label>
                    <p className="text-xs text-rachna-muted mt-1.5">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Username */}
                  <div>
                    <label className="text-sm font-medium text-rachna-dark block mb-1.5">Username *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rachna-muted">@</span>
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value.replace(/[^a-z0-9_.]/gi, '').toLowerCase())}
                        className="input pl-8"
                        placeholder="ankitverma"
                        id="onboard-username"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-sm font-medium text-rachna-dark">Bio</label>
                      <span className={clsx('text-xs', bio.length > 150 ? 'text-rachna-danger' : 'text-rachna-muted')}>
                        {bio.length}/160
                      </span>
                    </div>
                    <textarea
                      value={bio}
                      onChange={e => setBio(e.target.value.slice(0, 160))}
                      className="input h-24 resize-none"
                      placeholder={
                        role === 'creator'    ? 'Finance creator. Helping you build wealth.' :
                        role === 'freelancer' ? 'Video editor for finance & tech channels.' :
                        role === 'expert'     ? 'YouTube strategist. Helped 50M+ views across 30 channels.' :
                        'Managing top-tier creators across niches.'
                      }
                      id="onboard-bio"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center py-3">Back</button>
                  <button
                    onClick={finishOnboarding}
                    disabled={saving || !username.trim()}
                    className="btn-primary flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {saving
                      ? <><Loader2 size={16} className="animate-spin" /> Setting up...</>
                      : 'Launch My Dashboard 🚀'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
