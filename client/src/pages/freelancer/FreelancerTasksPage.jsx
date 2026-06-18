// client/src/pages/freelancer/FreelancerTasksPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import clsx from 'clsx'
import { TASKS } from './mockData'

const PRIORITY = {
  High:   { cls: 'bg-red-50 text-red-600', icon: AlertCircle },
  Medium: { cls: 'bg-amber-50 text-amber-600', icon: AlertCircle },
  Low:    { cls: 'bg-green-50 text-green-700', icon: AlertCircle },
}

export default function FreelancerTasksPage() {
  const [done, setDone] = useState({})
  const [filter, setFilter] = useState('All')

  const tasks = TASKS.filter(t => filter === 'All' || t.priority === filter)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">Tasks</h1>
        <p className="text-sm text-rachna-muted mt-0.5">{TASKS.length} tasks across {new Set(TASKS.map(t => t.projectId)).size} projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Tasks',    value: TASKS.length,                                        color: 'text-rachna-indigo' },
          { label: 'High Priority',  value: TASKS.filter(t => t.priority === 'High').length,     color: 'text-red-500' },
          { label: 'Due Today',      value: TASKS.filter(t => t.dueDate === 'Today').length,     color: 'text-amber-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-rachna-border p-5">
            <p className={clsx('font-display font-extrabold text-2xl', s.color)}>{s.value}</p>
            <p className="text-sm text-rachna-muted mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl p-1 w-fit">
        {['All', 'High', 'Medium', 'Low'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx('px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === f ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:text-rachna-dark')}>
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-rachna-border divide-y divide-rachna-border overflow-hidden">
        {tasks.map((task, i) => {
          const isDone = done[task.id]
          const P = PRIORITY[task.priority]
          return (
            <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className={clsx('flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors', isDone && 'opacity-50')}>
              <button onClick={() => setDone(d => ({ ...d, [task.id]: !d[task.id] }))} className="flex-shrink-0">
                {isDone
                  ? <CheckCircle2 size={20} className="text-rachna-success" />
                  : <Circle size={20} className="text-rachna-border hover:text-rachna-indigo transition-colors" />
                }
              </button>
              <div className="flex-1 min-w-0">
                <p className={clsx('font-semibold text-rachna-dark text-sm', isDone && 'line-through')}>{task.title}</p>
                <p className="text-xs text-rachna-muted">{task.project} · {task.client}</p>
              </div>
              <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1', P.cls)}>
                {task.priority}
              </span>
              <div className="flex items-center gap-1.5 text-rachna-muted">
                <Calendar size={13} />
                <span className="text-xs">{task.dueDate}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
