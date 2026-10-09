import React from "react";
import { DIFFICULTY_LEVEL } from "../config/constants";

const BAR_HEIGHTS = ["h-2", "h-3", "h-4"];

// three rising bars: one filled = easy, two = medium, three = hard
const DifficultySignal = ({ difficulty }) => {
  let level = DIFFICULTY_LEVEL[difficulty] || 1;

  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {BAR_HEIGHTS.map((height, index) => (
          <span
            key={height}
            className={`w-1 rounded-full ${height} ${
              index < level ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </span>
      {difficulty}
    </span>
  );
};

export default DifficultySignal;
