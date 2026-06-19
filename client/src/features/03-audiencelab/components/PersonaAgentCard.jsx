import FreelancerRecommendation from "../../13-analytics-hub/components/FreelancerRecommendation";

const TIER_COLORS = {
  "Tier-1": { bg: "#EEF2FF", text: "#3730A3" },
  "Tier-2": { bg: "#FFF7ED", text: "#9A3412" },
  "Tier-3": { bg: "#FEF2F2", text: "#991B1B" },
  "Cross-tier": { bg: "#F0FDF4", text: "#166534" },
};
const ACTION_LABELS = {
  click_and_watch_full: { label: "Clicked & watched", color: "#10B981" },
  click_then_drop_early: { label: "Clicked, dropped early", color: "#F59E0B" },
  click_then_skip_to_end: { label: "Clicked, skipped ahead", color: "#F59E0B" },
  scroll_past: { label: "Scrolled past", color: "#EF4444" },
  share_with_friend: { label: "Would share", color: "#10B981" },
};

export default function PersonaAgentCard({ persona }) {
  const tierColor = TIER_COLORS[persona.tier] || TIER_COLORS["Cross-tier"];
  const action = ACTION_LABELS[persona.predictedAction] || { label: persona.predictedAction, color: "#6B6B80" };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-[#0E0E1A] text-sm">{persona.label}</p>
          <p className="text-xs text-gray-400">{persona.language}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: tierColor.bg, color: tierColor.text }}>
          {persona.tier}
        </span>
      </div>
      <p className="text-sm text-gray-600 italic mb-3">"{persona.reaction}"</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold" style={{ color: action.color }}>● {action.label}</span>
        <span className="text-xs text-gray-400">Sentiment: {persona.sentimentScore}/100</span>
      </div>

      {persona.languageOrCulturalNote && (
        <div className="mb-3 bg-[#F8F7FF] rounded-lg p-2 text-xs text-[#4540C8]">🗣️ {persona.languageOrCulturalNote}</div>
      )}

      {persona.suggestion && (
        <div className="mt-auto pt-3 border-t border-gray-50">
          <p className="text-[11px] font-bold text-[#4540C8] uppercase tracking-wide mb-1">Suggestion for Next Time</p>
          <p className="text-sm text-[#0E0E1A] leading-relaxed">{persona.suggestion}</p>
          {persona.recommendedSkills && persona.recommendedSkills.length > 0 && (
            <div className="mt-2">
              <FreelancerRecommendation skills={persona.recommendedSkills} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
