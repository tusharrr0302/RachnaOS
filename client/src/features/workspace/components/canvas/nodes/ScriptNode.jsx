import { useState, useCallback } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, FileText, ExternalLink, Copy, Trash2, Plus, X } from 'lucide-react'
import clsx from 'clsx'

export default function ScriptNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [version, setVersion] = useState(data.version || 'v1')
  const [outline, setOutline] = useState(data.outline || ['Hook', 'Introduction', 'Main Content', 'CTA'])
  const [editingIdx, setEditingIdx] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, { ...node, id: `script-${Date.now()}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, selected: false, data: { ...node.data, outline } }])
    setShowMenu(false)
  }, [id, getNode, setNodes, outline])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this Script node?')) setNodes(nds => nds.filter(n => n.id !== id))
    setShowMenu(false)
  }, [id, setNodes])

  const startEdit = (idx) => { setEditingIdx(idx); setEditVal(outline[idx]) }
  const saveEdit  = (idx) => { setOutline(prev => prev.map((s, i) => i === idx ? editVal : s)); setEditingIdx(null) }
  const addSection = () => setOutline(prev => [...prev, 'New Section'])

  return (
    <div className={clsx('bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[250px] max-w-[300px]',
      selected ? 'border-blue-400 shadow-[0_4px_16px_rgba(26,107,158,0.2)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-blue-300')}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />

      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#E8F4FD] text-[#1A6B9E] text-[10px] font-bold tracking-widest uppercase">SCRIPT</span>
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

      <div className="px-3 pb-3 space-y-3 nodrag">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-rachna-indigo bg-rachna-lavender px-2 py-0.5 rounded-full">Script {version}</span>
          <button className="flex items-center gap-1 text-[10px] text-rachna-muted hover:text-rachna-indigo transition-colors">
            <FileText size={11}/> {data.docType || 'Script Editor'} <ExternalLink size={9}/>
          </button>
        </div>
        <div className="space-y-1.5">
          {outline.map((section, idx) => (
            <div key={idx} className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"/>
              {editingIdx === idx ? (
                <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)}
                  onBlur={() => saveEdit(idx)}
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(idx); if (e.key === 'Escape') setEditingIdx(null) }}
                  className="flex-1 text-xs bg-rachna-surface border border-blue-300 rounded px-1.5 py-0.5 outline-none"/>
              ) : (
                <span onClick={() => startEdit(idx)} className="text-xs text-rachna-dark flex-1 cursor-text hover:text-rachna-indigo">{section}</span>
              )}
              <button onClick={() => setOutline(prev => prev.filter((_, i) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-rachna-muted hover:text-rachna-danger"><X size={10}/></button>
            </div>
          ))}
          <button onClick={addSection} className="flex items-center gap-1.5 text-xs text-rachna-muted hover:text-blue-500 mt-1"><Plus size={10}/> Add section</button>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-rachna-border">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-700 text-[9px] font-bold">{data.updatedBy?.name?.[0] || 'U'}</span>
          </div>
          <span className="text-[10px] text-rachna-muted">Updated {data.lastUpdated || 'recently'}</span>
        </div>
      </div>
    </div>
  )
}


