import React from "react";

const FilterChips = ({ label, options, value, onChange }) => {
  return (
    <div
      role="group"
      aria-label={`Filter by ${label.toLowerCase()}`}
      className="flex items-center gap-3"
    >
      <span className="w-20 shrink-0 text-sm text-ink-mute lg:w-auto">
        {label}
      </span>

      <div className="flex gap-1.5 overflow-x-auto px-0.5 py-1 [scrollbar-width:none]">
        {["All", ...options].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              value === option
                ? "border-mark bg-mark text-ink"
                : "border-line bg-white text-ink-soft hover:border-ink-mute"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;
