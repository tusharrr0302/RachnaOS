// client/src/pages/freelancer/MarketplacePage.jsx
// Freelancer seller view — browse open gigs
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, IndianRupee } from 'lucide-react'
import clsx from 'clsx'
import { OPPORTUNITIES } from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const ALL_SKILLS = ['All', 'Video Editing', 'Color Grading', 'Motion Graphics', 'Thumbnail Design']
const ALL_EXP    = ['All', 'Beginner', 'Intermediate', 'Expert']

export default function MarketplacePage() {
  const [skill, setSkill] = useState('All')
  const [exp,   setExp]   = useState('All')
  const [search, setSearch] = useState('')

  const filtered = OPPORTUNITIES.filter(o =>
    (skill === 'All' || o.category === skill) &&
    (exp   === 'All' || o.experience === exp) &&
    (o.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-xl">Marketplace</h1>
          <p className="text-sm text-rachna-muted mt-0.5">Browse open gigs from creators across India</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-rachna-muted">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {filtered.length} opportunities live
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white border border-rachna-border rounded-xl px-3 py-2">
          <Search size={15} className="text-rachna-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search opportunities..."
            className="bg-transparent text-sm outline-none text-rachna-dark placeholder:text-rachna-muted w-44" />
        </div>
        <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1">
          {ALL_SKILLS.map(s => (
            <button key={s} onClick={() => setSkill(s)}
              className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                skill === s ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1">
          {ALL_EXP.map(e => (
            <button key={e} onClick={() => setExp(e)}
              className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                exp === e ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((o, i) => (
          <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(69,64,200,0.12)' }}
            className="bg-white rounded-2xl border border-rachna-border p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rachna-lavender flex items-center justify-center text-2xl flex-shrink-0">
                {o.categoryIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-rachna-dark">{o.title}</h3>
                    <p className="text-sm text-rachna-muted">{o.clientName} · {o.postedAgo}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-rachna-indigo font-display font-bold">
                      <IndianRupee size={14} />
                      <span>{fmt(o.budgetMin).replace('₹','')} – {fmt(o.budgetMax)}</span>
                    </div>
                    <p className="text-xs text-rachna-muted mt-0.5">{o.experience}</p>
                  </div>
                </div>
                <p className="text-sm text-rachna-muted mt-2 line-clamp-2">{o.description}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {o.tags.map(tag => (
                      <span key={tag} className="text-xs bg-rachna-surface text-rachna-muted px-2.5 py-1 rounded-full border border-rachna-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="btn-ghost text-xs px-4 py-2">Save</button>
                    <button className="btn-indigo-solid text-xs px-4 py-2">Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-rachna-border p-12 text-center text-rachna-muted text-sm">
            No opportunities match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
