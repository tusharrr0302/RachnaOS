const { runFocusGroupSimulation } = require("./service");
const { supabase } = require("../../../lib/supabase");

exports.simulate = async (req, res) => {
  try {
    const { title, hook, scriptOutline, thumbnailBase64, thumbnailMimeType, niche } = req.body;
    if (!title || !hook) return res.status(400).json({ error: "Title and hook are required" });

    const result = await runFocusGroupSimulation({ title, hook, scriptOutline, thumbnailBase64, thumbnailMimeType, niche });

    // I will use req.user.id or whatever auth is used, waiting to verify auth logic. 
    // Usually req.auth.userId for clerk.
    const userId = req.auth?.userId || req.user?.id || 'anonymous';

    await supabase.from("focus_group_runs").insert({
      user_id: userId,
      title, hook, script_outline: scriptOutline, niche,
      persona_results: result.personaResults,
      synthesis: result.synthesis,
    });

    res.json({ success: true, ...result });
  } catch (err) {
    console.error("AudienceLab simulation error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  const userId = req.auth?.userId || req.user?.id || 'anonymous';
  const { data, error } = await supabase
    .from("focus_group_runs").select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }).limit(20);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, runs: data });
};
