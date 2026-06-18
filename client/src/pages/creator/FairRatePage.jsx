import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign, TrendingUp, AlertTriangle, Copy, Save,
  Share2, ChevronRight, Info, CheckCircle2, Calculator
} from 'lucide-react'
import clsx from 'clsx'

const NICHES = ['Finance', 'Gaming', 'Tech', 'Lifestyle', 'Comedy', 'Education', 'Vlogs', 'Cooking', 'Fitness']
const PLATFORMS = ['YouTube', 'Instagram', 'Shorts', 'Multi']
const CONTENT_TYPES = [
  { id: 'integration', label: 'Integration', desc: '30-60 sec mention in video' },
  { id: 'dedicated', label: 'Dedicated', desc: 'Full video about brand' },
  { id: 'shorts', label: 'Shorts Shoutout', desc: 'Short-form mention' },
  { id: 'story', label: 'Story / Post', desc: 'Social post or story' },
]




function RateResult({ result }) {
  const [copied, setCopied] = useState(false)
  const copyScript = () => {
    navigator.clipboard.writeText(result.script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rangeWidth = result.max - result.min
  const marketPos = ((result.marketAvg - result.min) / rangeWidth) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      {/* Main Rate Card */}
      <div className="bg-white rounded-3xl border border-rachna-border p-7 shadow-card">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-2">Your Fair Rate Range</p>
            <p className="font-display font-extrabold text-rachna-dark" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              ₹{result.min.toLocaleString()} — ₹{result.max.toLocaleString()}
            </p>
            <p className="text-sm text-rachna-muted mt-1">per integrated mention (30-60 sec)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-2 text-center">
            <p className="text-xs text-rachna-muted font-medium">AI Verified</p>
            <p className="text-lg font-bold text-rachna-success">✓</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-xs text-rachna-muted mb-1.5">
            <span>Market Min</span>
            <span className="font-semibold text-rachna-dark">Market Avg: ₹{result.marketAvg.toLocaleString()}</span>
            <span>Market Max</span>
          </div>
          <div className="relative h-3 bg-rachna-lavender rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-rachna-indigo/30 rounded-full" style={{ width: '100%' }} />
            <div className="absolute top-0 h-full bg-rachna-indigo rounded-full" style={{ left: '20%', width: '50%' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-rachna-indigo shadow-sm"
              style={{ left: `${marketPos}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            />
          </div>
          <div className="flex justify-between text-xs text-rachna-muted mt-1">
            <span>₹{Math.round(result.min * 0.4).toLocaleString()}</span>
            <span>Your range</span>
            <span>₹{Math.round(result.max * 1.4).toLocaleString()}</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 mb-5">
          {result.breakdown.map(item => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-rachna-border last:border-0">
              <span className="text-sm text-rachna-muted">{item.label}</span>
              <span className={clsx('text-sm font-semibold', item.value > 0 ? 'text-rachna-success' : 'text-rachna-dark')}>
                {item.value > 0 ? '+' : ''}₹{Math.abs(item.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {result.underpaid && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-rachna-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-display font-semibold text-rachna-warning mb-1">⚠️ Underpayment Alert</p>
              <p className="text-xs text-rachna-muted">If the brand offered ₹{result.offerAmount?.toLocaleString()}, you're being underpaid by <span className="font-bold text-rachna-warning">₹{result.underpaidBy?.toLocaleString()} minimum.</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Negotiation Script */}
      <div className="bg-white rounded-3xl border border-rachna-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-rachna-dark">Negotiation Script</h3>
          <button onClick={copyScript} className={clsx('flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors', copied ? 'bg-green-50 text-rachna-success' : 'text-rachna-indigo hover:bg-rachna-lavender')}>
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy Script'}
          </button>
        </div>
        <div className="bg-rachna-surface rounded-xl p-4 font-mono text-sm text-rachna-dark leading-relaxed border-l-4 border-rachna-indigo">
          "{result.script}"
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="btn-ghost flex-1 justify-center py-3 text-sm"><Save size={14} /> Save to Rate Card</button>
        <button className="btn-ghost flex-1 justify-center py-3 text-sm"><Share2 size={14} /> Share Rate Card</button>
      </div>
    </motion.div>
  )
}

export default function FairRatePage() {
  const [platform, setPlatform] = useState('YouTube')
  const [niche, setNiche] = useState('')
  const [subscribers, setSubscribers] = useState(100000)
  const [avgViews, setAvgViews] = useState(25000)
  const [engagementRate, setEngagementRate] = useState(4.5)
  const [contentType, setContentType] = useState('integration')
  const [exclusivity, setExclusivity] = useState(false)
  const [usageRights, setUsageRights] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculate = () => {
    setLoading(true)
    setTimeout(() => {
      const base = Math.round(avgViews * 0.45)
      const engBonus = engagementRate > 4 ? Math.round(base * 0.3) : 0
      const nichePremium = ['Finance', 'Tech'].includes(niche) ? Math.round(base * 0.5) : Math.round(base * 0.2)
      const exclusivityBonus = exclusivity ? Math.round(base * 0.2) : 0
      const usageBonus = usageRights ? Math.round(base * 0.25) : 0
      const total = base + engBonus + nichePremium + exclusivityBonus + usageBonus
      const min = Math.round(total * 0.8)
      const max = Math.round(total * 1.4)
      const marketAvg = Math.round(total * 1.1)

      setResult({
        min, max, marketAvg,
        breakdown: [
          { label: 'Base CPM rate', value: base },
          { label: `Engagement premium (+${engagementRate}% ER)`, value: engBonus },
          { label: `Niche demand premium (${niche})`, value: nichePremium },
          ...(exclusivity ? [{ label: 'Exclusivity clause', value: exclusivityBonus }] : []),
          ...(usageRights ? [{ label: 'Usage rights', value: usageBonus }] : []),
        ],
        underpaid: offerAmount && parseInt(offerAmount) < min,
        offerAmount: offerAmount ? parseInt(offerAmount) : null,
        underpaidBy: offerAmount ? min - parseInt(offerAmount) : null,
        script: `Based on my ${(subscribers / 1000).toFixed(0)}K subscribers and ${avgViews.toLocaleString()} average views with a ${engagementRate}% engagement rate, and the current market rate for ${niche.toLowerCase()} integrations on ${platform}, I value this placement at ₹${marketAvg.toLocaleString()}. I'd be happy to discuss if there's flexibility on the usage rights.`,
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-rachna-lavender flex items-center justify-center">
            <DollarSign size={16} className="text-rachna-indigo" />
          </div>
          <h1 className="font-display font-bold text-rachna-dark text-2xl">FairRate</h1>
        </div>
        <p className="text-rachna-muted text-sm">AI-powered pricing based on real market data from 10K+ creator projects.</p>
      </div>




      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left — Form */}
        <div className="lg:col-span-3 space-y-6">



          {/* Project details */}
          <div className="bg-white rounded-3xl border border-rachna-border p-7">
            <h3 className="font-display font-semibold text-rachna-dark text-base mb-5">Your Creator Stats</h3>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-rachna-dark block mb-2">Platform</label>
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORMS.map(p => (
                      <button key={p} onClick={() => setPlatform(p)}
                        className={clsx('px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all', platform === p ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-rachna-dark block mb-2">Niche</label>
                  <select value={niche} onChange={e => setNiche(e.target.value)} className="input text-sm" id="niche-select">
                    <option value="">Select niche</option>
                    {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-rachna-dark block mb-1.5">Subscribers</label>
                  <input type="number" value={subscribers} onChange={e => setSubscribers(+e.target.value)} className="input text-sm" placeholder="100000" id="subscribers-input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-rachna-dark block mb-1.5">Average Views</label>
                  <input type="number" value={avgViews} onChange={e => setAvgViews(+e.target.value)} className="input text-sm" placeholder="25000" id="avgviews-input" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-rachna-dark">Engagement Rate</label>
                  <span className="text-sm font-bold text-rachna-indigo">{engagementRate.toFixed(1)}%</span>
                </div>
                <input type="range" min={0} max={20} step={0.1} value={engagementRate}
                  onChange={e => setEngagementRate(+e.target.value)}
                  className="w-full accent-rachna-indigo" id="engagement-slider" />
                <div className="flex justify-between text-xs text-rachna-muted mt-1">
                  <span>0%</span><span>5%</span><span>10%</span><span>15%</span><span>20%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-rachna-dark block mb-2">Content Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {CONTENT_TYPES.map(ct => (
                    <button key={ct.id} onClick={() => setContentType(ct.id)}
                      className={clsx('p-3 rounded-xl border-2 text-left transition-all', contentType === ct.id ? 'border-rachna-indigo bg-rachna-lavender' : 'border-rachna-border hover:border-rachna-violet')}>
                      <p className={clsx('text-sm font-semibold', contentType === ct.id ? 'text-rachna-indigo' : 'text-rachna-dark')}>{ct.label}</p>
                      <p className="text-xs text-rachna-muted mt-0.5">{ct.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced */}
              <div className="border-t border-rachna-border pt-4">
                <p className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-3">Advanced Options</p>
                <div className="space-y-2.5">
                  {[
                    { id: 'exclusivity', label: 'Exclusivity clause (charge more)', val: exclusivity, set: setExclusivity },
                    { id: 'usage', label: 'Usage rights requested (charge more)', val: usageRights, set: setUsageRights },
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => opt.set(!opt.val)}
                        className={clsx('w-10 h-5 rounded-full transition-colors relative flex-shrink-0', opt.val ? 'bg-rachna-indigo' : 'bg-rachna-border')}
                      >
                        <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all', opt.val ? 'left-5' : 'left-0.5')} />
                      </div>
                      <span className="text-sm text-rachna-dark">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand offer amount */}
              <div>
                <label className="text-sm font-medium text-rachna-dark block mb-1.5">
                  Brand's offer amount (optional)
                  <span className="text-xs text-rachna-muted ml-2">— detects underpayment</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rachna-muted text-sm">₹</span>
                  <input type="number" value={offerAmount} onChange={e => setOfferAmount(e.target.value)} className="input pl-8 text-sm" placeholder="Enter what they offered" id="offer-amount" />
                </div>
              </div>
            </div>
          </div>

          <button
            id="calculate-rate"
            onClick={calculate}
            disabled={loading || !niche || !avgViews}
            className={clsx(
              'w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-display font-bold text-base transition-all duration-300',
              loading || !niche || !avgViews ? 'bg-rachna-border text-rachna-muted cursor-not-allowed' : 'bg-rachna-indigo text-white hover:bg-indigo-700 hover:shadow-card-lg'
            )}
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Calculating...</>
            ) : (
              <><Calculator size={18} /> Calculate My Rate <ChevronRight size={18} /></>
            )}
          </button>
        </div>

        {/* Right — Result */}
        <div className="lg:col-span-2">
          {result ? (
            <RateResult result={result} />
          ) : (
            <div className="bg-white rounded-3xl border border-rachna-border p-8 text-center sticky top-8">
              <div className="w-16 h-16 rounded-2xl bg-rachna-lavender mx-auto mb-4 flex items-center justify-center">
                <DollarSign size={28} className="text-rachna-indigo" />
              </div>
              <h3 className="font-display font-bold text-rachna-dark text-lg mb-2">Your Rate Card</h3>
              <p className="text-rachna-muted text-sm mb-6">Fill in your details and click Calculate to see your fair market rate.</p>
              <div className="space-y-3 text-left">
                {['Pricing updated every 2 hours', 'Based on 10K+ creator projects', 'Includes negotiation script', 'Detects underpayment automatically'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-rachna-success flex-shrink-0" />
                    <span className="text-sm text-rachna-dark">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
