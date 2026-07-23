import React from "react";
import { Award, Download, Share2 } from "lucide-react";
import EmptyState from "../../components/common/EmptyState";

const certificates = [
  { id: 1, title: "Python for Beginners", issued: "June 2026" },
  { id: 2, title: "DSA Masterclass — Level 1", issued: "May 2026" },
];

const Certificates = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Certificates</h1>
        <p className="text-sm text-ink-400">Download and share your achievements.</p>
      </div>

      {certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          subtitle="Complete a course to earn your first certificate."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {certificates.map((c) => (
            <div key={c.id} className="card overflow-hidden">
              <div className="flex h-32 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-teal-600 text-white">
                <Award className="h-8 w-8" />
                <p className="mt-2 text-sm font-semibold">Certificate of Completion</p>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-ink-800">{c.title}</h3>
                <p className="text-xs text-ink-400">Issued {c.issued}</p>
                <div className="mt-4 flex gap-2">
                  <button className="btn-secondary flex-1 justify-center">
                    <Download className="h-4 w-4" /> Download
                  </button>
                  <button className="btn-secondary flex-1 justify-center">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
