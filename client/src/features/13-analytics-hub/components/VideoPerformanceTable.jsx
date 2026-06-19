import { useState } from "react";

export default function VideoPerformanceTable({ videos, onSelectVideo }) {
  const [sortKey, setSortKey] = useState("views");
  const sorted = [...videos].sort((a, b) => b[sortKey] - a[sortKey]);

  const columns = [
    { key: "views", label: "Views" },
    { key: "likes", label: "Likes" },
    { key: "comments", label: "Comments" },
    { key: "likeRatio", label: "Like %" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#F8F7FF] text-left">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-600">Video</th>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-semibold text-gray-600 cursor-pointer hover:text-[#4540C8]" onClick={() => setSortKey(c.key)}>
                {c.label} {sortKey === c.key && "↓"}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-gray-600">Published</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((v) => (
            <tr key={v.videoId} className="border-t border-gray-50 hover:bg-[#F8F7FF] cursor-pointer" onClick={() => onSelectVideo(v)}>
              <td className="px-4 py-3 flex items-center gap-3">
                <img src={v.thumbnail} alt={v.title} className="w-16 h-9 rounded object-cover" />
                <span className="line-clamp-1 max-w-xs">{v.title}</span>
              </td>
              <td className="px-4 py-3">{v.views.toLocaleString()}</td>
              <td className="px-4 py-3">{v.likes.toLocaleString()}</td>
              <td className="px-4 py-3">{v.comments.toLocaleString()}</td>
              <td className="px-4 py-3">{v.likeRatio}%</td>
              <td className="px-4 py-3 text-gray-400">{new Date(v.publishedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
