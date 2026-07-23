import React from "react";

const tones = {
  indigo: "bg-indigo-50 text-indigo-600",
  teal: "bg-teal-50 text-teal-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

const StatCard = ({ icon: Icon, label, value, trend, tone = "indigo" }) => (
  <div className="card p-5">
    <div className="flex items-center justify-between">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      {trend && (
        <span className="text-xs font-semibold text-teal-600">{trend}</span>
      )}
    </div>
    <p className="mt-4 text-2xl font-display font-bold text-ink-900">{value}</p>
    <p className="text-sm text-ink-400">{label}</p>
  </div>
);

export default StatCard;
