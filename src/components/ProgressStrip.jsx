import React, { useState } from "react";
import { CATEGORIES, CATEGORY_STYLES } from "../config/constants";

// filled = completed, striped = in progress, dashed outline = pending
const CELL_STATUS_STYLES = {
  Completed: "bg-current",
  "In Progress": "cell-stripes border border-current/70",
  Pending: "border border-dashed border-current/50",
};

const LEGEND = [
  { status: "Completed", label: "Completed" },
  { status: "In Progress", label: "In progress" },
  { status: "Pending", label: "Pending" },
];

// one block per question, grouped by category
const ProgressStrip = ({ questions }) => {
  const [activeId, setActiveId] = useState(null);
  const activeQuestion = questions.find((val) => val.id === activeId);

  // number the blocks so the entrance animation runs left to right
  let offset = 0;
  const groups = CATEGORIES.map((cat) => {
    let items = questions.filter((val) => val.category === cat);
    let group = { cat, items, offset };
    offset += items.length;
    return group;
  }).filter((group) => group.items.length > 0);

  // nothing added yet
  if (questions.length === 0) {
    return (
      <div>
        <div className="flex flex-wrap gap-1.5 text-white/30">
          {Array.from({ length: 15 }).map((_, index) => (
            <span
              key={index}
              style={{ "--i": index }}
              className="cell-rise h-11 w-4 rounded-md border border-dashed border-current sm:w-5"
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-white/70">
          Each block is one question. They fill in as you work through them.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        {groups.map((group) => {
          let done = group.items.filter(
            (val) => val.status === "Completed"
          ).length;

          return (
            <div
              key={group.cat}
              className={`max-w-full ${CATEGORY_STYLES[group.cat].cell}`}
            >
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((val, position) => (
                  <button
                    key={val.id}
                    type="button"
                    onMouseEnter={() => setActiveId(val.id)}
                    onFocus={() => setActiveId(val.id)}
                    onClick={() => setActiveId(val.id)}
                    aria-label={`${val.title}, ${val.status}`}
                    style={{ "--i": group.offset + position }}
                    className={`cell-rise h-11 w-4 cursor-pointer rounded-md transition-[translate] hover:-translate-y-0.5 focus-visible:outline-white sm:w-5 ${
                      CELL_STATUS_STYLES[val.status]
                    } ${
                      activeId === val.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-ink"
                        : ""
                    }`}
                  />
                ))}
              </div>

              <p className="mt-2.5 text-sm font-medium text-white">
                {group.cat}{" "}
                <span className="font-normal text-white/60">
                  {done}/{group.items.length}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Caption + legend */}
      <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="min-h-5 text-white/80" aria-live="polite">
          {activeQuestion ? (
            <>
              <span className="font-semibold text-white">
                {activeQuestion.title}
              </span>{" "}
              <span className="text-white/60">
                ({activeQuestion.status}, {activeQuestion.difficulty})
              </span>
            </>
          ) : (
            "Hover or tap a block to see the question."
          )}
        </p>

        <ul className="flex shrink-0 items-center gap-4 text-white/70">
          {LEGEND.map((item) => (
            <li key={item.status} className="flex items-center gap-1.5">
              <span
                className={`h-3.5 w-2.5 rounded-sm text-white ${
                  CELL_STATUS_STYLES[item.status]
                }`}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressStrip;
