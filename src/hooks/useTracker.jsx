import { useContext } from "react";
import { toast } from "react-toastify";
import { Tracker } from "../context/TrackerContext";
import { STATUS_NEXT } from "../config/constants";
import { SHEET_QUESTIONS } from "../config/sheetQuestions";

export const useTracker = () => {
  const {
    questions,
    setQuestions,
    machineStatus,
    setMachineStatus,
    isFormOpen,
    setIsFormOpen,
    editingQuestion,
    setEditingQuestion,
  } = useContext(Tracker); //STORE

  //   numbers shown on the dashboard
  let completedQuestions = questions.filter((val) => val.status === "Completed");
  let inProgressQuestions = questions.filter((val) => val.status === "In Progress");
  let pendingQuestions = questions.filter((val) => val.status === "Pending");

  let dsaQuestions = questions.filter((val) => val.category === "DSA");
  let gitQuestions = questions.filter((val) => val.category === "Git");
  let technicalQuestions = questions.filter((val) => val.category === "Technical");

  let countCompleted = (list) =>
    list.filter((val) => val.status === "Completed").length;

  let stats = {
    total: questions.length,
    completed: completedQuestions.length,
    inProgress: inProgressQuestions.length,
    pending: pendingQuestions.length,
    percentage:
      questions.length === 0
        ? 0
        : Math.round((completedQuestions.length / questions.length) * 100),
    byCategory: {
      DSA: { total: dsaQuestions.length, completed: countCompleted(dsaQuestions) },
      Git: { total: gitQuestions.length, completed: countCompleted(gitQuestions) },
      Technical: {
        total: technicalQuestions.length,
        completed: countCompleted(technicalQuestions),
      },
    },
    // Git + Technical are the "interview questions"
    interviewTotal: gitQuestions.length + technicalQuestions.length,
    interviewCompleted:
      countCompleted(gitQuestions) + countCompleted(technicalQuestions),
  };

  //   save the questions in state and in localStorage
  let saveQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  //   modal open / close
  let openAddForm = () => {
    setEditingQuestion(null);
    setIsFormOpen(true);
  };

  let openEditForm = (question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  let closeForm = () => {
    setIsFormOpen(false);
  };

  //   add question
  let addQuestion = (data) => {
    let newQuestion = {
      id: Date.now(),
      title: data.title.trim(),
      category: data.category,
      difficulty: data.difficulty,
      status: data.status,
      note: data.note.trim(),
    };

    saveQuestions([newQuestion, ...questions]);
    toast.success("Question added");
  };

  //   edit question
  let updateQuestion = (id, data) => {
    let updated = questions.map((val) => {
      if (val.id === id) {
        return {
          ...val,
          title: data.title.trim(),
          category: data.category,
          difficulty: data.difficulty,
          status: data.status,
          note: data.note.trim(),
        };
      }
      return val;
    });

    saveQuestions(updated);
    toast.success("Changes saved");
  };

  //   delete question
  let deleteQuestion = (id) => {
    let updated = questions.filter((val) => val.id !== id);
    saveQuestions(updated);
    toast.warn("Question deleted");
  };

  //   Pending -> In Progress -> Completed -> Pending
  let cycleStatus = (id) => {
    let updated = questions.map((val) => {
      if (val.id === id) {
        return { ...val, status: STATUS_NEXT[val.status] };
      }
      return val;
    });

    saveQuestions(updated);
  };

  //   machine coding round status
  let changeMachineStatus = (status) => {
    setMachineStatus(status);
    localStorage.setItem("machineStatus", status);
    toast.success(`Machine coding set to ${status}`);
  };

  //   add the 15 questions from Sheet 01 (skips the ones already added)
  let loadSheetQuestions = () => {
    let addedTitles = questions.map((val) => val.title.toLowerCase());

    let newQuestions = SHEET_QUESTIONS.filter(
      (val) => !addedTitles.includes(val.title.toLowerCase())
    ).map((val, index) => ({
      ...val,
      id: Date.now() + index,
      status: "Pending",
    }));

    if (newQuestions.length === 0) {
      toast.info("Sheet 01 is already in your tracker");
      return;
    }

    saveQuestions([...questions, ...newQuestions]);
    toast.success(`${newQuestions.length} questions added from Sheet 01`);
  };

  //   delete everything
  let clearAllQuestions = () => {
    if (!window.confirm("Delete all questions? This cannot be undone.")) return;
    saveQuestions([]);
    toast.warn("All questions cleared");
  };

  return {
    questions,
    stats,
    machineStatus,
    isFormOpen,
    editingQuestion,
    openAddForm,
    openEditForm,
    closeForm,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    cycleStatus,
    changeMachineStatus,
    loadSheetQuestions,
    clearAllQuestions,
  };
};
