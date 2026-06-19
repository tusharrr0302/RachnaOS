import { useState, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../../auth/useAuth'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

export function useVideoAnalysis() {
  const { getAuthToken } = useAuth()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const analyzeVideo = useCallback(async (video, channelAverages) => {
    setLoading(true)
    setAnalysis(null)
    try {
      const token = await getAuthToken()
      const headers = { Authorization: `Bearer ${token}` }
      const res = await axios.post(`${API_BASE}/api/analytics-hub/analyze-video`, {
        video,
        channelAverages
      }, { headers })
      
      setAnalysis(res.data.analysis)
    } catch (err) {
      toast.error('Failed to run AI video deep dive.')
      console.error('[useVideoAnalysis]', err)
    } finally {
      setLoading(false)
    }
  }, [getAuthToken])

  return { loading, analysis, analyzeVideo, setAnalysis }
}
