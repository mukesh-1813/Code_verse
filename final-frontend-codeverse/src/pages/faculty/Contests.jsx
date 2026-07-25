import React from "react";
import { Plus, Trophy, Calendar } from "lucide-react";

const contests = [
  { id: 1, title: "Weekly Contest 42", status: "Live", participants: 214, date: "Jul 23, 2026" },
  { id: 2, title: "Campus Coding Sprint", status: "Scheduled", participants: 0, date: "Jul 24, 2026" },
  { id: 3, title: "Weekly Contest 41", status: "Ended", participants: 812, date: "Jul 16, 2026" },
];

const statusColor = {
  Live: "bg-rose-50 text-rose-600",
  Scheduled: "bg-amber-50 text-amber-600",
  Ended: "bg-ink-100 text-ink-500",
};

const FacultyContests = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Contest Management</h1>
        <p className="text-sm text-ink-400">Create and schedule coding contests.</p>
      </div>
      <button className="btn-primary">
        <Plus className="h-4 w-4" /> New Contest
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {contests.map((c) => (
        <div key={c.id} className="card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Trophy className="h-5 w-5" />
            </div>
            <span className={`badge ${statusColor[c.status]}`}>{c.status}</span>
          </div>
          <h3 className="mt-3 font-semibold text-ink-800">{c.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
            <Calendar className="h-3.5 w-3.5" /> {c.date}
          </p>
          <p className="mt-1 text-xs text-ink-400">{c.participants} participants</p>
          <button className="btn-secondary mt-4 w-full justify-center">View Leaderboard</button>
        </div>
      ))}
    </div>
  </div>
);

export default FacultyContests;
