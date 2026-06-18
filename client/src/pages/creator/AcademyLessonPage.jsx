import { useParams, useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft, CheckCircle2, Lock, ChevronLeft, ChevronRight } from 'lucide-react'

const LESSON_DATA = {
  '1': {
    title: 'Thumbnail Psychology Masterclass',
    articles: [
      { id: 'l1', title: 'Why thumbnails are 80% of your video success', done: true, readTime: '5 min read' },
      { id: 'l2', title: 'Color psychology: What colors make people click', done: true, readTime: '8 min read' },
      { id: 'l3', title: 'Face expressions and eye contact', done: true, readTime: '7 min read' },
      { id: 'l4', title: 'Text hierarchy and readability on mobile', done: false, readTime: '10 min read', active: true },
      { id: 'l5', title: 'The viral thumbnail formula', done: false, readTime: '15 min read' },
    ],
    currentArticle: { title: 'Text hierarchy and readability on mobile', content: 'In this lesson, we cover the most important yet overlooked aspect of thumbnail design — making your text readable on a 5-inch phone screen...' }
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
          {data.articles.map((article, i) => (
            <button key={article.id} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${article.active ? 'bg-rachna-lavender' : 'hover:bg-rachna-surface'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${article.done ? 'bg-rachna-success' : article.active ? 'bg-rachna-indigo' : 'bg-rachna-border'}`}>
                {article.done ? <CheckCircle2 size={14} className="text-white" /> : <span className="text-white text-xs font-bold">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${article.active ? 'text-rachna-indigo' : article.done ? 'text-rachna-muted' : 'text-rachna-dark'}`}>{article.title}</p>
                <p className="text-[10px] text-rachna-muted">{article.readTime}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-rachna-dark text-xl mb-8">{data.currentArticle.title}</h1>
          <div className="prose max-w-none">
            <p className="text-rachna-dark leading-relaxed text-base">{data.currentArticle.content}</p>
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
