import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-surface px-4 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
      <Compass className="h-8 w-8" />
    </div>
    <h1 className="font-display text-4xl font-bold text-ink-900">404</h1>
    <p className="mt-2 text-ink-500">This page doesn't exist, or you don't have access to it.</p>
    <Link to="/" className="btn-primary mt-6">
      Back to home
    </Link>
  </div>
);

export default NotFound;
