import { useState, useRef, useEffect } from 'react'
import { X, Send, Edit3, Users, UserPlus, Check } from 'lucide-react'
import clsx from 'clsx'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'

const TEAM = [
  { name: 'Ankit Verma',  role: 'Project Manager',    status: null,          avatar: 'A', color: 'bg-indigo-500' },
  { name: 'Rohit Kumar',  role: 'Thumbnail Designer', status: 'In Progress', avatar: 'R', color: 'bg-green-500' },
  { name: 'Aditya Singh', role: 'Video Editor',       status: 'In Progress', avatar: 'D', color: 'bg-orange-500' },
  { name: 'Akash Tiwari', role: 'Script Writer',      status: 'Done',        avatar: 'K', color: 'bg-pink-500' },
  { name: 'Muskan Jain',  role: 'Researcher',         status: 'Done',        avatar: 'M', color: 'bg-purple-500' },
]

const AI_PROMPTS = [
  'What should I work on next?',
  'Give me hook ideas for this video',
  'Suggest a better title',
  "What's the best thumbnail approach?",
  'Write a YouTube description',
  'Suggest B-roll shots',
]

const AI_RESPONSES = {
  "What should I work on next?": `Based on your pipeline, **Idea & Research** and **Script** are complete ✓

Your next priority should be **Shoot** — here's what to do:
1. Confirm your Delhi shoot date with the team
2. Brief editor Aditya on the rough cut timeline  
3. Send the location list to your camera person

After shoot, brief Rohit on thumbnail concepts while editing is in progress.`,

  "Give me hook ideas for this video": `Here are 5 high-retention hook ideas:

**1.** "I had ₹500 and 24 hours to survive in Delhi. Here's what happened."

**2.** "Delhi locals told me I wouldn't last 24 hours. They were almost right."

**3.** "The real Delhi they don't show on travel vlogs."

**4.** "I spent 24 hours doing everything Delhi locals do — this changed my view forever."

**5.** "No hotel. No plan. Just ₹500 in the most chaotic city in India."`,

  "Suggest a better title": `3 better title options ranked by CTR potential:

**🥇 "I Tried Surviving 24 Hours in Delhi Like a Local (No Hotel, No Plan)"**
→ High curiosity + personal + relatable

**🥈 "24 Hours in Delhi with ₹500 | Real India Experience"**  
→ SEO-friendly + specific + value-packed

**🥉 "24 Hours Surviving India's Most Chaotic City | Gone Wrong?"**
→ Curiosity gap + "gone wrong" boosts CTR`,

  "What's the best thumbnail approach?": `Based on your travel vlog category, here's what works:

**🎯 Layout:** Bold face expression (surprise/shock) on the left, text on right

**🎨 Color palette:** Deep orange + white text for contrast — triggers curiosity

**📝 Text overlay:** "24 HOURS IN DELHI" — max 4 words, high contrast

**Background:** Old Delhi alley or Chandni Chowk for instant recognition

**Reference:** Study Mumbiker Nikhil's thumbnails — very similar audience niche`,

  "Write a YouTube description": `Here's an optimized description:

---
I spent 24 hours in Delhi with absolutely no plan and only ₹500 in my pocket. No hotel booking, no itinerary, just vibes.

In this video:
🏙️ Old Delhi at 6 AM (completely different city)
🍛 Best street food under ₹50
🚌 How locals actually travel
😅 What went completely wrong

If you're planning a Delhi trip — watch this FIRST.

📱 Instagram: @yourhandle
🔔 Subscribe for more India travel content

#Delhi #TravelIndia #TravelVlog #24HoursChallenge`,

  "Suggest B-roll shots": `Essential B-roll shots for this video:

**Opening (golden hour):**
- Red Fort facade at sunrise
- Delhi Metro doors closing time-lapse
- Auto-rickshaw weaving through traffic POV

**Street scenes:**
- Jalebi being made in close-up
- Chai being poured from height
- Busy Chandni Chowk wide shot

**Human moments:**
- Chai stall owner laughing
- Kids playing cricket in gully
- Old man reading newspaper

**Closing:**
- Sunset over Old Delhi rooftop
- Your tired but happy face reaction shot`,
}

