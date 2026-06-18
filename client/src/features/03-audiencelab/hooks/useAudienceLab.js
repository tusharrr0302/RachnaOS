// client/src/features/03-audiencelab/hooks/useAudienceLab.js

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export function useAudienceLab() {
  const [loading, setLoading]           = useState(false)
  const [loadingStep, setLoadingStep]   = useState('')
  const [channelData, setChannelData]   = useState(null)
  const [analysis, setAnalysis]         = useState(null)
  const [momentumReport, setMomentumReport] = useState(null)

  const analyzeChannel = async (youtubeUrl) => {
    setLoading(true)
    setChannelData(null)
    setAnalysis(null)
    setMomentumReport(null)

    try {
      setLoadingStep('Fetching channel data from YouTube...')
      const res = await axios.post(`${API_BASE}/audiencelab/analyze`, { youtubeUrl })
      setChannelData(res.data.channelData)
      setAnalysis(res.data.analysis)

      setLoadingStep('Running MomentumOS comparison engine...')
      const momentumRes = await axios.post(`${API_BASE}/audiencelab/momentum`, {
        channelData: res.data.channelData,
      })
      setMomentumReport(momentumRes.data.momentumReport)

      toast.success('Analysis complete! 🎉')
    } catch (err) {
      const msg = err.response?.data?.error || 'Analysis failed. Please try again.'
      toast.error(msg)
      console.error('[useAudienceLab]', err)
    } finally {
      setLoading(false)
      setLoadingStep('')
    }
  }

  return { loading, loadingStep, channelData, analysis, momentumReport, analyzeChannel }
}
