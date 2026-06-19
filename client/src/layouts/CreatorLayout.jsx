import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Home, Layers, FlaskConical, DollarSign, ShieldCheck,
  Users, ShoppingBag, BookOpen, BarChart3, Settings,
  Plus, ChevronLeft, Bell, HelpCircle, Zap, ChevronDown,
  FileText, Tag, Users2, Bot, GraduationCap, LogOut, RefreshCw
} from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useAuth } from '../auth'

const NAV_ITEMS = [
  { icon: Home,          label: 'Home',            path: '/creator' },
  { icon: Layers,        label: 'Workspace',       path: '/creator/workspace' },
  { icon: FlaskConical,  label: 'AudienceLab 2.0',     path: '/creator/audience-lab' },
  { icon: DollarSign,    label: 'FairRate',         path: '/creator/fair-rate' },
  { icon: ShieldCheck,   label: 'CreatorShield',   path: '/creator/shield' },
  { icon: Users,         label: 'Expert Connect',  path: '/creator/expert-connect' },
  { icon: ShoppingBag,   label: 'Marketplace',     path: '/creator/marketplace' },
  { icon: FileText,      label: 'Documentation',    path: '/creator/academy' },
  { icon: Tag,           label: 'Sponsorship Hub', path: '/creator/sponsorship' },
  { icon: BarChart3,     label: 'Analytics Hub',   path: '/creator/analytics' },
  { icon: Bot,           label: 'AI Assistant',    path: '/creator/ai' },
]

export default function CreatorLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mockMenuOpen, setMockMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { clerkUser, profile, signOut: authSignOut, isMock, updateMockProfile, setIsSignedIn } = useAuth()
  const { signOut: clerkSignOut } = useClerk()

  const signOut = isMock ? authSignOut : clerkSignOut

  // Canvas routes need overflow-hidden so React Flow fills full height
  const isCanvasRoute = /^\/creator\/workspace\/.+/.test(location.pathname)

  return (
    <div className="flex h-screen bg-rachna-surface overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-shrink-0 bg-white border-r border-rachna-border flex flex-col overflow-hidden relative z-20"
      >
        {/* Logo */}
        <div className="px-4 py-5 flex items-center gap-3 border-b border-rachna-border">
          <img src="/logo.png" alt="RachnaOS Logo" className="h-24 w-auto object-contain flex-shrink-0" />
        </div>

        {/* New Project Button */}
        <div className="px-3 py-4">
          <button
            onClick={() => navigate('/creator/workspace')}
            className={clsx(
              'w-full flex items-center gap-2.5 bg-rachna-indigo text-white font-display font-semibold rounded-xl transition-all duration-200 hover:bg-indigo-700 hover:shadow-glow',
              collapsed ? 'justify-center p-2.5' : 'px-4 py-2.5 text-sm'
            )}
          >
            <Plus size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  New Project
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
              end={path === '/creator'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-rachna-lavender text-rachna-indigo font-semibold'
                    : 'text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark',
                  collapsed && 'justify-center px-2'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={clsx('flex-shrink-0', isActive ? 'text-rachna-indigo' : 'text-rachna-muted group-hover:text-rachna-dark')} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="truncate"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Upgrade Banner */}
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
              <p className="text-xs text-rachna-muted mb-3 leading-relaxed">Unlock advanced tools, more AI credits and premium features.</p>
              <button className="w-full bg-rachna-indigo text-white text-xs font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Upgrade Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile */}
        <div className={clsx(
          'border-t border-rachna-border px-3 py-4 flex items-center gap-3 relative',
          collapsed && 'justify-center'
        )}>
          {isMock ? (
            <>
              <button
                onClick={() => setMockMenuOpen(v => !v)}
                className="w-8 h-8 rounded-full bg-rachna-indigo flex items-center justify-center text-white font-bold text-sm flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                {(profile?.display_name || clerkUser?.firstName || 'D')[0].toUpperCase()}
              </button>
              {mockMenuOpen && (
                <div className="absolute bottom-16 left-3 w-52 bg-white border border-rachna-border rounded-2xl shadow-card p-2 z-50">
                  <p className="text-xs text-rachna-muted px-3 pt-1 pb-2 font-medium truncate">Mock Mode</p>
                  {['creator','freelancer','manager'].map(r => (
                    <button
                      key={r}
                      onClick={() => { updateMockProfile({ role: r }); setMockMenuOpen(false); navigate(r === 'creator' ? '/creator/workspace' : r === 'freelancer' ? '/freelancer/dashboard' : '/manager/dashboard') }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-rachna-surface transition-colors capitalize"
                    >
                      <RefreshCw size={12} className="text-rachna-muted" /> Switch to {r}
                    </button>
                  ))}
                  <div className="border-t border-rachna-border my-1" />
                  <button
                    onClick={() => { signOut(); setMockMenuOpen(false); navigate('/sign-in') }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={12} /> Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }}
            />
          )}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-rachna-dark truncate">
                  {profile?.display_name || clerkUser?.firstName || 'Creator'}
                </p>
                <p className="text-xs text-rachna-muted capitalize">{profile?.role || 'Creator'}</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-rachna-border flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-rachna-muted">
            {/* Breadcrumb injected by pages */}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl hover:bg-rachna-surface flex items-center justify-center transition-colors">
              <HelpCircle size={18} className="text-rachna-muted" />
            </button>
            <button className="w-9 h-9 rounded-xl hover:bg-rachna-surface flex items-center justify-center transition-colors relative">
              <Bell size={18} className="text-rachna-muted" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rachna-danger rounded-full" />
            </button>
            <div className="w-px h-5 bg-rachna-border mx-1" />
            <button
              id="creator-signout"
              onClick={() => isMock ? (signOut(), navigate('/sign-in')) : signOut(() => navigate('/sign-in'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-rachna-muted hover:text-rachna-danger hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 ${isCanvasRoute ? 'overflow-hidden' : 'overflow-y-auto'} bg-rachna-surface`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
