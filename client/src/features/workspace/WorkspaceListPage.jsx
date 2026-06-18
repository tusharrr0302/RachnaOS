import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Grid3X3, List, Search, BarChart3, LayoutGrid, Film, Tv, CheckCircle2, Clock, X } from 'lucide-react'
import clsx from 'clsx'

const FILTERS = ['All', 'Active', 'Completed', 'Archived']

const PROJECTS = [
  {
    id: '1',
    title: '24 Hours Surviving in Delhi',
    status: 'In Progress',
    category: 'Travel Vlog',
    platform: 'YouTube',
    dueDate: 'May 20',
    progress: 40,
    team: ['A', 'R', 'D', 'M', 'K'],
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Budget Gaming PC Setup 2025',
    status: 'Published',
    category: 'Tech',
    platform: 'YouTube',
    publishedDate: 'Nov 28',
    progress: 100,
    views: '82K',
    team: ['A', 'D'],
    thumbnail: null,
  },
  {
    id: '3',
    title: 'Delhi Street Food Guide — 40 Dishes',
    status: 'Scripting',
    category: 'Food & Travel',
    platform: 'YouTube',
    dueDate: 'Jun 5',
    progress: 20,
    team: ['A', 'K'],
    thumbnail: null,
  },
  {
    id: '4',
    title: 'How to Edit Like a Pro (Free Tools)',
    status: 'Filming',
    category: 'Tutorial',
    platform: 'Shorts',
    dueDate: 'Jun 10',
    progress: 35,
    team: ['A', 'D', 'R'],
    thumbnail: null,
  },
]

const STATUS_BADGE = {
  'In Progress': 'bg-blue-50 text-blue-600',
  'Published':   'bg-green-50 text-green-700',
  'Scripting':   'bg-amber-50 text-amber-600',
  'Filming':     'bg-purple-50 text-purple-700',
  'Archived':    'bg-rachna-surface text-rachna-muted',
}

const PLATFORM_ICON = {
  'YouTube': <Tv size={12} />,
  'Shorts':  <Film size={12} />,
}

const GRADIENT_COVERS = [
  'from-indigo-400 to-purple-500',
  'from-blue-400 to-cyan-500',
  'from-orange-400 to-red-500',
  'from-teal-400 to-green-500',
]

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-rachna-border overflow-hidden hover:shadow-card-lg transition-all duration-200 group cursor-pointer"
      onClick={() => onClick(project.id)}
    >
      {/* Thumbnail */}
      <div className={`h-36 bg-gradient-to-br ${GRADIENT_COVERS[index % GRADIENT_COVERS.length]} relative flex items-center justify-center overflow-hidden`}>
        <div className="text-white/20 text-6xl font-display font-extrabold select-none">
          {project.title[0]}
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90', STATUS_BADGE[project.status]?.split(' ')[1])}>
            {project.status}
          </span>
        </div>
        {/* Platform icon */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {PLATFORM_ICON[project.platform]}
          {project.platform}
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-white/80 transition-all" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-display font-bold text-rachna-dark text-sm mb-2 leading-snug line-clamp-2 group-hover:text-rachna-indigo transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-rachna-muted mb-3">
          <span className="font-medium text-rachna-dark">{project.category}</span>
          <span>·</span>
          {project.status === 'Published' ? (
            <span className="flex items-center gap-0.5"><CheckCircle2 size={10} className="text-rachna-success" /> Published {project.publishedDate}</span>
          ) : (
            <span className="flex items-center gap-0.5"><Clock size={10} /> Due {project.dueDate}</span>
          )}
        </div>

        {/* Published views OR team */}
        {project.views ? (
          <div className="flex items-center gap-1.5 mb-3">
            <BarChart3 size={12} className="text-rachna-muted" />
            <span className="text-xs font-semibold text-rachna-dark">{project.views} views</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1.5">
              {project.team.slice(0, 4).map((m, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-rachna-indigo flex items-center justify-center text-white text-[8px] font-bold border border-white">
                  {m}
                </div>
              ))}
              {project.team.length > 4 && (
                <div className="w-5 h-5 rounded-full bg-rachna-lavender flex items-center justify-center text-rachna-indigo text-[8px] font-bold border border-white">
                  +{project.team.length - 4}
                </div>
              )}
            </div>
            <span className="text-[10px] text-rachna-muted">{project.team.length} member{project.team.length !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* CTA */}
        {project.status === 'Published' ? (
          <button
            onClick={e => { e.stopPropagation(); onClick(project.id) }}
            className="w-full text-xs font-semibold text-rachna-indigo bg-rachna-lavender py-2 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            View Analytics →
          </button>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onClick(project.id) }}
            className="w-full text-xs font-semibold text-white bg-rachna-indigo py-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Open Canvas →
          </button>
        )}
      </div>
    </motion.div>
  )
}

