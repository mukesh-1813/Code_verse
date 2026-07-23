import {
  LayoutDashboard,
  BookOpen,
  Code2,
  ListChecks,
  Trophy,
  Award,
  Settings,
  Sparkles,
  Users,
  FilePlus,
  BarChart3,
  ShieldCheck,
  Layers,
} from "lucide-react";

export const navConfig = {
  STUDENT: [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/courses", label: "Courses", icon: BookOpen },
    { to: "/student/problems", label: "Problems", icon: ListChecks },
    { to: "/student/playground", label: "Playground", icon: Code2 },
    { to: "/student/ai-tutor", label: "AI Tutor", icon: Sparkles },
    { to: "/student/contests", label: "Contests", icon: Trophy },
    { to: "/student/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { to: "/student/certificates", label: "Certificates", icon: Award },
    { to: "/student/settings", label: "Settings", icon: Settings },
  ],
  FACULTY: [
    { to: "/faculty/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/faculty/courses", label: "Courses", icon: BookOpen },
    { to: "/faculty/problems/new", label: "Create Problem", icon: FilePlus },
    { to: "/faculty/students", label: "Students", icon: Users },
    { to: "/faculty/contests", label: "Contests", icon: Trophy },
  ],
  ADMIN: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/courses", label: "Courses", icon: Layers },
    { to: "/admin/problems", label: "Problems", icon: ListChecks },
    { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    { to: "/admin/settings", label: "Settings", icon: ShieldCheck },
  ],
};
