import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star, ArrowLeft, Download, Share2, Link2, CheckCircle2,
  XCircle, AlertTriangle, TrendingUp, Clock, Zap,
  FlaskConical, ChevronRight, Copy, RefreshCw
} from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import clsx from 'clsx'

const RESULTS = {
  overallScore: 72,
  ctrPrediction: 6.8,
  retentionRisk: 'medium',
  engagementScore: 74,
  personas: [
    { id: 'student', name: 'Priya', type: 'College Student', emoji: '👩‍🎓', wouldClick: true, rating: 4, reaction: 'Relatable thumbnail but the title feels a bit vague. Would click if the hook is strong.', mainConcern: 'Title lacks specificity' },
    { id: 'professional', name: 'Arjun', type: 'Working Professional', emoji: '👨‍💼', wouldClick: true, rating: 3, reaction: 'Title is clear but missing a specific number or result. Would watch if value is stated upfront.', mainConcern: 'No specific outcome stated' },
    { id: 'gamer', name: 'Ravi', type: 'Gen Z Gamer', emoji: '🎮', wouldClick: 'maybe', rating: 2, reaction: "Needs more energy in the thumbnail. Too calm for my feed.", mainConcern: 'Thumbnail not eye-catching enough' },
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
    alternatives: ['How I Hit 10K Subs in 90 Days with 0 Budget', '5 Mistakes I Made Starting YouTube (Save 6 Months)', "Why 99% of New Creators Quit in 60 Days (And How I Didn't)"],
  },
  hookFeedback: {
    issue: "Promise unclear — viewer doesn't know what they'll get",
    dropPointEstimate: '0:18',
    improvedHook: "If you want to grow on YouTube without spending a single rupee, in the next 8 minutes I'm going to show you exactly how I hit 10,000 subscribers — and you can copy this step by step.",
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

const RADAR_DATA = [
  { metric: 'Thumbnail', value: 75 },
  { metric: 'Title', value: 80 },
  { metric: 'Hook', value: 65 },
  { metric: 'Retention', value: 60 },
  { metric: 'Content', value: 70 },
  { metric: 'SEO', value: 72 },
]

function ScoreRing({ score }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 75 ? '#1D9E75' : score >= 55 ? '#F59E0B' : '#EF4444'

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E5E3F8" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none" stroke={color}
          strokeWidth="10" strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-extrabold text-3xl text-rachna-dark">{score}</span>
        <span className="text-xs text-rachna-muted font-medium">/100</span>
      </div>
    </div>
  )
}

function PersonaCard({ p }) {
  const clickColor = p.wouldClick === true ? 'text-rachna-success bg-green-50' : p.wouldClick === 'maybe' ? 'text-rachna-warning bg-amber-50' : 'text-rachna-danger bg-red-50'
  const clickLabel = p.wouldClick === true ? 'Would Click: YES' : p.wouldClick === 'maybe' ? 'Would Click: MAYBE' : 'Would Click: NO'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-rachna-border p-5 hover:shadow-card transition-shadow"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{p.emoji}</span>
        <div>
          <p className="font-display font-semibold text-rachna-dark text-sm">{p.name}</p>
          <p className="text-xs text-rachna-muted">{p.type}</p>
        </div>
        <span className={clsx('ml-auto text-xs font-bold px-2.5 py-1 rounded-full', clickColor)}>
          {p.wouldClick === true ? '✓' : p.wouldClick === 'maybe' ? '~' : '✗'} {p.wouldClick === true ? 'YES' : p.wouldClick === 'maybe' ? 'MAYBE' : 'NO'}
        </span>
      </div>
      <p className="text-xs text-rachna-muted italic leading-relaxed mb-3">"{p.reaction}"</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < p.rating ? 'text-amber-400 fill-amber-400' : 'text-rachna-border'} />)}
        </div>
        <span className="text-[10px] text-rachna-danger font-medium">⚠ {p.mainConcern}</span>
      </div>
    </motion.div>
  )
}

