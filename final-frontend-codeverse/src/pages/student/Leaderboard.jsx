import React, { useEffect, useState } from "react";
import { Search, Crown } from "lucide-react";
import Loader from "../../components/common/Loader";
import { leaderboardService } from "../../services/placeholderServices";

const podiumHeights = ["h-28", "h-36", "h-24"];
const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    leaderboardService.list().then((res) => setResults(res.data.results));
  }, []);

  if (!results.length) return <Loader />;

  const top3 = results.slice(0, 3);
  const rest = results.slice(3);
  const filteredRest = rest.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold">Leaderboard</h1>
        <p className="text-sm text-ink-400">Top performers across CodeVerse AI.</p>
      </div>

      <div className="card flex items-end justify-center gap-6 bg-gradient-to-b from-indigo-50 to-white p-8">
        {podiumOrder.map((idx, i) => {
          const student = top3[idx];
          if (!student) return null;
          return (
            <div key={student.rank} className="flex flex-col items-center">
              {idx === 0 && <Crown className="mb-1 h-6 w-6 text-amber-400" />}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {student.name[0]}
              </div>
              <p className="mt-2 text-sm font-semibold text-ink-800">{student.name}</p>
              <p className="text-xs text-ink-400">{student.college}</p>
              <div
                className={`mt-3 w-24 rounded-t-xl bg-indigo-${idx === 0 ? "600" : "300"} ${podiumHeights[i]} flex items-start justify-center pt-2`}
                style={{ backgroundColor: idx === 0 ? "#6c56f9" : "#cac4ff" }}
              >
                <span className="text-lg font-bold text-white">#{student.rank}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input
          className="input pl-9"
          placeholder="Search students..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-3 font-medium">Rank</th>
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">College</th>
              <th className="px-5 py-3 font-medium">Solved</th>
              <th className="px-5 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredRest.map((s) => (
              <tr key={s.rank} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                <td className="px-5 py-3.5 font-semibold text-ink-500">#{s.rank}</td>
                <td className="px-5 py-3.5 font-medium text-ink-800">{s.name}</td>
                <td className="px-5 py-3.5 text-ink-500">{s.college}</td>
                <td className="px-5 py-3.5 text-ink-500">{s.solved}</td>
                <td className="px-5 py-3.5 font-semibold text-indigo-600">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
