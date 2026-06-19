import PersonaAgentCard from "./PersonaAgentCard";

export default function FocusGroupGrid({ personaResults }) {
  return (
    <div>
      <h3 className="font-semibold text-[#0E0E1A] mb-1">Your virtual focus group</h3>
      <p className="text-sm text-gray-500 mb-4">6 AI personas reacted independently — here's what each one said</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {personaResults.map((p) => <PersonaAgentCard key={p.id} persona={p} />)}
      </div>
    </div>
  );
}
