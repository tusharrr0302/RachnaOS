import { useState } from 'react'
import { Tag, Plus, X, Bold, Italic, List, Link2, Heading1, AlignLeft, Save, Sparkles } from 'lucide-react'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'

const TOOLBAR_ITEMS = [
  { icon: Bold, label: 'Bold' },
  { icon: Italic, label: 'Italic' },
  { icon: Heading1, label: 'Heading' },
  { icon: List, label: 'List' },
  { icon: Link2, label: 'Link' },
  { icon: AlignLeft, label: 'Align' },
]

export default function ScriptTab() {
  const { title: projectTitle, addActivity } = useWorkspace()

  const [videoTitle, setVideoTitle] = useState(projectTitle || '24 Hours Surviving in Delhi')
  const [hook, setHook] = useState("I had ₹500 and 24 hours to survive in Delhi. Here's what happened.")
  const [script, setScript] = useState(`[INTRO - 0:00]
Hey everyone! Welcome back. Today I'm doing something absolutely crazy — I'm spending 24 hours in Delhi with absolutely no plan whatsoever.

[HOOK - 0:15]
No hotel booking. No itinerary. Just me, my camera, and ₹500 in my pocket. Let's see if I survive.

[ACT 1 - The Beginning - 1:00]
So I landed at Delhi airport at 6 AM with basically nothing planned. The first challenge? Finding somewhere to eat breakfast with less than ₹100...

[ACT 2 - The Chaos - 8:00]
By noon, things started getting interesting. Old Delhi is unlike anything I've ever experienced — the noise, the smells, the energy is overwhelming in the best possible way.

[ACT 3 - The Experiences - 20:00]
By evening, I'd eaten at 4 different dhabas, taken an auto-rickshaw to Chandni Chowk, and made some genuinely incredible friends along the way...

[OUTRO - 28:00]
If you're planning a trip to Delhi, forget the tourist guides. Just show up and let the city find you. That's the real Delhi experience.`)
  const [desc, setDesc] = useState("I spent 24 hours in Delhi with no plan and ₹500. Watch what happened when the city took over.")
  const [tags, setTags] = useState(['Delhi', 'Travel Vlog', '24 Hours Challenge', 'India Travel', 'Street Food'])
  const [newTag, setNewTag] = useState('')
  const [addingTag, setAddingTag] = useState(false)
  const [saved, setSaved] = useState(false)
  const [generating, setGenerating] = useState(false)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) setTags(p => [...p, newTag.trim()])
    setNewTag(''); setAddingTag(false)
  }

  const handleSave = () => {
    addActivity('Ankit Verma', 'updated the script')
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const generateHook = () => {
    setGenerating(true)
    setTimeout(() => {
      const hooks = [
        "Delhi locals told me I wouldn't last 24 hours. They were almost right.",
        "The real Delhi they don't show on travel vlogs — I found it with just ₹500.",
        "I tried surviving 24 hours in India's most chaotic city with no plan. This is what happened.",
      ]
      setHook(hooks[Math.floor(Math.random() * hooks.length)])
      setGenerating(false)
    }, 1200)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 px-6 py-2 border-b border-rachna-border bg-white flex-shrink-0">
        {TOOLBAR_ITEMS.map(({ icon: Icon, label }) => (
          <button key={label} title={label} className="w-8 h-8 rounded-lg flex items-center justify-center text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark transition-colors">
            <Icon size={14}/>
          </button>
        ))}
        <div className="w-px h-5 bg-rachna-border mx-1"/>
        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ml-auto ${
            saved ? 'bg-green-50 text-green-600' : 'bg-rachna-lavender text-rachna-indigo hover:bg-rachna-indigo hover:text-white'
          }`}
        >
          <Save size={12}/>{saved ? 'Saved!' : 'Save Script'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Video title */}
          <div>
            <label className="text-[10px] font-bold text-rachna-muted uppercase tracking-widest block mb-1">Video Title</label>
            <input
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              className="w-full text-xl font-display font-extrabold text-rachna-dark bg-transparent border-none outline-none focus:bg-rachna-surface rounded-lg px-2 -mx-2 py-1"
            />
          </div>

          {/* Hook */}
          <div className="bg-gradient-to-r from-rachna-lavender to-purple-50 border border-rachna-indigo/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-rachna-indigo uppercase tracking-widest">⚡ Hook (first 15 seconds)</label>
              <button
                onClick={generateHook}
                disabled={generating}
                className="flex items-center gap-1 text-[10px] font-bold text-rachna-indigo bg-white border border-rachna-indigo/30 px-2 py-1 rounded-full hover:bg-rachna-indigo hover:text-white transition-all disabled:opacity-60"
              >
                <Sparkles size={10}/>{generating ? 'Generating…' : 'AI Generate'}
              </button>
            </div>
            <textarea
              rows={2}
              value={hook}
              onChange={e => setHook(e.target.value)}
              className="w-full text-sm text-rachna-dark bg-transparent border-none outline-none resize-none leading-relaxed"
              placeholder="Write your hook…"
            />
          </div>

          <div className="border-t border-rachna-border"/>

          {/* Script body */}
          <div>
            <label className="text-[10px] font-bold text-rachna-muted uppercase tracking-widest block mb-2">Full Script</label>
            <textarea
              rows={22}
              value={script}
              onChange={e => setScript(e.target.value)}
              className="w-full text-sm text-rachna-dark bg-transparent border-none outline-none resize-none leading-loose font-mono focus:bg-rachna-surface/30 rounded-lg px-1 -mx-1"
              placeholder="Write your script here…"
            />
          </div>

          <div className="border-t border-rachna-border"/>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-rachna-muted uppercase tracking-widest block mb-2">YouTube Description</label>
            <textarea
              rows={4}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="w-full text-sm text-rachna-dark bg-rachna-surface border border-rachna-border rounded-xl p-3 outline-none resize-none leading-relaxed focus:border-rachna-indigo"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-[10px] font-bold text-rachna-muted uppercase tracking-widest block mb-2 flex items-center gap-1">
              <Tag size={10}/> Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="flex items-center gap-1 text-xs font-medium text-rachna-indigo bg-rachna-lavender px-2.5 py-1 rounded-full">
                  {t}
                  <button onClick={() => setTags(prev => prev.filter(x => x !== t))} className="hover:text-rachna-danger transition-colors"><X size={10}/></button>
                </span>
              ))}
              {addingTag ? (
                <input autoFocus value={newTag} onChange={e => setNewTag(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addTag(); if (e.key === 'Escape') setAddingTag(false) }}
                  className="text-xs bg-rachna-lavender border border-rachna-indigo rounded-full px-3 py-1 outline-none w-28" placeholder="Add tag…"/>
              ) : (
                <button onClick={() => setAddingTag(true)} className="flex items-center gap-1 text-xs text-rachna-muted hover:text-rachna-indigo border-2 border-dashed border-rachna-border hover:border-rachna-violet px-2.5 py-1 rounded-full transition-all">
                  <Plus size={10}/> Add tag
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
