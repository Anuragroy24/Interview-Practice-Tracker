import React from "react";

// empty circle = pending, half circle = in progress, tick = completed
const StatusIcon = ({ status, size = 22 }) => {
  if (status === "Completed") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="11" className="fill-emerald-600" />
        <path
          d="M7 12.5l3.2 3.2L17 8.8"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "In Progress") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2"
          className="stroke-amber-600"
        />
        <path d="M12 2a10 10 0 0 1 0 20z" className="fill-amber-600" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeWidth="2"
        className="stroke-slate-500"
      />
    </svg>
  );
};

export default StatusIcon;
