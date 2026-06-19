import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function FreelancerRecommendation({ skills = [] }) {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!skills || skills.length === 0) return;

    const fetchFreelancers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/freelancer/search?skills=${skills.join(',')}`);
        setFreelancers(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch freelancers', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, [skills.join(',')]);

  if (loading) return (
    <div className="animate-pulse bg-[#F8F7FF] rounded-xl p-4 mt-3 flex gap-4 border border-[#4540C8]/10">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-2 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );

  if (freelancers.length === 0) return null;

  const f = freelancers[0]; // Show the top matched freelancer

  return (
    <div className="mt-4 bg-gradient-to-r from-[#4540C8]/5 to-[#9B7FD8]/5 border border-[#4540C8]/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[#4540C8]" />
        <span className="text-xs font-bold text-[#4540C8] uppercase tracking-wide">Marketplace Match</span>
        <span className="text-xs text-gray-500 hidden md:inline">— Hire a Pro to execute this</span>
      </div>

      <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
        {f.avatar ? (
          <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#4540C8]/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-[#4540C8]">
            {f.name[0]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#0E0E1A] truncate">{f.name}</h4>
          <p className="text-xs text-gray-500 truncate">{f.role_title}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-current" /> {f.stats?.avg_rating || '5.0'}</span>
            <span>{f.stats?.projects_completed || '10+'} projects</span>
          </div>
        </div>

        <Link to={`/marketplace/profile/${f.username}`} className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F8F7FF] text-[#4540C8] hover:bg-[#4540C8] hover:text-white transition-colors">
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
