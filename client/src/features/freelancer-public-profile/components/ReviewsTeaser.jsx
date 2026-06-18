// client/src/features/freelancer-public-profile/components/ReviewsTeaser.jsx
import { motion } from 'framer-motion'
import { Star, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={13}
        className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
    ))}
    <span className="ml-1 text-xs font-bold text-rachna-dark">{rating}</span>
  </div>
)

export default function ReviewsTeaser({ reviews }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-rachna-dark text-lg">Recent Reviews</h2>
        <button onClick={() => navigate('/freelancer/reviews')}
          className="flex items-center gap-1 text-sm text-rachna-indigo font-semibold hover:underline">
          View All Reviews <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-5">
        {reviews.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 bg-rachna-surface rounded-xl border border-rachna-border">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {review.reviewerAvatar[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-rachna-dark text-sm">{review.reviewer}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-xs text-rachna-muted">{review.project} · {review.date}</p>
              </div>
            </div>
            <p className="text-sm text-rachna-dark leading-relaxed">"{review.text}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
