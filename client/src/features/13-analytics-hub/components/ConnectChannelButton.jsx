export default function ConnectChannelButton() {
  const handleConnect = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/api/analytics-hub/oauth/url`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clerk-db-jwt') || ''}`
        }
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Failed to get OAuth URL", err);
    }
  };

  return (
    <button onClick={handleConnect} className="px-4 py-2 bg-[#0E0E1A] text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
      Connect My Channel
    </button>
  );
}
