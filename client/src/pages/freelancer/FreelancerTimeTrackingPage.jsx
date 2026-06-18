// client/src/pages/freelancer/FreelancerTimeTrackingPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Play, Pause, IndianRupee } from 'lucide-react'
import clsx from 'clsx'
import { TIME_LOGS, FREELANCER } from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function FreelancerTimeTrackingPage() {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const totalHours = TIME_LOGS.reduce((s, l) => s + l.hours, 0)
  const billableHours = TIME_LOGS.filter(l => l.billable).reduce((s, l) => s + l.hours, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">Time Tracking</h1>
        <p className="text-sm text-rachna-muted mt-0.5">Log your work hours and track billable time</p>
      </div>

      {/* Timer Widget */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-rachna-border p-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="font-display font-extrabold text-5xl text-rachna-dark tracking-wider">
            {String(Math.floor(seconds / 3600)).padStart(2,'0')}:
            {String(Math.floor((seconds % 3600) / 60)).padStart(2,'0')}:
            {String(seconds % 60).padStart(2,'0')}
          </p>
          <p className="text-rachna-muted text-sm mt-2">24 Hours Surviving in Delhi</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => setRunning(r => !r)}
          className={clsx(
            'flex items-center gap-2 px-8 py-3 rounded-2xl font-display font-semibold text-white transition-all',
            running ? 'bg-red-500 hover:bg-red-600' : 'bg-rachna-indigo hover:bg-indigo-700'
          )}
        >
          {running ? <><Pause size={18}/> Stop Timer</> : <><Play size={18}/> Start Timer</>}
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Hours', value: `${totalHours}h`, color: 'text-rachna-indigo' },
          { label: 'Billable Hours', value: `${billableHours}h`, color: 'text-rachna-success' },
          { label: 'Billable Value', value: fmt(billableHours * FREELANCER.hourlyRate), color: 'text-amber-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-rachna-border p-5">
            <p className={clsx('font-display font-extrabold text-2xl', s.color)}>{s.value}</p>
            <p className="text-sm text-rachna-muted mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
        <div className="px-6 py-4 border-b border-rachna-border">
          <h3 className="font-display font-bold text-rachna-dark">Time Log</h3>
        </div>
        <div className="divide-y divide-rachna-border">
          {TIME_LOGS.map((log, i) => (
            <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-rachna-lavender flex items-center justify-center flex-shrink-0">
                <Clock size={15} className="text-rachna-indigo" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rachna-dark text-sm">{log.task}</p>
                <p className="text-xs text-rachna-muted">{log.project}</p>
              </div>
              <span className="text-xs text-rachna-muted">{log.date}</span>
              <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', log.billable ? 'bg-green-50 text-green-700' : 'bg-rachna-surface text-rachna-muted')}>
                {log.billable ? 'Billable' : 'Non-Billable'}
              </span>
              <div className="text-right">
                <p className="font-bold text-rachna-dark text-sm">{log.hours}h</p>
                {log.billable && <p className="text-xs text-rachna-muted">{fmt(log.hours * FREELANCER.hourlyRate)}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
