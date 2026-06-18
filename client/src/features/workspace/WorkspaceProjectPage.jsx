import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { WorkspaceProvider } from './hooks/useWorkspace.jsx'
import ProjectHeader          from './components/project/ProjectHeader'
import ProjectTabs            from './components/project/ProjectTabs'
import ProductionPipeline     from './components/project/ProductionPipeline'
import RightPanel             from './components/project/RightPanel'
import ProjectCanvas          from './components/canvas/ProjectCanvas'
import TasksTab               from './components/tabs/TasksTab'
import ScriptTab              from './components/tabs/ScriptTab'
import AssetsTab              from './components/tabs/AssetsTab'
import NotesTab               from './components/tabs/NotesTab'
import ActivityTab            from './components/tabs/ActivityTab'

function ProjectShell() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab]         = useState('canvas')
  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  const renderTab = () => {
    switch (activeTab) {
      case 'canvas':   return <ProjectCanvas projectId={id} />
      case 'tasks':    return <TasksTab />
      case 'script':   return <ScriptTab />
      case 'assets':   return <AssetsTab />
      case 'notes':    return <NotesTab />
      case 'activity': return <ActivityTab />
      default:         return <ProjectCanvas projectId={id} />
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F5F4FF]">
      {/* Project Header */}
      <ProjectHeader onBack={() => navigate('/creator/workspace')} />

      {/* Tabs */}
      <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pipeline (canvas tab only) */}
      <AnimatePresence>
        {activeTab === 'canvas' && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProductionPipeline />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Tab content */}
        <div className="flex-1 overflow-hidden">
          {renderTab()}
        </div>

        {/* Right panel (canvas only) */}
        <AnimatePresence>
          {activeTab === 'canvas' && (
            <>
              {/* Collapse toggle */}
              <motion.button
                initial={false}
                animate={{ right: rightPanelOpen ? 320 : 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setRightPanelOpen(v => !v)}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-5 h-10 bg-white border border-rachna-border border-r-0 rounded-l-lg flex items-center justify-center text-rachna-muted hover:text-rachna-indigo hover:bg-rachna-lavender transition-colors shadow-sm"
                title={rightPanelOpen ? 'Collapse panel' : 'Expand panel'}
              >
                {rightPanelOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
              </motion.button>

              <AnimatePresence>
                {rightPanelOpen && (
                  <motion.div
                    key="right-panel"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden flex-shrink-0"
                  >
                    <RightPanel onClose={() => setRightPanelOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function WorkspaceProjectPage() {
  const { id } = useParams()
  return (
    <WorkspaceProvider projectId={id}>
      <ProjectShell />
    </WorkspaceProvider>
  )
}
