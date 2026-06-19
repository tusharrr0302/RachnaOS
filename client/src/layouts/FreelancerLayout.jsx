// client/src/layouts/FreelancerLayout.jsx
import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, FileText, CheckSquare, IndianRupee,
  Clock, MessageSquare, Star, Image, BookOpen, Network, Settings,
  Plus, ChevronLeft, Bell, HelpCircle, Zap, LogOut, RefreshCw, MessageCircle, UserCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useAuth } from '../auth'
import { useClerk } from '@clerk/clerk-react'
import { FREELANCER } from '../pages/freelancer/mockData'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/freelancer/dashboard' },
  { icon: Briefcase,       label: 'My Projects',    path: '/freelancer/projects' },
  { icon: FileText,        label: 'Proposals',      path: '/freelancer/proposals' },
  { icon: CheckSquare,     label: 'Tasks',          path: '/freelancer/tasks' },
  { icon: IndianRupee,     label: 'Earnings',       path: '/freelancer/earnings' },
  { icon: Clock,           label: 'Time Tracking',  path: '/freelancer/time-tracking' },
  { icon: MessageSquare,   label: 'Messages',       path: '/freelancer/messages' },
  { icon: Star,            label: 'Reviews',        path: '/freelancer/reviews' },
  { icon: Image,           label: 'Portfolio',      path: '/freelancer/portfolio' },
  { icon: BookOpen,        label: 'Resources',      path: '/freelancer/resources' },
  { icon: Network,         label: 'Creator Network',  path: '/freelancer/marketplace' },
  { icon: Settings,        label: 'Settings',          path: '/freelancer/profile' },
  { icon: UserCircle2,     label: 'My Public Profile', path: '/freelancer/public-profile' },
]

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function FreelancerLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mockMenuOpen, setMockMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { clerkUser, profile, signOut: authSignOut, isMock, updateMockProfile } = useAuth()
  const { signOut: clerkSignOut } = useClerk()
  const signOut = isMock ? authSignOut : clerkSignOut

  const displayName = profile?.display_name || profile?.full_name || clerkUser?.firstName || FREELANCER.name
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex h-screen bg-rachna-surface overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-shrink-0 bg-white border-r border-rachna-border flex flex-col overflow-hidden relative z-20"
      >
        {/* Logo */}
        <div className="px-4 py-5 flex flex-col gap-1 border-b border-rachna-border">
          <img src="/logo.png" alt="RachnaOS Logo" className="h-20 w-auto object-contain flex-shrink-0 self-start" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                <p className="text-xs text-rachna-indigo font-semibold mt-0.5 ml-1">Freelancer Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Find Projects CTA */}
        <div className="px-3 py-4">
          <button
            onClick={() => navigate('/freelancer/marketplace')}
            className={clsx(
              'w-full flex items-center gap-2.5 bg-rachna-indigo text-white font-display font-semibold rounded-xl transition-all duration-200 hover:bg-indigo-700 hover:shadow-glow',
              collapsed ? 'justify-center p-2.5' : 'px-4 py-2.5 text-sm'
            )}
          >
            <Plus size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Find Projects
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-rachna-lavender text-rachna-indigo font-semibold border-l-[3px] border-rachna-indigo'
                    : 'text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark border-l-[3px] border-transparent',
                  collapsed && 'justify-center px-2 border-l-0'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={clsx('flex-shrink-0', isActive ? 'text-rachna-indigo' : 'text-rachna-muted group-hover:text-rachna-dark')} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="truncate">
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Upgrade to Pro Card */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-3 mb-3 p-4 rounded-xl bg-rachna-lavender border border-rachna-indigo/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-rachna-indigo" />
                <span className="text-xs font-display font-semibold text-rachna-indigo">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-rachna-muted mb-3 leading-relaxed">Get advanced insights, priority matching and more benefits.</p>
              <button className="w-full bg-rachna-indigo text-white text-xs font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Upgrade Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile */}
        <div className={clsx('border-t border-rachna-border px-3 py-4 flex items-center gap-3 relative', collapsed && 'justify-center')}>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm">
              {displayName[0].toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-rachna-dark truncate">{displayName}</p>
                <p className="text-xs text-rachna-muted">{FREELANCER.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border border-rachna-border shadow-sm flex items-center justify-center hover:bg-rachna-lavender transition-colors z-30"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={12} className="text-rachna-muted" />
          </motion.div>
        </button>
      </motion.aside>

      {/* ── Main ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-rachna-border flex items-center justify-between px-6 flex-shrink-0">
          {/* Left: Greeting */}
          <div>
            <p className="text-xs text-rachna-muted font-medium">{greeting}, {displayName.split(' ')[0]} 👋</p>
            <p className="font-display font-bold text-rachna-dark text-base leading-tight">Freelancer Dashboard</p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl hover:bg-rachna-surface flex items-center justify-center transition-colors">
              <HelpCircle size={18} className="text-rachna-muted" />
            </button>
            <button className="w-9 h-9 rounded-xl hover:bg-rachna-surface flex items-center justify-center transition-colors relative">
              <Bell size={18} className="text-rachna-muted" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => navigate('/freelancer/messages')}
              className="w-9 h-9 rounded-xl hover:bg-rachna-surface flex items-center justify-center transition-colors"
            >
              <MessageCircle size={18} className="text-rachna-muted" />
            </button>

            <div className="w-px h-5 bg-rachna-border mx-1" />

            {/* Total Earnings */}
            <div className="text-right mr-2">
              <p className="text-[10px] text-rachna-muted font-medium uppercase tracking-wide">Total Earnings</p>
              <p className="font-display font-bold text-rachna-dark text-sm">{fmt(FREELANCER.totalEarnings)}</p>
            </div>

            {/* Avatar */}
            <div className="relative cursor-pointer" onClick={() => navigate('/freelancer/profile')}>
              <div className="w-9 h-9 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm">
                {displayName[0].toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
            </div>

            <button
              onClick={() => isMock ? (authSignOut(), navigate('/sign-in')) : signOut(() => navigate('/sign-in'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-rachna-muted hover:text-rachna-danger hover:bg-red-50 transition-colors ml-1"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-rachna-surface">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
