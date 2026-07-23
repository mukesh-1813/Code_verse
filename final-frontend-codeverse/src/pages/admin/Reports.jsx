import React from "react";
import { Download, FileBarChart } from "lucide-react";

const reports = [
  { id: 1, title: "Monthly Active Users Report", date: "Jul 2026" },
  { id: 2, title: "Course Completion Report", date: "Jun 2026" },
  { id: 3, title: "Contest Participation Report", date: "Jun 2026" },
];

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold">Reports</h1>
      <p className="text-sm text-ink-400">Download platform-wide reports.</p>
    </div>

    <div className="card divide-y divide-ink-50">
      {reports.map((r) => (
        <div key={r.id} className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileBarChart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-800">{r.title}</p>
              <p className="text-xs text-ink-400">{r.date}</p>
            </div>
          </div>
          <button className="btn-secondary">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Reports;
