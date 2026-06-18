// client/src/pages/freelancer/FreelancerPortfolioPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Eye, Heart, Upload } from 'lucide-react'
import { PORTFOLIO_ITEMS } from './mockData'

const fmt = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : n

export default function FreelancerPortfolioPage() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-xl">Portfolio</h1>
          <p className="text-sm text-rachna-muted mt-0.5">Showcase your best work to attract more clients</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="btn-indigo-solid flex items-center gap-2">
          <Plus size={15} /> Add Work
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl border border-rachna-border p-8 w-full max-w-md shadow-card-lg">
            <h3 className="font-display font-bold text-rachna-dark text-lg mb-6">Upload Portfolio Item</h3>
            <div className="border-2 border-dashed border-rachna-border rounded-xl p-8 text-center mb-4 hover:border-rachna-indigo transition-colors cursor-pointer">
              <Upload size={28} className="text-rachna-muted mx-auto mb-3" />
              <p className="text-sm font-medium text-rachna-dark">Drop your file here</p>
              <p className="text-xs text-rachna-muted mt-1">MP4, MOV, PNG, JPG up to 500MB</p>
            </div>
            <input placeholder="Title" className="input mb-3" />
            <textarea placeholder="Description" className="input mb-3 resize-none h-20" />
            <select className="input mb-4">
              <option>Video Editing</option>
              <option>Color Grading</option>
              <option>Motion Graphics</option>
              <option>Thumbnail Design</option>
            </select>
            <div className="flex gap-3">
              <button onClick={() => setShowUpload(false)} className="btn-ghost flex-1">Cancel</button>
              <button className="btn-indigo-solid flex-1 justify-center">Upload</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {PORTFOLIO_ITEMS.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(69,64,200,0.15)' }}
            className="bg-white rounded-2xl border border-rachna-border overflow-hidden cursor-pointer group">
            {/* Thumbnail */}
            <div className="h-44 flex items-center justify-center text-4xl" style={{ background: `${item.color}18` }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl"
                style={{ background: item.color }}>
                {item.category === 'Video Editing' ? '🎬'
                  : item.category === 'Motion Graphics' ? '✨'
                  : item.category === 'Thumbnail Design' ? '🖼️' : '🎨'}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display font-semibold text-rachna-dark">{item.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-rachna-lavender text-rachna-indigo font-semibold ml-2 flex-shrink-0">
                  {item.category}
                </span>
              </div>
              <p className="text-sm text-rachna-muted">{item.description}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-rachna-border">
                <div className="flex items-center gap-1.5 text-rachna-muted">
                  <Eye size={13} /> <span className="text-xs">{fmt(item.views)} views</span>
                </div>
                <div className="flex items-center gap-1.5 text-rachna-muted">
                  <Heart size={13} /> <span className="text-xs">{fmt(item.likes)} likes</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
