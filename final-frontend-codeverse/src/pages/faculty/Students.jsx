import React, { useState } from "react";
import { Search, Mail } from "lucide-react";

const students = [
  { id: 1, name: "Rohit Verma", email: "rohit@college.edu", solved: 128, course: "DSA Masterclass" },
  { id: 2, name: "Sara Khan", email: "sara@college.edu", solved: 96, course: "Python for Beginners" },
  { id: 3, name: "Aditya Singh", email: "aditya@college.edu", solved: 210, course: "DSA Masterclass" },
  { id: 4, name: "Meera Iyer", email: "meera@college.edu", solved: 64, course: "Full-Stack Web Dev" },
];

const Students = () => {
  const [query, setQuery] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Manage Students</h1>
        <p className="text-sm text-ink-400">Track progress across your enrolled students.</p>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input
          className="input pl-9"
          placeholder="Search students..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Course</th>
              <th className="px-5 py-3 font-medium">Solved</th>
              <th className="px-5 py-3 font-medium text-right">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {s.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-ink-800">{s.name}</p>
                      <p className="text-xs text-ink-400">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-ink-500">{s.course}</td>
                <td className="px-5 py-3.5 text-ink-500">{s.solved}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-indigo-600">
                    <Mail className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
