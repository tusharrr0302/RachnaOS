// client/src/features/freelancer-public-profile/components/WorkStyleSection.jsx
import { useState } from 'react'
import { X, Plus } from 'lucide-react'

export default function WorkStyleSection({ profile, isEdit, onChange }) {
  const [tagInput, setTagInput] = useState('')

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !profile.workStyleTags.includes(t)) {
      onChange('workStyleTags', [...profile.workStyleTags, t])
    }
    setTagInput('')
  }

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6 space-y-5">
      <h2 className="font-display font-bold text-rachna-dark text-lg">Work Style & Vibe ✨</h2>

      {/* Freeform tags */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">How I work</p>
        <div className="flex flex-wrap gap-2">
          {profile.workStyleTags.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 bg-gradient-to-r from-rachna-lavender to-indigo-50 text-rachna-indigo text-sm font-semibold px-4 py-2 rounded-full border border-rachna-indigo/20">
              {tag}
              {isEdit && (
                <button onClick={() => onChange('workStyleTags', profile.workStyleTags.filter(t => t !== tag))}
                  className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              )}
            </span>
          ))}
          {isEdit && (
            <div className="flex items-center gap-1">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag()}
                placeholder="Add vibe tag..." maxLength={40}
                className="bg-rachna-surface border border-rachna-border rounded-full px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors w-36" />
              <button onClick={addTag}
                className="w-8 h-8 rounded-full bg-rachna-indigo text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* "Working with me" paragraph */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Working with me looks like...</p>
        {isEdit ? (
          <textarea value={profile.workingWithMe}
            onChange={e => onChange('workingWithMe', e.target.value)}
            rows={4} placeholder="Describe your working style in your own words..."
            className="w-full bg-rachna-surface border border-rachna-border rounded-xl px-4 py-3 text-rachna-dark text-sm resize-none outline-none focus:ring-2 focus:ring-rachna-indigo/20 focus:border-rachna-indigo transition-all"
          />
        ) : (
          <p className="text-sm text-rachna-dark leading-relaxed bg-rachna-surface rounded-xl p-4 border border-rachna-border">
            "{profile.workingWithMe}"
          </p>
        )}
      </div>
    </div>
  )
}
