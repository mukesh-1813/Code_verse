import React from "react";
import { Outlet } from "react-router-dom";
import { Code2, Sparkles, Trophy, BookOpen } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold text-ink-900">
              CodeVerse<span className="text-indigo-600">AI</span>
            </span>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-teal-600 lg:flex lg:flex-col lg:justify-center lg:p-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="relative z-10 text-white">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Learn to code, faster,
            <br /> with an AI mentor by your side.
          </h2>
          <p className="mt-4 max-w-md text-indigo-100">
            Practice problems, join live contests, and get instant AI code
            reviews — all in one platform built for students and educators.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: Sparkles, text: "AI Tutor explains every concept in plain language" },
              { icon: BookOpen, text: "Structured courses from beginner to advanced" },
              { icon: Trophy, text: "Live contests and a global leaderboard" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-indigo-50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
