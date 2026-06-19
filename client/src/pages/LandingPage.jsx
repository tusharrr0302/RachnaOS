import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  TrendingUp, AlertTriangle, ShieldAlert, Zap, Star,
  FlaskConical, DollarSign, ShieldCheck, Users, ShoppingBag, BookOpen, Layers
} from 'lucide-react'

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Hero floating cards ─── */
const HERO_CARDS = [
  {
    icon: <FlaskConical size={14} className="text-rachna-indigo" />,
    label: 'AudienceLab',
    content: (
      <div>
        <p className="text-xs text-rachna-muted mb-1">CTR Prediction</p>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-display font-bold text-rachna-indigo">8.4%</span>
          <span className="text-xs text-rachna-success flex items-center gap-0.5 font-medium"><TrendingUp size={10} /> +2.1%</span>
        </div>
        <div className="mt-1.5 h-1.5 bg-rachna-lavender rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-rachna-indigo rounded-full" />
        </div>
      </div>
    ),
    delay: 0,
  },
  {
    icon: <DollarSign size={14} className="text-rachna-warning" />,
    label: 'FairRate Alert',
    content: (
      <div>
        <p className="text-xs text-rachna-muted mb-1">Underpayment Detected</p>
        <p className="text-sm font-display font-bold text-rachna-danger">You're being underpaid</p>
        <p className="text-base font-display font-extrabold text-rachna-dark mt-0.5">by ₹45,000</p>
      </div>
    ),
    delay: 0.15,
  },
  {
    icon: <ShieldAlert size={14} className="text-rachna-danger" />,
    label: 'ShieldScan',
    content: (
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-rachna-danger animate-pulse" />
          <span className="text-xs font-semibold text-rachna-danger">High Risk Detected</span>
        </div>
        <p className="text-xs text-rachna-dark font-medium">Exclusivity clause: 24 months</p>
        <p className="text-xs text-rachna-muted mt-0.5">Industry standard: 30-90 days</p>
      </div>
    ),
    delay: 0.3,
  },
]

/* ─── Stats ─── */
const STATS = [
  { number: '2,400+', label: 'Creators protected' },
  { number: '94%', label: 'Accuracy on AudienceLab CTR' },
  { number: '₹1.2Cr+', label: 'Brand deals analyzed by FairRate' },
]

/* ─── Features ─── */
const FEATURES = [
  {
    id: 'workspace',
    icon: Layers,
    badge: null,
    title: 'Build Your Video Like a Pro',
    subtitle: 'Workspace',
    desc: 'Title · Script · Thumbnail · Inspiration — all in one drag-and-drop project board. Assign your editor, designer, and researcher from a single canvas.',
    cta: 'Try Workspace',
    href: '/creator/workspace',
    mockup: 'workspace',
  },
  {
    id: 'audiencelab',
    icon: FlaskConical,
    badge: '★ Hero Feature',
    title: 'Know Before You Post.',
    subtitle: 'AudienceLab',
    desc: 'Test your thumbnail, title, and hook against 5 AI audience personas. Get CTR predictions and exact improvement suggestions before you upload anything.',
    cta: 'Test Your Content',
    href: '/creator/audience-lab',
    mockup: 'audience',
  },
  {
    id: 'fairrate',
    icon: DollarSign,
    badge: null,
    title: 'Never Get Underpaid Again.',
    subtitle: 'FairRate + CreatorShield',
    desc: "FairRate calculates exactly what your sponsorship should cost. CreatorShield scans contracts for trap clauses before you sign. Protect your worth.",
    cta: 'Check Your Rate',
    href: '/creator/fair-rate',
    mockup: 'fairrate',
  },
  {
    id: 'expertconnect',
    icon: Users,
    badge: null,
    title: 'Talk to Real Experts.',
    subtitle: 'Expert Connect',
    desc: "Book 15-min calls with actual creator managers, YouTube strategists, and brand deal negotiators. Not theory. Real-world experience, on demand.",
    cta: 'Book a Session',
    href: '/creator/expert-connect',
    mockup: 'expert',
  },
  {
    id: 'marketplace',
    icon: ShoppingBag,
    badge: null,
    title: 'Your Niche. Your Team.',
    subtitle: 'Freelance Marketplace',
    desc: 'AI matches you with editors, thumbnail designers, and script writers who have worked in YOUR niche on videos LIKE yours.',
    cta: 'Find Your Team',
    href: '/creator/marketplace',
    mockup: 'marketplace',
  },
  {
    id: 'academy',
    icon: BookOpen,
    badge: null,
    title: 'Real Knowledge. No Fluff.',
    subtitle: 'Creator Academy',
    desc: 'Learn thumbnail psychology, hook writing, storytelling structure, and SEO — from real creators who built 7-figure channels.',
    cta: 'Start Learning',
    href: '/creator/academy',
    mockup: 'academy',
  },
]

