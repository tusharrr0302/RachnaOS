import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export function useChannelAnalytics() {
  const [loading, setLoading] = useState(false);
  const [deepMetrics, setDeepMetrics] = useState(null);

  const fetchDeepMetrics = async (videoId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/analytics-hub/deep-metrics`, {
        params: { videoId }
        // auth headers handled implicitly or via interceptor
      });
      setDeepMetrics(res.data);
    } catch (err) {
      console.error("Failed to fetch deep metrics", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deepMetrics, fetchDeepMetrics };
}
