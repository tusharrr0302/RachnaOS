import { useState } from 'react';

export default function SimulationInputForm({ onSimulate, loading, loadingStep }) {
  const [title, setTitle] = useState('');
  const [hook, setHook] = useState('');
  const [scriptOutline, setScriptOutline] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [niche, setNiche] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !hook) return;
    onSimulate({ title, hook, scriptOutline, thumbnailFile, niche });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1 text-[#0E0E1A]">Video Title *</label>
        <input 
          type="text" required 
          value={title} onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 border border-gray-200 rounded-lg text-sm" 
          placeholder="e.g. I Spent 50 Hours Testing AI Tools..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-[#0E0E1A]">Hook (first 10 seconds script) *</label>
        <textarea 
          required rows={3}
          value={hook} onChange={(e) => setHook(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg text-sm" 
          placeholder="What exactly are you saying in the first 10 seconds?"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-[#0E0E1A]">Script Outline (Optional)</label>
        <textarea 
          rows={3}
          value={scriptOutline} onChange={(e) => setScriptOutline(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg text-sm" 
          placeholder="Main points or segments of the video..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#0E0E1A]">Thumbnail Image (Optional)</label>
          <input 
            type="file" accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#0E0E1A]">Niche / Category (Optional)</label>
          <input 
            type="text" 
            value={niche} onChange={(e) => setNiche(e.target.value)} 
            className="w-full p-2 border border-gray-200 rounded-lg text-sm" 
            placeholder="e.g. Finance, Gaming, Tech..."
          />
        </div>
      </div>
      <button 
        type="submit" disabled={loading}
        className="w-full py-3 bg-[#4540C8] text-white rounded-xl font-bold text-sm disabled:opacity-50"
      >
        {loading ? loadingStep || "Running Simulation..." : "Run Multi-Agent Focus Group"}
      </button>
    </form>
  );
}
