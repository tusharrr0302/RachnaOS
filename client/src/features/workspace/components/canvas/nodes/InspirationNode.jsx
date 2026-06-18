import { useState, useCallback } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, Plus, ExternalLink, X, Copy, Trash2 } from 'lucide-react'
import clsx from 'clsx'

export default function InspirationNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [links, setLinks]     = useState(data.links || [])
  const [addingLink, setAddingLink] = useState(false)
  const [newUrl, setNewUrl]   = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, { ...node, id: `inspiration-${Date.now()}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, selected: false, data: { ...node.data, links } }])
    setShowMenu(false)
  }, [id, getNode, setNodes, links])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this Inspiration node?')) setNodes(nds => nds.filter(n => n.id !== id))
    setShowMenu(false)
  }, [id, setNodes])

  const addLink = () => {
    if (!newUrl.trim()) return
    let title = newUrl, source = newUrl
    try { source = new URL(newUrl).hostname.replace('www.', ''); title = source } catch {}
    setLinks(prev => [...prev, { title, source, favicon: '🔗', url: newUrl }])
    setNewUrl(''); setAddingLink(false)
  }

  return (
    <div className={clsx('bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[260px] max-w-[320px]',
      selected ? 'border-amber-400 shadow-[0_4px_16px_rgba(251,191,36,0.25)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-amber-300')}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-amber-400 !border-2 !border-white" />

      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FFF8E1] text-[#9B7F20] text-[10px] font-bold tracking-widest uppercase">INSPIRATION</span>
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
          {links.map((link, idx) => (
            <div key={idx} className="flex items-center gap-2.5 py-2 group hover:bg-rachna-surface/50 -mx-3 px-3 rounded transition-colors">
              <span className="text-base flex-shrink-0">{link.favicon || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-rachna-dark truncate">{link.title}</p>
                <p className="text-[10px] text-rachna-muted truncate">{link.source}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {link.url && <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-rachna-muted hover:text-rachna-indigo"><ExternalLink size={11}/></a>}
                <button onClick={() => setLinks(prev => prev.filter((_, i) => i !== idx))} className="text-rachna-muted hover:text-rachna-danger"><X size={11}/></button>
              </div>
            </div>
          ))}
        </div>
        {addingLink ? (
          <div className="mt-2 flex flex-col gap-1.5">
            <input autoFocus value={newUrl} onChange={e => setNewUrl(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addLink(); if (e.key === 'Escape') setAddingLink(false) }}
              className="w-full text-xs bg-rachna-surface border border-rachna-indigo rounded-lg px-3 py-1.5 outline-none" placeholder="Paste URL…" />
            <div className="flex gap-2">
              <button onClick={addLink} className="text-xs bg-amber-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-amber-600">Add</button>
              <button onClick={() => setAddingLink(false)} className="text-xs text-rachna-muted hover:text-rachna-dark">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingLink(true)} className="flex items-center gap-1.5 text-xs text-rachna-muted hover:text-amber-600 mt-2 transition-colors"><Plus size={11}/> Add more</button>
        )}
      </div>
    </div>
  )
}
