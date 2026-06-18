import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Play, Lock, Star, Clock, ChevronRight, Award, Search } from 'lucide-react'
import clsx from 'clsx'

const CATEGORIES = ['All', 'Thumbnail', 'Hook Writing', 'SEO', 'Storytelling', 'Monetization', 'Growth']

const MODULES = [
  { id: '1', title: 'Thumbnail Psychology Masterclass', category: 'Thumbnail', lessons: 12, duration: '4h 30m', rating: 4.9, students: 2341, free: true, progress: 80, instructor: 'Raj Kumar', instructorRole: '1M+ YouTube Creator', description: 'Learn the exact psychology behind high-CTR thumbnails. From color theory to face expressions.' },
  { id: '2', title: 'Hook Writing for Maximum Retention', category: 'Hook Writing', lessons: 8, duration: '2h 45m', rating: 4.8, students: 1876, free: true, progress: 45, instructor: 'Priya Sharma', instructorRole: 'Viral Content Creator', description: 'Master the first 30 seconds. Every video type, every niche.' },
  { id: '3', title: 'YouTube SEO Deep Dive 2024', category: 'SEO', lessons: 15, duration: '5h 20m', rating: 4.7, students: 3102, free: false, progress: 20, instructor: 'Vikram T.', instructorRole: 'YouTube Strategist', description: 'Rank #1 for competitive keywords. Full keyword research to metadata optimization.' },
  { id: '4', title: 'Storytelling Structure for Creators', category: 'Storytelling', lessons: 10, duration: '3h 15m', rating: 4.9, students: 987, free: false, progress: 0, instructor: 'Ananya Roy', instructorRole: 'Filmmaker & Creator', description: 'Hollywood storytelling applied to YouTube. Keep viewers hooked start to finish.' },
  { id: '5', title: 'Brand Deals 101: From Pitch to Payment', category: 'Monetization', lessons: 9, duration: '3h', rating: 4.6, students: 1543, free: false, progress: 0, instructor: 'Sneha Mehta', instructorRole: 'Brand Deal Expert', description: 'Land your first brand deal, negotiate rates, and protect yourself with contracts.' },
  { id: '6', title: '0 to 100K: Growth Systems That Work', category: 'Growth', lessons: 18, duration: '7h', rating: 4.8, students: 4231, free: false, progress: 0, instructor: 'Rohit Verma', instructorRole: '500K+ Creator', description: 'Systematic growth playbook. Tested on 50+ channels across all niches.' },
]

function ModuleCard({ m, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover cursor-pointer group"
      onClick={() => onClick(m.id)}
    >
      {/* Thumbnail */}
      <div className="h-40 rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-rachna-lavender to-rachna-indigo/30 flex items-center justify-center relative">
        <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
          {m.free ? <Play size={20} className="text-rachna-indigo" /> : <Lock size={18} className="text-rachna-muted" />}
        </div>
        {m.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-rachna-indigo" style={{ width: `${m.progress}%` }} />
          </div>
        )}
        {!m.free && (
          <div className="absolute top-3 right-3">
            <span className="badge text-[10px]">PRO</span>
          </div>
        )}
        {m.free && (
          <div className="absolute top-3 left-3">
            <span className="badge-success text-[10px]">FREE</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px] font-semibold text-rachna-indigo bg-rachna-lavender px-2 py-0.5 rounded-full">{m.category}</span>
      </div>

      <h3 className="font-display font-bold text-rachna-dark text-sm mb-2 line-clamp-2 leading-tight">{m.title}</h3>

      <div className="flex items-center gap-3 text-xs text-rachna-muted mb-3">
        <span className="flex items-center gap-1"><BookOpen size={11} />{m.lessons} lessons</span>
        <span className="flex items-center gap-1"><Clock size={11} />{m.duration}</span>
        <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" />{m.rating}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-rachna-indigo/20 flex items-center justify-center flex-shrink-0">
          <span className="text-rachna-indigo font-bold text-xs">{m.instructor[0]}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-rachna-dark">{m.instructor}</p>
          <p className="text-[10px] text-rachna-muted">{m.instructorRole}</p>
        </div>
      </div>

      {m.progress > 0 ? (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-rachna-muted">Progress</span>
            <span className="font-semibold text-rachna-indigo">{m.progress}%</span>
          </div>
          <div className="h-1.5 bg-rachna-lavender rounded-full overflow-hidden">
            <div className="h-full bg-rachna-indigo rounded-full" style={{ width: `${m.progress}%` }} />
          </div>
        </div>
      ) : (
        <button className="w-full text-center text-xs font-semibold text-rachna-indigo bg-rachna-lavender py-2 rounded-xl hover:bg-indigo-100 transition-colors">
          {m.free ? 'Start Learning →' : '🔒 Upgrade to Access'}
        </button>
      )}
    </motion.div>
  )
}

export default function AcademyPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = MODULES.filter(m => {
    if (category !== 'All' && m.category !== category) return false
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const inProgress = MODULES.filter(m => m.progress > 0 && m.progress < 100)

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-rachna-lavender flex items-center justify-center">
            <BookOpen size={16} className="text-rachna-indigo" />
          </div>
          <h1 className="font-display font-bold text-rachna-dark text-2xl">Creator Academy</h1>
        </div>
        <p className="text-rachna-muted text-sm">Real knowledge. No fluff. Learn from creators who built 7-figure channels.</p>
      </div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-rachna-dark text-base mb-4 flex items-center gap-2">
            <Play size={16} className="text-rachna-indigo" /> Continue Learning
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgress.map(m => (
              <div key={m.id} className="bg-white rounded-2xl border border-rachna-border p-4 flex gap-4 cursor-pointer hover:shadow-card transition-shadow" onClick={() => navigate(`/creator/academy/${m.id}`)}>
                <div className="w-14 h-14 rounded-xl bg-rachna-lavender flex items-center justify-center flex-shrink-0">
                  <Play size={20} className="text-rachna-indigo" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-rachna-dark line-clamp-1 mb-1">{m.title}</p>
                  <div className="h-1.5 bg-rachna-lavender rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-rachna-indigo rounded-full" style={{ width: `${m.progress}%` }} />
                  </div>
                  <p className="text-xs text-rachna-muted">{m.progress}% complete</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rachna-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="input pl-9 py-2 text-sm w-56" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={clsx('px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all', category === c ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(m => <ModuleCard key={m.id} m={m} onClick={id => navigate(`/creator/academy/${id}`)} />)}
      </div>
    </div>
  )
}
