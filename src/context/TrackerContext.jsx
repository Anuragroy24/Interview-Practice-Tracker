import { createContext, useState } from "react";

export const Tracker = createContext();

export const TrackerProvider = ({ children }) => {
  // get the saved data from localStorage (empty if nothing saved yet)
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [machineStatus, setMachineStatus] = useState(
    localStorage.getItem("machineStatus") || "Pending"
  );

  // add / edit question modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  return (
    <Tracker.Provider
      value={{
        questions,
        setQuestions,
        machineStatus,
        setMachineStatus,
        isFormOpen,
        setIsFormOpen,
        editingQuestion,
        setEditingQuestion,
      }}
    >
      {children}
    </Tracker.Provider>
  );
};
