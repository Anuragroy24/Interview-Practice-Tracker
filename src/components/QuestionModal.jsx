import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useTracker } from "../hooks/useTracker";
import QuestionForm from "./QuestionForm";

const QuestionModal = () => {
  const { isFormOpen, editingQuestion, closeForm } = useTracker();

  // close on Escape and stop the page behind from scrolling
  useEffect(() => {
    if (!isFormOpen) return;

    let handleKeyDown = (e) => {
      if (e.key === "Escape") closeForm();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFormOpen, closeForm]);

  if (!isFormOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop */}
      <div
        onClick={closeForm}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
        className="modal-in relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 sm:max-w-lg sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="question-modal-title"
              className="font-display text-2xl font-bold"
            >
              {editingQuestion ? "Edit question" : "Add question"}
            </h2>
            <p className="mt-1 text-sm text-ink-mute">
              {editingQuestion
                ? "Update the details and save your changes."
                : "Add something you want to practice this week."}
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-2 text-ink-mute transition-colors hover:bg-paper hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        {/* key remounts the form so it starts with the right values */}
        <QuestionForm key={editingQuestion ? editingQuestion.id : "new"} />
      </div>
    </div>
  );
};

export default QuestionModal;
