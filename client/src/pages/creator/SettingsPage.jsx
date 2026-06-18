import { useState } from 'react'
import { Settings, User, Bell, Shield, CreditCard, Palette, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const TABS = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('profile')
  const [name, setName] = useState('Ankit Verma')
  const [bio, setBio] = useState('Finance creator helping 240K people grow their wealth.')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-display font-bold text-rachna-dark text-2xl mb-8">Settings</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={clsx('w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all', tab === t.id ? 'bg-rachna-lavender text-rachna-indigo font-semibold' : 'text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark')}>
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-rachna-border p-7">
          {tab === 'profile' && (
            <div className="space-y-5">
              <h2 className="font-display font-bold text-rachna-dark text-base">Profile Settings</h2>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-rachna-indigo flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
                <button className="btn-ghost text-sm py-2">Change Photo</button>
              </div>
              {[{ label: 'Display Name', val: name, set: setName, id: 'setting-name' }, { label: 'Bio', val: bio, set: setBio, id: 'setting-bio' }].map(f => (
                <div key={f.label}>
                  <label className="text-sm font-medium text-rachna-dark block mb-1.5">{f.label}</label>
                  <input type="text" value={f.val} onChange={e => f.set(e.target.value)} className="input" id={f.id} />
                </div>
              ))}
              <button onClick={save} className={clsx('btn-primary', saved && 'bg-rachna-success')}>
                {saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </div>
          )}
          {tab !== 'profile' && (
            <div className="text-center py-12 text-rachna-muted">
              <Settings size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-rachna-dark mb-1">{TABS.find(t => t.id === tab)?.label} Settings</p>
              <p className="text-sm">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
