import { useRef, useState } from 'react'
import { Upload, Image, FileText, Film, MoreHorizontal, Download, Trash2, X } from 'lucide-react'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'
import clsx from 'clsx'

const SECTIONS = [
  { id: 'image', label: 'Thumbnails',   icon: Image,    color: 'text-green-600 bg-green-50' },
  { id: 'doc',   label: 'Script Docs',  icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { id: 'video', label: 'B-Roll / Video', icon: Film,   color: 'text-purple-600 bg-purple-50' },
]

function AssetCard({ asset, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)

  if (asset.type === 'image') {
    return (
      <div className="group relative bg-rachna-surface rounded-xl overflow-hidden border border-rachna-border hover:shadow-card transition-shadow cursor-pointer">
        <div className="aspect-video bg-rachna-lavender flex items-center justify-center overflow-hidden">
          {asset.url ? (
            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover"/>
          ) : (
            <Image size={20} className="text-rachna-indigo opacity-50"/>
          )}
        </div>
        <div className="p-2">
          <p className="text-[10px] font-semibold text-rachna-dark truncate">{asset.name}</p>
          <p className="text-[10px] text-rachna-muted">{asset.size} · {asset.date}</p>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button onClick={() => setShowMenu(v => !v)} className="w-6 h-6 bg-white/90 rounded-lg flex items-center justify-center shadow-sm">
              <MoreHorizontal size={12} className="text-rachna-dark"/>
            </button>
            {showMenu && (
              <div className="absolute right-0 top-7 bg-white rounded-xl border border-rachna-border shadow-card z-50 min-w-[120px] py-1">
                {asset.url && <a href={asset.url} download={asset.name} className="flex items-center gap-2 px-3 py-1.5 text-xs text-rachna-dark hover:bg-rachna-surface"><Download size={11}/> Download</a>}
                <button onClick={() => { onDelete(asset.id); setShowMenu(false) }} className="flex items-center gap-2 px-3 py-1.5 text-xs text-rachna-danger hover:bg-red-50 w-full text-left"><Trash2 size={11}/> Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-rachna-border rounded-xl hover:shadow-card transition-shadow group">
      <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', asset.type === 'doc' ? 'bg-blue-50' : 'bg-purple-50')}>
        {asset.type === 'doc' ? <FileText size={16} className="text-blue-600"/> : <Film size={16} className="text-purple-600"/>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-rachna-dark truncate">{asset.name}</p>
        <p className="text-[10px] text-rachna-muted">{asset.size} · {asset.date}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {asset.url && <a href={asset.url} download={asset.name} className="w-7 h-7 flex items-center justify-center rounded-lg text-rachna-muted hover:bg-rachna-surface hover:text-rachna-indigo"><Download size={13}/></a>}
        <button onClick={() => onDelete(asset.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-rachna-muted hover:bg-red-50 hover:text-rachna-danger"><Trash2 size={13}/></button>
      </div>
    </div>
  )
}

export default function AssetsTab() {
  const { assets, addAsset, addActivity } = useWorkspace()
  const [localAssets, setLocalAssets] = useState([])
  const uploadRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const allAssets = [...assets, ...localAssets]

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      const asset = {
        id: `asset-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size > 1024 * 1024
          ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'doc',
        date: 'today',
      }
      setLocalAssets(prev => [...prev, asset])
      addActivity('Ankit Verma', `uploaded "${file.name}"`)
    })
  }

  const deleteAsset = (id) => {
    setLocalAssets(prev => prev.filter(a => a.id !== id))
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => uploadRef.current?.click()}
        className={clsx(
          'border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer mb-6',
          dragging
            ? 'border-rachna-indigo bg-rachna-lavender scale-[1.01]'
            : 'border-rachna-border hover:border-rachna-violet hover:bg-rachna-lavender/30'
        )}
      >
        <Upload size={24} className={clsx('transition-colors', dragging ? 'text-rachna-indigo' : 'text-rachna-muted')}/>
        <p className="text-sm font-semibold text-rachna-dark">Drop files here or <span className="text-rachna-indigo">browse</span></p>
        <p className="text-xs text-rachna-muted">Images, videos, documents — up to 100 MB each</p>
        <input ref={uploadRef} type="file" multiple className="hidden" onChange={e => handleFiles(e.target.files)}/>
      </div>

      {/* Asset sections */}
      {SECTIONS.map(section => {
        const sectionAssets = allAssets.filter(a => a.type === section.id || (section.id === 'video' && a.type === 'video'))
        return (
          <div key={section.id} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${section.color}`}>
                <section.icon size={13}/>
              </span>
              <h3 className="font-display font-bold text-rachna-dark text-sm">{section.label}</h3>
              <span className="text-xs text-rachna-muted font-semibold ml-1">{sectionAssets.length}</span>
            </div>

            {sectionAssets.length > 0 ? (
              section.id === 'image' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {sectionAssets.map(a => <AssetCard key={a.id} asset={a} onDelete={deleteAsset}/>)}
                </div>
              ) : (
                <div className="space-y-2">
                  {sectionAssets.map(a => <AssetCard key={a.id} asset={a} onDelete={deleteAsset}/>)}
                </div>
              )
            ) : (
              <div
                onClick={() => uploadRef.current?.click()}
                className="border-2 border-dashed border-rachna-border rounded-xl p-5 text-center cursor-pointer hover:border-rachna-violet hover:bg-rachna-lavender/20 transition-all"
              >
                <section.icon size={18} className="text-rachna-muted mx-auto mb-1.5"/>
                <p className="text-xs text-rachna-muted">No {section.label.toLowerCase()} yet. Click to upload.</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
