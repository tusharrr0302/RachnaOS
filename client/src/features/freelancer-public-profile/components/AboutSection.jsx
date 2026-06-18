// client/src/features/freelancer-public-profile/components/AboutSection.jsx
import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import clsx from 'clsx'
import { PRESET_TOOLS } from '../mockProfileData'

const MAX_BIO = 300

export default function AboutSection({ profile, isEdit, onChange }) {
  const [newTag, setNewTag] = useState('')
  const [newTool, setNewTool] = useState('')

  const addTag = () => {
    const t = newTag.trim()
    if (t && !profile.specializations.includes(t)) {
      onChange('specializations', [...profile.specializations, t])
    }
    setNewTag('')
  }

  const removeTag = (tag) => onChange('specializations', profile.specializations.filter(t => t !== tag))

  const addTool = (name) => {
    const icon = PRESET_TOOLS.find(t => t.name === name)?.icon || '🔧'
    if (!profile.tools.find(t => t.name === name)) {
      onChange('tools', [...profile.tools, { name, icon }])
    }
  }

  const addCustomTool = () => {
    const name = newTool.trim()
    if (name && !profile.tools.find(t => t.name === name)) {
      onChange('tools', [...profile.tools, { name, icon: '🔧' }])
    }
    setNewTool('')
  }

  const removeTool = (name) => onChange('tools', profile.tools.filter(t => t.name !== name))

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6 space-y-6">
      <h2 className="font-display font-bold text-rachna-dark text-lg">About Me</h2>

      {/* Bio */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-2">Bio</p>
        {isEdit ? (
          <div>
            <textarea
              value={profile.bio}
              onChange={e => e.target.value.length <= MAX_BIO && onChange('bio', e.target.value)}
              rows={4}
              className="w-full bg-rachna-surface border border-rachna-border rounded-xl px-4 py-3 text-rachna-dark text-sm resize-none outline-none focus:ring-2 focus:ring-rachna-indigo/20 focus:border-rachna-indigo transition-all"
              placeholder="Write a compelling bio..."
            />
            <p className={clsx('text-xs mt-1 text-right', profile.bio.length > MAX_BIO - 20 ? 'text-rachna-danger' : 'text-rachna-muted')}>
              {profile.bio.length}/{MAX_BIO}
            </p>
          </div>
        ) : (
          <p className="text-sm text-rachna-dark leading-relaxed">{profile.bio}</p>
        )}
      </div>

      {/* Specializations */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Specializations</p>
        <div className="flex flex-wrap gap-2">
          {profile.specializations.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 bg-rachna-lavender text-rachna-indigo text-sm font-semibold px-3 py-1.5 rounded-full">
              {tag}
              {isEdit && (
                <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              )}
            </span>
          ))}
          {isEdit && (
            <div className="flex items-center gap-1">
              <input value={newTag} onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag()}
                placeholder="Add tag..." maxLength={30}
                className="bg-rachna-surface border border-rachna-border rounded-full px-3 py-1.5 text-sm outline-none focus:border-rachna-indigo w-28 transition-colors" />
              <button onClick={addTag} className="w-7 h-7 rounded-full bg-rachna-indigo text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tools */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Tools & Software</p>
        <div className="flex flex-wrap gap-2">
          {profile.tools.map(tool => (
            <span key={tool.name} className="flex items-center gap-2 bg-rachna-surface border border-rachna-border text-rachna-dark text-sm font-medium px-3 py-1.5 rounded-xl">
              <span>{tool.icon}</span>
              {tool.name}
              {isEdit && (
                <button onClick={() => removeTool(tool.name)} className="text-rachna-muted hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              )}
            </span>
          ))}
        </div>
        {isEdit && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-rachna-muted">Quick add:</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOOLS.filter(t => !profile.tools.find(p => p.name === t.name)).map(tool => (
                <button key={tool.name} onClick={() => addTool(tool.name)}
                  className="flex items-center gap-1 text-xs bg-white border border-rachna-border rounded-full px-2.5 py-1 hover:border-rachna-indigo hover:text-rachna-indigo transition-all">
                  {tool.icon} {tool.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input value={newTool} onChange={e => setNewTool(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomTool()}
                placeholder="Custom tool name..."
                className="bg-rachna-surface border border-rachna-border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-rachna-indigo w-44 transition-colors" />
              <button onClick={addCustomTool} className="text-xs text-rachna-indigo font-semibold hover:underline">Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
