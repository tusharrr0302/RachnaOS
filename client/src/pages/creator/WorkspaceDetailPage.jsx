import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  ChevronLeft, Edit3, Share2, Bell, MoreHorizontal,
  Calendar, Plus, Trash2, User, Flag, X, CheckSquare,
  Sparkles, AlignLeft, Hash, Image, Link, Bold, Italic,
  List, Quote, Minus, FileText, Upload
} from 'lucide-react'
import clsx from 'clsx'

const TABS = ['Canvas', 'Tasks', 'Script', 'Assets', 'Notes', 'Activity']

const INITIAL_COLUMNS = {
  todo: {
    id: 'todo', title: 'TODO', color: 'bg-rachna-border',
    tasks: [
      { id: 't1', title: 'Write hook', assignee: '@creator', due: 'Dec 10', priority: 'high', desc: 'Draft the opening 30 seconds' },
      { id: 't2', title: 'Thumbnail concepts x3', assignee: '@thumbpro', due: 'Dec 11', priority: 'medium', desc: 'Create 3 thumbnail options for A/B testing' },
    ]
  },
  in_progress: {
    id: 'in_progress', title: 'IN PROGRESS', color: 'bg-rachna-indigo',
    tasks: [
      { id: 't3', title: 'Script draft v2', assignee: '@creator', due: 'Dec 12', priority: 'high', desc: 'Full script with timestamps' },
    ]
  },
  review: {
    id: 'review', title: 'REVIEW', color: 'bg-rachna-warning',
    tasks: [
      { id: 't4', title: 'B-roll footage review', assignee: '@aditya', due: 'Dec 14', priority: 'medium', desc: '' },
    ]
  },
  done: {
    id: 'done', title: 'DONE', color: 'bg-rachna-success',
    tasks: [
      { id: 't5', title: 'Research: market data', assignee: '@researcher', due: 'Dec 8', priority: 'low', desc: '' },
      { id: 't6', title: 'Storyboard outline', assignee: '@creator', due: 'Dec 9', priority: 'medium', desc: '' },
    ]
  },
}

const PRIORITY_COLORS = { high: 'text-rachna-danger', medium: 'text-rachna-warning', low: 'text-rachna-success' }
const PRIORITY_LABELS = { high: '🔴', medium: '🟡', low: '🟢' }

function TaskCard({ task, index, onClick }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
          className={clsx(
            'bg-white rounded-xl border border-rachna-border p-3.5 cursor-pointer hover:shadow-card transition-shadow mb-2',
            snapshot.isDragging && 'shadow-card-lg rotate-1 opacity-95'
          )}
        >
          <p className="text-sm font-medium text-rachna-dark mb-2 leading-tight">{task.title}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-rachna-surface rounded-lg px-2 py-0.5">
              <User size={10} className="text-rachna-muted" />
              <span className="text-[10px] text-rachna-muted">{task.assignee}</span>
            </div>
            {task.due && (
              <div className="flex items-center gap-1">
                <Calendar size={10} className="text-rachna-muted" />
                <span className="text-[10px] text-rachna-muted">{task.due}</span>
              </div>
            )}
            <span className="ml-auto text-sm">{PRIORITY_LABELS[task.priority]}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}

