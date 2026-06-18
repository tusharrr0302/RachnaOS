import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock, Filter, Search, ChevronRight, Video, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'

const CATEGORIES = ['All', 'YouTube Strategy', 'Brand Deals', 'Growth', 'Monetization', 'Legal', 'Thumbnail']
const SORT_OPTIONS = ['Top Rated', 'Most Sessions', 'Price: Low-High', 'Price: High-Low']

const EXPERTS = [
  {
    id: '1', name: 'Rahul K.', headline: 'YouTube Strategist | Worked with 50M+ creators',
    categories: ['YouTube Strategy', 'Growth'], rating: 4.9, sessions: 342, price15: 799, price30: 1399, price60: 2499,
    available: true, verified: true, featured: true, languages: ['Hindi', 'English'],
    bio: "Helped 200+ creators grow from 0 to 100K subs. Former YouTube Partner Manager.",
    avatar: 'R', notableClients: ['2M YouTube channel', 'Brand XYZ'],
    responseTime: 'Usually responds in 2 hours',
  },
  {
    id: '2', name: 'Sneha P.', headline: 'Brand Deal Expert | Negotiated ₹2Cr+ in creator deals',
    categories: ['Brand Deals', 'Monetization'], rating: 4.7, sessions: 218, price15: 599, price30: 999, price60: 1799,
    available: true, verified: true, featured: false, languages: ['Hindi', 'English', 'Marathi'],
    bio: "10+ years in influencer marketing. Negotiated for creators across finance, tech, and lifestyle niches.",
    avatar: 'S', notableClients: ['Finance creator 500K', 'Tech creator 1M'],
    responseTime: 'Usually responds in 4 hours',
  },
  {
    id: '3', name: 'Vikas M.', headline: 'Growth Consultant | 15 7-figure channels built',
    categories: ['Growth', 'YouTube Strategy'], rating: 4.8, sessions: 176, price15: 499, price30: 899, price60: 1599,
    available: false, verified: true, featured: false, languages: ['Hindi'],
    bio: "Data-driven growth strategist. Specializes in turning stagnant channels into growth machines.",
    avatar: 'V', notableClients: ['Gaming channel 3M', 'Education creator'],
    responseTime: 'Usually responds in 6 hours',
  },
  {
    id: '4', name: 'Ananya R.', headline: 'Thumbnail & Title Psychology Expert',
    categories: ['Thumbnail', 'YouTube Strategy'], rating: 4.6, sessions: 134, price15: 399, price30: 699, price60: 1299,
    available: true, verified: false, featured: false, languages: ['Hindi', 'English'],
    bio: "Designer turned YouTube optimizer. Tested 10,000+ thumbnails. Average CTR improvement: +2.8%.",
    avatar: 'A', notableClients: [], responseTime: 'Usually responds in 1 hour',
  },
]

