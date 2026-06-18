// client/src/pages/freelancer/FreelancerProfilePage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Plus, X } from 'lucide-react'
import { FREELANCER } from './mockData'

export default function FreelancerProfilePage() {
  const [skills, setSkills] = useState(FREELANCER.skills)
  const [newSkill, setNewSkill] = useState('')
  const [saved, setSaved] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(s => [...s, newSkill.trim()])
      setNewSkill('')
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">My Profile</h1>
        <p className="text-sm text-rachna-muted mt-0.5">Edit your public freelancer profile and settings</p>
      </div>

      {/* Avatar Section */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-rachna-border p-6">
        <h3 className="font-display font-bold text-rachna-dark mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-rachna-indigo flex items-center justify-center text-white font-bold text-3xl">
              {FREELANCER.name[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-rachna-indigo rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-rachna-dark">{FREELANCER.name}</p>
            <p className="text-sm text-rachna-muted">{FREELANCER.role} · {FREELANCER.location}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-rachna-muted">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Basic Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="bg-white rounded-2xl border border-rachna-border p-6 space-y-4">
        <h3 className="font-display font-bold text-rachna-dark">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-rachna-muted mb-1.5 block uppercase tracking-wide">Full Name</label>
            <input className="input" defaultValue={FREELANCER.name} />
          </div>
          <div>
            <label className="text-xs font-semibold text-rachna-muted mb-1.5 block uppercase tracking-wide">Role / Title</label>
            <input className="input" defaultValue={FREELANCER.role} />
          </div>
          <div>
            <label className="text-xs font-semibold text-rachna-muted mb-1.5 block uppercase tracking-wide">Location</label>
            <input className="input" defaultValue={FREELANCER.location} />
          </div>
          <div>
            <label className="text-xs font-semibold text-rachna-muted mb-1.5 block uppercase tracking-wide">Hourly Rate (₹)</label>
            <input className="input" defaultValue={FREELANCER.hourlyRate} type="number" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-rachna-muted mb-1.5 block uppercase tracking-wide">Bio</label>
          <textarea className="input resize-none h-24" defaultValue={FREELANCER.bio} />
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="bg-white rounded-2xl border border-rachna-border p-6">
        <h3 className="font-display font-bold text-rachna-dark mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map(skill => (
            <span key={skill} className="flex items-center gap-1.5 bg-rachna-lavender text-rachna-indigo text-sm font-semibold px-3 py-1.5 rounded-full">
              {skill}
              <button onClick={() => setSkills(s => s.filter(x => x !== skill))} className="hover:text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill..." className="input flex-1" />
          <button onClick={addSkill} className="btn-indigo-solid flex items-center gap-1">
            <Plus size={14} /> Add
          </button>
        </div>
      </motion.div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
          className="btn-indigo-solid"
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </motion.button>
        <button className="btn-ghost">Cancel</button>
      </div>
    </div>
  )
}
