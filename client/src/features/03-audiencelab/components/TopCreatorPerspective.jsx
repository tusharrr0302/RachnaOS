import { Target } from "lucide-react";

export default function TopCreatorPerspective({ perspective }) {
  if (!perspective) return null;

  return (
    <div className="bg-gradient-to-br from-[#4540C8] to-[#9B7FD8] rounded-2xl p-6 border border-[#4540C8]/20 shadow-md text-white mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Target size={20} className="text-yellow-300" />
        <h2 className="text-lg font-bold uppercase tracking-wide">
          What Would {perspective.creatorName} Do?
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-white/95">
        {perspective.whatTheyWouldDo}
      </p>
    </div>
  );
}
