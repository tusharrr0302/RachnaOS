import { useState, useCallback } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, Plus, ExternalLink, Play, Copy, Trash2, X } from 'lucide-react'
import clsx from 'clsx'

export default function ReferencesNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [videos, setVideos]   = useState(data.videos || [])
  const [addingRef, setAddingRef] = useState(false)
  const [newTitle, setNewTitle]   = useState('')
  const [newChannel, setNewChannel] = useState('')
  const [showMenu, setShowMenu]   = useState(false)

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, { ...node, id: `references-${Date.now()}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, selected: false, data: { ...node.data, videos } }])
    setShowMenu(false)
  }, [id, getNode, setNodes, videos])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this References node?')) setNodes(nds => nds.filter(n => n.id !== id))
    setShowMenu(false)
  }, [id, setNodes])

  const addRef = () => {
    if (newTitle.trim()) setVideos(prev => [...prev, { title: newTitle.trim(), channel: newChannel.trim() || 'YouTube' }])
    setNewTitle(''); setNewChannel(''); setAddingRef(false)
  }

  return (
    <div className={clsx('bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[260px] max-w-[320px]',
      selected ? 'border-red-400 shadow-[0_4px_16px_rgba(220,38,38,0.2)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-red-300')}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-red-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-red-500 !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-red-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-red-500 !border-2 !border-white" />

      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FFFBEA] text-[#9B6F00] text-[10px] font-bold tracking-widest uppercase border border-[#F0D06A]">REFERENCES</span>
        <div className="relative">
          <button onClick={() => setShowMenu(v => !v)} className="w-6 h-6 rounded-md flex items-center justify-center text-rachna-muted hover:bg-rachna-surface"><MoreHorizontal size={14}/></button>
          {showMenu && (
            <div className="absolute right-0 top-7 bg-white rounded-xl border border-rachna-border shadow-card z-50 min-w-[150px] py-1 nodrag nowheel">
              <button onClick={handleDuplicate} className="w-full text-left px-3 py-1.5 text-xs text-rachna-dark hover:bg-rachna-surface flex items-center gap-2"><Copy size={11}/> Duplicate</button>
              <button onClick={handleDelete}    className="w-full text-left px-3 py-1.5 text-xs text-rachna-danger hover:bg-red-50 flex items-center gap-2"><Trash2 size={11}/> Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-3 nodrag">
        <div className="divide-y divide-rachna-border/50">
          {videos.map((vid, idx) => (
            <div key={idx} className="flex items-center gap-2.5 py-2 group hover:bg-rachna-surface/50 -mx-3 px-3 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                <Play size={10} className="text-white fill-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-rachna-dark truncate">{vid.title}</p>
                <p className="text-[10px] text-rachna-muted truncate">{vid.channel}</p>
              </div>
              <button onClick={() => setVideos(prev => prev.filter((_, i) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-rachna-muted hover:text-rachna-danger">
                <X size={11}/>
              </button>
            </div>
          ))}
        </div>
        {addingRef ? (
          <div className="mt-2 space-y-1.5">
            <input autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full text-xs bg-rachna-surface border border-red-300 rounded-lg px-3 py-1.5 outline-none" placeholder="Video title…" />
            <input value={newChannel} onChange={e => setNewChannel(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addRef(); if (e.key === 'Escape') setAddingRef(false) }} className="w-full text-xs bg-rachna-surface border border-rachna-border rounded-lg px-3 py-1.5 outline-none" placeholder="Channel name…" />
            <div className="flex gap-2">
              <button onClick={addRef} className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600">Add</button>
              <button onClick={() => setAddingRef(false)} className="text-xs text-rachna-muted hover:text-rachna-dark">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingRef(true)} className="flex items-center gap-1.5 text-xs text-rachna-muted hover:text-red-500 mt-2"><Plus size={11}/> Add reference</button>
        )}
      </div>
    </div>
  )
}
