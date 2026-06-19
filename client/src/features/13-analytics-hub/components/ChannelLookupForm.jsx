// client/src/features/03-audiencelab/components/ChannelInputForm.jsx

import { useState } from 'react'
import { Search, Link } from 'lucide-react'

export default function ChannelInputForm({ onAnalyze, loading }) {
  const [url, setUrl] = useState('')

  const examples = [
    'youtube.com/@MrBeast',
    'youtube.com/@TechBurner',
    'youtube.com/channel/UCxxxxxx',
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.png" alt="RachnaOS" className="h-10 w-auto" />
      </div>

      <h2 className="text-center text-2xl font-bold text-[#0E0E1A] mb-2">
        Analyze Any YouTube Channel
      </h2>
      <p className="text-center text-[#6B6B80] mb-8">
        Paste any YouTube channel URL — handle, /channel/, /c/ formats all work
      </p>

      <div className="flex gap-3 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <Link size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B80]" />
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://youtube.com/@channelname"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4540C8] focus:ring-2 focus:ring-[#4540C8]/20 text-sm"
            onKeyDown={e => e.key === 'Enter' && !loading && url && onAnalyze(url)}
            id="audiencelab-url-input"
          />
        </div>
        <button
          onClick={() => url && onAnalyze(url)}
          disabled={loading || !url}
          className="px-6 py-3.5 bg-[#4540C8] text-white rounded-xl font-semibold hover:bg-[#2E2A99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
          id="audiencelab-analyze-btn"
        >
          <Search size={16} />
          {loading ? 'Analyzing...' : 'Analyze Channel'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        <span className="text-xs text-[#6B6B80]">Try:</span>
        {examples.map(ex => (
          <button
            key={ex}
            onClick={() => { setUrl(`https://${ex}`); onAnalyze(`https://${ex}`) }}
            disabled={loading}
            className="text-xs text-[#4540C8] hover:underline disabled:opacity-50"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
