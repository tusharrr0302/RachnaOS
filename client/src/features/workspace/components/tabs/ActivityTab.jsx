import { useWorkspace } from '../../hooks/useWorkspace.jsx'

export default function ActivityTab() {
  const { activity } = useWorkspace()

  return (
    <div className="p-6 max-w-2xl overflow-y-auto h-full">
      <h2 className="font-display font-bold text-rachna-dark text-base mb-5">
        Activity Log
        <span className="ml-2 text-xs font-normal text-rachna-muted">({activity.length} events)</span>
      </h2>
      <div className="relative">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-rachna-border"/>
        <div className="space-y-4">
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-4 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 border-2 border-white shadow-sm ${item.color}`}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-rachna-dark leading-snug">
                  <span className="font-semibold">{item.user}</span>{' '}
                  <span className="text-rachna-muted">{item.action}</span>
                </p>
                <p className="text-[11px] text-rachna-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
