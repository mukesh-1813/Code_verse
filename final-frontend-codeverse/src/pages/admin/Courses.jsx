import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import { courseService } from "../../services/placeholderServices";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.list().then((res) => setCourses(res.data.results));
  }, []);

  if (!courses.length) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Manage Courses</h1>
          <p className="text-sm text-ink-400">Platform-wide course catalog.</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="text-3xl">{c.image}</div>
            <h3 className="mt-3 font-semibold text-ink-800">{c.title}</h3>
            <p className="text-xs text-ink-400">{c.category} • {c.lessons} lessons</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-secondary flex-1 justify-center">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button className="btn-secondary flex-1 justify-center text-rose-600">
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
