// client/src/pages/freelancer/FreelancerProposalsPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Clock, CheckCircle2, XCircle } from 'lucide-react'
import clsx from 'clsx'
import { PROPOSALS } from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const STATUS = {
  pending:  { label: 'Pending',  icon: Clock,         cls: 'bg-amber-50 text-amber-600' },
  accepted: { label: 'Accepted', icon: CheckCircle2,  cls: 'bg-green-50 text-green-700' },
  rejected: { label: 'Rejected', icon: XCircle,       cls: 'bg-red-50   text-red-600' },
}

export default function FreelancerProposalsPage() {
  const [tab, setTab] = useState('All')

  const proposals = PROPOSALS.filter(p => tab === 'All' || p.status === tab.toLowerCase())

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">My Proposals</h1>
        <p className="text-sm text-rachna-muted mt-0.5">Track all your submitted proposals and their status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sent',  value: PROPOSALS.length, color: 'text-rachna-indigo', bg: 'bg-rachna-lavender' },
          { label: 'Accepted',    value: PROPOSALS.filter(p => p.status === 'accepted').length, color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Pending',     value: PROPOSALS.filter(p => p.status === 'pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-rachna-border p-5">
            <p className={clsx('font-display font-extrabold text-2xl', s.color)}>{s.value}</p>
            <p className="text-sm text-rachna-muted mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1 w-fit">
        {['All', 'Pending', 'Accepted', 'Rejected'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={clsx('px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              tab === t ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
            {t}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((p, i) => {
          const S = STATUS[p.status]
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(69,64,200,0.1)' }}
              className="bg-white rounded-2xl border border-rachna-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rachna-lavender flex items-center justify-center">
                    <FileText size={18} className="text-rachna-indigo" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-rachna-dark">{p.title}</h3>
                    <p className="text-sm text-rachna-muted">{p.client}</p>
                  </div>
                </div>
                <span className={clsx('flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0', S.cls)}>
                  <S.icon size={12} /> {S.label}
                </span>
              </div>
              <p className="text-sm text-rachna-muted mt-4 line-clamp-2">{p.coverLetter}</p>
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-rachna-border">
                <div>
                  <p className="text-xs text-rachna-muted">Budget Range</p>
                  <p className="text-sm font-semibold text-rachna-dark">{fmt(p.budgetMin)} – {fmt(p.budgetMax)}</p>
                </div>
                <div>
                  <p className="text-xs text-rachna-muted">Your Rate</p>
                  <p className="text-sm font-bold text-rachna-indigo">{fmt(p.proposedRate)}</p>
                </div>
                <div>
                  <p className="text-xs text-rachna-muted">Submitted</p>
                  <p className="text-sm text-rachna-dark">{p.submittedOn}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
