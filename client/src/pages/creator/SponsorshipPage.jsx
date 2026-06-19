import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  DollarSign, Briefcase, Clock, TrendingUp, Sparkles, Send,
  Shield, FileText, CheckCircle2, AlertTriangle, BarChart3,
  Star, UploadCloud, Plus, Bot, Building2, Calendar, MapPin, ChevronDown, IndianRupee, ArrowRight
} from 'lucide-react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

// --- Mock Data ---

const initialColumns = {
  opportunities: {
    id: 'opportunities',
    title: 'Opportunities',
    taskIds: ['deal-1', 'deal-2'],
  },
  negotiation: {
    id: 'negotiation',
    title: 'Negotiation',
    taskIds: ['deal-3'],
  },
  active: {
    id: 'active',
    title: 'Active Campaigns',
    taskIds: ['deal-4'],
  },
  payment: {
    id: 'payment',
    title: 'Awaiting Payment',
    taskIds: [],
  },
  completed: {
    id: 'completed',
    title: 'Completed',
    taskIds: ['deal-5'],
  },
}

const initialTasks = {
  'deal-1': { id: 'deal-1', brand: 'Notion', campaign: 'Q3 Back to School', value: '₹3,60,000', dueDate: 'Aug 15', logo: 'N' },
  'deal-2': { id: 'deal-2', brand: 'Skillshare', campaign: 'Productivity Course', value: '₹1,60,000', dueDate: 'Sep 01', logo: 'S' },
  'deal-3': { id: 'deal-3', brand: 'Framer', campaign: 'Design Tutorial', value: '₹2,56,000', dueDate: 'Jul 20', logo: 'F' },
  'deal-4': { id: 'deal-4', brand: 'Squarespace', campaign: 'Portfolio Revamp', value: '₹4,00,000', dueDate: 'Aug 05', logo: 'SQ' },
  'deal-5': { id: 'deal-5', brand: 'Canva', campaign: 'Template Design', value: '₹1,20,000', dueDate: 'Jun 10', logo: 'C' },
}

const BRANDS = [
  { name: 'Mamaearth', industry: 'Beauty & Skincare', trust: 98, payment: 'Excellent', satisfaction: 4.9 },
  { name: 'boAt', industry: 'Consumer Electronics', trust: 95, payment: 'Great', satisfaction: 4.8 },
  { name: 'Unacademy', industry: 'EdTech', trust: 92, payment: 'Good', satisfaction: 4.7 },
  { name: 'Groww', industry: 'Fintech', trust: 96, payment: 'Excellent', satisfaction: 4.9 },
]

