import { useState, useCallback } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, Calendar, ChevronDown, Copy, Trash2 } from 'lucide-react'
import clsx from 'clsx'

const STATUS_CONFIG = {
  todo:        { label: 'To Do',       bg: 'bg-rachna-surface text-rachna-muted',   dot: 'bg-rachna-muted' },
  in_progress: { label: 'In Progress', bg: 'bg-blue-50 text-blue-600',              dot: 'bg-blue-500' },
  review:      { label: 'Review',      bg: 'bg-amber-50 text-amber-600',            dot: 'bg-amber-500' },
  done:        { label: 'Done',        bg: 'bg-green-50 text-green-700',            dot: 'bg-green-500' },
}

function ProgressRing({ percent }) {
  const r = 14, circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#E5E3F8" strokeWidth="4"/>
        <circle cx="18" cy="18" r={r} fill="none" stroke="#4540C8" strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}/>
      </svg>
      <span className="text-[9px] font-bold text-rachna-indigo">{percent}%</span>
    </div>
  )
}

export default function EditingTaskNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [title, setTitle]     = useState(data.title || 'Rough Cut')
  const [desc, setDesc]       = useState(data.description || '')
  const [status, setStatus]   = useState(data.status || 'in_progress')
  const [progress, setProgress] = useState(data.progress ?? 60)
  const [dueDate, setDueDate]   = useState(data.dueDate || '')
  const [showStatus, setShowStatus] = useState(false)
  const [showMenu, setShowMenu]     = useState(false)
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.in_progress

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, { ...node, id: `editingTask-${Date.now()}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, selected: false, data: { ...node.data, title, description: desc, status, progress, dueDate } }])
    setShowMenu(false)
  }, [id, getNode, setNodes, title, desc, status, progress, dueDate])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this Editing Task node?')) setNodes(nds => nds.filter(n => n.id !== id))
    setShowMenu(false)
  }, [id, setNodes])

  return (
    <div className={clsx('bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[250px] max-w-[300px]',
      selected ? 'border-rachna-violet shadow-[0_4px_16px_rgba(69,64,200,0.2)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-rachna-violet')}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-rachna-indigo !border-2 !border-white" />

      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#F3F0FF] text-[#4540C8] text-[10px] font-bold tracking-widest uppercase">EDITING TASK</span>
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

      <div className="px-3 pb-3 space-y-2.5 nodrag">
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="w-full text-sm font-bold text-rachna-dark bg-transparent border-none outline-none focus:bg-rachna-surface rounded px-1 -mx-1"
          placeholder="Task title…"/>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2}
          className="w-full text-xs text-rachna-muted bg-transparent border-none outline-none resize-none focus:bg-rachna-surface rounded px-1 -mx-1 leading-relaxed"
          placeholder="Describe the task…"/>

        {/* Editor */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-rachna-indigo/20 flex items-center justify-center flex-shrink-0">
            <span className="text-rachna-indigo text-[9px] font-bold">{data.editor?.name?.[0] || 'E'}</span>
          </div>
          <span className="text-[10px] text-rachna-muted">Editor: <span className="text-rachna-dark font-medium">{data.editor?.name || 'Unassigned'}</span></span>
        </div>

        {/* Status + Progress */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <button onClick={() => setShowStatus(v => !v)}
              className={clsx('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors', cfg.bg)}>
              <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dot)}/>
              {cfg.label} <ChevronDown size={11}/>
            </button>
            {showStatus && (
              <div className="absolute left-0 top-8 bg-white rounded-xl border border-rachna-border shadow-card z-50 py-1 min-w-[130px] nowheel">
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <button key={key} onClick={() => { setStatus(key); setShowStatus(false) }}
                    className={clsx('w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-rachna-surface flex items-center gap-2', val.bg)}>
                    <span className={clsx('w-1.5 h-1.5 rounded-full', val.dot)}/>{val.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <ProgressRing percent={progress}/>
        </div>

        {/* Progress slider */}
        <div className="space-y-0.5">
          <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(+e.target.value)}
            className="w-full accent-rachna-indigo h-1.5 cursor-pointer"/>
          <div className="flex justify-between text-[9px] text-rachna-muted">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* Due date */}
        <div className="flex items-center gap-1.5 text-rachna-muted border-t border-rachna-border pt-2">
          <Calendar size={11}/>
          <input type="text" value={dueDate} onChange={e => setDueDate(e.target.value)}
            className="text-[11px] bg-transparent border-none outline-none text-rachna-muted flex-1"
            placeholder="Set due date…"/>
        </div>
      </div>
    </div>
  )
}
