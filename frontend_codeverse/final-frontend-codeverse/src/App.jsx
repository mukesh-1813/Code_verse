import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentProblems from "./pages/student/Problems";
import StudentProblemDetail from "./pages/student/ProblemDetail";
import StudentPlayground from "./pages/student/Playground";
import StudentAITutor from "./pages/student/AITutor";
import StudentContests from "./pages/student/Contests";
import StudentLeaderboard from "./pages/student/Leaderboard";
import StudentCertificates from "./pages/student/Certificates";

import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyCourses from "./pages/faculty/Courses";
import CreateProblem from "./pages/faculty/CreateProblem";
import FacultyStudents from "./pages/faculty/Students";
import FacultyContests from "./pages/faculty/Contests";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses";
import AdminProblems from "./pages/admin/Problems";
import Reports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/AdminSettings";

import Profile from "./pages/common/Profile";
import Settings from "./pages/common/Settings";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Loader from "./components/common/Loader";

const roleHome = {
  STUDENT: "/student/dashboard",
  FACULTY: "/faculty/dashboard",
  ADMIN: "/admin/dashboard",
};

// Sends a logged-in user to their role's dashboard, or to /login otherwise.
const RootRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <Loader full />;
  if (!isAuthenticated) return <Navigate to="/student/dashboard" replace />;
  return <Navigate to={roleHome[user?.role] || "/student/dashboard"} replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Student and faculty routes are public for preview/demo use */}
      <Route element={<DashboardLayout />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/problems" element={<StudentProblems />} />
        <Route path="/student/problems/:id" element={<StudentProblemDetail />} />
        <Route path="/student/playground" element={<StudentPlayground />} />
        <Route path="/student/ai-tutor" element={<StudentAITutor />} />
        <Route path="/student/contests" element={<StudentContests />} />
        <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
        <Route path="/student/certificates" element={<StudentCertificates />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/settings" element={<Settings />} />

        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/courses" element={<FacultyCourses />} />
        <Route path="/faculty/problems/new" element={<CreateProblem />} />
        <Route path="/faculty/students" element={<FacultyStudents />} />
        <Route path="/faculty/contests" element={<FacultyContests />} />
        <Route path="/faculty/profile" element={<Profile />} />
        <Route path="/faculty/settings" element={<Settings />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/problems" element={<AdminProblems />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