function ExpertCard({ expert, onBook }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-rachna-indigo flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">{expert.avatar}</span>
          </div>
          {expert.available && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-rachna-success rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display font-bold text-rachna-dark text-base">{expert.name}</p>
            {expert.verified && <CheckCircle2 size={14} className="text-rachna-indigo flex-shrink-0" />}
            {expert.featured && <span className="badge text-xs">⭐ Featured</span>}
          </div>
          <p className="text-xs text-rachna-muted mt-0.5 leading-tight line-clamp-2">{expert.headline}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 justify-end mb-1">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-rachna-dark">{expert.rating}</span>
          </div>
          <p className="text-xs text-rachna-muted">{expert.sessions} sessions</p>
        </div>
      </div>

      <p className="text-xs text-rachna-muted leading-relaxed mb-4 line-clamp-2">{expert.bio}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {expert.categories.map(c => <span key={c} className="badge text-xs">{c}</span>)}
        {expert.languages.map(l => <span key={l} className="text-[10px] bg-rachna-surface text-rachna-muted border border-rachna-border px-2 py-0.5 rounded-full">{l}</span>)}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: '15 min', price: expert.price15 },
          { label: '30 min', price: expert.price30 },
          { label: '60 min', price: expert.price60 },
        ].map(tier => (
          <div key={tier.label} className="bg-rachna-surface rounded-xl p-2 text-center">
            <p className="text-xs font-bold text-rachna-dark">₹{tier.price.toLocaleString()}</p>
            <p className="text-[10px] text-rachna-muted">{tier.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-[10px] text-rachna-muted flex-1 flex items-center gap-1">
          <Clock size={10} /> {expert.responseTime}
        </p>
        <button
          id={`book-${expert.id}`}
          onClick={() => onBook(expert)}
          className={clsx('btn-primary py-2 px-4 text-xs', !expert.available && 'opacity-60 cursor-not-allowed')}
          disabled={!expert.available}
        >
          {expert.available ? 'Book Session' : 'Unavailable'}
        </button>
      </div>
    </motion.div>
  )
}

function BookingModal({ expert, onClose }) {
  const [sessionType, setSessionType] = useState('15min')
  const [question, setQuestion] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [booked, setBooked] = useState(false)

  const TIMES = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '6:00 PM']
  const PRICES = { '15min': expert.price15, '30min': expert.price30, '60min': expert.price60 }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {booked ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-rachna-success" />
            </div>
            <h3 className="font-display font-bold text-rachna-dark text-xl mb-2">Session Booked! 🎉</h3>
            <p className="text-rachna-muted text-sm mb-6">You'll receive a Google Meet link within 30 minutes at your registered email.</p>
            <button onClick={onClose} className="btn-primary">Back to Expert Connect</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rachna-indigo flex items-center justify-center">
                <span className="text-white font-bold text-lg">{expert.avatar}</span>
              </div>
              <div>
                <p className="font-display font-bold text-rachna-dark">{expert.name}</p>
                <p className="text-xs text-rachna-muted">{expert.headline}</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Session Type */}
              <div>
                <label className="text-sm font-semibold text-rachna-dark block mb-2">Session Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['15min', '30min', '60min'].map(t => (
                    <button key={t} onClick={() => setSessionType(t)}
                      className={clsx('p-3 rounded-xl border-2 transition-all text-center', sessionType === t ? 'border-rachna-indigo bg-rachna-lavender' : 'border-rachna-border hover:border-rachna-violet')}>
                      <p className={clsx('text-sm font-bold', sessionType === t ? 'text-rachna-indigo' : 'text-rachna-dark')}>₹{PRICES[t]?.toLocaleString()}</p>
                      <p className="text-xs text-rachna-muted">{t.replace('min', ' min')}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-semibold text-rachna-dark block mb-1.5">Date</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input" id="booking-date" />
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-semibold text-rachna-dark block mb-2">Time (IST)</label>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={clsx('px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all', selectedTime === t ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div>
                <label className="text-sm font-semibold text-rachna-dark block mb-1.5">What do you want to discuss?</label>
                <textarea value={question} onChange={e => setQuestion(e.target.value)} className="input h-24 resize-none" placeholder="Describe your main question or challenge..." id="booking-question" />
              </div>
            </div>

            <div className="mt-6 border-t border-rachna-border pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-rachna-muted">Total</p>
                <p className="font-display font-bold text-rachna-dark text-xl">₹{PRICES[sessionType]?.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="btn-ghost py-2.5 px-4 text-sm">Cancel</button>
                <button
                  id="confirm-booking"
                  onClick={() => setBooked(true)}
                  className="btn-primary py-2.5 px-6 text-sm"
                  disabled={!selectedDate || !selectedTime}
                >
                  Pay & Book Session
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default function ExpertConnectPage() {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Top Rated')
  const [search, setSearch] = useState('')
  const [bookingExpert, setBookingExpert] = useState(null)

  const filtered = EXPERTS.filter(e => {
    if (category !== 'All' && !e.categories.includes(category)) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.headline.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">Expert Connect</h1>
        <p className="text-rachna-muted text-sm">Talk to Experts Who've Actually Done It. Not theory. Real experience from real professionals.</p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-rachna-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experts..." className="input pl-9 py-2 text-sm w-56" />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={clsx('px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all', category === c ? 'border-rachna-indigo bg-rachna-lavender text-rachna-indigo' : 'border-rachna-border text-rachna-muted hover:border-rachna-violet')}>
              {c}
            </button>
          ))}
        </div>

        <select value={sort} onChange={e => setSort(e.target.value)} className="input py-2 text-sm ml-auto w-auto" id="sort-select">
          {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Expert Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(expert => (
          <ExpertCard key={expert.id} expert={expert} onBook={setBookingExpert} />
        ))}
      </div>

      {/* Booking modal */}
      {bookingExpert && <BookingModal expert={bookingExpert} onClose={() => setBookingExpert(null)} />}
    </div>
  )
}