export default function SponsorshipPage() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(initialTasks)
  const [columns, setColumns] = useState(initialColumns)
  const [columnOrder, setColumnOrder] = useState(['opportunities', 'negotiation', 'active', 'payment', 'completed'])

  const [aiState, setAiState] = useState('idle') // idle, thinking, complete
  const [aiForm, setAiForm] = useState({ platform: '', followers: '', engagement: '', niche: '', deliverable: '', offer: '' })

  const [contractUploaded, setContractUploaded] = useState(false)
  const [contractAnalyzing, setContractAnalyzing] = useState(false)

  // --- Handlers ---

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const newColumn = { ...start, taskIds: newTaskIds }
      setColumns({ ...columns, [newColumn.id]: newColumn })
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = { ...start, taskIds: startTaskIds }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = { ...finish, taskIds: finishTaskIds }

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    })
  }

  const handleAnalyzeDeal = () => {
    setAiState('thinking')
    setTimeout(() => {
      setAiState('complete')
    }, 2500)
  }

  const handleUploadContract = () => {
    setContractAnalyzing(true)
    setTimeout(() => {
      setContractAnalyzing(false)
      setContractUploaded(true)
    }, 3000)
  }

  return (
    <div className="p-8 pb-20 space-y-12">
      {/* --- HERO SECTION --- */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display font-bold text-rachna-dark text-3xl mb-2 flex items-center gap-3">
              <span className="text-3xl">💰</span> Sponsorship Hub
            </h1>
            <p className="text-rachna-muted text-sm font-medium">Manage, evaluate, and grow your brand partnerships.</p>
          </div>
          <button className="flex items-center gap-2 bg-rachna-indigo text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-glow hover:bg-indigo-700 transition-all">
            <Plus size={16} /> New Opportunity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Sponsorship Revenue" value="₹36,16,000" icon={<IndianRupee size={18} />} trend="+12%" />
          <StatCard title="Active Deals" value="4" icon={<Briefcase size={18} />} trend="Stable" />
          <StatCard title="Pending Payments" value="₹6,80,000" icon={<Clock size={18} />} trend="2 Due Soon" />
          <StatCard title="Average Deal Value" value="₹2,60,000" icon={<TrendingUp size={18} />} trend="+5%" />
        </div>
      </section>

      {/* --- MAIN WORKSPACE --- */}
      <section className="flex flex-col lg:flex-row gap-6">
        {/* Left: Kanban Board (70%) */}
        <div className="flex-1 bg-white/50 backdrop-blur-xl border border-rachna-border rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-rachna-dark text-lg flex items-center gap-2">
              <Briefcase size={18} className="text-rachna-indigo" /> Sponsorship Pipeline
            </h2>
          </div>
          
          <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-4 h-full min-h-[400px]">
                {columnOrder.map((columnId) => {
                  const column = columns[columnId]
                  const colTasks = column.taskIds.map((taskId) => tasks[taskId])
                  return <KanbanColumn key={column.id} column={column} tasks={colTasks} />
                })}
              </div>
            </DragDropContext>
          </div>
        </div>

        {/* Right: AI Deal Assistant (30%) */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-gradient-to-b from-white to-rachna-lavender/30 border border-rachna-border rounded-3xl p-6 shadow-card flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rachna-indigo/5 rounded-full blur-3xl" />
          
          <h2 className="font-display font-bold text-rachna-dark text-lg flex items-center gap-2 mb-1">
            <Bot size={20} className="text-rachna-indigo" /> FairRate AI
          </h2>
          <p className="text-xs text-rachna-muted mb-6">Never undercharge again. Discover exactly what brands are paying creators with your audience size.</p>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-8 bg-white/60 rounded-2xl border border-rachna-border border-dashed mb-6">
             <div className="w-12 h-12 bg-rachna-lavender rounded-xl flex items-center justify-center text-rachna-indigo mb-3 shadow-sm">
                <BarChart3 size={24} />
             </div>
             <p className="text-sm font-bold text-rachna-dark mb-1">Market Data</p>
             <p className="text-xs text-rachna-muted">Get real-time rates based on 10,000+ verified sponsorships.</p>
          </div>

          <button 
            onClick={() => navigate('/creator/fair-rate')}
            className="w-full mt-auto flex items-center justify-center gap-2 bg-rachna-dark text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-black transition-all group"
          >
             Open FairRate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* --- BRAND INTELLIGENCE --- */}
      <section>
        <h2 className="font-display font-bold text-rachna-dark text-xl mb-6 flex items-center gap-2">
          <Building2 size={20} className="text-rachna-indigo" /> Brand Intelligence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map(brand => (
            <div key={brand.name} className="bg-white border border-rachna-border rounded-2xl p-5 hover:shadow-card transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rachna-surface border border-rachna-border flex items-center justify-center font-bold text-lg text-rachna-dark group-hover:bg-rachna-lavender transition-colors">
                    {brand.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-rachna-dark">{brand.name}</h3>
                    <p className="text-[10px] text-rachna-muted uppercase tracking-wider">{brand.industry}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-rachna-muted">Trust Score</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><Shield size={10} /> {brand.trust}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-rachna-muted">Payment</span>
                  <span className="text-xs font-semibold text-rachna-dark">{brand.payment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-rachna-muted">Satisfaction</span>
                  <span className="text-xs font-bold text-rachna-dark flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" /> {brand.satisfaction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOTTOM ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Contract Review */}
        <div className="bg-white border border-rachna-border rounded-3xl p-6 shadow-sm flex flex-col">
          <h2 className="font-display font-bold text-rachna-dark text-lg mb-1 flex items-center gap-2">
            <Shield size={20} className="text-rachna-indigo" /> CreatorShield
          </h2>
          <p className="text-sm text-rachna-muted mb-6">Protect yourself with AI contract analysis.</p>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-rachna-surface rounded-2xl mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <Shield size={32} className="text-rachna-indigo" />
            </div>
            <p className="text-sm font-semibold text-rachna-dark mb-2">Instantly detect red flags</p>
            <p className="text-xs text-rachna-muted max-w-[200px] mx-auto">Upload any agreement to find hidden clauses and get negotiation tips.</p>
          </div>

          <button onClick={() => navigate('/creator/shield')} className="w-full border-2 border-rachna-indigo text-rachna-indigo rounded-xl py-3 flex items-center justify-center gap-2 font-semibold hover:bg-rachna-lavender transition-all group mt-auto">
             Analyze Contract <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Payment Tracker */}
        <div className="bg-white border border-rachna-border rounded-3xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-rachna-dark text-lg mb-6 flex items-center gap-2">
            <Clock size={20} className="text-rachna-indigo" /> Payment Tracker
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rachna-border before:via-rachna-border before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rachna-indigo text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-rachna-border shadow-sm group-hover:border-rachna-indigo transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rachna-indigo bg-rachna-lavender px-2 py-0.5 rounded-md">Paid</span>
                  <span className="text-xs font-medium text-rachna-muted">Today</span>
                </div>
                <h3 className="font-bold text-sm text-rachna-dark">Stripe</h3>
                <p className="text-xs text-rachna-muted mb-2">Q2 Product Launch</p>
                <p className="font-bold text-rachna-dark">₹3,60,000</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Clock size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-rachna-border shadow-sm group-hover:border-amber-400 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending</span>
                  <span className="text-xs font-medium text-rachna-muted">Aug 15</span>
                </div>
                <h3 className="font-bold text-sm text-rachna-dark">Notion</h3>
                <p className="text-xs text-rachna-muted mb-2">Back to School Promo</p>
                <p className="font-bold text-rachna-dark">₹2,56,000</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// --- Subcomponents ---

function StatCard({ title, value, icon, trend }) {
  const isPositive = trend.includes('+')
  return (
    <div className="bg-white border border-rachna-border rounded-2xl p-5 shadow-sm hover:shadow-card transition-shadow relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-rachna-lavender rounded-full opacity-50 group-hover:scale-110 transition-transform" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-rachna-surface flex items-center justify-center text-rachna-indigo">
          {icon}
        </div>
        <span className={clsx("text-xs font-bold px-2 py-1 rounded-md", isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rachna-surface text-rachna-muted")}>
          {trend}
        </span>
      </div>
      <p className="text-sm font-medium text-rachna-muted mb-1 relative z-10">{title}</p>
      <h3 className="font-display font-bold text-2xl text-rachna-dark relative z-10">{value}</h3>
    </div>
  )
}

function KanbanColumn({ column, tasks }) {
  return (
    <div className="w-72 flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold text-rachna-dark uppercase tracking-wider">{column.title}</h3>
        <span className="text-xs font-medium bg-white text-rachna-muted w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
          {tasks.length}
        </span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              "flex-1 bg-rachna-surface/50 rounded-2xl p-2 transition-colors border border-dashed",
              snapshot.isDraggingOver ? "border-rachna-indigo bg-rachna-lavender/20" : "border-transparent"
            )}
          >
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

function KanbanCard({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "bg-white border border-rachna-border rounded-xl p-4 mb-3 shadow-sm transition-all group",
            snapshot.isDragging ? "shadow-glow rotate-2 border-rachna-indigo" : "hover:border-rachna-indigo hover:shadow-card"
          )}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-rachna-surface flex items-center justify-center text-xs font-bold text-rachna-dark">
                {task.logo}
              </div>
              <span className="text-xs font-bold text-rachna-dark">{task.brand}</span>
            </div>
            <span className="text-[10px] font-semibold text-rachna-muted bg-rachna-surface px-2 py-0.5 rounded">{task.dueDate}</span>
          </div>
          <p className="text-xs font-medium text-rachna-dark mb-3 line-clamp-1">{task.campaign}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-bold text-rachna-indigo">{task.value}</span>
            <button className="text-rachna-muted hover:text-rachna-indigo opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

function Accordion({ title, children, alert }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-rachna-border rounded-xl overflow-hidden bg-white transition-all">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-rachna-surface transition-colors"
      >
        <span className="text-sm font-semibold flex items-center gap-2 text-rachna-dark">
          {alert && <AlertTriangle size={14} className="text-amber-500" />} {title}
        </span>
        <ChevronDown size={16} className={clsx("text-rachna-muted transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-3 pt-0 text-xs text-rachna-muted leading-relaxed border-t border-rachna-border">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
