import clsx from 'clsx'

const TABS = [
  { id: 'canvas',   label: 'Canvas'   },
  { id: 'tasks',    label: 'Tasks'    },
  { id: 'script',   label: 'Script'   },
  { id: 'assets',   label: 'Assets'   },
  { id: 'notes',    label: 'Notes'    },
  { id: 'activity', label: 'Activity' },
]

export default function ProjectTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white border-b border-rachna-border px-6 flex-shrink-0">
      <div className="flex gap-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-150 flex items-center gap-1.5',
              activeTab === tab.id
                ? 'border-rachna-indigo text-rachna-indigo font-semibold'
                : 'border-transparent text-rachna-muted hover:text-rachna-dark'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
