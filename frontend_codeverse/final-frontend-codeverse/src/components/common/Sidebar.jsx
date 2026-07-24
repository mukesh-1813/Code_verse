import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";
import { navConfig } from "./navConfig";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const section = location.pathname.startsWith("/faculty") ? "FACULTY" : "STUDENT";
  const items = navConfig[user?.role] || navConfig[section];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-40 flex h-screen w-64 flex-col border-r border-ink-100 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold text-ink-900">
            CodeVerse<span className="text-indigo-600">AI</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-5 rounded-xl2 bg-gradient-to-br from-indigo-600 to-indigo-700 p-4 text-white">
          <p className="text-sm font-semibold">Upgrade your learning</p>
          <p className="mt-1 text-xs text-indigo-100">
            Unlock unlimited AI Tutor sessions and mock interviews.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
