import { useState, useCallback } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, Plus, Check, X, Copy, Trash2, Link } from 'lucide-react'
import clsx from 'clsx'

export default function IdeaNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [title, setTitle]     = useState(data.title || 'Untitled Idea')
  const [desc, setDesc]       = useState(data.description || '')
  const [items, setItems]     = useState(data.checklistItems || [])
  const [addingItem, setAddingItem] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, {
      ...node,
      id: `idea-${Date.now()}`,
      position: { x: node.position.x + 40, y: node.position.y + 40 },
      selected: false,
      data: { ...node.data, title, description: desc, checklistItems: items },
    }])
    setShowMenu(false)
  }, [id, getNode, setNodes, title, desc, items])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this Idea node?')) {
      setNodes(nds => nds.filter(n => n.id !== id))
    }
    setShowMenu(false)
  }, [id, setNodes])

  const toggleItem = (idx) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, checked: !it.checked } : it))
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx))
  const addItem    = () => {
    if (newItem.trim()) setItems(prev => [...prev, { label: newItem.trim(), checked: false }])
    setNewItem(''); setAddingItem(false)
  }

  return (
    <div className={clsx(
      'bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[240px] max-w-[300px]',
      selected ? 'border-rachna-violet shadow-[0_4px_16px_rgba(69,64,200,0.2)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-rachna-violet hover:shadow-[0_4px_16px_rgba(69,64,200,0.15)]'
    )}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />

      {/* Header drag handle */}
      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#EDE9FF] text-[#4540C8] text-[10px] font-bold tracking-widest uppercase">IDEA</span>
        <div className="relative">
          <button onClick={() => setShowMenu(v => !v)} className="w-6 h-6 rounded-md flex items-center justify-center text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark">
            <MoreHorizontal size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-7 bg-white rounded-xl border border-rachna-border shadow-card z-50 min-w-[150px] py-1 nodrag nowheel">
              <button onClick={handleDuplicate} className="w-full text-left px-3 py-1.5 text-xs text-rachna-dark hover:bg-rachna-surface flex items-center gap-2"><Copy size={11}/> Duplicate</button>
              <button onClick={handleDelete}    className="w-full text-left px-3 py-1.5 text-xs text-rachna-danger hover:bg-red-50 flex items-center gap-2"><Trash2 size={11}/> Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Body — nodrag so typing works */}
      <div className="px-3 pb-3 space-y-2 nodrag">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-sm font-bold text-rachna-dark bg-transparent border-none outline-none focus:bg-rachna-surface rounded px-1 -mx-1"
          placeholder="Idea title…"
        />
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          rows={2}
          className="w-full text-xs text-rachna-muted bg-transparent border-none outline-none resize-none focus:bg-rachna-surface rounded px-1 -mx-1 leading-relaxed"
          placeholder="Describe the idea…"
        />
        <div className="space-y-1.5 pt-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 group">
              <button onClick={() => toggleItem(idx)} className={clsx('w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors', item.checked ? 'bg-rachna-indigo border-rachna-indigo' : 'border-rachna-border hover:border-rachna-violet')}>
                {item.checked && <Check size={10} className="text-white" />}
              </button>
              <span className={clsx('text-xs flex-1', item.checked ? 'line-through text-rachna-muted' : 'text-rachna-dark')}>{item.label}</span>
              <button onClick={() => removeItem(idx)} className="opacity-0 group-hover:opacity-100 text-rachna-muted hover:text-rachna-danger"><X size={11}/></button>
            </div>
          ))}
          {addingItem ? (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border-2 border-rachna-border flex-shrink-0" />
              <input autoFocus value={newItem} onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addItem(); if (e.key === 'Escape') setAddingItem(false) }}
                className="flex-1 text-xs bg-rachna-surface rounded px-2 py-0.5 outline-none border border-rachna-indigo"
                placeholder="Add item…"
              />
              <button onClick={addItem} className="text-xs text-rachna-indigo hover:text-indigo-700 font-semibold">Add</button>
            </div>
          ) : (
            <button onClick={() => setAddingItem(true)} className="flex items-center gap-1.5 text-xs text-rachna-muted hover:text-rachna-indigo">
              <Plus size={11}/> Add checklist item
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
