import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export function useFocusGroupSimulation() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [personaResults, setPersonaResults] = useState(null);
  const [synthesis, setSynthesis] = useState(null);

  const runSimulation = async ({ title, hook, scriptOutline, thumbnailFile, niche }) => {
    setLoading(true);
    setPersonaResults(null);
    setSynthesis(null);
    try {
      let thumbnailBase64 = null;
      let thumbnailMimeType = null;
      if (thumbnailFile) {
        setLoadingStep("Reading thumbnail...");
        thumbnailBase64 = await fileToBase64(thumbnailFile);
        thumbnailMimeType = thumbnailFile.type;
      }

      setLoadingStep("Dispatching to 6 persona agents...");
      const token = await getToken();
      const res = await axios.post(`${API_BASE}/api/audiencelab/simulate`, {
        title, hook, scriptOutline, thumbnailBase64, thumbnailMimeType, niche,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPersonaResults(res.data.personaResults);
      setSynthesis(res.data.synthesis);
      toast.success("Focus group simulation complete!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Simulation failed");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return { loading, loadingStep, personaResults, synthesis, runSimulation };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
