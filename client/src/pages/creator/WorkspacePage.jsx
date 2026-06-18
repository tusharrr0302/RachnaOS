import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Grid3X3, List, Search, Filter, Archive, MoreHorizontal, Calendar, Users, BarChart3 } from 'lucide-react'
import clsx from 'clsx'

const STATUS_COLORS = {
  idea:       { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Idea' },
  scripting:  { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400', label: 'Scripting' },
  filming:    { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400', label: 'Filming' },
  editing:    { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400', label: 'Editing' },
  review:     { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-400', label: 'Review' },
  published:  { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400', label: 'Published' },
}

const STATUS_PROGRESS = { idea: 10, scripting: 30, filming: 50, editing: 70, review: 85, published: 100 }

const MOCK_PROJECTS = [
  {
    id: '1', title: 'How I Made ₹1L From YouTube in 60 Days', status: 'scripting', platform: 'YouTube', targetDate: 'Dec 15, 2024',
    editor: '@raj_edits', designer: '@thumbpro', views: null, thumbnail: null,
  },
  {
    id: '2', title: '5 Budget YouTube Setup Under ₹10,000', status: 'published', platform: 'YouTube', targetDate: 'Nov 28, 2024',
    editor: null, designer: null, views: '82K', thumbnail: null,
  },
  {
    id: '3', title: '24 Hours Surviving in Delhi with No Plan', status: 'editing', platform: 'YouTube', targetDate: 'Dec 20, 2024',
    editor: '@aditya_edits', designer: '@rohit_design', views: null, thumbnail: null,
  },
  {
    id: '4', title: 'Finance Myths That Keep You Broke', status: 'idea', platform: 'Shorts', targetDate: 'Dec 30, 2024',
    editor: null, designer: null, views: null, thumbnail: null,
  },
  {
    id: '5', title: 'My Honest Review: Groww vs Zerodha 2024', status: 'review', platform: 'YouTube', targetDate: 'Dec 18, 2024',
    editor: '@raj_edits', designer: '@thumbpro', views: null, thumbnail: null,
  },
  {
    id: '6', title: 'How SIPs Actually Work (Nobody Explains This)', status: 'filming', platform: 'YouTube', targetDate: 'Dec 22, 2024',
    editor: null, designer: null, views: null, thumbnail: null,
  },
]

function ProjectCard({ project, onClick }) {
  const s = STATUS_COLORS[project.status]
  const progress = STATUS_PROGRESS[project.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover cursor-pointer group"
      onClick={() => onClick(project.id)}
    >
      {/* Thumbnail placeholder */}
      <div className="h-36 rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-rachna-lavender to-rachna-indigo/20 flex items-center justify-center relative">
        <span className="text-4xl opacity-30">🎬</span>
        <div className="absolute top-2 right-2">
          <button
            onClick={e => e.stopPropagation()}
            className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal size={14} className="text-rachna-muted" />
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-2 mb-3">
        <span className={clsx('flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full', s.bg, s.text)}>
          <span className={clsx('w-1.5 h-1.5 rounded-full', s.dot)} />
          {s.label}
        </span>
        <span className="text-xs text-rachna-muted">{project.platform}</span>
      </div>

      {/* Progress */}
      <div className="h-1 bg-rachna-border rounded-full overflow-hidden mb-3">
        <div className="h-full bg-rachna-indigo rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <h3 className="font-display font-semibold text-rachna-dark text-sm leading-tight mb-3 line-clamp-2">
        {project.title}
      </h3>

      <div className="space-y-1.5 mb-4">
        {project.targetDate && (
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-rachna-muted flex-shrink-0" />
            <span className="text-xs text-rachna-muted">Target: {project.targetDate}</span>
          </div>
        )}
        {project.editor && (
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-rachna-muted flex-shrink-0" />
            <span className="text-xs text-rachna-muted">Editor: {project.editor}</span>
          </div>
        )}
        {project.views && (
          <div className="flex items-center gap-1.5">
            <BarChart3 size={12} className="text-rachna-success flex-shrink-0" />
            <span className="text-xs text-rachna-success font-semibold">{project.views} views</span>
          </div>
        )}
      </div>

      <button className="w-full text-center text-xs font-semibold text-rachna-indigo hover:text-indigo-700 py-2 rounded-xl hover:bg-rachna-lavender transition-all duration-150">
        {project.status === 'published' ? 'View Analytics →' : 'Open Project →'}
      </button>
    </motion.div>
  )
}

export default function WorkspacePage() {
  const navigate = useNavigate()
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_PROJECTS.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">Workspace</h1>
          <p className="text-rachna-muted text-sm">All your video projects in one place.</p>
        </div>
        <button
          id="new-project-btn"
          onClick={() => navigate('/creator/workspace/new')}
          className="btn-primary"
        >
          <Plus size={16} /> New Video Project
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rachna-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input pl-9 py-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'scripting', label: 'Active' },
            { id: 'published', label: 'Published' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx('px-3 py-1.5 rounded-lg text-xs font-semibold transition-all', filter === f.id ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1 ml-auto">
          <button onClick={() => setView('grid')} className={clsx('p-1.5 rounded-lg transition-colors', view === 'grid' ? 'bg-rachna-lavender text-rachna-indigo' : 'text-rachna-muted hover:text-rachna-dark')}>
            <Grid3X3 size={15} />
          </button>
          <button onClick={() => setView('list')} className={clsx('p-1.5 rounded-lg transition-colors', view === 'list' ? 'bg-rachna-lavender text-rachna-indigo' : 'text-rachna-muted hover:text-rachna-dark')}>
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Projects', value: MOCK_PROJECTS.length, color: 'text-rachna-dark' },
          { label: 'In Progress', value: MOCK_PROJECTS.filter(p => !['idea', 'published'].includes(p.status)).length, color: 'text-rachna-indigo' },
          { label: 'Published', value: MOCK_PROJECTS.filter(p => p.status === 'published').length, color: 'text-rachna-success' },
          { label: 'Ideas', value: MOCK_PROJECTS.filter(p => p.status === 'idea').length, color: 'text-rachna-warning' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-rachna-border px-5 py-4">
            <p className={clsx('text-2xl font-display font-bold mb-0.5', s.color)}>{s.value}</p>
            <p className="text-xs text-rachna-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className={clsx(view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4')}>
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onClick={id => navigate(`/creator/workspace/${id}`)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-2xl bg-rachna-lavender mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">🎬</span>
          </div>
          <h3 className="font-display font-semibold text-rachna-dark mb-2">No projects found</h3>
          <p className="text-rachna-muted text-sm mb-6">Create your first video project to get started</p>
          <button onClick={() => navigate('/creator/workspace/new')} className="btn-primary">
            <Plus size={16} /> New Video Project
          </button>
        </div>
      )}
    </div>
  )
}
