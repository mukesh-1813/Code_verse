import React from "react";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import StatCard from "../../components/cards/StatCard";

const AdminDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-xl font-bold">Platform Overview</h1>
      <p className="text-sm text-ink-400">A bird's-eye view of CodeVerse AI.</p>
    </div>

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard icon={Users} label="Total Users" value="4,218" tone="indigo" trend="+8.2%" />
      <StatCard icon={GraduationCap} label="Active Students" value="3,640" tone="teal" trend="+5.1%" />
      <StatCard icon={BookOpen} label="Courses" value="86" tone="amber" />
      <StatCard icon={TrendingUp} label="Growth (MoM)" value="12.4%" tone="rose" />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="card p-6 lg:col-span-2">
        <h2 className="mb-4 text-base font-semibold">Platform Usage</h2>
        <div className="flex h-48 items-end gap-3">
          {[40, 55, 48, 70, 65, 82, 90].map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-teal-500 to-teal-300"
                style={{ height: `${v}%` }}
              />
              <span className="text-xs text-ink-400">W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="mb-4 text-base font-semibold">Role Breakdown</h2>
        <div className="space-y-3">
          {[
            { label: "Students", value: 86, color: "bg-indigo-500" },
            { label: "Faculty", value: 10, color: "bg-teal-500" },
            { label: "Admins", value: 4, color: "bg-amber-500" },
          ].map((r) => (
            <div key={r.label}>
              <div className="mb-1 flex justify-between text-xs text-ink-500">
                <span>{r.label}</span>
                <span>{r.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-ink-100">
                <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
