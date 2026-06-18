import { useState, useCallback } from 'react'
import {
  ReactFlow, Background, MiniMap,
  addEdge, useNodesState, useEdgesState,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import IdeaNode        from './nodes/IdeaNode'
import InspirationNode from './nodes/InspirationNode'
import ScriptNode      from './nodes/ScriptNode'
import ReferencesNode  from './nodes/ReferencesNode'
import ThumbnailNode   from './nodes/ThumbnailNode'
import EditingTaskNode from './nodes/EditingTaskNode'
import CanvasToolbar   from './CanvasToolbar'
import CanvasControls  from './CanvasControls'

const nodeTypes = {
  idea:        IdeaNode,
  inspiration: InspirationNode,
  script:      ScriptNode,
  references:  ReferencesNode,
  thumbnail:   ThumbnailNode,
  editingTask: EditingTaskNode,
}

const DEFAULT_NODES = [
  { id: 'idea-1',        type: 'idea',        position: { x: 80,  y: 80  }, data: { title: '24 Hours Surviving in Delhi', description: 'Exploring the real, chaotic, and authentic side of Delhi in 24 hours with no plan!', checklistItems: [{ label: 'Research Complete', checked: true }, { label: 'Location scouted', checked: false }] } },
  { id: 'inspiration-1', type: 'inspiration',  position: { x: 80,  y: 390 }, data: { links: [{ title: 'Delhi street vibe', source: 'pinterest.com', favicon: '📌' }, { title: 'Travel vlog thumbnails', source: 'pinterest.com', favicon: '📌' }, { title: 'Color grading idea', source: 'pinterest.com', favicon: '📌' }] } },
  { id: 'script-1',      type: 'script',       position: { x: 440, y: 80  }, data: { version: 'v1', docType: 'Google Docs', outline: ['Hook', 'Introduction', 'Challenges', 'Experiences', 'Conclusion'], lastUpdated: '2h ago', updatedBy: { name: 'Ankit' } } },
  { id: 'references-1',  type: 'references',   position: { x: 440, y: 410 }, data: { videos: [{ title: '24 Hours in Mumbai', channel: 'Mumbiker Nikhil' }, { title: 'Surviving 24 Hours', channel: 'Fukra Insaan' }, { title: 'Delhi in 24 Hours', channel: 'GAURAV ZONE' }] } },
  { id: 'thumbnail-1',   type: 'thumbnail',    position: { x: 800, y: 80  }, data: { version: 'v2', mainImage: null, variants: [], designer: { name: 'Rohit' } } },
  { id: 'editingTask-1', type: 'editingTask',   position: { x: 800, y: 440 }, data: { title: 'Rough Cut', description: 'First rough cut with all the raw footage assembled.', editor: { name: 'Aditya' }, status: 'in_progress', progress: 60, dueDate: '20 May, 2024' } },
]

const DEFAULT_EDGES = [
  { id: 'e1', source: 'idea-1',      target: 'script-1',      type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } },
  { id: 'e2', source: 'idea-1',      target: 'inspiration-1', type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } },
  { id: 'e3', source: 'script-1',    target: 'references-1',  type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } },
  { id: 'e4', source: 'script-1',    target: 'thumbnail-1',   type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } },
  { id: 'e5', source: 'thumbnail-1', target: 'editingTask-1', type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } },
]

const NODE_DEFAULTS = {
  idea:        { title: 'New Idea', description: '', checklistItems: [] },
  inspiration: { links: [] },
  script:      { version: 'v1', outline: ['Hook', 'Main Content', 'CTA'], lastUpdated: 'just now', updatedBy: { name: 'You' } },
  references:  { videos: [] },
  thumbnail:   { version: 'v1', mainImage: null, variants: [], designer: { name: 'Unassigned' } },
  editingTask: { title: 'New Task', description: '', status: 'todo', progress: 0, dueDate: '', editor: { name: 'Unassigned' } },
}

function CanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(DEFAULT_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState(DEFAULT_EDGES)
  const [activeTool, setActiveTool]      = useState('select')
  const [rfInstance, setRfInstance]      = useState(null)

  const onConnect = useCallback((params) => {
    setEdges(eds => addEdge({ ...params, type: 'smoothstep', style: { stroke: '#4540C8', strokeWidth: 2 } }, eds))
  }, [setEdges])

  const addNode = useCallback((type) => {
    if (!rfInstance) return
    const { x, y, zoom } = rfInstance.getViewport()
    const centerX = (-x + window.innerWidth / 2) / zoom - 150
    const centerY = (-y + window.innerHeight / 2) / zoom - 100
    setNodes(nds => [...nds, {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: centerX, y: centerY },
      data: { ...NODE_DEFAULTS[type] },
    }])
  }, [rfInstance, setNodes])

  // Pan mode: when hand tool is active, pan on left drag; otherwise pan on middle/right drag
  const panOnDrag = activeTool === 'hand' ? true : [2]

  return (
    <div className="relative w-full h-full bg-[#F5F4FF]">
      <CanvasToolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        onAddNode={addNode}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        nodeDragThreshold={1}
        nodesDraggable
        nodeDragHandle=".drag-handle"
        panOnDrag={panOnDrag}
        panOnScroll={false}
        zoomOnScroll
        zoomOnPinch
        fitView
        fitViewOptions={{ padding: 0.12, maxZoom: 1 }}
        deleteKeyCode="Backspace"
        selectionKeyCode="Shift"
        multiSelectionKeyCode="Meta"
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: '#4540C8', strokeWidth: 2, strokeDasharray: '5 4' }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
        style={{ cursor: activeTool === 'hand' ? 'grab' : 'default' }}
      >
        <Background variant="dots" color="#C8C5EE" gap={20} size={1.5} />
        <MiniMap
          position="bottom-right"
          nodeColor={(node) => {
            const colors = { idea: '#EDE9FF', inspiration: '#FFF8E1', script: '#E8F4FD', references: '#FFFBEA', thumbnail: '#F0FDF4', editingTask: '#F3F0FF' }
            return colors[node.type] || '#EDE9FF'
          }}
          maskColor="rgba(240,240,255,0.6)"
          style={{ width: 140, height: 90, borderRadius: 12, border: '1px solid #E5E3F8' }}
          pannable
          zoomable
        />
      </ReactFlow>

      <CanvasControls />
    </div>
  )
}

export default function ProjectCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}
