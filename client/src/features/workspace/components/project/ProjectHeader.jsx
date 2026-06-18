import { useState } from 'react'
import { Edit3, ChevronDown, Share2, MessageSquare, Bell, MoreHorizontal, ChevronLeft } from 'lucide-react'
import clsx from 'clsx'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'

const STATUSES = ['Idea', 'Scripting', 'Filming', 'Editing', 'Review', 'Published']
const STATUS_COLORS = {
  Idea:        'text-amber-600 border-amber-200 bg-amber-50',
  Scripting:   'text-blue-600 border-blue-200 bg-blue-50',
  Filming:     'text-purple-600 border-purple-200 bg-purple-50',
  Editing:     'text-orange-600 border-orange-200 bg-orange-50',
  Review:      'text-pink-600 border-pink-200 bg-pink-50',
  Published:   'text-green-600 border-green-200 bg-green-50',
  'In Progress': 'text-blue-600 border-blue-200 bg-blue-50',
}

const TEAM_MEMBERS = [
  { initial: 'A', color: 'bg-indigo-500', name: 'Ankit Verma' },
  { initial: 'R', color: 'bg-green-500',  name: 'Rohit Kumar' },
  { initial: 'D', color: 'bg-orange-500', name: 'Aditya Singh' },
  { initial: 'M', color: 'bg-purple-500', name: 'Muskan Jain' },
  { initial: 'K', color: 'bg-pink-500',   name: 'Akash Tiwari' },
]

export default function ProjectHeader({ onBack }) {
  const { title, setTitle, status, setStatus, addActivity } = useWorkspace()
  const [editing, setEditing]     = useState(false)
  const [tempTitle, setTempTitle] = useState(title)
  const [showStatus, setShowStatus] = useState(false)
  const [showShare, setShowShare]   = useState(false)
  const [copied, setCopied]         = useState(false)

  const saveTitle = () => {
    if (tempTitle.trim() && tempTitle !== title) {
      addActivity('Ankit Verma', `renamed project to "${tempTitle.trim()}"`)
      setTitle(tempTitle.trim())
    }
    setEditing(false)
  }

  const handleStatusChange = (s) => {
    addActivity('Ankit Verma', `changed status to "${s}"`)
    setStatus(s)
    setShowStatus(false)
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    setShowShare(false)
  }

  return (
    <div className="bg-white border-b border-rachna-border px-6 py-3 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-rachna-muted mb-2">
        <button onClick={onBack} className="hover:text-rachna-indigo transition-colors flex items-center gap-1">
          <ChevronLeft size={12} /> Workspace
        </button>
        <span>›</span>
        <span className="hover:text-rachna-dark cursor-pointer">Projects</span>
        <span>›</span>
        <span className="text-rachna-dark font-medium truncate max-w-[200px]">{title}</span>
      </div>

      {/* Header row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Title */}
        <div className="flex items-center gap-2 flex-1 min-w-0 group">
          {editing ? (
            <input
              autoFocus
              value={tempTitle}
              onChange={e => setTempTitle(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') { setTempTitle(title); setEditing(false) } }}
              className="font-display font-extrabold text-rachna-dark text-xl bg-rachna-surface border border-rachna-indigo rounded-lg px-2 py-0.5 outline-none flex-1 max-w-lg"
            />
          ) : (
            <h1 className="font-display font-extrabold text-rachna-dark text-xl truncate max-w-lg cursor-default">{title}</h1>
          )}
          <button
            onClick={() => { setTempTitle(title); setEditing(true) }}
            className="opacity-0 group-hover:opacity-100 text-rachna-muted hover:text-rachna-indigo transition-all flex-shrink-0"
            title="Rename project"
          >
            <Edit3 size={14} />
          </button>
        </div>

        {/* Status */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowStatus(v => !v)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
              STATUS_COLORS[status] || STATUS_COLORS['In Progress']
            )}
          >
            {status} <ChevronDown size={12} />
          </button>
          {showStatus && (
            <div className="absolute left-0 top-9 bg-white rounded-xl border border-rachna-border shadow-card z-50 py-1 min-w-[130px]">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={clsx('w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-rachna-surface', STATUS_COLORS[s]?.split(' ')[0])}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Team avatars */}
        <div className="flex items-center flex-shrink-0">
          <div className="flex -space-x-1.5">
            {TEAM_MEMBERS.map((m, i) => (
              <div key={i} title={m.name} className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                {m.initial}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-rachna-lavender flex items-center justify-center text-rachna-indigo text-xs font-bold border-2 border-white">+3</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-rachna-indigo text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Share2 size={13} /> {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
          <button className="w-8 h-8 rounded-xl border border-rachna-border flex items-center justify-center text-rachna-muted hover:bg-rachna-surface hover:text-rachna-indigo transition-colors" title="Comments">
            <MessageSquare size={15} />
          </button>
          <button className="w-8 h-8 rounded-xl border border-rachna-border flex items-center justify-center text-rachna-muted hover:bg-rachna-surface hover:text-rachna-indigo transition-colors relative" title="Notifications">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rachna-danger rounded-full" />
          </button>
          <button className="w-8 h-8 rounded-xl border border-rachna-border flex items-center justify-center text-rachna-muted hover:bg-rachna-surface hover:text-rachna-indigo transition-colors" title="More options">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
