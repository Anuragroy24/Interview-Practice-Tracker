import React from "react";
import { Highlighter } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mark text-ink">
        <Highlighter size={19} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Practice Tracker
      </span>
    </div>
  );
};

export default Logo;
