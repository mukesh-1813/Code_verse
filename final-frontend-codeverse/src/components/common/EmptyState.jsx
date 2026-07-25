import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({ icon: Icon = Inbox, title = "Nothing here yet", subtitle, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-ink-200 bg-white/60 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="text-base font-semibold text-ink-800">{title}</h3>
    {subtitle && <p className="mt-1 max-w-sm text-sm text-ink-400">{subtitle}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
