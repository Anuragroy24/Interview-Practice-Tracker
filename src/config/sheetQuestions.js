// the 15 questions from Weekly Interview Preparation, Sheet 01
// difficulty for the Git and technical ones is my own estimate, you can edit it in the app
export const SHEET_QUESTIONS = [
  // DSA
  { title: "Two Sum", category: "DSA", difficulty: "Easy", note: "LeetCode 1" },
  {
    title: "Remove Duplicates from Sorted Array",
    category: "DSA",
    difficulty: "Easy",
    note: "LeetCode 26",
  },
  {
    title: "Move Zeroes",
    category: "DSA",
    difficulty: "Easy",
    note: "LeetCode 283",
  },
  {
    title: "Rotate Array",
    category: "DSA",
    difficulty: "Medium",
    note: "LeetCode 189",
  },
  { title: "3Sum", category: "DSA", difficulty: "Medium", note: "LeetCode 15" },

  // Git and GitHub
  {
    title: "Wrong branch, correct work",
    category: "Git",
    difficulty: "Medium",
    note: "Move 4 commits from main to a feature branch. Pushed or not, and when cherry-pick fits.",
  },
  {
    title: "Merge conflict during PR",
    category: "Git",
    difficulty: "Medium",
    note: "Resolve it safely, verify nothing broke, merge or rebase trade-off.",
  },
  {
    title: "Secret accidentally committed",
    category: "Git",
    difficulty: "Hard",
    note: "Why deleting the commit is not enough, rotating the key, preventing repeats.",
  },
  {
    title: "PR review with new changes",
    category: "Git",
    difficulty: "Easy",
    note: "New commit vs amend or squash, risk of force-push, telling the reviewer.",
  },
  {
    title: "Recovering lost local work",
    category: "Git",
    difficulty: "Hard",
    note: "Investigate with reflog, verify the commit, habits that prevent loss.",
  },

  // Full-stack technical
  {
    title: "JavaScript async flow: fetch, setTimeout and the event loop",
    category: "Technical",
    difficulty: "Medium",
    note: "Microtask vs macrotask, where promises fit, why sync code freezes the UI.",
  },
  {
    title: "React re-renders: slow page from a busy parent",
    category: "Technical",
    difficulty: "Medium",
    note: "React.memo, useMemo and useCallback, and why not to memoize everything.",
  },
  {
    title: "Express request flow: protected route returns 401",
    category: "Technical",
    difficulty: "Medium",
    note: "Where auth middleware runs, 401 vs 403, how to debug the flow.",
  },
  {
    title: "Mongoose duplicate emails under a race condition",
    category: "Technical",
    difficulty: "Hard",
    note: "App-level check vs unique index, handling the duplicate-key error.",
  },
  {
    title: "Authorization: stopping access to another student's data",
    category: "Technical",
    difficulty: "Hard",
    note: "Authn vs authz, what the server trusts, where ImageKit fits in uploads.",
  },
];
