// client/src/pages/freelancer/FreelancerProjectsPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MoreVertical, Search, Filter } from 'lucide-react'
import clsx from 'clsx'
import { PROJECTS, COMPLETED_PROJECTS } from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const categoryColors = {
  'Video Editing':    'bg-indigo-50 text-indigo-700',
  'Color Grading':    'bg-green-50  text-green-700',
  'Motion Graphics':  'bg-amber-50  text-amber-700',
  'Thumbnail Design': 'bg-red-50    text-red-600',
}

const statusColors = {
  'In Progress': 'bg-rachna-lavender text-rachna-indigo',
  'Completed':   'bg-green-50 text-green-700',
}

const ALL = [...PROJECTS, ...COMPLETED_PROJECTS]

export default function FreelancerProjectsPage() {
  const [tab, setTab] = useState('Active')
  const [search, setSearch] = useState('')

  const projects = (tab === 'Active' ? PROJECTS : tab === 'Completed' ? COMPLETED_PROJECTS : ALL)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-xl">My Projects</h1>
          <p className="text-sm text-rachna-muted mt-0.5">Track all your active and past projects</p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1">
          {['All', 'Active', 'Completed'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                tab === t ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-rachna-border rounded-xl px-3 py-2">
          <Search size={15} className="text-rachna-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="bg-transparent text-sm outline-none text-rachna-dark placeholder:text-rachna-muted w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
        <div className="divide-y divide-rachna-border">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: p.color || '#4540C8' }}>
                {p.clientAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rachna-dark text-sm">{p.title}</p>
                <p className="text-xs text-rachna-muted">{p.client}</p>
              </div>
              <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full hidden md:block', categoryColors[p.category])}>
                {p.category}
              </span>
              <div className="w-28 hidden lg:block">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-rachna-muted">{p.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-rachna-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.05 }}
                    className="h-full bg-rachna-indigo rounded-full"
                  />
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-1.5">
                <Calendar size={13} className="text-rachna-muted" />
                <span className="text-xs text-rachna-dark">{p.dueDate}</span>
              </div>
              <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', statusColors[p.status] || 'bg-rachna-lavender text-rachna-indigo')}>
                {p.status}
              </span>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-rachna-muted">Budget</p>
                <p className="text-sm font-bold text-rachna-dark">{fmt(p.budget)}</p>
              </div>
              <button className="w-7 h-7 rounded-lg hover:bg-rachna-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={14} className="text-rachna-muted" />
              </button>
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="px-6 py-12 text-center text-rachna-muted text-sm">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
