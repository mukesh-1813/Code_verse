import api from "./api";

// -----------------------------------------------------------------------
// These services target endpoints listed in the project spec that your
// backend hasn't built yet. Each function tries the real API call first
// (uncomment when ready) and currently resolves with mock data so every
// page in the app already works end-to-end. Once an endpoint is live,
// delete the mock branch and keep the api.* call.
// -----------------------------------------------------------------------

const mockDelay = (data, ms = 350) =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

export const courseService = {
  list: () =>
    mockDelay({
      results: [
        { id: 1, title: "Python for Beginners", category: "Python", progress: 68, lessons: 42, image: "🐍" },
        { id: 2, title: "DSA Masterclass", category: "DSA", progress: 34, lessons: 96, image: "🧠" },
        { id: 3, title: "Full-Stack Web Dev", category: "Web Dev", progress: 12, lessons: 120, image: "🌐" },
        { id: 4, title: "Java Fundamentals", category: "Java", progress: 0, lessons: 58, image: "☕" },
      ],
    }),
  // list: () => api.get("/courses/"),
};

export const problemService = {
  list: () =>
    mockDelay({
      results: [
        { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Map"], acceptance: 78, status: "Solved" },
        { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String", "Sliding Window"], acceptance: 41, status: "Attempted" },
        { id: 3, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Heap", "Linked List"], acceptance: 22, status: "Unsolved" },
        { id: 4, title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack"], acceptance: 65, status: "Solved" },
        { id: 5, title: "Course Schedule", difficulty: "Medium", tags: ["Graph", "Topological Sort"], acceptance: 38, status: "Unsolved" },
      ],
    }),
  // list: () => api.get("/problems/"),
  get: (id) =>
    mockDelay({
      id,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Map"],
      statement:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
      starterCode: "function twoSum(nums, target) {\n  // your code here\n}",
    }),
  // get: (id) => api.get(`/problems/${id}/`),
  submit: (id, payload) => mockDelay({ verdict: "Accepted", runtime: "48ms", memory: "42MB" }),
  // submit: (id, payload) => api.post(`/submissions/`, { problem: id, ...payload }),
};

export const submissionService = {
  list: () =>
    mockDelay({
      results: [
        { id: 1, problem: "Two Sum", language: "Python", status: "Accepted", runtime: "48ms", memory: "16MB", submittedAt: "2026-07-20" },
        { id: 2, problem: "Course Schedule", language: "C++", status: "Wrong Answer", runtime: "-", memory: "-", submittedAt: "2026-07-19" },
        { id: 3, problem: "Valid Parentheses", language: "Java", status: "Accepted", runtime: "12ms", memory: "38MB", submittedAt: "2026-07-18" },
      ],
    }),
  // list: () => api.get("/submissions/"),
};

export const contestService = {
  list: () =>
    mockDelay({
      live: [{ id: 1, title: "Weekly Contest 42", ends: "2h 14m" }],
      upcoming: [
        { id: 2, title: "Campus Coding Sprint", starts: "Tomorrow, 6:00 PM" },
        { id: 3, title: "AI Hack Challenge", starts: "Aug 2, 10:00 AM" },
      ],
      past: [{ id: 4, title: "Weekly Contest 41", participants: 812 }],
    }),
  // list: () => api.get("/contests/"),
};

export const leaderboardService = {
  list: () =>
    mockDelay({
      results: [
        { rank: 1, name: "Ananya Rao", college: "IIT Bombay", solved: 412, score: 9840 },
        { rank: 2, name: "Rohit Verma", college: "BITS Pilani", solved: 398, score: 9605 },
        { rank: 3, name: "Sara Khan", college: "NIT Trichy", solved: 379, score: 9310 },
        { rank: 4, name: "Aditya Singh", college: "VIT Vellore", solved: 355, score: 8920 },
        { rank: 5, name: "Meera Iyer", college: "IIT Delhi", solved: 341, score: 8710 },
      ],
    }),
  // list: () => api.get("/leaderboard/"),
};

export const analyticsService = {
  student: () =>
    mockDelay({
      solved: 128,
      accuracy: 74,
      streak: 9,
      rank: 214,
      weekly: [4, 6, 2, 8, 5, 9, 3],
      difficulty: { easy: 62, medium: 48, hard: 18 },
    }),
  // student: () => api.get("/analytics/student/"),
  faculty: () =>
    mockDelay({
      totalStudents: 246,
      activeCourses: 8,
      assignments: 32,
      pendingReviews: 14,
    }),
  // faculty: () => api.get("/analytics/faculty/"),
};

export const aiService = {
  review: (submissionId) =>
    mockDelay({
      score: 87,
      strengths: ["Clean variable naming", "Efficient use of hash map for O(n) lookup"],
      mistakes: ["No input validation for empty array"],
      suggestions: ["Consider early exit when target is unreachable", "Add comments for edge cases"],
      complexity: { time: "O(n)", space: "O(n)" },
    }),
  // review: (submissionId) => api.get(`/submissions/${submissionId}/ai-review/`),
  ask: (question) =>
    mockDelay({
      answer:
        "Great question! Break the problem into smaller steps, trace through one example by hand, then map that logic into code.",
    }),
};
