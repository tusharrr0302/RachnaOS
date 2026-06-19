import { CheckCircle } from 'lucide-react';

export default function SuggestedImprovements({ improvements }) {
  if (!improvements || !improvements.length) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-semibold text-[#0E0E1A] mb-3">Actionable Improvements</h3>
      <ul className="space-y-3">
        {improvements.map((imp, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700">
            <CheckCircle className="text-[#10B981] shrink-0" size={18} />
            <span>{imp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
