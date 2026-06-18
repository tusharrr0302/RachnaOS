// client/src/pages/freelancer/FreelancerReviewsPage.jsx
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { REVIEWS, FREELANCER } from './mockData'

const StarRating = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size}
        className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
    ))}
  </div>
)

export default function FreelancerReviewsPage() {
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-rachna-dark text-xl">Reviews</h1>
        <p className="text-sm text-rachna-muted mt-0.5">Ratings and feedback from your clients</p>
      </div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-rachna-border p-8 flex items-center gap-10">
        <div className="text-center">
          <p className="font-display font-extrabold text-6xl text-rachna-dark">{avgRating}</p>
          <StarRating rating={parseFloat(avgRating)} size={20} />
          <p className="text-xs text-rachna-muted mt-2">{REVIEWS.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5,4,3,2,1].map(star => {
            const count = REVIEWS.filter(r => Math.round(r.rating) === star).length
            const pct = (count / REVIEWS.length) * 100
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs text-rachna-muted w-4">{star}</span>
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-rachna-border rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-yellow-400 rounded-full" />
                </div>
                <span className="text-xs text-rachna-muted w-4">{count}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REVIEWS.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(69,64,200,0.12)' }}
            className="bg-white rounded-2xl border border-rachna-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm">
                {review.reviewerAvatar[0]}
              </div>
              <div>
                <p className="font-semibold text-rachna-dark text-sm">{review.reviewer}</p>
                <p className="text-xs text-rachna-muted">{review.project}</p>
              </div>
              <div className="ml-auto text-right">
                <StarRating rating={review.rating} />
                <p className="text-xs font-bold text-rachna-dark mt-0.5">{review.rating}</p>
              </div>
            </div>
            <p className="text-sm text-rachna-muted leading-relaxed">"{review.text}"</p>
            <p className="text-xs text-rachna-muted mt-3">{review.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