function ScriptEditor() {
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState(0)

  const handleChange = (e) => {
    setContent(e.target.value)
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl px-3 py-2 mb-4 flex-wrap">
        {[
          [Bold, 'Bold'], [Italic, 'Italic'], [List, 'List'], [Quote, 'Quote'],
        ].map(([Icon, label]) => (
          <button key={label} title={label} className="w-8 h-8 rounded-lg hover:bg-rachna-surface flex items-center justify-center text-rachna-muted hover:text-rachna-dark transition-colors">
            <Icon size={15} />
          </button>
        ))}
        <div className="w-px h-5 bg-rachna-border mx-1" />
        {[
          [Image, 'Image'], [Link, 'Link'], [Hash, 'Heading'],
        ].map(([Icon, label]) => (
          <button key={label} title={label} className="w-8 h-8 rounded-lg hover:bg-rachna-surface flex items-center justify-center text-rachna-muted hover:text-rachna-dark transition-colors">
            <Icon size={15} />
          </button>
        ))}
        <div className="w-px h-5 bg-rachna-border mx-1" />
        <button className="flex items-center gap-1.5 bg-rachna-lavender text-rachna-indigo text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-rachna-indigo hover:text-white transition-colors ml-1">
          <Sparkles size={12} /> AI: Generate Script
        </button>
        <button className="flex items-center gap-1.5 bg-rachna-lavender text-rachna-indigo text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-rachna-indigo hover:text-white transition-colors">
          <Sparkles size={12} /> Improve This
        </button>
        <span className="ml-auto text-xs text-rachna-muted">{wordCount} words</span>
      </div>

      {/* Script sections */}
      <div className="space-y-4">
        {['Hook (0:00 - 0:30)', 'Intro (0:30 - 1:30)', 'Main Content', 'Call to Action', 'Description + Tags'].map(section => (
          <div key={section} className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-rachna-border bg-rachna-surface">
              <span className="text-xs font-display font-bold text-rachna-muted uppercase tracking-wider">{section}</span>
            </div>
            <textarea
              placeholder={`Write your ${section.toLowerCase()} here...`}
              className="w-full px-5 py-4 text-sm text-rachna-dark placeholder:text-rachna-muted focus:outline-none resize-none min-h-[80px] font-body leading-relaxed"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WorkspaceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Canvas')
  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [selectedTask, setSelectedTask] = useState(null)
  const [addingTask, setAddingTask] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [status, setStatus] = useState('scripting')

  const PROJECT_DATA = {
    '1': { title: 'How I Made ₹1L From YouTube in 60 Days', niche: 'Finance', platform: 'YouTube' },
    '2': { title: '5 Budget YouTube Setup Under ₹10,000', niche: 'Tech', platform: 'YouTube' },
    '3': { title: '24 Hours Surviving in Delhi with No Plan', niche: 'Travel', platform: 'YouTube' },
  }
  const project = PROJECT_DATA[id] || { title: 'Untitled Video', niche: 'Finance', platform: 'YouTube' }

  const handleDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = { ...columns[source.droppableId], tasks: [...columns[source.droppableId].tasks] }
    const destCol = { ...columns[destination.droppableId], tasks: [...columns[destination.droppableId].tasks] }
    const [removed] = sourceCol.tasks.splice(source.index, 1)
    destCol.tasks.splice(destination.index, 0, removed)

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    })
  }

  const addTask = (colId) => {
    if (!newTaskTitle.trim()) { setAddingTask(null); return }
    const newTask = { id: `t${Date.now()}`, title: newTaskTitle, assignee: '@creator', due: '', priority: 'medium', desc: '' }
    setColumns(prev => ({
      ...prev,
      [colId]: { ...prev[colId], tasks: [...prev[colId].tasks, newTask] }
    }))
    setNewTaskTitle('')
    setAddingTask(null)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-rachna-border px-6 py-3 flex items-center gap-4 flex-shrink-0">
        <button onClick={() => navigate('/creator/workspace')} className="flex items-center gap-1.5 text-rachna-muted hover:text-rachna-dark text-sm transition-colors">
          <ChevronLeft size={16} /> Workspace
        </button>
        <span className="text-rachna-border">›</span>
        <h1 className="font-display font-semibold text-rachna-dark text-sm truncate max-w-xs">{project.title}</h1>
        <button className="text-rachna-muted hover:text-rachna-dark"><Edit3 size={14} /></button>

        <div className="ml-2">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="text-xs font-semibold border border-rachna-border rounded-xl px-3 py-1.5 bg-rachna-surface text-rachna-indigo focus:outline-none focus:border-rachna-indigo"
          >
            {['idea', 'scripting', 'filming', 'editing', 'review', 'published'].map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Team avatars */}
        <div className="flex -space-x-2 ml-auto">
          {['A', 'R', 'D', 'M'].map((l, i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-rachna-indigo flex items-center justify-center text-white text-xs font-bold border-2 border-white" title={`Team member ${l}`}>
              {l}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full bg-rachna-lavender flex items-center justify-center text-rachna-indigo text-xs font-bold border-2 border-white">+3</div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-ghost py-1.5 px-3 text-xs">
            <Share2 size={13} /> Share
          </button>
          <button className="btn-primary py-1.5 px-3 text-xs">
            <Bell size={13} /> Follow
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-rachna-border px-6 flex-shrink-0">
        <div className="flex gap-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-3 text-sm font-medium border-b-2 transition-all duration-150',
                activeTab === tab
                  ? 'border-rachna-indigo text-rachna-indigo'
                  : 'border-transparent text-rachna-muted hover:text-rachna-dark'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {/* Canvas Tab — Brief */}
        {activeTab === 'Canvas' && (
          <div className="p-8 max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
              {[
                { n: 1, label: 'Idea & Research', done: true },
                { n: 2, label: 'Script', done: true },
                { n: 3, label: 'Shoot', done: false },
                { n: 4, label: 'Edit', done: false },
                { n: 5, label: 'Thumbnail', done: false },
                { n: 6, label: 'Upload', done: false },
              ].map((step, i, arr) => (
                <div key={step.n} className="flex items-center gap-2 flex-shrink-0">
                  <div className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold', step.done ? 'bg-rachna-success/10 text-rachna-success' : 'bg-rachna-surface border border-rachna-border text-rachna-muted')}>
                    {step.done ? <CheckSquare size={12} /> : <span>{step.n}</span>}
                    {step.label}
                  </div>
                  {i < arr.length - 1 && <div className={clsx('w-6 h-px', step.done ? 'bg-rachna-success' : 'bg-rachna-border')} />}
                </div>
              ))}
            </div>

            {/* Two-column brief */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Thumbnail upload */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-rachna-border p-6 text-center hover:border-rachna-indigo transition-colors cursor-pointer group">
                  <Upload size={24} className="text-rachna-muted mx-auto mb-2 group-hover:text-rachna-indigo transition-colors" />
                  <p className="text-sm font-medium text-rachna-dark mb-1">Upload Cover Thumbnail</p>
                  <p className="text-xs text-rachna-muted">1280×720 recommended</p>
                </div>

                {/* Fields */}
                {[
                  { label: 'Video Title (for YouTube)', placeholder: 'Enter the actual YouTube title...', type: 'input' },
                  { label: 'Hook (opening line)', placeholder: 'Your attention-grabbing opening...', type: 'input' },
                ].map(field => (
                  <div key={field.label} className="bg-white rounded-2xl border border-rachna-border p-5">
                    <label className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider block mb-2">{field.label}</label>
                    <input type="text" placeholder={field.placeholder} className="w-full text-sm text-rachna-dark placeholder:text-rachna-muted focus:outline-none font-medium" />
                  </div>
                ))}

                {/* Team */}
                <div className="bg-white rounded-2xl border border-rachna-border p-5">
                  <h3 className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-4">Team</h3>
                  <div className="space-y-3">
                    {[{ role: 'Editor', val: '@raj_edits' }, { role: 'Designer', val: '@thumbpro' }, { role: 'Researcher', val: '' }].map(m => (
                      <div key={m.role} className="flex items-center gap-3">
                        <span className="text-sm text-rachna-muted w-24 flex-shrink-0">{m.role}:</span>
                        <input type="text" defaultValue={m.val} placeholder="Search or invite..." className="flex-1 text-sm border border-rachna-border rounded-xl px-3 py-1.5 focus:outline-none focus:border-rachna-indigo text-rachna-dark placeholder:text-rachna-muted" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspiration */}
                <div className="bg-white rounded-2xl border border-rachna-border p-5">
                  <h3 className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-4">Inspiration</h3>
                  <div className="flex gap-2 mb-3">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-rachna-indigo bg-rachna-lavender px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                      <Plus size={12} /> Add reference URL
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-rachna-indigo bg-rachna-lavender px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                      <Upload size={12} /> Upload inspo image
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { title: 'Delhi street vibe', src: 'pinterest.com', icon: '📌' },
                      { title: 'Travel vlog thumbnails', src: 'pinterest.com', icon: '📌' },
                    ].map(link => (
                      <div key={link.title} className="flex items-center gap-2 bg-rachna-surface rounded-xl p-2.5 border border-rachna-border">
                        <span className="text-xl">{link.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-rachna-dark truncate">{link.title}</p>
                          <p className="text-[10px] text-rachna-muted truncate">{link.src}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-rachna-border p-5">
                  <h3 className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider mb-4">Project Brief</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'Project Owner', val: 'Ankit Verma' },
                      { label: 'Created', val: '12 May, 2024' },
                      { label: 'Last Updated', val: '2 hours ago' },
                      { label: 'Category', val: project.niche },
                      { label: 'Platform', val: project.platform },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between">
                        <span className="text-rachna-muted text-xs">{row.label}</span>
                        <span className="text-rachna-dark font-medium text-xs">{row.val}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-xs font-semibold text-rachna-indigo bg-rachna-lavender py-2 rounded-xl hover:bg-indigo-100 transition-colors">
                    Edit Brief
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-rachna-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-display font-semibold text-rachna-muted uppercase tracking-wider">Team & Roles</h3>
                    <button className="text-xs text-rachna-indigo font-semibold hover:underline">Manage</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Ankit Verma', role: 'Project Manager', status: null },
                      { name: 'Rohit Kumar', role: 'Thumbnail Designer', status: 'In Progress' },
                      { name: 'Aditya Singh', role: 'Video Editor', status: 'In Progress' },
                      { name: 'Akash Tiwari', role: 'Script Writer', status: 'Done' },
                    ].map(m => (
                      <div key={m.name} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-rachna-indigo/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-rachna-indigo font-bold text-xs">{m.name[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-rachna-dark truncate">{m.name}</p>
                          <p className="text-[10px] text-rachna-muted truncate">{m.role}</p>
                        </div>
                        {m.status && (
                          <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full', m.status === 'Done' ? 'bg-green-50 text-rachna-success' : 'bg-blue-50 text-blue-600')}>
                            {m.status}
                          </span>
                        )}
                      </div>
                    ))}
                    <button className="w-full text-xs font-semibold text-rachna-indigo bg-rachna-lavender py-2 rounded-xl hover:bg-indigo-100 transition-colors mt-1">
                      + Add Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Script Tab */}
        {activeTab === 'Script' && (
          <div className="p-8">
            <ScriptEditor />
          </div>
        )}

        {/* Tasks Tab — Kanban */}
        {activeTab === 'Tasks' && (
          <div className="p-6 h-full">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-4 gap-4 h-full min-h-[500px]">
                {Object.values(columns).map(col => (
                  <div key={col.id} className="flex flex-col bg-rachna-surface rounded-2xl p-4">
                    {/* Column Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={clsx('w-2 h-2 rounded-full', col.color)} />
                      <span className="text-xs font-display font-bold text-rachna-muted uppercase tracking-wider">{col.title}</span>
                      <span className="ml-auto text-xs text-rachna-muted bg-white rounded-full w-5 h-5 flex items-center justify-center border border-rachna-border">
                        {col.tasks.length}
                      </span>
                    </div>

                    {/* Tasks */}
                    <Droppable droppableId={col.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={clsx('flex-1 min-h-16 rounded-xl transition-colors', snapshot.isDraggingOver && 'bg-rachna-lavender/50')}
                        >
                          {col.tasks.map((task, idx) => (
                            <TaskCard key={task.id} task={task} index={idx} onClick={setSelectedTask} />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* Add task */}
                    {addingTask === col.id ? (
                      <div className="mt-2">
                        <input
                          autoFocus
                          type="text"
                          value={newTaskTitle}
                          onChange={e => setNewTaskTitle(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') addTask(col.id); if (e.key === 'Escape') setAddingTask(null) }}
                          placeholder="Task title..."
                          className="input text-xs py-2 mb-2"
                        />
                        <div className="flex gap-1.5">
                          <button onClick={() => addTask(col.id)} className="text-xs bg-rachna-indigo text-white px-3 py-1.5 rounded-lg font-semibold">Add</button>
                          <button onClick={() => setAddingTask(null)} className="text-xs text-rachna-muted hover:text-rachna-dark px-2">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingTask(col.id)}
                        className="mt-2 flex items-center gap-1.5 text-xs text-rachna-muted hover:text-rachna-indigo w-full py-2 rounded-xl hover:bg-white transition-colors"
                      >
                        <Plus size={13} /> Add task
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        )}

        {/* Other tabs placeholder */}
        {!['Canvas', 'Script', 'Tasks'].includes(activeTab) && (
          <div className="flex items-center justify-center h-64 text-rachna-muted">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-rachna-lavender mx-auto mb-3 flex items-center justify-center">
                <FileText size={20} className="text-rachna-indigo" />
              </div>
              <p className="font-semibold text-rachna-dark mb-1">{activeTab}</p>
              <p className="text-sm">Coming soon in this section</p>
            </div>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-bold text-rachna-dark text-lg">{selectedTask.title}</h3>
                <button onClick={() => setSelectedTask(null)} className="text-rachna-muted hover:text-rachna-dark">
                  <X size={20} />
                </button>
              </div>
              {selectedTask.desc && <p className="text-sm text-rachna-muted mb-4">{selectedTask.desc}</p>}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-rachna-muted mb-1">Assignee</p>
                  <p className="font-medium text-rachna-dark">{selectedTask.assignee}</p>
                </div>
                <div>
                  <p className="text-xs text-rachna-muted mb-1">Due Date</p>
                  <p className="font-medium text-rachna-dark">{selectedTask.due || 'No date'}</p>
                </div>
                <div>
                  <p className="text-xs text-rachna-muted mb-1">Priority</p>
                  <span className={clsx('font-semibold', PRIORITY_COLORS[selectedTask.priority])}>
                    {PRIORITY_LABELS[selectedTask.priority]} {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setSelectedTask(null)} className="flex-1 btn-ghost justify-center py-2.5 text-sm">Close</button>
                <button className="text-rachna-danger hover:bg-red-50 p-2.5 rounded-xl transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
