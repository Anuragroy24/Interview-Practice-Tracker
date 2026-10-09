import React from "react";
import { ListChecks, Plus, Search, SearchX, Sparkles, Trash2, X } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, ROW_GRID, STATUSES } from "../config/constants";
import { useTracker } from "../hooks/useTracker";
import { useQuestionFilters } from "../hooks/useQuestionFilters";
import QuestionRow from "../components/QuestionRow";
import FilterChips from "../components/FilterChips";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

const QuestionsPage = () => {
  const {
    questions,
    stats,
    openAddForm,
    loadSheetQuestions,
    clearAllQuestions,
  } = useTracker();

  const {
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    difficulty,
    setDifficulty,
    filteredQuestions,
    hasActiveFilters,
    clearFilters,
  } = useQuestionFilters();

  let getNoResultsText = () => {
    if (search.trim() !== "") {
      return `Nothing matches "${search.trim()}" with the current filters. Try another keyword or clear the filters.`;
    }
    return "No questions match these filters. Remove one or clear them all.";
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Questions
          </h1>
          <p className="mt-1 text-ink-soft">
            Everything you are practicing this week, in one list.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {questions.length > 0 && (
            <Button variant="ghost" icon={Trash2} onClick={clearAllQuestions}>
              Clear all
            </Button>
          )}
          <Button icon={Plus} onClick={openAddForm}>
            Add question
          </Button>
        </div>
      </div>

      {/* Empty state: no questions at all */}
      {questions.length === 0 && (
        <div className="mt-8">
          <EmptyState
            icon={ListChecks}
            title="No questions yet"
            description="Add what you are practicing, or load the 15 questions from Sheet 01 to start with a full week."
          >
            <Button variant="mark" icon={Sparkles} onClick={loadSheetQuestions}>
              Load Sheet 01
            </Button>
            <Button variant="secondary" icon={Plus} onClick={openAddForm}>
              Add question
            </Button>
          </EmptyState>
        </div>
      )}

      {questions.length > 0 && (
        <>
          {/* Progress */}
          <section className="mt-8 rounded-2xl border border-line bg-white p-5 md:p-6">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="font-semibold">
                {stats.completed} of {stats.total} completed
              </p>
              <p className="font-display text-2xl font-bold">
                {stats.percentage}%
              </p>
            </div>
            <ProgressBar
              value={stats.percentage}
              label="Overall completion"
            />
          </section>

          {/* Search + filters */}
          <section className="mt-6 flex flex-col gap-4">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-mute"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions and notes"
                aria-label="Search questions"
                className="w-full rounded-xl border border-line bg-white py-3 pr-11 pl-11 outline-none transition focus:border-ink focus:ring-2 focus:ring-mark"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md p-1 text-ink-mute hover:text-ink"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-x-8 lg:gap-y-2">
              <FilterChips
                label="Category"
                options={CATEGORIES}
                value={category}
                onChange={setCategory}
              />
              <FilterChips
                label="Status"
                options={STATUSES}
                value={status}
                onChange={setStatus}
              />
              <FilterChips
                label="Difficulty"
                options={DIFFICULTIES}
                value={difficulty}
                onChange={setDifficulty}
              />
            </div>
          </section>

          {/* Result count */}
          <div className="mt-6 mb-3 flex items-center justify-between gap-4 text-sm text-ink-soft">
            <p aria-live="polite">
              Showing {filteredQuestions.length} of {questions.length}{" "}
              {questions.length === 1 ? "question" : "questions"}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer font-semibold underline decoration-ink-mute/40 underline-offset-4 hover:text-ink"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* No search results */}
          {filteredQuestions.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No matching questions"
              description={getNoResultsText()}
            >
              <Button variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            </EmptyState>
          )}

          {/* List */}
          {filteredQuestions.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <div
                aria-hidden="true"
                className={`hidden gap-4 border-b border-line bg-paper/60 px-6 py-3 text-sm text-ink-mute md:grid ${ROW_GRID}`}
              >
                <span />
                <span>Question</span>
                <span>Category</span>
                <span>Difficulty</span>
                <span>Status</span>
                <span />
              </div>

              <ul className="divide-y divide-line">
                {filteredQuestions.map((val) => (
                  <QuestionRow key={val.id} question={val} />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionsPage;
