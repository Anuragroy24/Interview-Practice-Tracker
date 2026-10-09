import { Binary, GitBranch, Layers } from "lucide-react";

export const CATEGORIES = ["DSA", "Git", "Technical"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const STATUSES = ["Pending", "In Progress", "Completed"];

// clicking the status circle on a question moves it to the next status
export const STATUS_NEXT = {
  Pending: "In Progress",
  "In Progress": "Completed",
  Completed: "Pending",
};

export const DIFFICULTY_LEVEL = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

// every category has its own colour, icon and display name
export const CATEGORY_STYLES = {
  DSA: {
    icon: Binary,
    fullName: "DSA problems",
    chip: "bg-dsa/10 text-dsa",
    bar: "bg-dsa",
    cell: "text-dsa-light",
  },
  Git: {
    icon: GitBranch,
    fullName: "Git and GitHub",
    chip: "bg-git/10 text-git",
    bar: "bg-git",
    cell: "text-git-light",
  },
  Technical: {
    icon: Layers,
    fullName: "Full-stack technical",
    chip: "bg-tech/10 text-tech",
    bar: "bg-tech",
    cell: "text-tech-light",
  },
};

export const STATUS_STYLES = {
  Pending: "bg-slate-100 text-slate-700",
  "In Progress": "bg-amber-100 text-amber-800",
  Completed: "bg-emerald-100 text-emerald-800",
};

// shared by the list header and every row so the desktop columns line up
export const ROW_GRID =
  "md:grid-cols-[2rem_minmax(0,1fr)_7.5rem_7rem_8rem_5rem]";
