import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Smartphone, AlertCircle, Sparkles, FlaskConical, ChevronRight, X, Info } from 'lucide-react'
import clsx from 'clsx'

const PLATFORMS = ['YouTube', 'Shorts', 'Instagram Reels']

const MOCK_RESULTS = {
  overallScore: 72,
  ctrPrediction: 6.8,
  retentionRisk: 'medium',
  engagementScore: 74,
  personas: [
    { id: 'student', name: 'Priya', type: 'College Student', emoji: '👩‍🎓', wouldClick: true, rating: 4, reaction: 'Relatable thumbnail but the title feels a bit vague. Would click if the hook is strong.', mainConcern: 'Title lacks specificity' },
    { id: 'professional', name: 'Arjun', type: 'Working Professional', emoji: '👨‍💼', wouldClick: true, rating: 3, reaction: 'Title is clear but missing a specific number or result. Would watch if value is stated upfront.', mainConcern: 'No specific outcome stated' },
    { id: 'gamer', name: 'Ravi', type: 'Gen Z Gamer', emoji: '🎮', wouldClick: 'maybe', rating: 2, reaction: "Needs more energy in the thumbnail. Too calm for my feed. Might scroll past.", mainConcern: 'Thumbnail not eye-catching enough' },
    { id: 'entrepreneur', name: 'Meera', type: 'Small Business Owner', emoji: '👩‍💻', wouldClick: true, rating: 4, reaction: 'The result-focused angle works for me. Would watch if there is a clear framework.', mainConcern: 'Needs credibility signal' },
    { id: 'regional', name: 'Suresh', type: 'Regional Viewer', emoji: '🌍', wouldClick: 'maybe', rating: 3, reaction: 'Language is accessible but could use more local context to feel relatable.', mainConcern: 'Missing cultural context' },
  ],
  thumbnailFeedback: {
    strengths: ['Clear focal point', 'Good contrast', 'Brand colors present'],
    weaknesses: ['Text too small on mobile', 'No emotional trigger visible', 'No human face / eye contact'],
    suggestions: ['Add a face showing surprise or excitement', 'Increase text size by 30%', 'Add a contrasting border around text'],
  },
  titleFeedback: {
    problem: 'Missing specificity. No number, timeframe, or concrete result.',
    alternatives: ['How I Hit 10K Subs in 90 Days with 0 Budget', '5 Mistakes I Made Starting YouTube (Save 6 Months)', 'Why 99% of New Creators Quit in 60 Days (And How I Didn\'t)'],
  },
  hookFeedback: {
    issue: 'Promise unclear — viewer doesn\'t know what they\'ll get',
    dropPointEstimate: '0:18',
    improvedHook: 'If you want to grow on YouTube without spending a single rupee, in the next 8 minutes I\'m going to show you exactly how I hit 10,000 subscribers — and you can copy this step by step.',
  },
  prioritizedActions: [
    { priority: 'high', action: 'Rewrite title with a specific result or number' },
    { priority: 'high', action: 'Add a human face to the thumbnail' },
    { priority: 'medium', action: 'Tighten the hook — cut first 8 seconds, start with the promise' },
    { priority: 'medium', action: 'Increase thumbnail text size by 30%' },
    { priority: 'low', action: 'Test 2 thumbnail variants (A/B suggestion)' },
    { priority: 'low', action: 'Add end screen reminder at 0:25' },
  ],
}

