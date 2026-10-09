import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  CATEGORY_STYLES,
  ROW_GRID,
  STATUS_NEXT,
  STATUS_STYLES,
} from "../config/constants";
import { useTracker } from "../hooks/useTracker";
import StatusIcon from "./StatusIcon";
import DifficultySignal from "./DifficultySignal";

// stacked on mobile, a table row on desktop (md:contents lets the cells join the grid)
const QuestionRow = ({ question }) => {
  const { cycleStatus, openEditForm, deleteQuestion } = useTracker();

  const style = CATEGORY_STYLES[question.category];
  const CategoryIcon = style.icon;
  const nextStatus = STATUS_NEXT[question.status];
  const isCompleted = question.status === "Completed";

  return (
    <li
      className={`flex items-start gap-3 px-4 py-4 transition-colors hover:bg-paper/60 md:grid md:items-center md:gap-4 md:px-6 ${ROW_GRID}`}
    >
      {/* Status toggle */}
      <button
        type="button"
        onClick={() => cycleStatus(question.id)}
        title={`Mark as ${nextStatus}`}
        aria-label={`${question.status}. Mark as ${nextStatus}`}
        className="mt-0.5 shrink-0 cursor-pointer rounded-full transition-transform active:scale-90 md:mt-0"
      >
        <StatusIcon status={question.status} size={26} />
      </button>

      <div className="min-w-0 flex-1 md:contents">
        {/* Question */}
        <div className="min-w-0">
          <p
            className={`font-semibold leading-snug ${
              isCompleted
                ? "text-ink-mute line-through decoration-ink-mute/50"
                : "text-ink"
            }`}
          >
            {question.title}
          </p>
          {question.note && (
            <p className="mt-1 text-sm text-ink-mute">{question.note}</p>
          )}
        </div>

        {/* Category, difficulty, status */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:contents">
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold ${style.chip}`}
          >
            <CategoryIcon size={14} />
            {question.category}
          </span>

          <DifficultySignal difficulty={question.difficulty} />

          <span
            className={`inline-flex w-fit rounded-full px-2.5 py-1 text-sm font-semibold ${
              STATUS_STYLES[question.status]
            }`}
          >
            {question.status}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-0.5">
        <button
          type="button"
          onClick={() => openEditForm(question)}
          aria-label="Edit question"
          title="Edit"
          className="cursor-pointer rounded-lg p-2 text-ink-mute transition-colors hover:bg-paper hover:text-ink"
        >
          <Pencil size={17} />
        </button>
        <button
          type="button"
          onClick={() => deleteQuestion(question.id)}
          aria-label="Delete question"
          title="Delete"
          className="cursor-pointer rounded-lg p-2 text-ink-mute transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </li>
  );
};

export default QuestionRow;
