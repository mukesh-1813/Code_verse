import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Loader from "../../components/common/Loader";
import { courseService } from "../../services/placeholderServices";

const categories = ["All", "Python", "DSA", "Web Dev", "Java"];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    courseService.list().then((res) => {
      setCourses(res.data.results);
      setLoading(false);
    });
  }, []);

  const filtered = courses.filter(
    (c) =>
      (filter === "All" || c.category === filter) &&
      c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Courses</h1>
        <p className="text-sm text-ink-400">Structured learning paths curated for you.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            className="input pl-9"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-ink-500 border border-ink-100 hover:bg-ink-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <div key={course.id} className="card overflow-hidden transition hover:shadow-lift">
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-indigo-50 to-teal-50 text-5xl">
                {course.image}
              </div>
              <div className="p-5">
                <span className="badge bg-indigo-50 text-indigo-600">{course.category}</span>
                <h3 className="mt-3 font-semibold text-ink-800">{course.title}</h3>
                <p className="text-xs text-ink-400">{course.lessons} lessons</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-ink-100">
                  <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${course.progress}%` }} />
                </div>
                <button className="btn-primary mt-4 w-full justify-center">
                  {course.progress > 0 ? "Continue" : "Enroll Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
