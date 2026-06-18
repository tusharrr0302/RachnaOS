// client/src/features/freelancer-public-profile/components/ServicesSection.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Clock, IndianRupee } from 'lucide-react'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const DELIVERY_OPTIONS = [3, 5, 7, 10, 14, 21, 30]

const EMPTY_SERVICE = { id: '', name: '', description: '', priceFrom: 0, deliveryDays: 7, tags: [] }

function ServiceCard({ service, isEdit, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={!isEdit ? { y: -4, boxShadow: '0 8px 32px rgba(69,64,200,0.12)' } : {}}
      className="bg-white border border-rachna-border rounded-2xl p-5 flex flex-col gap-3 relative group"
    >
      {isEdit && (
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="w-7 h-7 rounded-lg bg-rachna-lavender text-rachna-indigo flex items-center justify-center hover:bg-indigo-100 transition-colors">
            <Pencil size={12} />
          </button>
          <button onClick={onDelete} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <div>
        <h3 className="font-display font-semibold text-rachna-dark">{service.name}</h3>
        <p className="text-sm text-rachna-muted mt-1 leading-relaxed">{service.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map(tag => (
          <span key={tag} className="text-xs bg-rachna-surface text-rachna-muted border border-rachna-border px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-rachna-border">
        <div className="flex items-center gap-1 text-rachna-indigo font-display font-bold">
          <IndianRupee size={14} />
          <span>From {fmt(service.priceFrom).replace('₹', '')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-rachna-muted text-xs">
          <Clock size={12} />
          <span>{service.deliveryDays} days delivery</span>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceForm({ service, onSave, onCancel }) {
  const [form, setForm] = useState({ ...service })
  const [tagInput, setTagInput] = useState('')

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }))
    setTagInput('')
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-rachna-lavender/30 border-2 border-rachna-indigo/30 rounded-2xl p-5 space-y-4">
      <h4 className="font-display font-semibold text-rachna-dark">
        {service.id ? 'Edit Service' : 'New Service'}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-rachna-muted block mb-1">Service Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. YouTube Video Edit"
            className="w-full bg-white border border-rachna-border rounded-xl px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-rachna-muted block mb-1">Starting Price (₹)</label>
            <input type="number" value={form.priceFrom} onChange={e => setForm(f => ({ ...f, priceFrom: parseInt(e.target.value) || 0 }))}
              className="w-full bg-white border border-rachna-border rounded-xl px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors" />
          </div>
          <div>
            <label className="text-xs font-semibold text-rachna-muted block mb-1">Delivery (days)</label>
            <select value={form.deliveryDays} onChange={e => setForm(f => ({ ...f, deliveryDays: parseInt(e.target.value) }))}
              className="w-full bg-white border border-rachna-border rounded-xl px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors">
              {DELIVERY_OPTIONS.map(d => <option key={d} value={d}>{d} days</option>)}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-rachna-muted block mb-1">Description</label>
        <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          rows={2} placeholder="Describe what's included..."
          className="w-full bg-white border border-rachna-border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-rachna-indigo transition-colors" />
      </div>

      <div>
        <label className="text-xs font-semibold text-rachna-muted block mb-2">Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 bg-rachna-lavender text-rachna-indigo text-xs font-semibold px-2 py-1 rounded-full">
              {tag} <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))}><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()}
            placeholder="Add tag..." className="bg-white border border-rachna-border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-rachna-indigo w-36 transition-colors" />
          <button onClick={addTag} className="text-xs text-rachna-indigo font-semibold">+ Add</button>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)}
          disabled={!form.name.trim()}
          className="btn-indigo-solid text-xs disabled:opacity-50">Save Service</button>
        <button onClick={onCancel} className="btn-ghost text-xs">Cancel</button>
      </div>
    </motion.div>
  )
}

export default function ServicesSection({ profile, isEdit, onChange }) {
  const [editingId, setEditingId] = useState(null) // null = closed, 'new' = new form, string = edit existing

  const saveService = (form) => {
    if (editingId === 'new') {
      onChange('services', [...profile.services, { ...form, id: String(Date.now()) }])
    } else {
      onChange('services', profile.services.map(s => s.id === editingId ? { ...form, id: editingId } : s))
    }
    setEditingId(null)
  }

  const deleteService = (id) => onChange('services', profile.services.filter(s => s.id !== id))

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-rachna-dark text-lg">Services Offered</h2>
        {isEdit && editingId === null && (
          <button onClick={() => setEditingId('new')}
            className="flex items-center gap-1.5 text-sm text-rachna-indigo font-semibold hover:underline">
            <Plus size={14} /> Add Service
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {profile.services.map(service => (
            editingId === service.id
              ? <ServiceForm key={service.id} service={service} onSave={saveService} onCancel={() => setEditingId(null)} />
              : <ServiceCard key={service.id} service={service} isEdit={isEdit}
                  onEdit={() => setEditingId(service.id)} onDelete={() => deleteService(service.id)} />
          ))}
        </AnimatePresence>

        {isEdit && editingId === 'new' && (
          <div className="md:col-span-3">
            <ServiceForm service={{ ...EMPTY_SERVICE }} onSave={saveService} onCancel={() => setEditingId(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
