import { useState } from 'react'
import { MousePointer2, Hand, Square, Image, Type, PenLine, Grid3X3, Plus, LayoutGrid } from 'lucide-react'
import clsx from 'clsx'

const PRIMARY_TOOLS = [
  { id: 'select', icon: MousePointer2, label: 'Select (V)' },
  { id: 'hand',   icon: Hand,          label: 'Pan (H)' },
]

const DRAW_TOOLS = [
  { id: 'rect',  icon: Square,   label: 'Rectangle' },
  { id: 'image', icon: Image,    label: 'Image' },
  { id: 'text',  icon: Type,     label: 'Text' },
  { id: 'pen',   icon: PenLine,  label: 'Draw' },
  { id: 'grid',  icon: LayoutGrid, label: 'Grid' },
]

const NODE_TYPES = [
  { type: 'idea',         label: '💡 Add Idea Node' },
  { type: 'inspiration',  label: '📌 Add Inspiration' },
  { type: 'script',       label: '📄 Add Script' },
  { type: 'references',   label: '▶️ Add References' },
  { type: 'thumbnail',    label: '🖼️ Add Thumbnail' },
  { type: 'editingTask',  label: '✂️ Add Editing Task' },
]

export default function CanvasToolbar({ activeTool, setActiveTool, onAddNode }) {
  const [showNodeMenu, setShowNodeMenu] = useState(false)

  const ToolBtn = ({ tool }) => (
    <button
      id={`tool-${tool.id}`}
      onClick={() => setActiveTool(tool.id)}
      title={tool.label}
      className={clsx(
        'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 relative group',
        activeTool === tool.id
          ? 'bg-rachna-indigo text-white shadow-sm'
          : 'text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark'
      )}
    >
      <tool.icon size={17} />
      {/* Tooltip */}
      <span className="absolute left-full ml-2 bg-rachna-dark text-white text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {tool.label}
      </span>
    </button>
  )

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 bg-white border border-rachna-border rounded-2xl shadow-card p-1.5">
      {/* Select / Hand */}
      {PRIMARY_TOOLS.map(t => <ToolBtn key={t.id} tool={t} />)}

      <div className="w-6 h-px bg-rachna-border my-0.5" />

      {/* Draw tools */}
      {DRAW_TOOLS.map(t => <ToolBtn key={t.id} tool={t} />)}

      <div className="w-6 h-px bg-rachna-border my-0.5" />

      {/* Add node */}
      <div className="relative">
        <button
          id="toolbar-add"
          onClick={() => setShowNodeMenu(v => !v)}
          title="Add Node"
          className={clsx(
            'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150',
            showNodeMenu
              ? 'bg-rachna-indigo text-white'
              : 'text-rachna-muted hover:bg-rachna-surface hover:text-rachna-dark'
          )}
        >
          <Plus size={17} />
        </button>

        {showNodeMenu && (
          <div className="absolute left-full ml-3 top-0 bg-white border border-rachna-border rounded-2xl shadow-card-lg py-1.5 min-w-[190px] z-50">
            <p className="text-[10px] font-display font-bold text-rachna-muted uppercase tracking-widest px-3 pt-1 pb-1.5">
              Add Node
            </p>
            {NODE_TYPES.map(n => (
              <button
                key={n.type}
                id={`add-node-${n.type}`}
                onClick={() => { onAddNode(n.type); setShowNodeMenu(false) }}
                className="w-full text-left px-3 py-2 text-xs text-rachna-dark hover:bg-rachna-lavender hover:text-rachna-indigo transition-colors font-medium"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
