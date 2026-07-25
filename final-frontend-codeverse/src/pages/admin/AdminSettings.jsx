import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`h-6 w-11 rounded-full transition ${checked ? "bg-indigo-600" : "bg-ink-200"}`}
  >
    <span className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
  </button>
);

const AdminSettings = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [registrations, setRegistrations] = useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">System Settings</h1>
        <p className="text-sm text-ink-400">Platform-wide configuration.</p>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Platform controls</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-700">Maintenance mode</p>
              <p className="text-xs text-ink-400">Temporarily disable access for non-admin users.</p>
            </div>
            <Toggle checked={maintenance} onChange={setMaintenance} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-700">Allow new registrations</p>
              <p className="text-xs text-ink-400">Let new students and faculty sign up.</p>
            </div>
            <Toggle checked={registrations} onChange={setRegistrations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
