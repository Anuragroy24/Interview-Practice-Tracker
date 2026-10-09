import { useForm } from "react-hook-form";
import { useTracker } from "./useTracker";

export const useQuestionForm = () => {
  const { questions, editingQuestion, addQuestion, updateQuestion, closeForm } =
    useTracker();

  // true when we opened the form from the edit button
  let isEditing = editingQuestion !== null;

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: isEditing ? editingQuestion.title : "",
      category: isEditing ? editingQuestion.category : "DSA",
      difficulty: isEditing ? editingQuestion.difficulty : "Easy",
      status: isEditing ? editingQuestion.status : "Pending",
      note: isEditing ? editingQuestion.note : "",
    },
  });

  //   validation rules for the question field
  let titleRules = {
    required: "Add the question you want to practice",
    maxLength: {
      value: 120,
      message: "Keep the question under 120 characters",
    },
    validate: (value) => {
      let title = value.trim().toLowerCase();

      if (title.length < 5) {
        return "Use at least 5 characters";
      }

      // same question should not be added twice
      let alreadyAdded = questions.some((val) => {
        let isSameQuestion = isEditing && val.id === editingQuestion.id;
        return !isSameQuestion && val.title.toLowerCase() === title;
      });

      if (alreadyAdded) {
        return "This question is already in your tracker";
      }

      return true;
    },
  };

  let noteRules = {
    maxLength: {
      value: 160,
      message: "Keep the note under 160 characters",
    },
  };

  //   submit logic
  let questionFormSubmit = (data) => {
    if (isEditing) {
      updateQuestion(editingQuestion.id, data);
    } else {
      addQuestion(data);
    }
    closeForm();
  };

  return {
    register,
    handleSubmit,
    errors,
    isEditing,
    titleRules,
    noteRules,
    questionFormSubmit,
    closeForm,
  };
};
