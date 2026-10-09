import React from "react";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import { CATEGORY_STYLES } from "../config/constants";
import { useTracker } from "../hooks/useTracker";
import StatusIcon from "./StatusIcon";
import DifficultySignal from "./DifficultySignal";

const UpNextList = () => {
  const { questions, cycleStatus } = useTracker();

  // in progress first, then pending
  let upNext = [
    ...questions.filter((val) => val.status === "In Progress"),
    ...questions.filter((val) => val.status === "Pending"),
  ].slice(0, 5);

  return (
    <section className="h-full rounded-2xl border border-line bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold">Up next</h2>
        {questions.length > 0 && (
          <Link
            to="/tracker"
            className="text-sm font-semibold text-ink-soft underline decoration-ink-mute/40 underline-offset-4 hover:text-ink"
          >
            See all questions
          </Link>
        )}
      </div>

      {/* Nothing added yet */}
      {questions.length === 0 && (
        <p className="mt-4 text-ink-soft">
          Questions you add will show up here, with the ones in progress first.
        </p>
      )}

      {/* Everything completed */}
      {questions.length > 0 && upNext.length === 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-paper p-4 text-ink-soft">
          <Sparkles size={20} className="shrink-0 text-ink" />
          Every question is completed. Pick a new set for next week.
        </div>
      )}

      {/* List */}
      {upNext.length > 0 && (
        <ul className="mt-3 divide-y divide-line">
          {upNext.map((val) => {
            let style = CATEGORY_STYLES[val.category];
            let Icon = style.icon;

            return (
              <li key={val.id} className="flex items-center gap-3 py-3.5">
                <button
                  type="button"
                  onClick={() => cycleStatus(val.id)}
                  aria-label={`${val.title} is ${val.status}. Move to the next status`}
                  className="shrink-0 cursor-pointer rounded-full transition-transform active:scale-90"
                >
                  <StatusIcon status={val.status} size={24} />
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{val.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${style.chip}`}
                    >
                      <Icon size={12} />
                      {val.category}
                    </span>
                    <DifficultySignal difficulty={val.difficulty} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UpNextList;
