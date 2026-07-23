import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-surface px-4 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
      <ShieldAlert className="h-8 w-8" />
    </div>
    <h1 className="font-display text-2xl font-bold text-ink-900">Access denied</h1>
    <p className="mt-2 text-ink-500">Your account role doesn't have permission to view this page.</p>
    <Link to="/" className="btn-primary mt-6">
      Back to home
    </Link>
  </div>
);

export default Unauthorized;
