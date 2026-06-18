// client/src/features/freelancer-public-profile/components/AvailabilitySection.jsx
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ALL_DAYS } from '../mockProfileData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const DURATION_OPTIONS = [
  { value: 'short',    label: 'Short Gig',    desc: '< 1 week' },
  { value: 'long',     label: 'Long-term',    desc: '1+ month' },
  { value: 'both',     label: 'Both',         desc: 'Flexible' },
]

export default function AvailabilitySection({ profile, isEdit, onChange }) {
  const toggleDay = (day) => {
    const days = profile.availabilityDays.includes(day)
      ? profile.availabilityDays.filter(d => d !== day)
      : [...profile.availabilityDays, day]
    onChange('availabilityDays', days)
  }

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6 space-y-6">
      <h2 className="font-display font-bold text-rachna-dark text-lg">Availability & Rates</h2>

      {/* Day Grid */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Weekly Availability</p>
        <div className="flex flex-wrap gap-2">
          {ALL_DAYS.map(day => {
            const active = profile.availabilityDays.includes(day)
            return (
              <button key={day} onClick={() => isEdit && toggleDay(day)}
                className={clsx(
                  'w-12 h-12 rounded-xl text-sm font-semibold transition-all',
                  active
                    ? 'bg-rachna-indigo text-white shadow-glow'
                    : 'bg-rachna-surface text-rachna-muted border border-rachna-border',
                  isEdit && 'cursor-pointer hover:scale-105',
                  !isEdit && 'cursor-default'
                )}>
                {day}
              </button>
            )
          })}
        </div>
        {isEdit && (
          <p className="text-xs text-rachna-muted mt-2">Click days to toggle availability</p>
        )}
      </div>

      {/* Project Duration */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Preferred Project Duration</p>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map(opt => (
            <button key={opt.value}
              onClick={() => isEdit && onChange('preferredDuration', opt.value)}
              className={clsx(
                'flex flex-col items-center px-4 py-2.5 rounded-xl border transition-all',
                profile.preferredDuration === opt.value
                  ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo'
                  : 'border-rachna-border bg-rachna-surface text-rachna-muted',
                isEdit ? 'cursor-pointer hover:border-rachna-indigo' : 'cursor-default'
              )}>
              <span className="text-sm font-semibold">{opt.label}</span>
              <span className="text-[10px] opacity-70">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rate Range */}
      <div>
        <p className="text-xs font-semibold text-rachna-muted uppercase tracking-wide mb-3">Rate Range (per project)</p>
        {isEdit ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-rachna-muted mb-1 block">Minimum (₹)</label>
                <input type="number" value={profile.rateMin} step={500}
                  onChange={e => onChange('rateMin', Math.min(parseInt(e.target.value) || 0, profile.rateMax - 500))}
                  className="w-full bg-rachna-surface border border-rachna-border rounded-xl px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors" />
              </div>
              <span className="text-rachna-muted font-bold mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-rachna-muted mb-1 block">Maximum (₹)</label>
                <input type="number" value={profile.rateMax} step={500}
                  onChange={e => onChange('rateMax', Math.max(parseInt(e.target.value) || 0, profile.rateMin + 500))}
                  className="w-full bg-rachna-surface border border-rachna-border rounded-xl px-3 py-2 text-sm outline-none focus:border-rachna-indigo transition-colors" />
              </div>
            </div>
            {/* Visual bar */}
            <div className="relative h-2 bg-rachna-surface rounded-full">
              <div className="absolute h-full bg-rachna-indigo rounded-full"
                style={{
                  left: `${(profile.rateMin / 100000) * 100}%`,
                  right: `${100 - (profile.rateMax / 100000) * 100}%`,
                }} />
            </div>
            <div className="flex justify-between text-xs text-rachna-muted">
              <span>₹500</span><span>₹50K</span><span>₹1,00,000</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-rachna-lavender px-4 py-2.5 rounded-xl">
              <span className="font-display font-bold text-rachna-indigo text-lg">{fmt(profile.rateMin)}</span>
              <span className="text-rachna-muted">–</span>
              <span className="font-display font-bold text-rachna-indigo text-lg">{fmt(profile.rateMax)}</span>
            </div>
            <span className="text-sm text-rachna-muted">per project</span>
          </div>
        )}
      </div>
    </div>
  )
}
