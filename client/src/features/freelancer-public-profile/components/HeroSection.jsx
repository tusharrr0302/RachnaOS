// client/src/features/freelancer-public-profile/components/HeroSection.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Globe, Share2, Briefcase, Check, Youtube, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import { COVER_PRESETS } from '../mockProfileData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

function SocialIcon({ platform, url, isEdit, onChange }) {
  const icons = {
    youtube:   { Icon: Youtube,      color: 'hover:text-red-500',    label: 'YouTube URL' },
    instagram: { Icon: ExternalLink, color: 'hover:text-pink-500',   label: 'Instagram URL' },
    linkedin:  { Icon: ExternalLink, color: 'hover:text-blue-600',   label: 'LinkedIn URL' },
    behance:   { Icon: Globe,        color: 'hover:text-indigo-500', label: 'Behance URL' },
  }
  const { Icon, color, label } = icons[platform] || { Icon: Globe, color: '', label: platform }

  if (isEdit) {
    return (
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-rachna-muted flex-shrink-0" />
        <input
          value={url || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={label}
          className="bg-transparent border-b border-rachna-border focus:border-rachna-indigo outline-none text-xs text-rachna-dark w-full pb-0.5 transition-colors"
        />
      </div>
    )
  }
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className={clsx('w-9 h-9 rounded-xl border border-rachna-border bg-white flex items-center justify-center text-rachna-muted transition-all hover:border-rachna-indigo hover:-translate-y-0.5 hover:shadow-card', color)}>
      <Icon size={16} />
    </a>
  )
}

export default function HeroSection({ profile, isEdit, onChange, onShare, copied }) {
  const coverStyle = profile.coverImageUrl
    ? { backgroundImage: `url(${profile.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: COVER_PRESETS[profile.coverPreset] || COVER_PRESETS.indigo }

  return (
    <div className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
      {/* Cover Banner */}
      <div className="relative h-40 sm:h-52" style={coverStyle}>
        {isEdit && (
          <div className="absolute inset-0 bg-black/30 flex items-end p-4 gap-3">
            {/* Preset Picker */}
            <div className="flex items-center gap-2 flex-wrap">
              {Object.entries(COVER_PRESETS).map(([key, grad]) => (
                <button key={key} onClick={() => onChange('coverPreset', key)}
                  className={clsx('w-8 h-8 rounded-lg border-2 transition-all', profile.coverPreset === key ? 'border-white scale-110' : 'border-transparent')}
                  style={{ background: grad }} title={key}
                />
              ))}
            </div>
            <label className="ml-2 text-xs text-white/80 bg-white/20 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/30 transition-colors">
              Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={e => {
                const f = e.target.files?.[0]
                if (f) onChange('coverImageUrl', URL.createObjectURL(f))
              }} />
            </label>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-10 mb-4 flex-wrap gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-rachna-indigo border-4 border-white flex items-center justify-center text-white font-display font-bold text-2xl shadow-card">
              {profile.name?.[0] || 'A'}
            </div>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
            {isEdit && (
              <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-[10px] font-semibold">Change</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            )}
          </div>

          {/* Action Buttons (Preview) */}
          {!isEdit && (
            <div className="flex items-center gap-2 mt-10 sm:mt-0">
              <button onClick={onShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rachna-border text-sm font-semibold text-rachna-dark hover:border-rachna-indigo hover:text-rachna-indigo transition-all">
                {copied ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Share2 size={14} /> Share Profile</>}
              </button>
              <button className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rachna-indigo text-white text-sm font-semibold hover:bg-indigo-700 transition-all hover:shadow-glow">
                <Briefcase size={14} /> Hire Me
              </button>
            </div>
          )}
        </div>

        {/* Name + Role */}
        <div className="mb-3">
          {isEdit ? (
            <div className="space-y-2">
              <input value={profile.name} onChange={e => onChange('name', e.target.value)}
                className="font-display font-extrabold text-rachna-dark text-2xl w-full bg-transparent border-b-2 border-rachna-indigo/40 focus:border-rachna-indigo outline-none pb-1 transition-colors" />
              <input value={profile.roleTitle} onChange={e => onChange('roleTitle', e.target.value)}
                className="text-rachna-muted text-sm w-full bg-transparent border-b border-rachna-border focus:border-rachna-indigo outline-none pb-0.5 transition-colors" />
            </div>
          ) : (
            <>
              <h1 className="font-display font-extrabold text-rachna-dark text-2xl">{profile.name}</h1>
              <p className="text-rachna-muted text-sm mt-0.5">{profile.roleTitle}</p>
            </>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-rachna-muted text-sm">
            <MapPin size={14} />
            {isEdit
              ? <input value={profile.location} onChange={e => onChange('location', e.target.value)}
                  className="bg-transparent border-b border-rachna-border focus:border-rachna-indigo outline-none text-sm pb-0.5 w-32 transition-colors" />
              : <span>{profile.location}</span>
            }
          </div>

          <div className="flex items-center gap-1.5 text-rachna-muted text-sm">
            <Globe size={14} />
            {isEdit
              ? <input value={profile.languages?.join(', ')} onChange={e => onChange('languages', e.target.value.split(',').map(s => s.trim()))}
                  className="bg-transparent border-b border-rachna-border focus:border-rachna-indigo outline-none text-sm pb-0.5 w-28 transition-colors" />
              : <span>{profile.languages?.join(', ')}</span>
            }
          </div>

          {/* Availability badge */}
          <button
            onClick={() => isEdit && onChange('isAvailable', !profile.isAvailable)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all',
              profile.isAvailable ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500',
              isEdit && 'cursor-pointer hover:opacity-80'
            )}
          >
            <span className={clsx('w-1.5 h-1.5 rounded-full', profile.isAvailable ? 'bg-green-500' : 'bg-gray-400')} />
            {profile.isAvailable ? 'Available for Work' : 'Not Available'}
            {isEdit && <span className="ml-1 opacity-60">(click to toggle)</span>}
          </button>
        </div>

        {/* Social Links */}
        {isEdit ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-rachna-surface rounded-xl">
            {['youtube', 'instagram', 'linkedin', 'behance'].map(platform => (
              <SocialIcon key={platform} platform={platform}
                url={profile.socialLinks?.[platform]}
                isEdit onChange={v => onChange('socialLinks', { ...profile.socialLinks, [platform]: v })} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {['youtube', 'instagram', 'linkedin', 'behance'].map(platform => (
              <SocialIcon key={platform} platform={platform}
                url={profile.socialLinks?.[platform]} isEdit={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
