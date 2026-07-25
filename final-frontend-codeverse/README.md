# CodeVerse AI — Frontend

A complete React + Vite + Tailwind frontend for the CodeVerse AI platform, built
to plug directly into your Django REST backend.

## 1. Setup

```bash
cd codeverse-frontend
npm install
cp .env.example .env
```

Open `.env` and point it at your Django server:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## 2. What's already wired to your real backend

`src/services/authService.js` calls your actual auth endpoints:

| Function | Endpoint |
|---|---|
| `register()` | `POST /api/auth/register/` |
| `login()` | `POST /api/auth/login/` |
| `logout()` | `POST /api/auth/logout/` |
| `getProfile()` | `GET /api/auth/profile/` |
| `updateProfile()` | `PUT /api/auth/profile/` |
| `patchProfile()` | `PATCH /api/auth/profile/` |
| `changePassword()` | `POST /api/auth/change-password/` |
| `refresh()` | `POST /api/auth/refresh/` |

`src/services/api.js` is an Axios instance that:
- attaches the access token to every request automatically
- on a 401, calls `/auth/refresh/`, retries the original request once, and
  logs the user out if the refresh also fails

Login, Register, Forgot Password, Profile, and Settings (change password)
pages are fully functional against these endpoints — no mock data.

## 3. What's using placeholder/mock data (for now)

Everything your teammate hasn't built yet — courses, problems, submissions,
contests, leaderboard, analytics, AI review — lives in
`src/services/placeholderServices.js`. Each function already has the real
`api.get(...)` / `api.post(...)` call written and commented out right next to
the mock, e.g.:

```js
list: () => mockDelay({ results: [...] }),
// list: () => api.get("/problems/"),
```

As your backend ships each endpoint, delete the mock line and uncomment the
real one. No page code needs to change — every page reads from these service
functions, never straight from mock data.

## 4. Folder structure

```
src/
  components/
    common/     Navbar, Sidebar, Loader, EmptyState, nav config
    cards/      StatCard
  contexts/
    AuthContext.jsx      global auth state (user, login, logout, register)
  layouts/
    AuthLayout.jsx        split-screen layout for login/register/forgot
    DashboardLayout.jsx   sidebar + navbar shell for all logged-in pages
  routes/
    ProtectedRoute.jsx    route guard, optionally role-restricted
  services/
    api.js                 axios instance + token refresh
    authService.js          real auth endpoints
    placeholderServices.js  mock endpoints for everything else
  pages/
    auth/       Login, Register, ForgotPassword
    student/    Dashboard, Courses, Problems, ProblemDetail, Playground,
                AITutor, Contests, Leaderboard, Certificates
    faculty/    Dashboard, Courses, CreateProblem, Students, Contests
    admin/      Dashboard, Users, Courses, Problems, Reports, AdminSettings
    common/     Profile, Settings (shared across all 3 roles)
  App.jsx        full route tree, role-based redirects
  main.jsx       app entry, router + AuthProvider + toast setup
```

## 5. Roles & routing

- `/login`, `/register`, `/forgot-password` — public
- `/student/*` — requires `role === "STUDENT"`
- `/faculty/*` — requires `role === "FACULTY"`
- `/admin/*` — requires `role === "ADMIN"`
- Visiting `/` redirects to the right dashboard based on the logged-in
  user's role (or to `/login` if not authenticated).
- Visiting a route for the wrong role redirects to `/unauthorized`.

## 6. Theme

White background, indigo/teal accent, Sora for headings + Inter for body
text — deliberately not the dark theme from the original design brief, per
your request. All tokens live in `tailwind.config.js` and `src/index.css`
(`.btn-primary`, `.card`, `.input`, `.badge-*`, etc.) so restyling later is a
one-file change.

## 7. Not included yet (intentionally left simple)

- Monaco Editor — the code editor on Problem Detail / Playground is a plain
  `<textarea>` styled like an editor. Swap in `@monaco-editor/react` when
  you're ready; the run/submit handlers are already in place.
- Charts — dashboards use lightweight CSS bar charts instead of a charting
  library, to keep the bundle light. Swap in `recharts` if you want richer
  charts; the data shapes in `placeholderServices.js` are ready for it.
- Real-time features (live contest timers, notifications) are static UI for
  now.