/* ─── Feature Mockup ─── */
function FeatureMockup({ type }) {
  const mockups = {
    workspace: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-rachna-danger/60" />
          <div className="w-3 h-3 rounded-full bg-rachna-warning/60" />
          <div className="w-3 h-3 rounded-full bg-rachna-success/60" />
          <span className="text-xs text-rachna-muted ml-2 font-medium">24 Hours Surviving in Delhi</span>
        </div>
        <div className="flex gap-2 mb-3">
          {['Canvas', 'Tasks', 'Script', 'Assets'].map((t, i) => (
            <span key={t} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${i === 0 ? 'bg-rachna-indigo text-white' : 'text-rachna-muted hover:bg-rachna-surface'}`}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'IDEA', color: 'bg-amber-50 border-amber-200', text: '24 Hours Surviving in Delhi', sub: 'Research Complete ✓' },
            { label: 'SCRIPT', color: 'bg-blue-50 border-blue-200', text: 'Script v1', sub: 'Hook · Intro · Main' },
            { label: 'THUMBNAIL', color: 'bg-purple-50 border-purple-200', text: 'v2 Selected', sub: 'Designer: Rohit' },
          ].map(card => (
            <div key={card.label} className={`rounded-xl border p-3 ${card.color}`}>
              <span className="text-[9px] font-display font-bold text-rachna-muted uppercase tracking-wider">{card.label}</span>
              <p className="text-xs font-semibold text-rachna-dark mt-1 leading-tight">{card.text}</p>
              <p className="text-[10px] text-rachna-muted mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    audience: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-display font-semibold text-rachna-dark">AudienceLab Results</span>
          <span className="badge text-xs">72/100</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[{ label: 'CTR', val: '6.2%', color: 'text-rachna-success' }, { label: 'Retention', val: '32%', color: 'text-rachna-warning' }, { label: 'Engagement', val: '4.8%', color: 'text-rachna-indigo' }].map(s => (
            <div key={s.label} className="bg-rachna-surface rounded-xl p-2 text-center">
              <p className={`text-base font-display font-bold ${s.color}`}>{s.val}</p>
              <p className="text-[10px] text-rachna-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {[{ emoji: '👩‍🎓', name: 'Priya', click: 'YES', stars: 4 }, { emoji: '👨‍💼', name: 'Arjun', click: 'YES', stars: 3 }, { emoji: '🎮', name: 'Ravi', click: 'MAYBE', stars: 2 }].map(p => (
            <div key={p.name} className="flex items-center gap-2 bg-rachna-surface rounded-lg px-2.5 py-1.5">
              <span className="text-base">{p.emoji}</span>
              <span className="text-xs font-medium text-rachna-dark flex-1">{p.name}</span>
              <span className={`text-[10px] font-bold ${p.click === 'YES' ? 'text-rachna-success' : p.click === 'MAYBE' ? 'text-rachna-warning' : 'text-rachna-danger'}`}>{p.click}</span>
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < p.stars ? 'text-amber-400 fill-amber-400' : 'text-rachna-border'} />)}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    fairrate: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display font-semibold text-rachna-dark">Fair Price Estimate</span>
          <span className="badge-success text-[10px]">AI Verified</span>
        </div>
        <p className="text-2xl font-display font-extrabold text-rachna-dark mb-0.5">₹8,000 – ₹14,000</p>
        <p className="text-xs text-rachna-muted mb-3">Market Average: ₹10,800</p>
        <div className="h-2 bg-rachna-lavender rounded-full overflow-hidden mb-4">
          <div className="h-full w-2/3 bg-rachna-indigo rounded-full" />
        </div>
        <div className="space-y-1.5">
          {[{ l: 'Base CPM rate', v: '₹5,000' }, { l: 'Engagement premium', v: '+₹2,000' }, { l: 'Niche demand', v: '+₹1,800' }].map(r => (
            <div key={r.l} className="flex justify-between text-xs">
              <span className="text-rachna-muted">{r.l}</span>
              <span className="font-semibold text-rachna-dark">{r.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
          <p className="text-[11px] font-semibold text-rachna-warning flex items-center gap-1.5">
            <AlertTriangle size={11} /> Underpayment Alert
          </p>
          <p className="text-[10px] text-rachna-muted mt-0.5">If brand offered ₹4,000 — you're underpaid by ₹6,800</p>
        </div>
      </div>
    ),
    expert: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <span className="text-xs font-display font-semibold text-rachna-dark block mb-3">Expert Connect</span>
        <div className="space-y-2">
          {[
            { name: 'Rahul K.', role: 'YouTube Strategist', rating: 4.9, price: '₹799/15min', avail: true },
            { name: 'Sneha P.', role: 'Brand Deal Expert', rating: 4.7, price: '₹599/15min', avail: true },
            { name: 'Vikas M.', role: 'Growth Consultant', rating: 4.8, price: '₹499/15min', avail: false },
          ].map(e => (
            <div key={e.name} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-rachna-surface border border-rachna-border">
              <div className="w-8 h-8 rounded-full bg-rachna-indigo/20 flex items-center justify-center flex-shrink-0">
                <span className="text-rachna-indigo font-bold text-sm">{e.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-rachna-dark">{e.name}</span>
                  {e.avail && <span className="w-1.5 h-1.5 rounded-full bg-rachna-success" />}
                </div>
                <span className="text-[10px] text-rachna-muted">{e.role}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-rachna-indigo">{e.price}</p>
                <p className="text-[10px] text-amber-500">★ {e.rating}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 bg-rachna-indigo text-white text-xs font-semibold py-2 rounded-xl hover:bg-indigo-700 transition-colors">
          Book a Session
        </button>
      </div>
    ),
    marketplace: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-display font-semibold text-rachna-dark">AI Matched For You</span>
          <span className="badge text-[10px]">3 matches</span>
        </div>
        {[
          { name: 'Raj Edits', spec: 'Video Editor', niche: 'Finance Niche', match: 98, rate: '₹4,500/video' },
          { name: 'ThumbPro', spec: 'Thumbnail Designer', niche: 'Tech Niche', match: 94, rate: '₹1,200/thumb' },
        ].map(f => (
          <div key={f.name} className="mb-2.5 p-3 rounded-xl border border-rachna-border bg-rachna-surface">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-rachna-violet/20 flex items-center justify-center">
                <span className="text-rachna-violet font-bold text-xs">{f.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-rachna-dark">{f.name}</p>
                <p className="text-[10px] text-rachna-muted">{f.spec} · {f.niche}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-rachna-success">{f.match}% match</p>
                <p className="text-[10px] text-rachna-muted">{f.rate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    academy: (
      <div className="bg-white rounded-2xl shadow-card-lg border border-rachna-border p-4 w-full">
        <span className="text-xs font-display font-semibold text-rachna-dark block mb-3">Creator Academy</span>
        {[
          { title: 'Thumbnail Psychology', progress: 80, lessons: 12 },
          { title: 'Hook Writing Masterclass', progress: 45, lessons: 8 },
          { title: 'YouTube SEO Deep Dive', progress: 20, lessons: 15 },
        ].map(m => (
          <div key={m.title} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-rachna-dark">{m.title}</span>
              <span className="text-[10px] text-rachna-muted">{m.lessons} lessons</span>
            </div>
            <div className="h-1.5 bg-rachna-lavender rounded-full overflow-hidden">
              <div className="h-full bg-rachna-indigo rounded-full transition-all" style={{ width: `${m.progress}%` }} />
            </div>
            <span className="text-[10px] text-rachna-muted">{m.progress}% complete</span>
          </div>
        ))}
      </div>
    ),
  }
  return mockups[type] || null
}

/* ─── Pricing ─── */
const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: '/mo',
    highlight: false,
    features: [
      '3 Workspace projects',
      '5 AudienceLab tests/mo',
      'FairRate (basic)',
      'Academy free tiers',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn-ghost',
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/mo',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited Workspace',
      'Unlimited AudienceLab',
      'Full FairRate + Shield',
      '3 Expert calls/mo',
      'Marketplace access',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'btn-primary',
  },
  {
    name: 'Studio',
    price: '₹2,499',
    period: '/mo',
    highlight: false,
    features: [
      'Everything in Pro',
      'Team seats (5)',
      'Priority Expert access',
      'White-label contracts',
      'Dedicated success manager',
    ],
    cta: 'Contact Us',
    ctaStyle: 'btn-ghost',
  },
]

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    quote: "AudienceLab literally told me my hook was losing 60% of viewers at 0:18. I rewrote it, and my retention went from 28% to 47% overnight. Nothing else does this.",
    name: 'Akash Tiwari',
    role: 'Finance Creator, 240K subs',
    avatar: 'A',
  },
  {
    quote: "FairRate caught that a brand was offering me ₹12,000 when I should have been getting ₹28,000. That's ₹16,000 I would have left on the table. This app paid for itself in one deal.",
    name: 'Priya Sharma',
    role: 'Lifestyle Creator, 85K subs',
    avatar: 'P',
  },
  {
    quote: "CreatorShield flagged a 24-month exclusivity clause I completely missed. My manager reviewed it using the Shield report and we renegotiated it down to 45 days. Lifesaver.",
    name: 'Rohan Mehta',
    role: 'Tech Creator, 180K subs',
    avatar: 'R',
  },
]

/* ─── Main Component ─── */
export default function LandingPage() {
  const navigate = useNavigate()
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="min-h-screen bg-rachna-surface pt-24 pb-16 px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-rachna-lavender border border-rachna-border rounded-full px-4 py-1.5 mb-6">
                <Zap size={13} className="text-rachna-indigo" />
                <span className="text-xs font-display font-semibold text-rachna-indigo">AI-Powered Creator OS</span>
              </div>

              <h1 className="font-display font-extrabold text-rachna-dark leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Build Smarter.<br />
                <span className="text-gradient">Create Better.</span>
              </h1>

              <p className="text-lg text-rachna-muted leading-relaxed mb-8 max-w-lg">
                Your AI-powered creator OS. Stop guessing. Start growing. Everything you need to build, test, protect, and scale your channel — in one place.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  id="hero-cta-primary"
                  onClick={() => navigate('/sign-up')}
                  className="btn-primary text-base px-7 py-3.5"
                >
                  Get Started Free
                </button>
                <button
                  id="hero-cta-secondary"
                  onClick={() => navigate('/creator/audience-lab')}
                  className="btn-ghost text-base px-7 py-3.5"
                >
                  See How It Works <ArrowRight size={16} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                {['No credit card', 'Works for any niche', 'Free tier available'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-rachna-success" />
                    <span className="text-sm text-rachna-muted">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              {/* Phone mockup */}
              <div className="relative mx-auto" style={{ maxWidth: 320 }}>
                <div className="bg-rachna-dark rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-rachna-surface rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/19' }}>
                    {/* Mini workspace UI */}
                    <div className="bg-white h-full p-3 flex flex-col gap-2 overflow-hidden">
                      <div className="pb-2 border-b border-rachna-border">
                        <img src="/logo.png" alt="RachnaOS Logo" className="h-14 w-auto object-contain" />
                      </div>
                      <div className="bg-rachna-indigo rounded-xl p-2 text-white">
                        <p className="text-[9px] font-semibold opacity-70">AudienceLab Score</p>
                        <p className="text-2xl font-display font-extrabold">72<span className="text-sm font-normal opacity-70">/100</span></p>
                        <p className="text-[9px] opacity-70 mt-0.5">Good Potential</p>
                      </div>
                      {[{ l: 'CTR Prediction', v: '6.2%', c: 'text-rachna-success' }, { l: 'Retention Risk', v: 'Medium', c: 'text-rachna-warning' }, { l: 'Engagement', v: '4.8%', c: 'text-rachna-indigo' }].map(s => (
                        <div key={s.l} className="flex justify-between items-center bg-rachna-surface rounded-lg px-2 py-1.5">
                          <span className="text-[9px] text-rachna-muted">{s.l}</span>
                          <span className={`text-[10px] font-bold ${s.c}`}>{s.v}</span>
                        </div>
                      ))}
                      <div className="bg-rachna-lavender rounded-xl p-2">
                        <p className="text-[8px] font-semibold text-rachna-indigo mb-1">Workspace</p>
                        <p className="text-[9px] font-bold text-rachna-dark">24 Hours in Delhi</p>
                        <div className="flex gap-1 mt-1">
                          {['Scripting', 'In Progress'].map(t => (
                            <span key={t} className="text-[8px] bg-white rounded px-1 py-0.5 text-rachna-muted">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-rachna-dark/50 rounded-full" />
                </div>

                {/* Floating Cards */}
                {HERO_CARDS.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + card.delay }}
                    className={`absolute glass rounded-2xl p-3 shadow-card-lg border border-white/60 w-48 ${
                      i === 0 ? '-left-16 top-12' :
                      i === 1 ? '-right-12 top-1/3' :
                      '-left-12 bottom-20'
                    }`}
                    style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-lg bg-rachna-lavender flex items-center justify-center">
                        {card.icon}
                      </div>
                      <span className="text-[10px] font-display font-semibold text-rachna-dark">{card.label}</span>
                    </div>
                    {card.content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF STRIP ─── */}
      <section className="bg-white border-y border-rachna-border py-8 px-6" id="about">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-rachna-muted mb-6 font-medium">Trusted by creators in 12+ niches and growing fast</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {['YouTube', 'Instagram', 'Shorts', 'Moj', 'Josh'].map(platform => (
              <div key={platform} className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-xl bg-rachna-surface flex items-center justify-center">
                  <span className="text-xs font-bold text-rachna-dark">{platform[0]}</span>
                </div>
                <span className="text-sm font-semibold text-rachna-dark">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BLOCK ─── */}
      <section className="bg-rachna-indigo py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="grid md:grid-cols-3 gap-8 md:gap-4">
            {STATS.map(({ number, label }) => (
              <motion.div key={label} variants={fadeUp} className="text-center">
                <p className="stat-number text-white mb-2">{number}</p>
                <p className="text-sm text-white/60 font-medium">{label}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FEATURE HIGHLIGHTS ─── */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="badge mb-4">Everything You Need</span>
              <h2 className="font-display font-bold text-rachna-dark mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                One platform. Every creator problem solved.
              </h2>
              <p className="text-rachna-muted max-w-xl mx-auto">
                Not a dashboard with charts. A system that tells you exactly what to DO.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="space-y-24">
            {FEATURES.map((feat, i) => (
              <AnimatedSection key={feat.id}>
                <motion.div
                  variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Mockup */}
                  <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <FeatureMockup type={feat.mockup} />
                  </div>

                  {/* Text */}
                  <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-rachna-lavender flex items-center justify-center">
                        <feat.icon size={16} className="text-rachna-indigo" />
                      </div>
                      <span className="text-sm font-display font-semibold text-rachna-indigo">{feat.subtitle}</span>
                      {feat.badge && (
                        <span className="badge text-xs">{feat.badge}</span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-rachna-dark mb-4" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                      {feat.title}
                    </h3>
                    <p className="text-rachna-muted leading-relaxed mb-6 max-w-md">
                      {feat.desc}
                    </p>
                    <button
                      onClick={() => navigate(feat.href)}
                      className="btn-primary"
                    >
                      {feat.cta} <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <span className="badge mb-4">Pricing</span>
              <h2 className="font-display font-bold text-rachna-dark mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Simple, transparent pricing.
              </h2>
              <p className="text-rachna-muted">Start free. Upgrade when you're ready.</p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-2xl p-8 flex flex-col relative ${
                  plan.highlight
                    ? 'bg-rachna-indigo text-white shadow-card-lg scale-105'
                    : 'bg-white border border-rachna-border shadow-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rachna-cream text-rachna-indigo text-xs font-display font-bold px-4 py-1 rounded-full shadow-sm border border-rachna-border">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <p className={`text-sm font-display font-semibold mb-2 ${plan.highlight ? 'text-white/70' : 'text-rachna-muted'}`}>{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-display font-extrabold ${plan.highlight ? 'text-white' : 'text-rachna-dark'}`}>{plan.price}</span>
                    <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-white/60' : 'text-rachna-muted'}`}>{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-white/70' : 'text-rachna-success'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-rachna-dark'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/sign-up')}
                  className={`w-full py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-white text-rachna-indigo hover:bg-rachna-cream'
                      : 'bg-rachna-indigo text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 bg-rachna-surface">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <span className="badge mb-4">Creator Stories</span>
              <h2 className="font-display font-bold text-rachna-dark" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Real creators. Real results.
              </h2>
            </motion.div>
          </AnimatedSection>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl p-10 shadow-card-lg border border-rachna-border"
              >
                <div className="text-5xl text-rachna-indigo font-serif mb-6">"</div>
                <p className="text-xl text-rachna-dark leading-relaxed font-medium mb-8">
                  {TESTIMONIALS[testimonialIdx].quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rachna-indigo flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg">{TESTIMONIALS[testimonialIdx].avatar}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-rachna-dark">{TESTIMONIALS[testimonialIdx].name}</p>
                    <p className="text-sm text-rachna-muted">{TESTIMONIALS[testimonialIdx].role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setTestimonialIdx((testimonialIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-rachna-border bg-white hover:bg-rachna-lavender flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-rachna-muted" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`rounded-full transition-all duration-300 ${i === testimonialIdx ? 'w-6 h-2.5 bg-rachna-indigo' : 'w-2.5 h-2.5 bg-rachna-border hover:bg-rachna-violet'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx((testimonialIdx + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-rachna-border bg-white hover:bg-rachna-lavender flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} className="text-rachna-muted" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="bg-rachna-dark py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Stop guessing. Start building the channel you meant to.
              </h2>
              <p className="text-white/60 mb-10 text-lg">
                Join 2,400+ creators who use RachnaOS every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-rachna-violet transition-colors"
                />
                <button
                  onClick={() => navigate('/sign-up')}
                  className="bg-rachna-indigo text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-indigo-600 transition-all hover:shadow-glow whitespace-nowrap"
                >
                  Get Started Free
                </button>
              </div>
              <p className="text-white/30 text-xs mt-4">No credit card required. Free forever plan available.</p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
