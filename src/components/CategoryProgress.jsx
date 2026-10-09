import React from "react";
import { CATEGORIES, CATEGORY_STYLES } from "../config/constants";
import { useTracker } from "../hooks/useTracker";
import ProgressBar from "./ProgressBar";

const CategoryProgress = () => {
  const { stats } = useTracker();

  return (
    <section className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <h2 className="font-display text-lg font-bold">By category</h2>

      <div className="mt-5 flex flex-col gap-5">
        {CATEGORIES.map((cat) => {
          let style = CATEGORY_STYLES[cat];
          let Icon = style.icon;
          let data = stats.byCategory[cat];
          let percentage =
            data.total === 0
              ? 0
              : Math.round((data.completed / data.total) * 100);

          return (
            <div key={cat}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 font-semibold">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${style.chip}`}
                  >
                    <Icon size={15} />
                  </span>
                  {style.fullName}
                </span>
                <span className="text-sm text-ink-soft">
                  {data.completed} of {data.total}
                </span>
              </div>

              <ProgressBar
                value={percentage}
                barClass={style.bar}
                label={`${style.fullName} progress`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryProgress;
