import React from "react";

const ProgressBar = ({ value, label, barClass = "bg-ink" }) => {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-full bg-line"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${barClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
