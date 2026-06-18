import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, ChevronDown, ChevronUp, Download, Mail, Link2, FileText, Plus } from 'lucide-react'
import clsx from 'clsx'

const MOCK_CLAUSES = [
  {
    id: 1, type: 'EXCLUSIVITY CLAUSE', risk: 'high',
    text: '"Creator agrees not to promote any competing product for 24 months after this collaboration."',
    why: 'This is an extreme 24-month exclusivity. Industry standard is 30-90 days. You would lose ₹2-5L+ in potential deals over 2 years.',
    ask: 'Please reduce exclusivity to 30 days post-publish, and define "competing product" narrowly to the specific category only.',
  },
  {
    id: 2, type: 'USAGE RIGHTS', risk: 'high',
    text: '"Brand may use creator\'s content in perpetuity across all channels including paid advertising."',
    why: 'They can run your face in ads forever with no additional compensation. This is worth ₹5,000-25,000+ on top of your base rate.',
    ask: 'Add: Usage rights limited to 6 months from publish date. Paid advertising usage requires additional licensing fee.',
  },
  {
    id: 3, type: 'PAYMENT TIMELINE', risk: 'medium',
    text: '"Payment within 90 days of invoice submission."',
    why: '90 days is excessive. Industry standard is 30-45 days. This impacts your cash flow significantly.',
    ask: 'Request Net 30 payment terms instead of Net 90.',
  },
  {
    id: 4, type: 'CONTENT OWNERSHIP', risk: 'medium',
    text: '"All content created under this agreement becomes the intellectual property of the brand."',
    why: 'You lose IP rights to content you created. You should retain ownership with a limited license grant to the brand.',
    ask: 'Change to: Creator retains all IP rights and grants brand a limited, non-exclusive license for 12 months.',
  },
  {
    id: 5, type: 'PERFORMANCE GUARANTEE', risk: 'low',
    text: '"Creator guarantees minimum 50,000 views within 30 days of publication."',
    why: 'View guarantees are unusual and risky. YouTube algorithms are unpredictable.',
    ask: 'Remove guaranteed view minimums. Offer best-effort promotion instead.',
  },
  {
    id: 6, type: 'NON-DISPARAGEMENT', risk: 'low',
    text: '"Creator agrees not to make negative statements about the brand for 2 years."',
    why: 'Standard clause but the duration is long. Limits your authentic creator voice.',
    ask: 'Acceptable if limited to 6 months and narrowly defined as factually false statements only.',
  },
]

const PAST_SCANS = [
  { id: '1', brand: 'Brand X', risk: 'high', date: 'Nov 12, 2024', score: 78 },
  { id: '2', brand: 'Brand Y', risk: 'safe', date: 'Oct 28, 2024', score: 18 },
  { id: '3', brand: 'Brand Z', risk: 'review_needed', date: 'Oct 15, 2024', score: 45 },
]

const RISK_CONFIG = {
  high: { label: '🔴 HIGH RISK', color: 'text-rachna-danger', bg: 'bg-red-50', border: 'border-red-200', badge: 'badge-danger' },
  medium: { label: '🟡 REVIEW NEEDED', color: 'text-rachna-warning', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'badge-warning' },
  low: { label: '🟢 LOW RISK', color: 'text-rachna-success', bg: 'bg-green-50', border: 'border-green-200', badge: 'badge-success' },
  safe: { label: '✅ SAFE', color: 'text-rachna-success', bg: 'bg-green-50', border: 'border-green-200', badge: 'badge-success' },
  review_needed: { label: '⚠️ REVIEW', color: 'text-rachna-warning', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'badge-warning' },
}

