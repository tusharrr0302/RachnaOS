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
    <div className="mt-3 bg-white rounded-lg border border-[#4540C8]/20 shadow-sm overflow-hidden">
      <div className="bg-[#4540C8]/5 px-3 py-2 border-b border-[#4540C8]/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#4540C8]" />
          <span className="text-[10px] font-bold text-[#4540C8] uppercase tracking-wide">Marketplace Match</span>
        </div>
        <span className="text-[10px] text-[#4540C8]/70 hidden sm:inline">Hire a Pro to execute this</span>
      </div>

      <div className="flex items-center gap-3 p-3 transition-colors hover:bg-gray-50 group cursor-pointer">
        {f.avatar ? (
          <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4540C8] to-[#9B7FD8] flex items-center justify-center flex-shrink-0 text-white font-bold shadow-sm">
            {f.name[0]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[#0E0E1A] text-sm truncate">{f.name}</h4>
          <p className="text-[11px] text-gray-500 truncate mt-0.5">{f.role_title}</p>
        </div>

        <Link to={`/marketplace/profile/${f.username}`} className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F8F7FF] text-[#4540C8] group-hover:bg-[#4540C8] group-hover:text-white transition-colors border border-[#4540C8]/20 group-hover:border-transparent">
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
