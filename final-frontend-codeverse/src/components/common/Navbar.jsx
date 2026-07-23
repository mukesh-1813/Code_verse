import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "U";
  const section = location.pathname.startsWith("/faculty") ? "faculty" : "student";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/80 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            className="w-64 rounded-xl border border-ink-100 bg-ink-50/50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            placeholder="Search problems, courses..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-ink-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {initials}
            </div>
            <span className="hidden text-sm font-medium text-ink-700 sm:block">
              {user?.first_name || "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-ink-400" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl2 border border-ink-100 bg-white p-1.5 shadow-lift">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/${user?.role?.toLowerCase() || section}/profile`);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50"
                >
                  <User className="h-4 w-4" /> Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/${user?.role?.toLowerCase() || section}/settings`);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50"
                >
                  <Settings className="h-4 w-4" /> Settings
                </button>
                <div className="my-1 h-px bg-ink-100" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
