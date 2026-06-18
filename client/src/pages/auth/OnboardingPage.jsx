import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Upload } from 'lucide-react'
import clsx from 'clsx'

const ROLES = [
  { id: 'creator', emoji: '🎬', label: 'Creator', desc: 'I make content and want to grow my channel' },
  { id: 'freelancer', emoji: '✂️', label: 'Freelancer', desc: 'I help creators (editor, designer, etc.)' },
  { id: 'expert', emoji: '🎯', label: 'Expert', desc: 'I have industry experience to share via calls' },
  { id: 'manager', emoji: '💼', label: 'Manager', desc: 'I manage creator careers and portfolios' },
]

const NICHES = ['Finance', 'Gaming', 'Tech', 'Lifestyle', 'Comedy', 'Education', 'Vlogs', 'Cooking', 'Fitness', 'Other']
const PLATFORMS = ['YouTube', 'Instagram', 'Shorts', 'Multi']
const FREELANCER_SKILLS = ['Video Editing', 'Thumbnail Design', 'Script Writing', 'Research', 'SEO', 'Community Management', 'Motion Graphics', 'Voice Over']
const EXPERT_TAGS = ['YouTube Strategy', 'Brand Deals', 'Thumbnail', 'Growth', 'Monetization', 'Legal', 'Audience Building']