export default function AudienceLabPage() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState('YouTube')
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState('')
  const [hook, setHook] = useState('')
  const [outline, setOutline] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleRun = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/creator/audience-lab/test-001')
    }, 2500)
  }

  const titleLen = title.length
  const titleWarn = titleLen > 70 ? 'danger' : titleLen > 60 ? 'warning' : ''

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-rachna-lavender flex items-center justify-center">
            <FlaskConical size={16} className="text-rachna-indigo" />
          </div>
          <span className="badge">★ Hero Feature</span>
        </div>
        <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">AudienceLab</h1>
        <p className="text-rachna-muted text-sm">Test your content <span className="font-semibold text-rachna-dark">before</span> you post. Get AI reactions from 5 real audience personas.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left — Input Form */}
        <div className="space-y-5">
          {/* Step 1: Thumbnail */}
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rachna-indigo text-white text-xs flex items-center justify-center font-bold flex-shrink-0">1</span>
              Upload Thumbnail
            </h3>
            {thumbnail ? (
              <div className="relative">
                <img src={thumbnail} alt="thumbnail" className="w-full rounded-xl object-cover h-36" />
                <button onClick={() => setThumbnail(null)} className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-rachna-border">
                  <X size={13} className="text-rachna-muted" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-rachna-border rounded-xl cursor-pointer hover:border-rachna-indigo hover:bg-rachna-lavender/30 transition-all group">
                <Upload size={24} className="text-rachna-muted group-hover:text-rachna-indigo mb-2 transition-colors" />
                <p className="text-sm font-medium text-rachna-dark group-hover:text-rachna-indigo transition-colors">Drop your thumbnail here</p>
                <p className="text-xs text-rachna-muted mt-1">1280×720 recommended · PNG, JPG</p>
                <input type="file" className="hidden" accept="image/*" onChange={e => {
                  const f = e.target.files[0]
                  if (f) setThumbnail(URL.createObjectURL(f))
                }} id="thumbnail-upload" />
              </label>
            )}
          </div>

          {/* Step 2: Title */}
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rachna-indigo text-white text-xs flex items-center justify-center font-bold flex-shrink-0">2</span>
              Video Title
            </h3>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value.slice(0, 100))}
                placeholder="Enter the exact title you plan to use"
                className={clsx(
                  'input pr-24',
                  titleWarn === 'danger' && 'border-rachna-danger focus:border-rachna-danger',
                  titleWarn === 'warning' && 'border-rachna-warning focus:border-rachna-warning',
                )}
                id="title-input"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className={clsx('text-xs font-mono', titleWarn === 'danger' ? 'text-rachna-danger' : titleWarn === 'warning' ? 'text-rachna-warning' : 'text-rachna-muted')}>
                  {titleLen}/100
                </span>
              </div>
            </div>
            {titleWarn && (
              <div className={clsx('flex items-center gap-1.5 mt-2 text-xs', titleWarn === 'danger' ? 'text-rachna-danger' : 'text-rachna-warning')}>
                <AlertCircle size={12} />
                {titleWarn === 'danger' ? 'Title too long for YouTube. Will be cut off.' : 'Getting long. Consider trimming.'}
              </div>
            )}
            <button className="mt-3 flex items-center gap-1.5 text-xs text-rachna-indigo font-semibold hover:bg-rachna-lavender px-3 py-1.5 rounded-lg transition-colors">
              <Sparkles size={12} /> Suggest Alternatives →
            </button>
          </div>

          {/* Step 3: Hook */}
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rachna-indigo text-white text-xs flex items-center justify-center font-bold flex-shrink-0">3</span>
              Opening Hook (first 30 seconds)
            </h3>
            <textarea
              value={hook}
              onChange={e => setHook(e.target.value)}
              placeholder="Paste your first 30 seconds of script or hook..."
              className="input h-24 resize-none"
              id="hook-input"
            />
          </div>

          {/* Step 4: Outline */}
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rachna-border text-rachna-muted text-xs flex items-center justify-center font-bold flex-shrink-0">4</span>
              Script Outline
              <span className="text-xs text-rachna-muted font-normal">(optional)</span>
            </h3>
            <textarea
              value={outline}
              onChange={e => setOutline(e.target.value)}
              placeholder="Bullet points of your video structure..."
              className="input h-20 resize-none"
              id="outline-input"
            />
          </div>

          {/* Step 5: Platform */}
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rachna-indigo text-white text-xs flex items-center justify-center font-bold flex-shrink-0">5</span>
              Platform
            </h3>
            <div className="flex gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all',
                    platform === p ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button
            id="run-audiencelab"
            onClick={handleRun}
            disabled={loading || !title}
            className={clsx(
              'w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-display font-bold text-base transition-all duration-300',
              loading || !title
                ? 'bg-rachna-border text-rachna-muted cursor-not-allowed'
                : 'bg-rachna-indigo text-white hover:bg-indigo-700 hover:shadow-card-lg hover:-translate-y-0.5'
            )}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with 5 personas...
              </>
            ) : (
              <>
                <FlaskConical size={18} /> Run AudienceLab Test
                <ChevronRight size={18} />
              </>
            )}
          </button>
          {!title && <p className="text-center text-xs text-rachna-muted">Add a title to run the test</p>}
        </div>

        {/* Right — Live Preview */}
        <div className="lg:sticky lg:top-8 self-start space-y-5">
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone size={16} className="text-rachna-muted" />
              <span className="text-sm font-semibold text-rachna-dark">Mobile Preview</span>
              <span className="text-xs text-rachna-muted">(how it looks on YouTube app)</span>
            </div>

            {/* YouTube-style mobile card */}
            <div className="max-w-[280px] mx-auto">
              <div className={clsx('w-full rounded-xl overflow-hidden mb-2.5', thumbnail ? '' : 'bg-gradient-to-br from-rachna-lavender to-rachna-indigo/20')} style={{ aspectRatio: '16/9' }}>
                {thumbnail ? (
                  <img src={thumbnail} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-rachna-muted text-xs text-center px-4">Your thumbnail will appear here</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rachna-indigo/20 flex-shrink-0 flex items-center justify-center">
                  <span className="text-rachna-indigo font-bold text-xs">A</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-rachna-dark leading-tight line-clamp-2">
                    {title || 'Your video title will appear here...'}
                  </p>
                  <p className="text-[10px] text-rachna-muted mt-0.5">Ankit Verma · 2.1M views · 3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Title analysis tips */}
          <div className="bg-rachna-lavender rounded-2xl p-5">
            <h3 className="font-display font-semibold text-rachna-indigo text-sm mb-3 flex items-center gap-1.5">
              <Info size={14} /> Title Best Practices
            </h3>
            <ul className="space-y-2">
              {[
                { tip: 'Include a specific number', ok: /\d/.test(title) },
                { tip: 'Keep under 60 characters', ok: titleLen > 0 && titleLen <= 60 },
                { tip: 'Include a result or outcome', ok: /(how|why|what|made|got|hit|earn)/i.test(title) },
                { tip: 'Has emotional trigger word', ok: /(secret|mistake|never|always|truth|honest)/i.test(title) },
              ].map(({ tip, ok }) => (
                <li key={tip} className="flex items-center gap-2">
                  <div className={clsx('w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0', ok ? 'bg-rachna-success' : 'bg-rachna-border')}>
                    {ok ? (
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                    ) : (
                      <span className="text-white text-[8px]">–</span>
                    )}
                  </div>
                  <span className={clsx('text-xs', ok ? 'text-rachna-dark font-medium' : 'text-rachna-muted')}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Past tests */}
          <div className="bg-white rounded-2xl border border-rachna-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-rachna-dark text-sm">Past Tests</h3>
              <button className="text-xs text-rachna-indigo font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { title: '5 Budget YouTube Setup', score: 81, ctr: '7.2%', date: 'Dec 10' },
                { title: 'Finance Myths That Keep You Broke', score: 68, ctr: '5.4%', date: 'Dec 8' },
              ].map(test => (
                <button
                  key={test.title}
                  onClick={() => navigate('/creator/audience-lab/test-001')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rachna-surface transition-colors text-left"
                >
                  <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0', test.score >= 75 ? 'bg-rachna-success' : test.score >= 60 ? 'bg-rachna-warning' : 'bg-rachna-danger')}>
                    {test.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-rachna-dark truncate">{test.title}</p>
                    <p className="text-[10px] text-rachna-muted">CTR: {test.ctr} · {test.date}</p>
                  </div>
                  <ChevronRight size={13} className="text-rachna-muted flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
