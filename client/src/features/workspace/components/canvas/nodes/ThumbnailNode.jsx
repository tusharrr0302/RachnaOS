import { useState, useCallback, useRef } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MoreHorizontal, Upload, Plus, Copy, Trash2 } from 'lucide-react'
import clsx from 'clsx'

export default function ThumbnailNode({ id, data, selected }) {
  const { setNodes, getNode } = useReactFlow()
  const [mainImage, setMainImage] = useState(data.mainImage || null)
  const [variants, setVariants]   = useState(data.variants || [])
  const [version, setVersion]     = useState(data.version || 'v1')
  const [showMenu, setShowMenu]   = useState(false)
  const fileRef = useRef(null)

  const handleDuplicate = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    setNodes(nds => [...nds, { ...node, id: `thumbnail-${Date.now()}`, position: { x: node.position.x + 40, y: node.position.y + 40 }, selected: false }])
    setShowMenu(false)
  }, [id, getNode, setNodes])

  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this Thumbnail node?')) setNodes(nds => nds.filter(n => n.id !== id))
    setShowMenu(false)
  }, [id, setNodes])

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (!mainImage) {
      setMainImage(url)
      setVersion('v1')
    } else {
      setVariants(prev => {
        const next = [...prev, url]
        setVersion(`v${next.length + 1}`)
        return next
      })
    }
    e.target.value = ''
  }

  return (
    <div className={clsx('bg-white rounded-xl border-[1.5px] overflow-visible transition-all duration-150 min-w-[260px] max-w-[300px]',
      selected ? 'border-green-400 shadow-[0_4px_16px_rgba(29,158,117,0.2)]'
               : 'border-[#E5E3F8] shadow-[0_2px_8px_rgba(69,64,200,0.08)] hover:border-green-300')}>
      <Handle type="target" position={Position.Left}   className="!w-3 !h-3 !bg-green-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right}  className="!w-3 !h-3 !bg-green-500 !border-2 !border-white" />
      <Handle type="target" position={Position.Top}    className="!w-3 !h-3 !bg-green-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-green-500 !border-2 !border-white" />

      <div className="drag-handle flex items-center justify-between px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing select-none">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#F0FDF4] text-[#1D9E75] text-[10px] font-bold tracking-widest uppercase">THUMBNAIL</span>
        <div className="relative">
          <button onClick={() => setShowMenu(v => !v)} className="w-6 h-6 rounded-md flex items-center justify-center text-rachna-muted hover:bg-rachna-surface"><MoreHorizontal size={14}/></button>
          {showMenu && (
            <div className="absolute right-0 top-7 bg-white rounded-xl border border-rachna-border shadow-card z-50 min-w-[160px] py-1 nodrag nowheel">
              <button onClick={() => { fileRef.current?.click(); setShowMenu(false) }} className="w-full text-left px-3 py-1.5 text-xs text-rachna-dark hover:bg-rachna-surface flex items-center gap-2"><Upload size={11}/> Upload Image</button>
              <button onClick={handleDuplicate} className="w-full text-left px-3 py-1.5 text-xs text-rachna-dark hover:bg-rachna-surface flex items-center gap-2"><Copy size={11}/> Duplicate</button>
              <button onClick={handleDelete}    className="w-full text-left px-3 py-1.5 text-xs text-rachna-danger hover:bg-red-50 flex items-center gap-2"><Trash2 size={11}/> Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-3 space-y-3 nodrag">
        {/* Main image */}
        {mainImage ? (
          <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
            <img src={mainImage} alt="thumbnail" className="w-full rounded-lg object-cover" style={{ aspectRatio: '16/9' }} />
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full">{version}</span>
            <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload size={20} className="text-white"/>
            </div>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center w-full rounded-lg bg-rachna-surface border-2 border-dashed border-rachna-border cursor-pointer hover:border-green-300 hover:bg-green-50 transition-colors"
            style={{ aspectRatio: '16/9' }}>
            <Upload size={20} className="text-rachna-muted mb-1.5"/>
            <span className="text-xs text-rachna-muted font-medium">Upload thumbnail</span>
            <span className="text-[10px] text-rachna-muted">1280×720 recommended</span>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload}/>

        {/* Variants */}
        {(variants.length > 0 || mainImage) && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {variants.slice(0, 3).map((v, i) => (
              <div key={i} className="relative group">
                <img src={v} alt={`v${i+2}`} className="w-12 h-[27px] object-cover rounded-md border border-rachna-border cursor-pointer hover:border-green-400"/>
                <button onClick={() => setVariants(prev => prev.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-white">
                  <span className="text-[8px] font-bold leading-none">×</span>
                </button>
              </div>
            ))}
            {variants.length > 3 && <span className="text-[10px] text-rachna-muted font-semibold">+{variants.length-3}</span>}
            <button onClick={() => fileRef.current?.click()} className="w-12 h-[27px] border-2 border-dashed border-rachna-border rounded-md flex items-center justify-center hover:border-green-300 transition-colors">
              <Plus size={10} className="text-rachna-muted"/>
            </button>
          </div>
        )}

        {/* Designer */}
        <div className="flex items-center gap-2 pt-1 border-t border-rachna-border">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-green-700 text-[9px] font-bold">{data.designer?.name?.[0] || 'D'}</span>
          </div>
          <span className="text-[10px] text-rachna-muted">Designer: <span className="text-rachna-dark font-medium">{data.designer?.name || 'Unassigned'}</span></span>
        </div>
      </div>
    </div>
  )
}
