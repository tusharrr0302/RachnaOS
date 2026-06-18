import { Check } from 'lucide-react'
import clsx from 'clsx'
import { useWorkspace } from '../../hooks/useWorkspace.jsx'

export default function ProductionPipeline() {
  const { pipeline, advancePipeline } = useWorkspace()

  return (
    <div className="flex items-center gap-0 px-6 py-3 border-b border-rachna-border bg-white overflow-x-auto scrollbar-hide flex-shrink-0">
      {pipeline.map((step, i) => {
        const isDone   = step.status === 'done'
        const isNext   = !isDone && (i === 0 || pipeline[i - 1]?.status === 'done')
        const isLast   = i === pipeline.length - 1

        return (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <button
              onClick={() => isNext && advancePipeline(step.id)}
              title={isNext ? `Mark "${step.label}" as done` : isDone ? 'Completed' : 'Complete previous steps first'}
              className={clsx(
                'flex items-center gap-2 group transition-all duration-200 rounded-lg px-1 py-0.5',
                isNext && 'hover:bg-rachna-lavender cursor-pointer',
                !isNext && !isDone && 'cursor-default'
              )}
            >
              {/* Circle */}
              <div className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all duration-300',
                isDone
                  ? 'bg-rachna-indigo border-rachna-indigo text-white'
                  : isNext
                    ? 'bg-white border-rachna-indigo text-rachna-indigo group-hover:bg-rachna-indigo group-hover:text-white'
                    : 'bg-white border-rachna-border text-rachna-muted'
              )}>
                {isDone ? <Check size={12} className="stroke-[3]" /> : <span className="text-[10px]">{step.id}</span>}
              </div>

              {/* Label */}
              <span className={clsx(
                'text-xs font-medium whitespace-nowrap transition-colors',
                isDone ? 'text-rachna-indigo' : isNext ? 'text-rachna-indigo font-semibold' : 'text-rachna-muted'
              )}>
                {step.label}
              </span>
            </button>

            {/* Connector */}
            {!isLast && (
              <div className={clsx(
                'w-8 h-px mx-2 flex-shrink-0 transition-colors duration-300',
                isDone ? 'bg-rachna-indigo' : 'bg-rachna-border'
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}
