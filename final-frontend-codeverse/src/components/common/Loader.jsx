import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ full }) => {
  if (full) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
    </div>
  );
};

export default Loader;
