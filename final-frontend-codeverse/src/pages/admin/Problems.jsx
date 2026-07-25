import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import { problemService } from "../../services/placeholderServices";

const difficultyBadge = {
  Easy: "badge-easy",
  Medium: "badge-medium",
  Hard: "badge-hard",
};

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    problemService.list().then((res) => setProblems(res.data.results));
  }, []);

  if (!problems.length) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Manage Problems</h1>
        <p className="text-sm text-ink-400">All coding problems across the platform.</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Difficulty</th>
              <th className="px-5 py-3 font-medium">Acceptance</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p) => (
              <tr key={p.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                <td className="px-5 py-3.5 font-medium text-ink-800">{p.title}</td>
                <td className="px-5 py-3.5">
                  <span className={difficultyBadge[p.difficulty]}>{p.difficulty}</span>
                </td>
                <td className="px-5 py-3.5 text-ink-500">{p.acceptance}%</td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-indigo-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProblems;
