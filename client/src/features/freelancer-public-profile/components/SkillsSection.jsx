// client/src/features/freelancer-public-profile/components/SkillsSection.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import clsx from 'clsx'

const LEVELS = ['Beginner', 'Intermediate', 'Expert']
const LEVEL_WIDTH = { Beginner: '33%', Intermediate: '66%', Expert: '100%' }
const LEVEL_COLOR = { Beginner: 'bg-amber-400', Intermediate: 'bg-blue-500', Expert: 'bg-rachna-indigo' }

function SkillBar({ skill, isEdit, onLevelChange, onDelete }) {
  return (
    <div className="flex items-center gap-4 py-2 group">
      <div className="w-36 flex-shrink-0">
        <p className="text-sm font-medium text-rachna-dark">{skill.name}</p>
      </div>
      <div className="flex-1 h-2 bg-rachna-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: LEVEL_WIDTH[skill.level] }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={clsx('h-full rounded-full', LEVEL_COLOR[skill.level])}
        />
      </div>
      {isEdit ? (
        <div className="flex items-center gap-1 flex-shrink-0">
          {LEVELS.map(level => (
            <button key={level} onClick={() => onLevelChange(level)}
              className={clsx('px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all',
                skill.level === level ? 'bg-rachna-indigo text-white' : 'bg-rachna-surface text-rachna-muted hover:bg-rachna-lavender hover:text-rachna-indigo')}>
              {level.slice(0, 3)}
            </button>
          ))}
          <button onClick={onDelete}
            className="w-6 h-6 rounded-md bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors ml-1 opacity-0 group-hover:opacity-100">
            <Trash2 size={11} />
          </button>
        </div>
      ) : (
        <span className={clsx('text-xs font-semibold flex-shrink-0 w-20 text-right',
          skill.level === 'Expert' ? 'text-rachna-indigo' : skill.level === 'Intermediate' ? 'text-blue-600' : 'text-amber-600')}>
          {skill.level}
        </span>
      )}
    </div>
  )
}

function AddSkillRow({ onAdd }) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Intermediate')

  const add = () => {
    if (name.trim()) { onAdd({ name: name.trim(), level }); setName('') }
  }

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-rachna-border">
      <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
        placeholder="Skill name..." className="bg-rachna-surface border border-rachna-border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-rachna-indigo w-40 transition-colors" />
      <div className="flex items-center gap-1">
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)}
            className={clsx('px-2 py-1 rounded-md text-[10px] font-semibold transition-all',
              level === l ? 'bg-rachna-indigo text-white' : 'bg-rachna-surface text-rachna-muted hover:bg-rachna-lavender')}>
            {l.slice(0, 3)}
          </button>
        ))}
      </div>
      <button onClick={add} className="w-7 h-7 rounded-lg bg-rachna-indigo text-white flex items-center justify-center hover:bg-indigo-700 transition-colors flex-shrink-0">
        <Plus size={14} />
      </button>
    </div>
  )
}

export default function SkillsSection({ profile, isEdit, onChange }) {
  const [newCategory, setNewCategory] = useState('')

  const updateSkill = (catIdx, skillIdx, updates) => {
    const next = profile.skills.map((cat, ci) =>
      ci !== catIdx ? cat : {
        ...cat,
        items: cat.items.map((sk, si) => si !== skillIdx ? sk : { ...sk, ...updates })
      })
    onChange('skills', next)
  }

  const deleteSkill = (catIdx, skillIdx) => {
    const next = profile.skills.map((cat, ci) =>
      ci !== catIdx ? cat : { ...cat, items: cat.items.filter((_, si) => si !== skillIdx) })
    onChange('skills', next.filter(cat => cat.items.length > 0))
  }

  const addSkillToCategory = (catIdx, skill) => {
    const next = profile.skills.map((cat, ci) =>
      ci !== catIdx ? cat : { ...cat, items: [...cat.items, skill] })
    onChange('skills', next)
  }

  const addCategory = () => {
    const name = newCategory.trim()
    if (name && !profile.skills.find(c => c.category === name)) {
      onChange('skills', [...profile.skills, { category: name, items: [] }])
    }
    setNewCategory('')
  }

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6">
      <h2 className="font-display font-bold text-rachna-dark text-lg mb-5">Skills & Expertise</h2>

      <div className="space-y-6">
        {profile.skills.map((cat, catIdx) => (
          <div key={cat.category}>
            <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">{cat.category}</p>
            <div className="space-y-1">
              {cat.items.map((skill, skillIdx) => (
                <SkillBar key={skill.name} skill={skill} isEdit={isEdit}
                  onLevelChange={level => updateSkill(catIdx, skillIdx, { level })}
                  onDelete={() => deleteSkill(catIdx, skillIdx)} />
              ))}
            </div>
            {isEdit && <AddSkillRow onAdd={skill => addSkillToCategory(catIdx, skill)} />}
          </div>
        ))}

        {isEdit && (
          <div className="flex items-center gap-2 pt-2 border-t border-rachna-border">
            <input value={newCategory} onChange={e => setNewCategory(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCategory()}
              placeholder="New category name..." className="bg-rachna-surface border border-rachna-border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-rachna-indigo w-48 transition-colors" />
            <button onClick={addCategory} className="text-sm text-rachna-indigo font-semibold hover:underline">+ Add Category</button>
          </div>
        )}
      </div>
    </div>
  )
}
