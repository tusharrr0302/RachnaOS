// client/src/pages/freelancer/FreelancerMessagesPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import clsx from 'clsx'
import { MESSAGES } from './mockData'

export default function FreelancerMessagesPage() {
  const [active, setActive] = useState(MESSAGES[0].id)
  const [input, setInput] = useState('')
  const thread = MESSAGES.find(m => m.id === active)

  return (
    <div className="p-6 h-full">
      <div className="flex gap-4 h-[calc(100vh-160px)]">

        {/* Sidebar — Contacts */}
        <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-rachna-border flex flex-col overflow-hidden">
          <div className="px-4 py-4 border-b border-rachna-border">
            <h3 className="font-display font-bold text-rachna-dark">Messages</h3>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {MESSAGES.map(m => (
              <button key={m.id} onClick={() => setActive(m.id)}
                className={clsx('w-full flex items-center gap-3 px-4 py-3 hover:bg-rachna-surface transition-colors text-left',
                  active === m.id && 'bg-rachna-lavender')}>
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm">
                    {m.contactAvatar[0]}
                  </div>
                  {m.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-rachna-dark">{m.contact}</p>
                    <span className="text-[10px] text-rachna-muted">{m.time}</span>
                  </div>
                  <p className="text-xs text-rachna-muted truncate">{m.lastMessage}</p>
                </div>
                {m.unread > 0 && (
                  <span className="w-4 h-4 bg-rachna-indigo text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {m.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-2xl border border-rachna-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-rachna-border">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm">
                {thread.contactAvatar[0]}
              </div>
              {thread.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />}
            </div>
            <div>
              <p className="font-semibold text-rachna-dark text-sm">{thread.contact}</p>
              <p className="text-xs text-rachna-muted">{thread.project}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {thread.messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={clsx('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                <div className={clsx('max-w-xs px-4 py-2.5 rounded-2xl text-sm',
                  msg.from === 'me'
                    ? 'bg-rachna-indigo text-white rounded-br-sm'
                    : 'bg-rachna-surface text-rachna-dark rounded-bl-sm')}>
                  <p>{msg.text}</p>
                  <p className={clsx('text-[10px] mt-1', msg.from === 'me' ? 'text-white/60' : 'text-rachna-muted')}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-rachna-border flex items-center gap-3">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder={`Message ${thread.contact}...`}
              className="flex-1 bg-rachna-surface rounded-xl px-4 py-2.5 text-sm text-rachna-dark placeholder:text-rachna-muted outline-none focus:ring-2 focus:ring-rachna-indigo/20"
            />
            <button onClick={() => setInput('')}
              className="w-9 h-9 bg-rachna-indigo rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
