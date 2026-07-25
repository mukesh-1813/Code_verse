import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, FileText, Clock3, Plus, Trophy, BarChart3 } from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import Loader from "../../components/common/Loader";
import { analyticsService } from "../../services/placeholderServices";

const quickActions = [
  { to: "/faculty/problems/new", label: "Add Problem", icon: Plus },
  { to: "/faculty/contests", label: "Create Contest", icon: Trophy },
  { to: "/faculty/courses", label: "View Analytics", icon: BarChart3 },
];

const recentSubmissions = [
  { student: "Rohit Verma", problem: "Two Sum", status: "Accepted", time: "5m ago" },
  { student: "Sara Khan", problem: "Course Schedule", status: "Wrong Answer", time: "22m ago" },
  { student: "Aditya Singh", problem: "Valid Parentheses", status: "Accepted", time: "1h ago" },
];

const FacultyDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    analyticsService.faculty().then((res) => setStats(res.data));
  }, []);

  if (!stats) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold">Faculty Dashboard</h1>
        <p className="text-sm text-ink-400">Manage your courses, problems, and student progress.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} tone="indigo" />
        <StatCard icon={BookOpen} label="Active Courses" value={stats.activeCourses} tone="teal" />
        <StatCard icon={FileText} label="Assignments" value={stats.assignments} tone="amber" />
        <StatCard icon={Clock3} label="Pending Reviews" value={stats.pendingReviews} tone="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Latest Submissions</h2>
          <div className="divide-y divide-ink-50">
            {recentSubmissions.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-ink-800">{s.student}</p>
                  <p className="text-xs text-ink-400">{s.problem}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`badge ${
                      s.status === "Accepted" ? "bg-teal-50 text-teal-700" : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {s.status}
                  </span>
                  <p className="mt-1 text-xs text-ink-300">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-base font-semibold">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-xl border border-ink-100 px-4 py-3 text-sm font-medium text-ink-600 hover:bg-ink-50"
              >
                <Icon className="h-4 w-4 text-indigo-600" /> {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
