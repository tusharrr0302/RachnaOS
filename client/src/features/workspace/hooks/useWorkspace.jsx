/**
 * useWorkspace — lightweight in-memory store for a single project session.
 * In production, this would sync to Supabase via debounced API calls.
 */
import { createContext, useContext, useState, useCallback } from 'react'

const WorkspaceCtx = createContext(null)

const INITIAL_TASKS = [
  { id: 't1', title: 'Research Delhi locations',    status: 'done',        assignee: 'Muskan', due: '10 May', priority: 'high' },
  { id: 't2', title: 'Write first draft script',   status: 'done',        assignee: 'Akash',  due: '12 May', priority: 'high' },
  { id: 't3', title: 'Finalize shooting schedule', status: 'in_progress', assignee: 'Ankit',  due: '18 May', priority: 'high' },
  { id: 't4', title: 'Design thumbnail v1',        status: 'in_progress', assignee: 'Rohit',  due: '19 May', priority: 'medium' },
  { id: 't5', title: 'Rough cut editing',          status: 'in_progress', assignee: 'Aditya', due: '22 May', priority: 'medium' },
  { id: 't6', title: 'Color grading',              status: 'todo',        assignee: 'Aditya', due: '25 May', priority: 'low' },
  { id: 't7', title: 'Upload and schedule',        status: 'todo',        assignee: 'Ankit',  due: '28 May', priority: 'low' },
]

const INITIAL_NOTES = `## Shoot Day Notes

- Best time to shoot in Old Delhi: 7-9 AM (less crowd, golden light)
- Avoid Connaught Place on weekends — too touristy
- Chandni Chowk parathas → must film
- Jama Masjid shot — need to arrive by 8 AM for empty courtyard

## B-Roll Ideas

- Delhi Metro time-lapse
- Street food close-ups (jalebi, parathas, chai)
- Auto-rickshaw POV
- Red fort sunset shot`

const INITIAL_PIPELINE = [
  { id: 1, label: 'Idea & Research', status: 'done' },
  { id: 2, label: 'Script',          status: 'done' },
  { id: 3, label: 'Shoot',           status: 'pending' },
  { id: 4, label: 'Edit',            status: 'pending' },
  { id: 5, label: 'Thumbnail',       status: 'pending' },
  { id: 6, label: 'Upload',          status: 'pending' },
]

const INITIAL_ACTIVITY = [
  { id: 'a1', user: 'Ankit Verma',  avatar: 'A', action: 'updated the script',                  time: '2h ago',  color: 'bg-blue-100 text-blue-600' },
  { id: 'a2', user: 'Rohit Kumar',  avatar: 'R', action: 'uploaded thumbnail v2',                time: '5h ago',  color: 'bg-green-100 text-green-600' },
  { id: 'a3', user: 'Aditya Singh', avatar: 'D', action: 'moved "Rough Cut" to In Progress',     time: '1d ago',  color: 'bg-orange-100 text-orange-600' },
  { id: 'a4', user: 'Muskan Jain',  avatar: 'M', action: 'completed research checklist item',    time: '1d ago',  color: 'bg-purple-100 text-purple-600' },
  { id: 'a5', user: 'Akash Tiwari', avatar: 'K', action: 'marked Script as Done',                time: '2d ago',  color: 'bg-indigo-100 text-indigo-600' },
]

export function WorkspaceProvider({ projectId, children }) {
  const [title, setTitle]         = useState('24 Hours Surviving in Delhi')
  const [status, setStatus]       = useState('In Progress')
  const [brief, setBrief]         = useState('Explore the vibrant, chaotic and authentic side of Delhi in 24 hours with no plan.')
  const [tasks, setTasks]         = useState(INITIAL_TASKS)
  const [notes, setNotes]         = useState(INITIAL_NOTES)
  const [pipeline, setPipeline]   = useState(INITIAL_PIPELINE)
  const [activity, setActivity]   = useState(INITIAL_ACTIVITY)
  const [assets, setAssets]       = useState([])

  const addActivity = useCallback((user, action, color = 'bg-blue-100 text-blue-600') => {
    const newEntry = { id: `a${Date.now()}`, user, avatar: user[0], action, time: 'just now', color }
    setActivity(prev => [newEntry, ...prev])
  }, [])

  const addTask = useCallback((task) => {
    const newTask = { id: `t${Date.now()}`, ...task, status: 'todo' }
    setTasks(prev => [...prev, newTask])
    addActivity('Ankit Verma', `added task "${task.title}"`)
  }, [addActivity])

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id)
      if (task) addActivity('Ankit Verma', `deleted task "${task.title}"`)
      return prev.filter(t => t.id !== id)
    })
  }, [addActivity])

  const moveTask = useCallback((taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }, [])

  const advancePipeline = useCallback((stepId) => {
    setPipeline(prev => prev.map(s => s.id === stepId ? { ...s, status: 'done' } : s))
    addActivity('Ankit Verma', `completed pipeline step`)
  }, [addActivity])

  const addAsset = useCallback((file) => {
    const asset = { id: `asset${Date.now()}`, name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, url: URL.createObjectURL(file), type: file.type.startsWith('image') ? 'image' : 'doc', date: 'today' }
    setAssets(prev => [...prev, asset])
    addActivity('Ankit Verma', `uploaded "${file.name}"`)
  }, [addActivity])

  return (
    <WorkspaceCtx.Provider value={{
      projectId, title, setTitle, status, setStatus,
      brief, setBrief,
      tasks, addTask, updateTask, deleteTask, moveTask,
      notes, setNotes,
      pipeline, advancePipeline,
      activity, addActivity,
      assets, addAsset,
    }}>
      {children}
    </WorkspaceCtx.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceCtx)
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider')
  return ctx
}
