import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, CheckCircle2, Lock, ChevronLeft, ChevronRight } from 'lucide-react'

const LESSON_DATA = {
  '1': {
    title: 'Thumbnail Psychology Masterclass',
    lessons: [
      { id: 'l1', title: 'Why thumbnails are 80% of your video success', done: true, duration: '12:34' },
      { id: 'l2', title: 'Color psychology: What colors make people click', done: true, duration: '18:22' },
      { id: 'l3', title: 'Face expressions and eye contact', done: true, duration: '15:47' },
      { id: 'l4', title: 'Text hierarchy and readability on mobile', done: false, duration: '22:10', active: true },
      { id: 'l5', title: 'The viral thumbnail formula', done: false, duration: '28:05' },
    ],
    currentLesson: { title: 'Text hierarchy and readability on mobile', content: 'In this lesson, we cover the most important yet overlooked aspect of thumbnail design — making your text readable on a 5-inch phone screen...' }
  }
}

export default function AcademyLessonPage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const data = LESSON_DATA[moduleId] || LESSON_DATA['1']

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-rachna-border overflow-y-auto">
        <div className="p-4 border-b border-rachna-border">
          <button onClick={() => navigate('/creator/academy')} className="flex items-center gap-1.5 text-xs text-rachna-muted hover:text-rachna-dark mb-3">
            <ArrowLeft size={13} /> Back to Academy
          </button>
          <h2 className="font-display font-bold text-rachna-dark text-sm leading-tight">{data.title}</h2>
        </div>
        <div className="p-3 space-y-1">
          {data.lessons.map((lesson, i) => (
            <button key={lesson.id} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${lesson.active ? 'bg-rachna-lavender' : 'hover:bg-rachna-surface'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.done ? 'bg-rachna-success' : lesson.active ? 'bg-rachna-indigo' : 'bg-rachna-border'}`}>
                {lesson.done ? <CheckCircle2 size={14} className="text-white" /> : <span className="text-white text-xs font-bold">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${lesson.active ? 'text-rachna-indigo' : lesson.done ? 'text-rachna-muted' : 'text-rachna-dark'}`}>{lesson.title}</p>
                <p className="text-[10px] text-rachna-muted">{lesson.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-rachna-dark text-xl mb-6">{data.currentLesson.title}</h1>
          <div className="aspect-video bg-rachna-dark rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 mx-auto hover:bg-white/20 cursor-pointer transition-colors">
                <Play size={28} className="text-white" />
              </div>
              <p className="text-white/50 text-sm">Click to play lesson</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="text-rachna-dark leading-relaxed text-base">{data.currentLesson.content}</p>
            <p className="text-rachna-muted leading-relaxed">When you're designing thumbnails for mobile viewers, remember that your average viewer is seeing your thumbnail at roughly 100×56 pixels. That means any text smaller than 40pt in your design tool will become completely unreadable on screen...</p>
          </div>
          <div className="flex gap-3 mt-8">
            <button className="btn-ghost flex items-center gap-2"><ChevronLeft size={16} /> Previous</button>
            <button className="btn-primary ml-auto flex items-center gap-2">Mark Complete & Next <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
