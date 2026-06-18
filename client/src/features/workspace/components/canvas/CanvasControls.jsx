import { useState, useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'
import { Maximize2, Minus, Plus, RotateCcw, RotateCw } from 'lucide-react'
import clsx from 'clsx'

export default function CanvasControls() {
  const { zoomIn, zoomOut, fitView, getZoom, setViewport, getViewport } = useReactFlow()
  const [zoom, setZoom] = useState(85)

  // Sync displayed zoom
  const refreshZoom = () => setTimeout(() => setZoom(Math.round(getZoom() * 100)), 250)

  const Btn = ({ onClick, disabled, children, label }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={clsx(
        'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-150',
        disabled
          ? 'text-rachna-border cursor-not-allowed'
          : 'text-rachna-muted hover:bg-rachna-lavender hover:text-rachna-indigo'
      )}
    >
      {children}
    </button>
  )

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white border border-rachna-border rounded-full shadow-card px-2 py-1">
      <Btn onClick={() => { fitView({ padding: 0.1, duration: 400 }); refreshZoom() }} label="Fit to screen">
        <Maximize2 size={14}/>
      </Btn>

      <div className="w-px h-5 bg-rachna-border mx-0.5"/>

      <Btn onClick={() => { zoomOut({ duration: 200 }); refreshZoom() }} label="Zoom out">
        <Minus size={14}/>
      </Btn>

      <button
        onClick={() => { const vp = getViewport(); setViewport({ x: vp.x, y: vp.y, zoom: 1 }, { duration: 300 }); setZoom(100) }}
        className="min-w-[46px] text-center text-xs font-display font-bold text-rachna-dark hover:text-rachna-indigo transition-colors px-1"
        title="Reset zoom to 100%"
      >
        {zoom}%
      </button>

      <Btn onClick={() => { zoomIn({ duration: 200 }); refreshZoom() }} label="Zoom in">
        <Plus size={14}/>
      </Btn>

      <div className="w-px h-5 bg-rachna-border mx-0.5"/>

      <button
        onClick={() => { fitView({ padding: 0.1, duration: 400 }); refreshZoom() }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-rachna-indigo hover:bg-rachna-lavender transition-colors"
      >
        <Maximize2 size={12}/> Fit to Screen
      </button>
    </div>
  )
}
