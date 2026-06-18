// client/src/pages/freelancer/FreelancerResourcesPage.jsx
import { motion } from 'framer-motion'
import { Download, BookOpen, Scale, Lightbulb } from 'lucide-react'
import { RESOURCES } from './mockData'

const categoryIcon = { Guide: BookOpen, Template: Download, Legal: Scale }

export default function FreelancerResourcesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">Resources</h1>
        <p className="text-sm text-rachna-muted mt-0.5">Guides, templates, and tools to help your freelance career</p>
      </div>

      {/* Featured */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-rachna-indigo rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <p className="text-xs font-semibold opacity-70 uppercase tracking-wider mb-2">Featured Guide</p>
        <h2 className="font-display font-bold text-2xl mb-2">Freelancer Starter Kit 2024</h2>
        <p className="text-sm opacity-80 mb-6 max-w-md">
          Everything you need to launch your freelance career on RachnaOS — contracts, pricing, proposals and more.
        </p>
        <button className="bg-white text-rachna-indigo font-display font-semibold px-5 py-2 rounded-xl text-sm hover:bg-rachna-lavender transition-colors">
          Download Free →
        </button>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.map((r, i) => {
          const Icon = categoryIcon[r.category] || Lightbulb
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(69,64,200,0.12)' }}
              className="bg-white rounded-2xl border border-rachna-border p-5 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${r.color}18` }}>
                  {r.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rachna-lavender text-rachna-indigo">{r.category}</span>
              </div>
              <h3 className="font-display font-semibold text-rachna-dark mb-2">{r.title}</h3>
              <p className="text-xs text-rachna-muted leading-relaxed mb-4">{r.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-rachna-border">
                <span className="text-xs text-rachna-muted">{r.readTime}</span>
                <button className="text-xs text-rachna-indigo font-semibold hover:underline flex items-center gap-1">
                  {r.category === 'Template' ? <><Download size={11}/> Download</> : 'Read →'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