function NewProjectModal({ onClose, onCreate }) {
  const [title, setTitle]       = useState('')
  const [category, setCategory] = useState('Travel Vlog')
  const [platform, setPlatform] = useState('YouTube')
  const [dueDate, setDueDate]   = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-rachna-dark text-xl">New Project</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-rachna-surface flex items-center justify-center hover:bg-rachna-lavender text-rachna-muted hover:text-rachna-dark transition-colors">
            <X size={15} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-rachna-dark block mb-1.5">Video Title</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              id="new-project-title"
              className="input"
              placeholder="e.g. 24 Hours Surviving in Mumbai"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rachna-dark block mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input">
              {['Travel Vlog', 'Tech', 'Food & Travel', 'Tutorial', 'Lifestyle', 'Finance', 'Gaming', 'Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-rachna-dark block mb-1.5">Platform</label>
            <div className="flex gap-2">
              {['YouTube', 'Shorts', 'Instagram'].map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={clsx('flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all', platform === p ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rachna-dark block mb-1.5">Target Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input" />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-ghost flex-1 justify-center">Cancel</button>
            <button
              disabled={!title.trim()}
              id="create-project-btn"
              onClick={() => { if (title.trim()) { onCreate({ title, category, platform, dueDate }); onClose() } }}
              className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function WorkspaceListPage() {
  const navigate = useNavigate()
  const [filter, setFilter]   = useState('All')
  const [search, setSearch]   = useState('')
  const [view, setView]       = useState('grid')
  const [projects, setProjects] = useState(PROJECTS)
  const [showModal, setShowModal] = useState(false)

  const filtered = projects.filter(p => {
    if (filter === 'Active' && p.status === 'Published') return false
    if (filter === 'Completed' && p.status !== 'Published') return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleCreate = (newProject) => {
    setProjects(prev => [{
      id: String(Date.now()),
      ...newProject,
      status: 'Idea',
      progress: 0,
      team: ['A'],
    }, ...prev])
    navigate(`/creator/workspace/${Date.now()}`)
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">Workspace</h1>
          <p className="text-rachna-muted text-sm">Manage all your video projects in one place.</p>
        </div>
        <button
          id="new-project-btn"
          onClick={() => setShowModal(true)}
          className="btn-primary text-sm"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Filter tabs */}
        <div className="flex items-center bg-white border border-rachna-border rounded-xl p-1 gap-0.5">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx('px-3 py-1.5 rounded-lg text-xs font-semibold transition-all', filter === f ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rachna-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="input pl-9 py-2 text-sm w-52"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-white border border-rachna-border rounded-xl p-1 gap-0.5 ml-auto">
          <button onClick={() => setView('grid')} className={clsx('w-8 h-8 rounded-lg flex items-center justify-center transition-all', view === 'grid' ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
            <LayoutGrid size={15} />
          </button>
          <button onClick={() => setView('list')} className={clsx('w-8 h-8 rounded-lg flex items-center justify-center transition-all', view === 'list' ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-rachna-muted font-semibold mb-4">
        {filtered.length === 1 ? '1 project' : `${filtered.length} projects`}
        {filter !== 'All' && ` · ${filter}`}
      </p>

      {/* Projects grid */}
      <div className={clsx('gap-5', view === 'grid' ? 'grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'flex flex-col')}>
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={(id) => navigate(`/creator/workspace/${id}`)}
          />
        ))}

        {/* Empty new project card */}
        {view === 'grid' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filtered.length * 0.06 }}
            onClick={() => setShowModal(true)}
            className="border-2 border-dashed border-rachna-border rounded-2xl h-64 flex flex-col items-center justify-center gap-3 hover:border-rachna-violet hover:bg-rachna-lavender/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-rachna-border group-hover:border-rachna-violet flex items-center justify-center transition-colors">
              <Plus size={20} className="text-rachna-muted group-hover:text-rachna-indigo transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-rachna-muted group-hover:text-rachna-indigo transition-colors">New Project</p>
              <p className="text-xs text-rachna-muted/70">Start from scratch</p>
            </div>
          </motion.button>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <NewProjectModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
        )}
      </AnimatePresence>
    </div>
  )
}
