# Interview Practice Tracker

A responsive dashboard for tracking weekly interview preparation: DSA problems, Git scenarios and full-stack technical questions, plus the status of the machine coding round. Built for Sheryians Coding School, Weekly Interview Preparation, Sheet 01, Section 4.

- Live link: `<add your deployed link here>`
- Demo video: `<add your 1-2 minute demo link here>`

## Features

| Requirement from the sheet | What it does here |
| --- | --- |
| Dashboard | Total questions, completed DSA problems, completed interview questions (Git + Technical) and machine coding status, plus a block-by-block progress strip |
| Question tracker | Add, edit and delete questions with category (DSA / Git / Technical), difficulty (Easy / Medium / Hard) and status (Pending / In Progress / Completed) |
| Search + filters | Search by title or note, and filter by category, status and difficulty at the same time |
| Progress | Completion percentage (completed / total) shown as a number, a progress bar and one block per question |
| Persistence | Everything is saved to `localStorage` and restored after a refresh |
| Responsive UI | Sidebar on desktop, top bar and bottom tabs on mobile, add/edit form becomes a bottom sheet on small screens |
| States | Empty state, no-search-results state, form validation with clear messages |
| Polish | Component-based structure, one-click status change, keyboard focus styles, reduced-motion support |

Extras: one click loads the 15 questions from Sheet 01, and the machine coding status can be changed from the dashboard.

## Tech stack

React 19, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), React Router, React Hook Form, React Toastify, Lucide icons. No backend.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build in /dist
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Folder structure

```
src/
  components/   reusable UI (QuestionRow, ProgressStrip, StatCard, QuestionForm ...)
  config/       constants (categories, colours), the Sheet 01 questions
  context/      TrackerContext: questions, machine coding status, modal state
  hooks/        useTracker (stats + actions), useQuestionFilters, useQuestionForm
  layouts/      MainLayout: sidebar, mobile nav, page outlet, question modal
  pages/        DashboardPage, QuestionsPage
  routes/       AppRoutes
```

## How it works

- `TrackerContext` holds the state. On first load it reads `localStorage` with `JSON.parse(localStorage.getItem("questions")) || []`.
- `useTracker` is the single place for actions (`addQuestion`, `updateQuestion`, `deleteQuestion`, `cycleStatus` ...) and for the numbers shown on the dashboard. Every change goes through `saveQuestions`, which updates the state and calls `localStorage.setItem`.
- `useQuestionFilters` keeps the search text and filters and returns the filtered list, so the page only renders it.
- `useQuestionForm` wraps React Hook Form with the validation rules (required, 5 to 120 characters, no duplicates, note up to 160 characters).
- Each question is stored as `{ id, title, category, difficulty, status, note }`, where `id` is `Date.now()`.
- localStorage keys: `questions` and `machineStatus`.

## Assumptions

- Progress percentage counts only `Completed` questions: completed / total, rounded.
- "Completed interview questions" means completed Git and Technical questions. DSA is counted separately.
- Clicking the circle on a question moves it through Pending, In Progress, Completed and back to Pending. Use Edit to jump to a specific status.
- Difficulty for the Git and technical questions loaded from Sheet 01 is my own estimate. It can be edited.
- The machine coding round has its own status and is not part of the question percentage.
- Data lives in the browser only, so clearing site data resets the tracker.

## Deploying

The app uses client-side routing, so the host needs to serve `index.html` for every path. This is already configured:

- Vercel: `vercel.json`
- Netlify: `public/_redirects`

Build command `npm run build`, output directory `dist`.
