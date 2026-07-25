import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Loader from "../../components/common/Loader";
import { courseService } from "../../services/placeholderServices";

const FacultyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.list().then((res) => setCourses(res.data.results));
  }, []);

  if (!courses.length) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Course Management</h1>
          <p className="text-sm text-ink-400">Create and manage your courses.</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" /> New Course
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-5 py-3 font-medium">Course</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Lessons</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/40">
                <td className="px-5 py-3.5 font-medium text-ink-800">
                  <span className="mr-2">{c.image}</span>
                  {c.title}
                </td>
                <td className="px-5 py-3.5 text-ink-500">{c.category}</td>
                <td className="px-5 py-3.5 text-ink-500">{c.lessons}</td>
                <td className="px-5 py-3.5">
                  <span className="badge bg-teal-50 text-teal-700">Published</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-indigo-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-indigo-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
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

export default FacultyCourses;
