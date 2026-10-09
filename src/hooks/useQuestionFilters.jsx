import { useState } from "react";
import { useTracker } from "./useTracker";

export const useQuestionFilters = () => {
  const { questions } = useTracker();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  //   search + category + status + difficulty, all together
  let text = search.trim().toLowerCase();

  let filteredQuestions = questions.filter((val) => {
    let matchesSearch =
      val.title.toLowerCase().includes(text) ||
      val.note.toLowerCase().includes(text);
    let matchesCategory = category === "All" || val.category === category;
    let matchesStatus = status === "All" || val.status === status;
    let matchesDifficulty = difficulty === "All" || val.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
  });

  let hasActiveFilters =
    text !== "" || category !== "All" || status !== "All" || difficulty !== "All";

  let clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setDifficulty("All");
  };

  return {
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
  };
};