function ClauseCard({ clause }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = RISK_CONFIG[clause.risk]

  return (
    <div className={clsx('rounded-2xl border p-5 transition-all', cfg.bg, cfg.border)}>
      <button className="w-full flex items-center justify-between" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          {clause.risk === 'high' ? <XCircle size={18} className="text-rachna-danger flex-shrink-0" /> :
           clause.risk === 'medium' ? <AlertTriangle size={18} className="text-rachna-warning flex-shrink-0" /> :
           <CheckCircle2 size={18} className="text-rachna-success flex-shrink-0" />}
          <div className="text-left">
            <p className={clsx('text-sm font-display font-bold', cfg.color)}>{clause.type} — {clause.risk.toUpperCase().replace('_', ' ')}</p>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-rachna-muted" /> : <ChevronDown size={16} className="text-rachna-muted" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-xs font-semibold text-rachna-muted mb-2 uppercase tracking-wider">Contract Text</p>
                <p className="text-sm text-rachna-dark italic leading-relaxed">{clause.text}</p>
              </div>
              <div>
                <p className="text-xs font-display font-bold text-rachna-danger uppercase tracking-wider mb-2">Why this is dangerous:</p>
                <p className="text-sm text-rachna-dark leading-relaxed">{clause.why}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-xs font-display font-bold text-rachna-success uppercase tracking-wider mb-2">What to ask for:</p>
                <p className="text-sm text-rachna-dark leading-relaxed">{clause.ask}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ShieldPage() {
  const [mode, setMode] = useState('upload') // upload | paste
  const [contractText, setContractText] = useState('')
  const [brandName, setBrandName] = useState('')
  const [hasResults, setHasResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedScan, setSelectedScan] = useState(null)

  const scan = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setHasResults(true)
    }, 2000)
  }

  const totalScore = 78
  const highRisk = MOCK_CLAUSES.filter(c => c.risk === 'high').length
  const medRisk = MOCK_CLAUSES.filter(c => c.risk === 'medium').length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
            <ShieldCheck size={16} className="text-rachna-danger" />
          </div>
          <h1 className="font-display font-bold text-rachna-dark text-2xl">CreatorShield</h1>
        </div>
        <p className="text-rachna-muted text-sm">AI-powered contract scanner. Protect yourself before you sign.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left — Upload + Past Scans */}
        <div className="space-y-5">
          {/* Upload */}
          {!hasResults ? (
            <div className="bg-white rounded-3xl border border-rachna-border p-7">
              <h3 className="font-display font-semibold text-rachna-dark mb-5">Upload Your Contract</h3>

              <div className="flex gap-2 mb-5">
                {[{ id: 'upload', label: '📎 Upload PDF' }, { id: 'paste', label: '📋 Paste Text' }].map(m => (
                  <button key={m.id} onClick={() => setMode(m.id)}
                    className={clsx('flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all', mode === m.id ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                    {m.label}
                  </button>
                ))}
              </div>

              {mode === 'upload' ? (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-rachna-border rounded-2xl cursor-pointer hover:border-rachna-indigo hover:bg-rachna-lavender/30 transition-all group mb-4">
                  <Upload size={24} className="text-rachna-muted group-hover:text-rachna-indigo mb-2 transition-colors" />
                  <p className="text-sm font-medium text-rachna-dark group-hover:text-rachna-indigo">Drop PDF here</p>
                  <p className="text-xs text-rachna-muted mt-1">or click to browse</p>
                  <input type="file" accept=".pdf" className="hidden" id="contract-upload" />
                </label>
              ) : (
                <textarea
                  value={contractText}
                  onChange={e => setContractText(e.target.value)}
                  placeholder="Paste your contract text here..."
                  className="input h-40 resize-none mb-4"
                  id="contract-text"
                />
              )}

              <div className="mb-4">
                <label className="text-sm font-medium text-rachna-dark block mb-1.5">Brand Name (optional)</label>
                <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} className="input text-sm" placeholder="e.g. Brand X" id="brand-name" />
              </div>

              <button
                id="scan-contract"
                onClick={scan}
                disabled={loading}
                className={clsx('w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-bold text-sm transition-all', loading ? 'bg-rachna-border text-rachna-muted cursor-not-allowed' : 'bg-rachna-indigo text-white hover:bg-indigo-700')}
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Scanning 12 clause types...</>
                ) : (
                  <><ShieldCheck size={16} /> Scan Contract</>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rachna-border p-6">
              <button onClick={() => setHasResults(false)} className="text-xs text-rachna-indigo font-semibold hover:underline mb-4 flex items-center gap-1">
                <Plus size={12} className="rotate-45" /> New Scan
              </button>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
                <p className="text-sm font-display font-bold text-rachna-danger mb-0.5">🔴 HIGH RISK ({totalScore}/100)</p>
                <p className="text-xs text-rachna-muted">{highRisk} dangerous clauses, {medRisk} to review</p>
              </div>
            </div>
          )}

          {/* Past Scans */}
          <div className="bg-white rounded-3xl border border-rachna-border p-6">
            <h3 className="font-display font-semibold text-rachna-dark text-sm mb-4">Past Scans</h3>
            <div className="space-y-2">
              {PAST_SCANS.map(scan => {
                const cfg = RISK_CONFIG[scan.risk] || RISK_CONFIG.safe
                return (
                  <button
                    key={scan.id}
                    onClick={() => setHasResults(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rachna-surface transition-colors text-left"
                  >
                    <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0', scan.risk === 'high' ? 'bg-rachna-danger' : scan.risk === 'safe' ? 'bg-rachna-success' : 'bg-rachna-warning')}>
                      {scan.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-rachna-dark">{scan.brand}</p>
                      <p className="text-[10px] text-rachna-muted">{scan.date}</p>
                    </div>
                    <span className={clsx('text-[10px] font-bold', cfg.color)}>
                      {scan.risk === 'high' ? '⚠️ HIGH' : scan.risk === 'safe' ? '✓ SAFE' : '~ REVIEW'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* What we scan for */}
          <div className="bg-rachna-lavender rounded-3xl p-6">
            <h3 className="font-display font-semibold text-rachna-indigo text-sm mb-3">12 Clauses We Scan</h3>
            <div className="grid grid-cols-2 gap-1">
              {['Exclusivity period', 'Usage rights', 'Payment timeline', 'IP ownership', 'Approval process', 'Moral clause', 'Non-disparagement', 'Liquidated damages', 'Termination', 'Geographic limits', 'Performance guarantees', 'Auto-renewal'].map(c => (
                <div key={c} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rachna-indigo flex-shrink-0" />
                  <span className="text-xs text-rachna-dark">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Results */}
        <div className="lg:col-span-2">
          {hasResults ? (
            <div className="space-y-5">
              {/* Risk Score Banner */}
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-7">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-rachna-danger flex items-center justify-center text-white font-display font-extrabold text-2xl flex-shrink-0">
                    {totalScore}
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-rachna-danger text-xl">🔴 HIGH RISK</p>
                    <p className="text-sm text-rachna-dark mt-1">This contract has <strong>{highRisk} dangerous clauses</strong> you must fix before signing.</p>
                  </div>
                </div>
              </div>

              {/* Clauses */}
              <div>
                <h3 className="font-display font-bold text-rachna-dark mb-4">Clause Breakdown</h3>
                <div className="space-y-3">
                  {MOCK_CLAUSES.map(clause => <ClauseCard key={clause.id} clause={clause} />)}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-3xl border border-rachna-border p-7">
                <h3 className="font-display font-bold text-rachna-dark mb-3">Summary</h3>
                <p className="text-sm text-rachna-dark leading-relaxed mb-6">
                  This contract gives the brand unlimited usage rights, a 24-month exclusivity lock-in, and a 90-day payment window. You should negotiate clauses 1 and 2 before signing. Clause 3 is negotiable but not a dealbreaker. Clauses 5 and 6 are industry standard and acceptable.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-ghost py-2.5 px-5 text-sm"><Download size={14} /> Download Report</button>
                  <button className="btn-ghost py-2.5 px-5 text-sm"><Mail size={14} /> Email to Manager</button>
                  <button className="btn-ghost py-2.5 px-5 text-sm"><Link2 size={14} /> Save to Workspace</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rachna-border p-12 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-rachna-lavender mx-auto mb-5 flex items-center justify-center">
                  <ShieldCheck size={36} className="text-rachna-indigo" />
                </div>
                <h3 className="font-display font-bold text-rachna-dark text-xl mb-3">Upload a contract to scan</h3>
                <p className="text-rachna-muted text-sm max-w-xs mx-auto">CreatorShield analyzes contracts for 12 types of risky clauses using AI — in seconds.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
