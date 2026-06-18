// client/src/features/03-audiencelab/components/QuickWins.jsx

import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuickWins({ wins = [] }) {
  return (
    <div className="bg-gradient-to-r from-[#4540C8] to-[#9B7FD8] rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={20} className="text-yellow-300" fill="currentColor" />
        <h3 className="font-bold text-lg">3 Quick Wins — Do These This Week</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wins.map((win, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-white/90">{win}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
