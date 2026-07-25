import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Flame, Target, Trophy, ArrowRight, Sparkles } from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../contexts/AuthContext";
import { analyticsService, courseService } from "../../services/placeholderServices";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([analyticsService.student(), courseService.list()]).then(
      ([s, c]) => {
        setStats(s.data);
        setCourses(c.data.results);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <Loader full={false} />;

  const maxWeekly = Math.max(...stats.weekly);

  return (
    <div className="space-y-8">
      <div className="card flex flex-col justify-between gap-4 bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Welcome back, {user?.first_name || "Learner"} 👋
          </h1>
          <p className="mt-1 text-sm text-indigo-100">
            You're on a {stats.streak}-day streak. Keep it going today!
          </p>
        </div>
        <Link to="/student/problems" className="btn bg-white text-indigo-700 hover:bg-indigo-50">
          Continue Learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Problems Solved" value={stats.solved} tone="teal" trend="+12 this week" />
        <StatCard icon={Target} label="Accuracy" value={`${stats.accuracy}%`} tone="indigo" />
        <StatCard icon={Flame} label="Current Streak" value={`${stats.streak} days`} tone="amber" />
        <StatCard icon={Trophy} label="Global Rank" value={`#${stats.rank}`} tone="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Weekly Progress</h2>
            <span className="text-xs text-ink-400">Problems solved per day</span>
          </div>
          <div className="flex h-40 items-end gap-3">
            {stats.weekly.map((val, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-300"
                  style={{ height: `${(val / maxWeekly) * 100}%`, minHeight: "6px" }}
                />
                <span className="text-xs text-ink-400">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-semibold">AI Recommendation</h2>
          </div>
          <p className="text-sm text-ink-500">
            Based on your recent attempts, brushing up on <b>Graph Traversal</b> could
            boost your medium-difficulty accuracy.
          </p>
          <Link to="/student/ai-tutor" className="btn-secondary mt-4 w-full justify-center">
            Ask AI Tutor
          </Link>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Continue Learning</h2>
          <Link to="/student/courses" className="text-sm font-medium text-indigo-600 hover:underline">
            View all courses
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div key={course.id} className="card p-5">
              <div className="text-3xl">{course.image}</div>
              <h3 className="mt-3 font-semibold text-ink-800">{course.title}</h3>
              <p className="text-xs text-ink-400">{course.lessons} lessons</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-ink-100">
                <div
                  className="h-1.5 rounded-full bg-indigo-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-ink-400">{course.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
