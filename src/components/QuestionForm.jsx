import React from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../config/constants";
import { useQuestionForm } from "../hooks/useQuestionForm";
import RadioGroupField from "./RadioGroupField";
import Button from "./Button";

const QuestionForm = () => {
  let {
    register,
    handleSubmit,
    errors,
    isEditing,
    titleRules,
    noteRules,
    questionFormSubmit,
    closeForm,
  } = useQuestionForm();

  return (
    <form
      onSubmit={handleSubmit(questionFormSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      {/* Question */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-semibold">
          Question
        </label>
        <input
          id="title"
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="e.g. Rotate Array (LeetCode 189)"
          aria-invalid={errors.title ? "true" : "false"}
          {...register("title", titleRules)}
          className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-ink focus:ring-2 focus:ring-mark ${
            errors.title ? "border-red-500" : "border-line"
          }`}
        />
        {errors.title && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Category */}
      <RadioGroupField
        legend="Category"
        name="category"
        options={CATEGORIES}
        register={register}
      />

      {/* Difficulty */}
      <RadioGroupField
        legend="Difficulty"
        name="difficulty"
        options={DIFFICULTIES}
        register={register}
      />

      {/* Status */}
      <RadioGroupField
        legend="Status"
        name="status"
        options={STATUSES}
        register={register}
      />

      {/* Note */}
      <div>
        <label htmlFor="note" className="mb-2 block text-sm font-semibold">
          Note <span className="font-normal text-ink-mute">(optional)</span>
        </label>
        <textarea
          id="note"
          rows={2}
          placeholder="A link, a follow-up to prepare, anything to remember"
          {...register("note", noteRules)}
          className={`w-full resize-none rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-ink focus:ring-2 focus:ring-mark ${
            errors.note ? "border-red-500" : "border-line"
          }`}
        />
        {errors.note && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {errors.note.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Save changes" : "Add question"}</Button>
      </div>
    </form>
  );
};

export default QuestionForm;
