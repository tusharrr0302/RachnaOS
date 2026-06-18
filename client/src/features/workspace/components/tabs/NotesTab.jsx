import { useWorkspace } from '../../hooks/useWorkspace.jsx'
import { Save } from 'lucide-react'
import { useState } from 'react'

export default function NotesTab() {
  const { notes, setNotes, addActivity } = useWorkspace()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    addActivity('Ankit Verma', 'updated project notes')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-3 border-b border-rachna-border flex items-center justify-between flex-shrink-0">
        <p className="text-xs text-rachna-muted">Free-form notes. Use Markdown for formatting.</p>
        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            saved ? 'bg-green-50 text-green-600' : 'bg-rachna-lavender text-rachna-indigo hover:bg-rachna-indigo hover:text-white'
          }`}
        >
          <Save size={12}/>
          {saved ? 'Saved!' : 'Save Notes'}
        </button>
      </div>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="flex-1 p-8 text-sm text-rachna-dark leading-relaxed font-mono bg-white border-none outline-none resize-none max-w-3xl mx-auto w-full"
        placeholder="Add your notes here… Markdown supported."
      />
    </div>
  )
}
