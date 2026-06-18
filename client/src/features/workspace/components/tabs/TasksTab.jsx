import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Plus, X, Calendar, Flag, GripVertical, Trash2, User } from 'lucide-react'
import clsx from 'clsx'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'

const COLS = [
  { id: 'todo',        label: 'To Do',       color: 'bg-slate-100 text-slate-600',   accent: 'bg-slate-400' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-50 text-blue-600',      accent: 'bg-blue-500' },
  { id: 'review',      label: 'Review',      color: 'bg-amber-50 text-amber-600',    accent: 'bg-amber-500' },
  { id: 'done',        label: 'Done',        color: 'bg-green-50 text-green-700',    accent: 'bg-green-500' },
]

const PRIORITY_CONFIG = {
  high:   { color: 'text-red-500',    label: 'High',   dot: 'bg-red-400' },
  medium: { color: 'text-amber-500',  label: 'Medium', dot: 'bg-amber-400' },
  low:    { color: 'text-slate-400',  label: 'Low',    dot: 'bg-slate-300' },
}

const ASSIGNEES = ['Ankit', 'Rohit', 'Aditya', 'Akash', 'Muskan']

function AddTaskModal({ colId, onClose, onAdd }) {
  const [title, setTitle]       = useState('')
  const [assignee, setAssignee] = useState(ASSIGNEES[0])
  const [due, setDue]           = useState('')
  const [priority, setPriority] = useState('medium')

  const handleAdd = () => {
    if (!title.trim()) return
    onAdd({ title: title.trim(), assignee, due, priority, status: colId })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-rachna-dark">Add Task</h3>
          <button onClick={onClose} className="text-rachna-muted hover:text-rachna-dark"><X size={16}/></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-rachna-muted block mb-1">Title *</label>
            <input autoFocus value={title} onChange={e => setTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
              className="input w-full" placeholder="What needs to be done?"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Assignee</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className="input w-full">
                {ASSIGNEES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="input w-full">
                {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-rachna-muted block mb-1">Due Date</label>
            <input type="date" value={due} onChange={e => setDue(e.target.value)} className="input w-full"/>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost flex-1 justify-center text-sm">Cancel</button>
          <button onClick={handleAdd} disabled={!title.trim()} className="btn-primary flex-1 justify-center text-sm disabled:opacity-50">Add Task</button>
        </div>
      </div>
    </div>
  )
}

function EditTaskModal({ task, onClose, onSave, onDelete }) {
  const [title, setTitle]       = useState(task.title)
  const [assignee, setAssignee] = useState(task.assignee)
  const [due, setDue]           = useState(task.due)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus]     = useState(task.status)

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-rachna-dark">Edit Task</h3>
          <div className="flex gap-1">
            <button onClick={() => { onDelete(task.id); onClose() }} className="w-8 h-8 flex items-center justify-center rounded-lg text-rachna-muted hover:bg-red-50 hover:text-rachna-danger" title="Delete task">
              <Trash2 size={14}/>
            </button>
            <button onClick={onClose} className="text-rachna-muted hover:text-rachna-dark"><X size={16}/></button>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-rachna-muted block mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="input w-full"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="input w-full">
                {COLS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Assignee</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className="input w-full">
                {ASSIGNEES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="input w-full">
                {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-rachna-muted block mb-1">Due Date</label>
              <input type="date" value={due} onChange={e => setDue(e.target.value)} className="input w-full"/>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost flex-1 justify-center text-sm">Cancel</button>
          <button onClick={() => { onSave(task.id, { title, assignee, due, priority, status }); onClose() }} className="btn-primary flex-1 justify-center text-sm">Save</button>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, index, onClick }) {
  const pc = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => onClick(task)}
          className={clsx(
            'bg-white border border-rachna-border rounded-xl p-3 cursor-pointer transition-all duration-150 mb-2 group',
            snapshot.isDragging
              ? 'shadow-card-lg border-rachna-violet rotate-1 scale-105'
              : 'hover:shadow-card hover:border-rachna-violet/30'
          )}
        >
          <div className="flex items-start gap-2">
            <div
              {...provided.dragHandleProps}
              className="mt-0.5 text-rachna-border hover:text-rachna-muted cursor-grab active:cursor-grabbing flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={e => e.stopPropagation()}
            >
              <GripVertical size={13}/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-rachna-dark leading-snug mb-2">{task.title}</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-rachna-indigo/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold text-rachna-indigo">{task.assignee?.[0]}</span>
                  </div>
                  <span className="text-[10px] text-rachna-muted truncate">{task.assignee}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={clsx('flex items-center gap-0.5 text-[10px] font-semibold', pc.color)}>
                    <span className={clsx('w-1.5 h-1.5 rounded-full', pc.dot)}/>{pc.label}
                  </span>
                  {task.due && (
                    <span className="flex items-center gap-0.5 text-[10px] text-rachna-muted">
                      <Calendar size={9}/>{task.due}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default function TasksTab() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useWorkspace()
  const [addingTo, setAddingTo]   = useState(null)   // column id
  const [editingTask, setEditingTask] = useState(null)

  const byStatus = (status) => tasks.filter(t => t.status === status)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    moveTask(draggableId, destination.droppableId)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-rachna-border bg-white flex-shrink-0">
        <div>
          <h2 className="font-display font-bold text-rachna-dark text-base">Tasks</h2>
          <p className="text-xs text-rachna-muted mt-0.5">{tasks.length} total · {tasks.filter(t => t.status === 'done').length} done</p>
        </div>
        <button onClick={() => setAddingTo('todo')} className="btn-primary text-sm">
          <Plus size={15}/> Add Task
        </button>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full min-w-max">
            {COLS.map(col => {
              const colTasks = byStatus(col.id)
              return (
                <div key={col.id} className="w-64 flex flex-col flex-shrink-0">
                  {/* Column header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={clsx('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold', col.color)}>
                      <span className={clsx('w-1.5 h-1.5 rounded-full', col.accent)}/>
                      {col.label}
                    </div>
                    <span className="text-xs text-rachna-muted font-semibold">{colTasks.length}</span>
                  </div>

                  {/* Droppable area */}
                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={clsx(
                          'flex-1 rounded-2xl p-2 transition-colors duration-200 overflow-y-auto',
                          snapshot.isDraggingOver ? 'bg-rachna-lavender/60 border-2 border-dashed border-rachna-violet' : 'bg-rachna-surface/50'
                        )}
                      >
                        {colTasks.map((task, idx) => (
                          <TaskCard key={task.id} task={task} index={idx} onClick={setEditingTask} />
                        ))}
                        {provided.placeholder}

                        <button
                          onClick={() => setAddingTo(col.id)}
                          className="w-full py-2 rounded-xl border-2 border-dashed border-rachna-border hover:border-rachna-violet hover:bg-white text-xs text-rachna-muted hover:text-rachna-indigo flex items-center justify-center gap-1 transition-all mt-1"
                        >
                          <Plus size={11}/> Add Task
                        </button>
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Add Task Modal */}
      {addingTo && (
        <AddTaskModal
          colId={addingTo}
          onClose={() => setAddingTo(null)}
          onAdd={addTask}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(id, updates) => updateTask(id, updates)}
          onDelete={deleteTask}
        />
      )}
    </div>
  )
}
