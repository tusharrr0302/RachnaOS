import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, CheckCircle2, ShoppingBag, Zap, MessageSquare, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const CATEGORIES = ['All', 'Video Editing', 'Thumbnail Design', 'Script Writing', 'Motion Graphics', 'YouTube SEO', 'Voice Over']

const FREELANCERS = [
  { id: '1', name: 'Raj Sharma', title: 'Video Editor', niche: 'Finance & Tech', rating: 4.9, reviews: 87, rate: '₹4,500/video', match: 98, deliveryDays: 3, avatar: 'R', verified: true, skills: ['Final Cut Pro', 'Color Grading', 'Sound Design'], portfolio: ['Finance vlog', 'Tech review'], completedJobs: 234 },
  { id: '2', name: 'ThumbPro Studio', title: 'Thumbnail Designer', niche: 'Finance Niche', rating: 4.8, reviews: 142, rate: '₹1,200/thumb', match: 94, deliveryDays: 1, avatar: 'T', verified: true, skills: ['Photoshop', 'Canva Pro', 'A/B Testing'], portfolio: ['Finance channels', 'Gaming thumbnails'], completedJobs: 891 },
  { id: '3', name: 'Priya Writes', title: 'Script Writer', niche: 'Education & Finance', rating: 4.7, reviews: 56, rate: '₹3,000/script', match: 89, deliveryDays: 2, avatar: 'P', verified: false, skills: ['SEO Copywriting', 'Hook Writing', 'Storytelling'], portfolio: ['Finance explainers', 'How-to videos'], completedJobs: 103 },
  { id: '4', name: 'Motion Craft', title: 'Motion Graphics', niche: 'Tech & Finance', rating: 4.6, reviews: 38, rate: '₹2,500/project', match: 85, deliveryDays: 4, avatar: 'M', verified: true, skills: ['After Effects', 'Lower Thirds', 'Animations'], portfolio: ['Tech reviews', 'Product demos'], completedJobs: 67 },
]

function FreelancerCard({ f, onHire }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-rachna-violet/20 flex items-center justify-center flex-shrink-0">
          <span className="text-rachna-violet font-bold text-xl">{f.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display font-bold text-rachna-dark text-sm">{f.name}</p>
            {f.verified && <CheckCircle2 size={13} className="text-rachna-indigo" />}
          </div>
          <p className="text-xs text-rachna-muted">{f.title} · {f.niche}</p>
        </div>
        <div className="text-right">
          <div className={clsx(
            'text-xs font-bold px-2.5 py-1 rounded-full',
            f.match >= 95 ? 'bg-green-50 text-rachna-success' : f.match >= 85 ? 'bg-blue-50 text-blue-600' : 'bg-rachna-lavender text-rachna-indigo'
          )}>
            {f.match}% match
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-rachna-dark">{f.rating}</span>
          <span className="text-xs text-rachna-muted">({f.reviews})</span>
        </div>
        <span className="text-rachna-border">·</span>
        <span className="text-xs text-rachna-muted">{f.completedJobs} jobs done</span>
        <span className="text-rachna-border">·</span>
        <span className="text-xs text-rachna-muted">~{f.deliveryDays}d delivery</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {f.skills.map(s => <span key={s} className="text-[10px] bg-rachna-surface text-rachna-muted border border-rachna-border px-2 py-0.5 rounded-full">{s}</span>)}
      </div>

      <div className="flex items-center justify-between">
        <p className="font-display font-bold text-rachna-indigo">{f.rate}</p>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-xl border border-rachna-border flex items-center justify-center hover:bg-rachna-lavender transition-colors">
            <MessageSquare size={14} className="text-rachna-muted" />
          </button>
          <button
            id={`hire-${f.id}`}
            onClick={() => onHire(f)}
            className="btn-primary py-2 px-4 text-xs"
          >
            Hire
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function MarketplacePage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [hired, setHired] = useState(null)

  const filtered = FREELANCERS.filter(f => {
    if (category !== 'All' && !f.title.includes(category.split(' ')[0])) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-rachna-lavender flex items-center justify-center">
            <ShoppingBag size={16} className="text-rachna-indigo" />
          </div>
          <div className="badge flex items-center gap-1"><Zap size={12} /> AI Matched For You</div>
        </div>
        <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">Freelance Marketplace</h1>
        <p className="text-rachna-muted text-sm">AI-matched to freelancers who've worked in your niche on videos like yours.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rachna-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search freelancers..." className="input pl-9 py-2 text-sm w-56" />
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

      {/* AI Match Banner */}
      <div className="bg-rachna-lavender border border-rachna-indigo/20 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-rachna-indigo flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-display font-bold text-rachna-indigo">AI Match Active</p>
          <p className="text-xs text-rachna-muted">Showing freelancers ranked by match to your Finance niche profile. Sorted by compatibility + rating.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(f => <FreelancerCard key={f.id} f={f} onHire={setHired} />)}
      </div>

      {hired && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setHired(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-rachna-dark text-xl mb-2">Hire {hired.name}</h3>
            <p className="text-rachna-muted text-sm mb-6">Describe your project requirements:</p>
            <textarea className="input h-32 resize-none mb-4" placeholder="e.g. Need a 10-15 min YouTube video edited in finance/educational style..." id="hire-description" />
            <div className="flex gap-3">
              <button onClick={() => setHired(null)} className="btn-ghost flex-1 justify-center">Cancel</button>
              <button className="btn-primary flex-1 justify-center" onClick={() => setHired(null)}>Send Proposal →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