const STEPS = ['Choose Role', 'Your Profile', 'Photo & Bio']

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState('')
  const [profile, setProfile] = useState({
    name: '', platform: 'YouTube', niche: '', channelUrl: '', subscribers: 10000,
    skills: [], hourlyRate: '', portfolioUrl: '',
    expertise: [], ratePerCall: '', bio160: '',
    experience: '', managedCreators: '',
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const handleNext = () => {
    if (step < 2) setStep(step + 1)
    else navigate('/creator/workspace')
  }

  const toggleSkill = (skill, key) => {
    const arr = profile[key]
    setProfile({ ...profile, [key]: arr.includes(skill) ? arr.filter(s => s !== skill) : [...arr, skill] })
  }

  const subscriberLabel = (val) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `${Math.round(val / 1000)}K`
    return val.toString()
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

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                  i < step ? 'bg-rachna-success text-white' :
                  i === step ? 'bg-rachna-indigo text-white' :
                  'bg-rachna-border text-rachna-muted'
                )}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={clsx('w-12 h-0.5 transition-all duration-500', i < step ? 'bg-rachna-success' : 'bg-rachna-border')} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-rachna-muted">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Choose Role */}
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
                  onClick={handleNext}
                  disabled={!role}
                  className="w-full btn-primary justify-center mt-6 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Profile Setup */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="font-display font-bold text-rachna-dark text-2xl mb-2">
                  {role === 'creator' && 'Your Channel Setup'}
                  {role === 'freelancer' && 'Your Specialization'}
                  {role === 'expert' && 'Your Expertise'}
                  {role === 'manager' && 'Manager Setup'}
                </h2>
                <p className="text-rachna-muted text-sm mb-6">Help us personalize your RachnaOS experience.</p>

                <div className="space-y-5">
                  {/* Name — all roles */}
                  <div>
                    <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="input" placeholder="Ankit Verma" id="onboard-name" />
                  </div>

                  {/* Creator-specific */}
                  {role === 'creator' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Primary Platform</label>
                        <div className="flex flex-wrap gap-2">
                          {PLATFORMS.map(p => (
                            <button key={p} onClick={() => setProfile({ ...profile, platform: p })}
                              className={clsx('px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all', profile.platform === p ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Niche</label>
                        <select value={profile.niche} onChange={e => setProfile({ ...profile, niche: e.target.value })} className="input" id="onboard-niche">
                          <option value="">Select your niche</option>
                          {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Channel / Profile URL</label>
                        <input type="url" value={profile.channelUrl} onChange={e => setProfile({ ...profile, channelUrl: e.target.value })} className="input" placeholder="https://youtube.com/@yourchannel" id="onboard-channel-url" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-rachna-dark">Approximate Subscribers</label>
                          <span className="text-sm font-bold text-rachna-indigo">{subscriberLabel(profile.subscribers)}</span>
                        </div>
                        <input type="range" min={0} max={1000000} step={1000} value={profile.subscribers}
                          onChange={e => setProfile({ ...profile, subscribers: +e.target.value })}
                          className="w-full accent-rachna-indigo" id="onboard-subs" />
                        <div className="flex justify-between text-xs text-rachna-muted mt-1">
                          <span>0</span><span>100K</span><span>500K</span><span>1M+</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Freelancer-specific */}
                  {role === 'freelancer' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {FREELANCER_SKILLS.map(s => (
                            <button key={s} onClick={() => toggleSkill(s, 'skills')}
                              className={clsx('px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all', profile.skills.includes(s) ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Hourly Rate (₹)</label>
                        <input type="number" value={profile.hourlyRate} onChange={e => setProfile({ ...profile, hourlyRate: e.target.value })} className="input" placeholder="e.g. 1500" id="onboard-hourly" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Portfolio Link</label>
                        <input type="url" value={profile.portfolioUrl} onChange={e => setProfile({ ...profile, portfolioUrl: e.target.value })} className="input" placeholder="https://yourportfolio.com" id="onboard-portfolio" />
                      </div>
                    </>
                  )}

                  {/* Expert-specific */}
                  {role === 'expert' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-2">Expertise Areas</label>
                        <div className="flex flex-wrap gap-2">
                          {EXPERT_TAGS.map(t => (
                            <button key={t} onClick={() => toggleSkill(t, 'expertise')}
                              className={clsx('px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all', profile.expertise.includes(t) ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Rate per 15-min call (₹)</label>
                        <input type="number" value={profile.ratePerCall} onChange={e => setProfile({ ...profile, ratePerCall: e.target.value })} className="input" placeholder="e.g. 799" id="onboard-expert-rate" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your story (2-3 lines)</label>
                        <textarea value={profile.bio160} onChange={e => setProfile({ ...profile, bio160: e.target.value })} className="input h-20 resize-none" placeholder="I've worked with 50M+ creators to optimize their YouTube strategy..." id="onboard-expert-bio" />
                      </div>
                    </>
                  )}

                  {/* Manager-specific */}
                  {role === 'manager' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Your Experience</label>
                        <textarea value={profile.experience} onChange={e => setProfile({ ...profile, experience: e.target.value })} className="input h-24 resize-none" placeholder="I've managed creators across finance and tech niches for 4 years..." id="onboard-manager-exp" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-rachna-dark block mb-1.5">Creators you manage (optional)</label>
                        <input type="text" value={profile.managedCreators} onChange={e => setProfile({ ...profile, managedCreators: e.target.value })} className="input" placeholder="e.g. @financebyrakesh, @techguruvlogs" id="onboard-managed" />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-ghost flex-1 justify-center py-3">Back</button>
                  <button onClick={handleNext} className="btn-primary flex-2 justify-center py-3 flex-1">Continue <ChevronRight size={16} /></button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Photo & Bio */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="font-display font-bold text-rachna-dark text-2xl mb-2">Almost there!</h2>
                <p className="text-rachna-muted text-sm mb-6">Add a photo and bio so the community recognizes you.</p>

                {/* Photo Upload */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-rachna-lavender flex items-center justify-center overflow-hidden flex-shrink-0">
                    {photoPreview
                      ? <img src={photoPreview} alt="avatar" className="w-full h-full object-cover" />
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
                    <p className="text-xs text-rachna-muted mt-2">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-rachna-dark block mb-1.5">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rachna-muted">@</span>
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input pl-8" placeholder="ankitverma" id="onboard-username" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-sm font-medium text-rachna-dark">Bio</label>
                      <span className={clsx('text-xs', bio.length > 160 ? 'text-rachna-danger' : 'text-rachna-muted')}>{bio.length}/160</span>
                    </div>
                    <textarea
                      value={bio}
                      onChange={e => setBio(e.target.value.slice(0, 160))}
                      className="input h-24 resize-none"
                      placeholder="Finance creator helping 240K people grow their wealth through smart investing..."
                      id="onboard-bio"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center py-3">Back</button>
                  <button onClick={handleNext} className="btn-primary flex-1 justify-center py-3">
                    Finish Setup 🎉
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
