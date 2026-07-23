import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle2, Circle, MinusCircle } from "lucide-react";
import Loader from "../../components/common/Loader";
import { problemService } from "../../services/placeholderServices";

const difficultyBadge = {
  Easy: "badge-easy",
  Medium: "badge-medium",
  Hard: "badge-hard",
};

const statusIcon = {
  Solved: <CheckCircle2 className="h-4 w-4 text-teal-500" />,
  Attempted: <MinusCircle className="h-4 w-4 text-amber-500" />,
  Unsolved: <Circle className="h-4 w-4 text-ink-300" />,
};

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    problemService.list().then((res) => {
      setProblems(res.data.results);
      setLoading(false);
    });
  }, []);

  const filtered = problems.filter(
    (p) =>
      (difficulty === "All" || p.difficulty === difficulty) &&
      p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Practice Problems</h1>
        <p className="text-sm text-ink-400">Sharpen your skills, one problem at a time.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            className="input pl-9"
            placeholder="Search problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                difficulty === d
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-ink-500 border border-ink-100 hover:bg-ink-50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
              <tr>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Difficulty</th>
                <th className="px-5 py-3 font-medium">Tags</th>
                <th className="px-5 py-3 font-medium">Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                  <td className="px-5 py-3.5">{statusIcon[p.status]}</td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/student/problems/${p.id}`}
                      className="font-medium text-ink-800 hover:text-indigo-600"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={difficultyBadge[p.difficulty]}>{p.difficulty}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="badge bg-ink-50 text-ink-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-500">{p.acceptance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Problems;
