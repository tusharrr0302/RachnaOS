import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { ACADEMY_DATA } from '../../data/academy-data'

export default function AcademyLessonPage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  
  const data = ACADEMY_DATA[moduleId] || ACADEMY_DATA['1']
  const [activeId, setActiveId] = useState(data.articles[0].id)
  
  // Ensure we scroll to top when changing articles
  useEffect(() => {
    const mainContent = document.getElementById('academy-main-content')
    if (mainContent) mainContent.scrollTop = 0
  }, [activeId])

  const currentArticle = data.articles.find(a => a.id === activeId) || data.articles[0]
  const currentIndex = data.articles.findIndex(a => a.id === activeId)
  
  const handleNext = () => {
    if (currentIndex < data.articles.length - 1) {
      setActiveId(data.articles[currentIndex + 1].id)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveId(data.articles[currentIndex - 1].id)
    }
  }

  const renderContent = (content) => {
    return content.split('\n\n').map((para, i) => {
      if (para.trim() === '---') {
        return <hr key={i} className="my-8 border-rachna-border" />
      }

      // Handle simple lists starting with * or ✓
      if (para.includes('\n* ') || para.includes('\n✓ ') || para.startsWith('* ') || para.startsWith('✓ ')) {
        const lines = para.split('\n')
        
        // If the paragraph starts with some normal text before the list, split it out
        const textLines = lines.filter(l => !l.trim().startsWith('*') && !l.trim().startsWith('✓'))
        const listLines = lines.filter(l => l.trim().startsWith('*') || l.trim().startsWith('✓'))

        return (
          <div key={i} className="mb-4">
            {textLines.length > 0 && <p className="text-rachna-dark leading-relaxed mb-3">{textLines.join(' ')}</p>}
            <ul className="list-none space-y-2 pl-2">
              {listLines.map((line, j) => {
                const isCheck = line.trim().startsWith('✓')
                const cleanLine = line.replace(/^[\*✓]\s*/, '')
                return (
                  <li key={j} className="flex items-start gap-2 text-rachna-dark leading-relaxed">
                    <span className="text-rachna-indigo font-bold mt-0.5">{isCheck ? '✓' : '•'}</span>
                    <span>{cleanLine}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }
      
      // Basic bold parsing: **text**
      const parts = para.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold text-rachna-dark">{part.slice(2, -2)}</strong>
        }
        return part
      })
      
      return <p key={i} className="text-rachna-dark leading-relaxed text-base mb-5">{parts}</p>
    })
  }

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
          {data.articles.map((article, i) => {
            const isActive = article.id === activeId
            // For demo, assume items before active are done
            const isDone = i < currentIndex
            
            return (
              <button 
                key={article.id} 
                onClick={() => setActiveId(article.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${isActive ? 'bg-rachna-lavender' : 'hover:bg-rachna-surface'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-rachna-success' : isActive ? 'bg-rachna-indigo' : 'bg-rachna-border'}`}>
                  {isDone ? <CheckCircle2 size={14} className="text-white" /> : <span className="text-white text-xs font-bold">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${isActive ? 'text-rachna-indigo' : isDone ? 'text-rachna-muted' : 'text-rachna-dark'}`}>{article.title}</p>
                  <p className="text-[10px] text-rachna-muted">{article.readTime}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main */}
      <div id="academy-main-content" className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto pb-12">
          <div className="mb-8">
            <span className="text-xs font-bold text-rachna-indigo bg-rachna-lavender px-2.5 py-1 rounded-full mb-3 inline-block">
              Article {currentIndex + 1} of {data.articles.length}
            </span>
            <h1 className="font-display font-bold text-rachna-dark text-3xl leading-tight">{currentArticle.title}</h1>
          </div>
          
          <div className="prose max-w-none bg-white p-8 rounded-3xl border border-rachna-border shadow-sm">
            {renderContent(currentArticle.content)}
          </div>
          
          <div className="flex justify-between items-center gap-3 mt-8">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-ghost flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === data.articles.length - 1}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark Complete & Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