export default function AudienceLabResultPage() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const r = RESULTS

  const riskColor = { low: 'text-rachna-success bg-green-50', medium: 'text-rachna-warning bg-amber-50', high: 'text-rachna-danger bg-red-50' }
  const riskLabel = { low: 'Low', medium: 'Medium', high: 'High' }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/creator/audience-lab')} className="flex items-center gap-1.5 text-rachna-muted hover:text-rachna-dark text-sm transition-colors">
          <ArrowLeft size={16} /> AudienceLab
        </button>
        <span className="text-rachna-border">›</span>
        <h1 className="font-display font-semibold text-rachna-dark text-sm">Analysis Report</h1>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn-ghost py-2 px-4 text-xs"><Download size={13} /> Save Report</button>
          <button className="btn-ghost py-2 px-4 text-xs"><Share2 size={13} /> Share</button>
          <button className="btn-primary py-2 px-4 text-xs"><FlaskConical size={13} /> Analyze New</button>
        </div>
      </div>

      {/* ── Panel 1: Overall Score ── */}
      <div className="bg-white rounded-3xl border border-rachna-border p-8 mb-6">
        <div className="grid md:grid-cols-4 gap-6 items-center">
          <div className="text-center">
            <p className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-3">Overall Score</p>
            <ScoreRing score={r.overallScore} />
            <p className="text-sm font-semibold text-rachna-warning mt-2">Good Potential</p>
            <p className="text-xs text-rachna-muted">Fix the issues below to reach high performance.</p>
          </div>

          {[
            { label: 'Click Through Rate (CTR)', value: `${r.ctrPrediction}%`, sub: 'Above Average', icon: TrendingUp, color: 'text-rachna-success' },
            { label: 'Retention Risk', value: riskLabel[r.retentionRisk], sub: 'Review needed', icon: Clock, color: 'text-rachna-warning' },
            { label: 'Engagement Rate', value: `${r.engagementScore}%`, sub: 'Good', icon: Zap, color: 'text-rachna-indigo' },
          ].map(stat => (
            <div key={stat.label} className="bg-rachna-surface rounded-2xl p-5">
              <p className="text-xs text-rachna-muted mb-2">{stat.label}</p>
              <div className={clsx('flex items-center gap-2 mb-1', stat.color)}>
                <stat.icon size={16} />
                <span className="font-display font-bold text-2xl text-rachna-dark">{stat.value}</span>
              </div>
              {/* Mini sparkline */}
              <div className="h-8 flex items-end gap-0.5">
                {[40, 55, 45, 65, 58, 72, 68].map((v, i) => (
                  <div key={i} className={clsx('flex-1 rounded-sm', stat.color.replace('text-', 'bg-'))} style={{ height: `${v}%`, opacity: 0.3 + (i / 6) * 0.7 }} />
                ))}
              </div>
              <p className="text-xs font-semibold text-rachna-dark mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Radar */}
        <div className="mt-6 pt-6 border-t border-rachna-border">
          <p className="text-sm font-display font-semibold text-rachna-dark mb-4">Performance Breakdown</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#E5E3F8" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#8B89B0' }} />
                <Radar name="Score" dataKey="value" stroke="#4540C8" fill="#4540C8" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Panel 2: Persona Reactions ── */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-rachna-dark text-lg mb-4">
          Persona Reactions
          <span className="text-sm font-normal text-rachna-muted ml-2">How 5 different audience types react to your content</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {r.personas.map(p => <PersonaCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* ── Panel 3: Thumbnail + Title + Hook Feedback ── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Thumbnail Feedback */}
        <div className="bg-white rounded-3xl border border-rachna-border p-7">
          <h2 className="font-display font-bold text-rachna-dark text-base mb-5">Thumbnail Analysis</h2>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs font-display font-semibold text-rachna-success uppercase tracking-wider mb-3">✓ Strengths</p>
              <ul className="space-y-2">
                {r.thumbnailFeedback.strengths.map(s => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-rachna-success mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-rachna-dark">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-display font-semibold text-rachna-danger uppercase tracking-wider mb-3">✗ Weaknesses</p>
              <ul className="space-y-2">
                {r.thumbnailFeedback.weaknesses.map(w => (
                  <li key={w} className="flex items-start gap-2">
                    <XCircle size={13} className="text-rachna-danger mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-rachna-dark">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-rachna-surface rounded-xl p-4">
            <p className="text-xs font-display font-semibold text-rachna-dark mb-2 uppercase tracking-wider">💡 Suggestions</p>
            <ol className="space-y-1.5">
              {r.thumbnailFeedback.suggestions.map((s, i) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-rachna-indigo flex-shrink-0">{i + 1}.</span>
                  <span className="text-xs text-rachna-dark">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Hook + Title Feedback */}
        <div className="space-y-4">
          {/* Title */}
          <div className="bg-white rounded-3xl border border-rachna-border p-6">
            <h3 className="font-display font-bold text-rachna-dark text-sm mb-4">Title Feedback</h3>
            <div className="space-y-3">
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-xs font-semibold text-rachna-muted mb-1">Problem</p>
                <p className="text-xs text-rachna-danger">{r.titleFeedback.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-rachna-dark mb-2">Better alternatives:</p>
                {r.titleFeedback.alternatives.map((alt, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2 group">
                    <span className="text-xs text-rachna-indigo font-bold mt-0.5">{i + 1}.</span>
                    <p className="text-xs text-rachna-dark flex-1">"{alt}"</p>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy size={12} className="text-rachna-muted hover:text-rachna-indigo" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hook */}
          <div className="bg-white rounded-3xl border border-rachna-border p-6">
            <h3 className="font-display font-bold text-rachna-dark text-sm mb-4">Hook Feedback</h3>
            <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-3 border border-amber-100 mb-3">
              <AlertTriangle size={13} className="text-rachna-warning flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-rachna-warning">Drop at {r.hookFeedback.dropPointEstimate}</p>
                <p className="text-xs text-rachna-muted">{r.hookFeedback.issue}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap size={12} className="text-rachna-success" />
                <p className="text-xs font-semibold text-rachna-success">Improved Hook</p>
              </div>
              <p className="text-xs text-rachna-dark italic leading-relaxed">"{r.hookFeedback.improvedHook}"</p>
              <button className="mt-2 flex items-center gap-1.5 text-xs text-rachna-indigo font-semibold hover:underline">
                <Copy size={11} /> Copy improved hook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel 5: Prioritized Actions ── */}
      <div className="bg-white rounded-3xl border border-rachna-border p-8">
        <h2 className="font-display font-bold text-rachna-dark text-base mb-6">
          Fix These (in this order)
        </h2>
        <div className="space-y-3">
          {r.prioritizedActions.map((action, i) => {
            const isPriority = (p) => action.priority === p
            return (
              <div key={i} className={clsx(
                'flex items-center gap-4 p-4 rounded-xl border',
                isPriority('high') ? 'bg-red-50 border-red-100' :
                isPriority('medium') ? 'bg-amber-50 border-amber-100' :
                'bg-green-50 border-green-100'
              )}>
                <span className="text-lg">
                  {isPriority('high') ? '🔴' : isPriority('medium') ? '🟡' : '🟢'}
                </span>
                <div className="flex-1">
                  <span className={clsx('text-xs font-display font-bold uppercase tracking-wider mr-2',
                    isPriority('high') ? 'text-rachna-danger' : isPriority('medium') ? 'text-rachna-warning' : 'text-rachna-success'
                  )}>
                    {action.priority}
                  </span>
                  <span className="text-sm text-rachna-dark">{action.action}</span>
                </div>
                <span className="text-xs text-rachna-muted font-mono">#{i + 1}</span>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 mt-8">
          <button className="btn-ghost py-2.5 px-5 text-sm"><Download size={14} /> Save Report</button>
          <button className="btn-ghost py-2.5 px-5 text-sm"><Share2 size={14} /> Share with Team</button>
          <button onClick={() => navigate('/creator/workspace/1')} className="btn-ghost py-2.5 px-5 text-sm"><Link2 size={14} /> Link to Workspace</button>
          <button onClick={() => navigate('/creator/audience-lab')} className="btn-primary py-2.5 px-5 text-sm ml-auto"><RefreshCw size={14} /> Test Again</button>
        </div>
      </div>
    </div>
  )
}
