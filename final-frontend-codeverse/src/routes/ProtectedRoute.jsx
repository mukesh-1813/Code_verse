import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/common/Loader";

// Wrap any set of routes that require auth. Pass `roles` to further
// restrict access, e.g. <ProtectedRoute roles={["FACULTY"]} />
const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Loader full />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
