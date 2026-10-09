import React from "react";
import { Binary, Laptop, Layers, ListChecks, Plus, Sparkles } from "lucide-react";
import { useTracker } from "../hooks/useTracker";
import ProgressStrip from "../components/ProgressStrip";
import StatCard from "../components/StatCard";
import StatusIcon from "../components/StatusIcon";
import UpNextList from "../components/UpNextList";
import CategoryProgress from "../components/CategoryProgress";
import MachineCodingCard from "../components/MachineCodingCard";
import Button from "../components/Button";

const DashboardPage = () => {
  const { questions, stats, machineStatus, openAddForm, loadSheetQuestions } =
    useTracker();

  let today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  let getHeroMessage = () => {
    if (stats.total === 0) {
      return "Nothing here yet. Add your first question and watch the blocks fill in.";
    }
    if (stats.percentage === 100) {
      return "Every block is filled. This week's sheet is done.";
    }
    return `${stats.completed} of ${stats.total} questions done. ${
      stats.total - stats.completed
    } to go.`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          This week
        </h1>
        <p className="mt-1 text-ink-soft">{today}</p>
      </div>

      {/* Hero */}
      <section className="rounded-3xl bg-ink p-6 text-white md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-7xl leading-none font-bold md:text-8xl">
              {stats.percentage}%
            </span>
            <span className="text-lg text-white/70">complete</span>
          </div>
          <p className="max-w-xs text-white/75 md:text-right">
            {getHeroMessage()}
          </p>
        </div>

        <div className="mt-8">
          <ProgressStrip questions={questions} />
        </div>

        {stats.total === 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="mark" icon={Sparkles} onClick={loadSheetQuestions}>
              Load Sheet 01
            </Button>
            <Button variant="onDark" icon={Plus} onClick={openAddForm}>
              Add question
            </Button>
          </div>
        )}
      </section>

      {/* Stats */}
      <section
        aria-label="Summary"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
      >
        <StatCard
          icon={ListChecks}
          label="Total questions"
          value={stats.total}
          hint={`${stats.pending} pending, ${stats.inProgress} in progress`}
        />
        <StatCard
          icon={Binary}
          label="DSA completed"
          value={stats.byCategory.DSA.completed}
          total={stats.byCategory.DSA.total}
          hint="LeetCode problems"
        />
        <StatCard
          icon={Layers}
          label="Interview questions"
          value={stats.interviewCompleted}
          total={stats.interviewTotal}
          hint="Git and technical, completed"
        />
        <StatCard
          icon={Laptop}
          label="Machine coding"
          value={
            <span className="flex items-center gap-2.5 text-2xl md:text-3xl">
              <StatusIcon status={machineStatus} size={26} />
              {machineStatus}
            </span>
          }
          hint="Frontend round"
        />
      </section>

      {/* Up next + breakdown */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <UpNextList />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <CategoryProgress />
          <MachineCodingCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
