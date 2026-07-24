import React, { useState } from "react";
import { Search, Ban, ShieldCheck } from "lucide-react";

const users = [
  { id: 1, name: "Rohit Verma", email: "rohit@college.edu", role: "STUDENT", status: "Active" },
  { id: 2, name: "Dr. Kavita Nair", email: "kavita@college.edu", role: "FACULTY", status: "Active" },
  { id: 3, name: "Sara Khan", email: "sara@college.edu", role: "STUDENT", status: "Suspended" },
  { id: 4, name: "Admin User", email: "admin@codeverse.ai", role: "ADMIN", status: "Active" },
];

const roleColor = {
  STUDENT: "bg-indigo-50 text-indigo-600",
  FACULTY: "bg-teal-50 text-teal-600",
  ADMIN: "bg-amber-50 text-amber-600",
};

const AdminUsers = () => {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const filtered = users.filter(
    (u) =>
      (roleFilter === "All" || u.role === roleFilter) &&
      u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">User Management</h1>
        <p className="text-sm text-ink-400">View and manage all platform users.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input className="input pl-9" placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["All", "STUDENT", "FACULTY", "ADMIN"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                roleFilter === r ? "bg-indigo-600 text-white" : "bg-white text-ink-500 border border-ink-100 hover:bg-ink-50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink-800">{u.name}</p>
                  <p className="text-xs text-ink-400">{u.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`badge ${roleColor[u.role]}`}>{u.role}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`badge ${u.status === "Active" ? "bg-teal-50 text-teal-700" : "bg-rose-50 text-rose-700"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-indigo-600">
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600">
                      <Ban className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