const STATUS_STYLE = {
  'In Progress': 'bg-amber-50 text-amber-600',
  'Done':        'bg-green-50 text-green-700',
}

function DetailsPanel() {
  const { brief, setBrief, title, addActivity } = useWorkspace()
  const [editingBrief, setEditingBrief] = useState(false)
  const [tempBrief, setTempBrief]       = useState(brief)
  const [visibility, setVisibility]     = useState('Private')
  const [team, setTeam]                 = useState(TEAM)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember]       = useState('')

  const saveBrief = () => {
    setBrief(tempBrief)
    addActivity('Ankit Verma', 'updated the project brief')
    setEditingBrief(false)
  }

  const addMember = () => {
    if (!newMember.trim()) return
    setTeam(prev => [...prev, {
      name: newMember.trim(),
      role: 'Team Member',
      status: null,
      avatar: newMember.trim()[0].toUpperCase(),
      color: 'bg-rachna-indigo',
    }])
    addActivity('Ankit Verma', `added ${newMember.trim()} to the project`)
    setNewMember('')
    setShowAddMember(false)
  }

  return (
    <div className="overflow-y-auto flex-1 space-y-6 p-5">
      {/* Brief */}
      <div>
        <h3 className="text-[10px] font-display font-bold text-rachna-muted uppercase tracking-widest mb-2">Project Brief</h3>
        <div className="bg-rachna-surface rounded-xl p-3">
          {editingBrief ? (
            <>
              <textarea
                autoFocus
                rows={4}
                value={tempBrief}
                onChange={e => setTempBrief(e.target.value)}
                className="w-full text-xs text-rachna-dark leading-relaxed bg-white border border-rachna-indigo rounded-lg p-2 resize-none outline-none"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={saveBrief} className="flex items-center gap-1 text-xs bg-rachna-indigo text-white px-3 py-1 rounded-lg font-semibold hover:bg-indigo-700">
                  <Check size={11} /> Save
                </button>
                <button onClick={() => setEditingBrief(false)} className="text-xs text-rachna-muted hover:text-rachna-dark">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-rachna-dark leading-relaxed">{brief}</p>
              <button
                onClick={() => { setTempBrief(brief); setEditingBrief(true) }}
                className="flex items-center gap-1 text-xs text-rachna-indigo font-semibold mt-2 hover:underline"
              >
                <Edit3 size={11} /> Edit Brief
              </button>
            </>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div>
        <h3 className="text-[10px] font-display font-bold text-rachna-muted uppercase tracking-widest mb-2">Details</h3>
        <div className="space-y-2.5">
          {[
            { icon: '📁', label: 'Project Owner', value: 'Ankit Verma' },
            { icon: '📅', label: 'Created',       value: '12 May, 2024' },
            { icon: '🕐', label: 'Last Updated',  value: '2 hours ago' },
            { icon: '🏷️', label: 'Category',      value: 'Travel Vlog' },
          ].map(m => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-rachna-muted">{m.icon} {m.label}</span>
              <span className="text-xs font-medium text-rachna-dark">{m.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-rachna-muted">🔒 Visibility</span>
            <select value={visibility} onChange={e => setVisibility(e.target.value)}
              className="text-xs font-medium text-rachna-dark bg-transparent border border-rachna-border rounded-lg px-2 py-0.5 outline-none cursor-pointer">
              {['Private', 'Team', 'Public'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Team */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-display font-bold text-rachna-muted uppercase tracking-widest">Team & Roles</h3>
          <button onClick={() => setShowAddMember(v => !v)} className="flex items-center gap-1 text-xs text-rachna-indigo font-semibold hover:underline">
            <Users size={11} /> Manage
          </button>
        </div>
        <div className="space-y-2.5">
          {team.map((m, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-rachna-dark truncate">{m.name}</p>
                <p className="text-[10px] text-rachna-muted truncate">{m.role}</p>
              </div>
              {m.status && (
                <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0', STATUS_STYLE[m.status])}>
                  {m.status}
                </span>
              )}
            </div>
          ))}

          {/* Add member */}
          {showAddMember ? (
            <div className="flex gap-2 mt-1">
              <input
                autoFocus
                value={newMember}
                onChange={e => setNewMember(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addMember(); if (e.key === 'Escape') setShowAddMember(false) }}
                placeholder="Enter name…"
                className="flex-1 text-xs bg-rachna-surface border border-rachna-indigo rounded-lg px-2 py-1.5 outline-none"
              />
              <button onClick={addMember} className="text-xs bg-rachna-indigo text-white px-2 py-1 rounded-lg font-semibold">Add</button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center gap-1.5 text-xs text-rachna-indigo font-semibold hover:underline mt-1"
            >
              <UserPlus size={11} /> Add Member
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function AiPanel() {
  const { title } = useWorkspace()
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = (text) => {
    if (!text.trim() || loading) return
    setMessages(prev => [...prev, { role: 'user', content: text.trim() }])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const reply = AI_RESPONSES[text.trim()]
        ?? `Great question about "${title}"! Based on the current state of your project, I'd recommend focusing on what makes this video unique. Your audience persona data suggests they respond well to authenticity and real moments — make sure to capture genuine reactions on camera. The hook should establish the stakes within the first 10 seconds.`

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      setLoading(false)
    }, 900 + Math.random() * 600)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Prompt chips (only shown initially) */}
      {messages.length === 0 && (
        <div className="p-4 space-y-2 flex-shrink-0">
          <p className="text-[10px] font-bold text-rachna-muted uppercase tracking-widest mb-2">Try asking:</p>
          <div className="grid grid-cols-1 gap-1.5">
            {AI_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)}
                className="w-full text-left text-xs text-rachna-dark bg-rachna-surface border border-rachna-border rounded-xl px-3 py-2 hover:border-rachna-violet hover:bg-rachna-lavender hover:text-rachna-indigo transition-all">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={clsx('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rachna-indigo to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[8px] font-bold">AI</span>
              </div>
            )}
            <div className={clsx(
              'rounded-2xl px-3 py-2 max-w-[85%] text-xs leading-relaxed whitespace-pre-line',
              msg.role === 'user'
                ? 'bg-rachna-indigo text-white rounded-tr-sm'
                : 'bg-white border border-rachna-border text-rachna-dark rounded-tl-sm shadow-sm'
            )}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rachna-indigo to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold">AI</span>
            </div>
            <div className="bg-white border border-rachna-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 bg-rachna-indigo rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-rachna-border flex-shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(input) }}
            placeholder="Ask anything about this project…"
            className="flex-1 text-xs bg-rachna-surface border border-rachna-border rounded-xl px-3 py-2.5 outline-none focus:border-rachna-indigo"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 bg-rachna-indigo rounded-xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RightPanel({ onClose }) {
  const [tab, setTab] = useState('details')

  return (
    <div className="w-80 flex-shrink-0 bg-white border-l border-rachna-border flex flex-col h-full">
      <div className="flex items-center border-b border-rachna-border flex-shrink-0">
        <div className="flex flex-1">
          {[
            { id: 'details', label: 'Details' },
            { id: 'ai',      label: 'AI Assistant', badge: 'New' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={clsx(
                'flex-1 px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5',
                tab === t.id ? 'border-rachna-indigo text-rachna-indigo' : 'border-transparent text-rachna-muted hover:text-rachna-dark'
              )}>
              {t.label}
              {t.badge && <span className="bg-rachna-indigo text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{t.badge}</span>}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-rachna-muted hover:text-rachna-dark mx-1 flex-shrink-0">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === 'details' ? <DetailsPanel /> : <AiPanel />}
      </div>
    </div>
  )
}
