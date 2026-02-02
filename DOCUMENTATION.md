# WANAC Coaching Platform — Full Documentation

**Version:** 0.1.0  
**Last updated:** February 2025

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Authentication & Roles](#5-authentication--roles)
6. [Routes & Pages](#6-routes--pages)
7. [API Layer & Services](#7-api-layer--services)
8. [Key Features](#8-key-features)
9. [Environment & Configuration](#9-environment--configuration)
10. [Deployment](#10-deployment)
11. [Development Guide](#11-development-guide)

---

## 1. Overview

**WANAC Coaching Platform** is a Next.js web application built to support U.S. veterans in their transition from military service. It provides:

- **AI-powered coaching insights** — Chat and AI assistant for personalized guidance
- **Interactive Life Score assessments** — Daily and whole-life assessments
- **Eisenhower Matrix task management** — Priority-based task management
- **Journaling and self-reflection** — Morning, evening, weekly, and monthly prompts; - **365-Day Journaling** (Growth Prompts + Weekly Review)
- **Secure scheduling and session management** — Session booking, notes, resources
- **Fireteams** — Small support/discussion groups with experiences, agendas, and video meetings
- **Community** — Forums, events, and engagement for veterans and coaches
- **Career Compass** — Application tracking, employers, materials, interviews, research tools (salary, offers, outcomes)
- **Education Compass** — Program/semester progress, modules, sessions, assignments, credits/GPA (PLEP-aligned)
- **Role-based dashboards** — Separate experiences for **Clients**, **Coaches**, and **Admins**

The platform targets veterans, coaches, and administrators with distinct UIs and permissions.

---

## 2. Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        WANAC Platform (Next.js)                   │
├─────────────────────────────────────────────────────────────────┤
│  Public Pages    │  /login, /signup  │  Client  │  Coach  │ Admin │
│  (marketing,     │  (auth)           │  /client │ /coach  │/admin │
│   howwehelp,     │                   │          │         │       │
│   programs)      │                   │          │         │       │
└────────┬─────────┴────────┬─────────┴────┬─────┴────┬────┴───────┘
         │                   │              │          │
         ▼                   ▼              ▼          ▼
┌─────────────────────────────────────────────────────────────────┐
│  ClientLayoutWrapper → Navbar / Footer / ChatComponent / Lenis   │
│  Dashboard layouts → DashboardMobileContext (client/coach)       │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  API Services (src/services/api/)                                 │
│  config.ts → axios instance, BASE_URL, Bearer token, 401 redirect │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend API (wanac-api.kuzasports.com)                          │
│  REST: /api/v1/auth, sessions, fireteams, programs, cohorts, etc. │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **Client-side auth:** JWT stored in `localStorage` as `auth_token`; user info as `wanacUser`.
- **Role-based routing:** Login redirects to `/client/dashboard`, `/coach`, or `/admin` based on `userType`.
- **Layout wrapper:** `ClientLayoutWrapper` conditionally shows Navbar, Footer, and chat on most routes; excludes login, signup, dashboard paths, etc.
- **API base URL:** Centralized in `src/services/api/config.ts`; all services use the shared `apiClient` with interceptors.

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | JavaScript (JSX), TypeScript (services, config, types) |
| **Styling** | Tailwind CSS 4, PostCSS, tw-animate-css, globals.css |
| **UI / Motion** | Radix UI (dialog, slot), Framer Motion, MUI (icons/material), Lucide React, Vaul, Lenis (smooth scroll) |
| **Forms** | React Hook Form, Zod, @hookform/resolvers |
| **HTTP** | Axios (apiClient in config.ts) |
| **Auth** | JWT in localStorage, Google OAuth (@react-oauth/google, jwt-decode) |
| **Video / Meetings** | Jitsi (meet.jit.si), custom hooks and components for fireteam experiences |
| **AI** | OpenAI (API route `/api/chat`), optional custom AI (ai.service.ts) |
| **Charts / Timeline** | Recharts, react-vertical-timeline-component |
| **Toasts** | react-hot-toast, Sonner |
| **Drag & Drop** | @hello-pangea/dnd |
| **3D (optional)** | @react-three/fiber, @react-three/drei |
| **Backend** | External REST API (Laravel or similar) at `https://wanac-api.kuzasports.com/` |
| **Deployment** | Azure Web App (wanac-web-prod) via GitHub Actions |

---

## 4. Project Structure

```
wanac-platform/
├── .env.example                 # Environment variable template
├── .github/workflows/           # CI/CD (Azure deploy on push to main)
├── components/                  # Shared React components
│   ├── Navbar.jsx, Footer.jsx
│   ├── ChatComponent.jsx, LenisSmoothScroll.jsx
│   ├── dashboardcomponents/    # Sidebars, modals, FireteamManagement, etc.
│   └── communities/
├── public/                      # Static assets (images, SVG, PDF)
├── scripts/                     # Utilities (e.g. extract-journal-data.js)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.jsx           # Root layout (Toaster, ClientLayoutWrapper)
│   │   ├── page.jsx             # Homepage (landing)
│   │   ├── ClientLayoutWrapper.jsx
│   │   ├── login/page.jsx
│   │   ├── signup/page.jsx
│   │   ├── api/                 # Next.js API routes
│   │   │   ├── chat/route.js    # OpenAI chat proxy
│   │   │   └── jitsi/generate-token/route.js
│   │   ├── admin/               # Admin dashboard (cohorts, fireteams, programs, sessions, etc.)
│   │   ├── client/              # Client dashboard (dashboard, fireteam, journal, session, etc.)
│   │   ├── coach/               # Coach dashboard (clients, sessions, community, etc.)
│   │   └── pages/               # Marketing/static (howwehelp, blogs, donate, program pages)
│   ├── components/ui/           # Reusable UI (button, card, dialog, input)
│   ├── contexts/                # DashboardMobileContext
│   ├── data/                    # JSON data
│   ├── lib/                     # Utilities (error handling, etc.)
│   ├── services/api/            # API client and all domain services
│   └── types/                   # TypeScript types (e.g. evaluation)
├── next.config.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── DOCUMENTATION.md             # This file
```

---

## 5. Authentication & Roles

### Login Flow

1. User visits `/login`, selects role: **Client**, **Coach**, or **Admin**.
2. Credentials (email, password, role) are sent to `https://wanac-api.kuzasports.com/api/v1/auth/login`.
3. On success:
   - `data.token` → `localStorage.setItem('auth_token', data.token)`.
   - `data.user` + `userType` → `localStorage.setItem('wanacUser', JSON.stringify({ ...data.user, userType }))`.
4. Redirect:
   - **client** → `/client/dashboard`
   - **coach** → `/coach`
   - **admin** → `/admin`

Google OAuth is available on the login page via `@react-oauth/google` and `googleAuthService`; JWT is decoded with `jwt-decode`.

### API Authentication

- `src/services/api/config.ts` defines an Axios instance with:
  - **Request interceptor:** Reads `localStorage.getItem('auth_token')` and sets `Authorization: Bearer <token>`.
  - **Response interceptor:** On 401, clears `auth_token` and redirects to `/login`.

All service calls that use `apiClient` therefore send the JWT automatically.

### Roles Summary

| Role   | Redirect after login | Typical use |
|--------|------------------------|-------------|
| Client | `/client/dashboard`    | Sessions, journal, life scores, fireteams, AI chatbot, task management, career/education tools |
| Coach  | `/coach`               | Clients, sessions, fireteams, community, resources, feedback |
| Admin  | `/admin`               | Cohorts, fireteams, programs, sessions, coaches, clients, analytics, settings |

---

## 6. Routes & Pages

### Public & Auth

| Path | Description |
|------|-------------|
| `/` | Landing page (hero, programs, features, testimonials, community CTA) |
| `/login` | Login (email/password + role; Google OAuth) |
| `/signup` | Registration |

### Client (`/client/*`)

| Path | Description |
|------|-------------|
| `/client/dashboard` | Main client dashboard |
| `/client/accountsettings` | Account settings |
| `/client/aichatbot` | AI chatbot |
| `/client/aiinsights` | AI insights |
| `/client/calendar` | Calendar |
| `/client/community`, `/client/community/communities`, `.../communities/[id]` | Community |
| `/client/fireteam` | Fireteam home; experiences and meetings |
| `/client/fireteam/experience/[experienceid]` | Single experience (e.g. Jitsi meeting) |
| `/client/fireteam/experience/[experienceid]/evaluation` | Post-experience evaluation |
| `/client/journal` | Journaling |
| `/client/lifescores` | Life Score assessments |
| `/client/mycareercompass/*` | Career compass: activity stream, employers, application management, applied, interview questions, target employers, research tools (offer timeline, outcomes index, salary database), AFI and job postings |
| `/client/myeducationcompass` | Education compass (PLEP-aligned: program, modules, sessions, assignments, credits/GPA) |
| `/client/session` | Session (e.g. recorder, file upload) |
| `/client/taskmanagement` | Task management (Eisenhower Matrix) |
| `/client/upcomingevents` | Upcoming events |

### Coach (`/coach/*`)

| Path | Description |
|------|-------------|
| `/coach` | Coach dashboard |
| `/coach/clients` | Client list |
| `/coach/coachingtips` | Coaching tips |
| `/coach/community` | Community |
| `/coach/coursemanagement` | Course management |
| `/coach/feedback` | Feedback |
| `/coach/fireteammanagement` | Fireteam management |
| `/coach/messages` | Messages |
| `/coach/progress` | Progress |
| `/coach/resources` | Resources |
| `/coach/sessions`, `/coach/sessions/all`, `/coach/sessions/fullviewsession/[id]` | Sessions |
| `/coach/sessions/live-session`, `/coach/sessions/meeting` | Live session / meeting |
| `/coach/unitsmanagement` | Units management |

### Admin (`/admin/*`)

| Path | Description |
|------|-------------|
| `/admin` | Admin dashboard |
| `/admin/analytics` | Analytics |
| `/admin/announcement`, `/admin/announcements` | Announcements |
| `/admin/cohortmanagement`, `/admin/cohortmanagement/[id]` | Cohort management |
| `/admin/community` | Community |
| `/admin/fireteammanagement`, `/admin/fireteammanagement/[id]`, `.../experience/[experienceId]` | Fireteams and experiences |
| `/admin/manageclients` | Client management |
| `/admin/managecoaches` | Coach management |
| `/admin/manageusers` | User management |
| `/admin/messages` | Messages |
| `/admin/programmanagement`, `/admin/programmanagement/programdetails` | Programs |
| `/admin/sessions` | Sessions |
| `/admin/settings` | Settings |

### Marketing / Static (`/pages/*`)

Examples: `/pages/howwehelp`, `/pages/blogs`, `/pages/donate`, `/pages/helpcenter`, `/pages/ourstory`, program pages (e.g. `/pages/wanacplep`, `/pages/wanaplca`, `/pages/wanappc`, `/pages/vetaacademy`), intake/forms (e.g. `/pages/cohortapplication`, `/pages/programintakeform`), etc.

---

## 7. API Layer & Services

### Config

- **File:** `src/services/api/config.ts`
- **BASE_URL:** `https://wanac-api.kuzasports.com/` (or overridden).
- **apiClient:** Axios instance with `withCredentials: true`, Bearer token from `localStorage`, and 401 → clear token + redirect to `/login`.

### Exports

`src/services/api/index.ts` re-exports: auth, profile, sessions, tasks, types, habits, ai, notification. Other services are imported directly from their files.

### Service Overview

| Service | Path | Purpose |
|---------|------|---------|
| **auth.service** | `auth.service.ts` | register, login, resetPassword, forgotPassword, updatePassword, logout; stores token in localStorage on login |
| **profile.service** | `profile.service.ts` | Profile CRUD |
| **sessions.service** | `sessions.service.ts` | Sessions CRUD, notes, resources, members, file upload for resources |
| **tasks.service** | `tasks.service.ts` | Task management (Eisenhower) |
| **habits.service** | `habits.service.ts` | Habits |
| **journal.service** | `journal.service.ts` | Journals CRUD (title, content, prompt_number, day_number); supports 365-Day Growth Prompts and Weekly Review |
| **ai.service** | `ai.service.ts` | Optional custom AI client (NEXT_PUBLIC_AI_API_KEY, NEXT_PUBLIC_AI_API_URL) |
| **notification.service** | `notification.service.ts` | Notifications |
| **clients.service** | `clients.service.ts` | getClients, searchClients |
| **cohort.service** | `cohort.service.ts` | getCohorts, addCohortMember (programs/cohort-member), getCoaches |
| **programs.service** | `programs.service.ts` | Programs CRUD, addUnit, getUnitsByProgramId (uses axios + getAuthHeaders) |
| **fireteam.service** | `fireteam.service.ts` | getFireteams, getFireteam, add/update/delete fireteam, members, objectives |
| **experience.service** | `experience.service.ts` | getExperiences, add/update/delete experience, agenda steps, exhibits |
| **meeting.service** | `meeting.service.ts` | getMeetingLink, saveMeetingLink, startSession, endSession, uploadRecording, getRecordings, getRecordingSummaryByRole, deleteRecording |
| **community.service** | `community.service.ts` | Community APIs |
| **events.service** | `events.service.ts` | Events |
| **recording.service** | `recording.service.ts` | Recordings |

### Types (`src/services/api/types.ts`)

- Auth: `RegisterRequest`, `LoginRequest`, `ResetPasswordRequest`, `ForgotPasswordRequest`, `AuthResponse`.
- Profile: `Profile`.
- Session: `Session`, `SessionNote`, `SessionResource`.
- Task: `Task`, `Priority` (Eisenhower).
- Community: `Post`, `Comment`.

### Next.js API Routes

- **POST `/api/chat`** — Receives `{ message }`, calls OpenAI `gpt-3.5-turbo`, returns `{ reply }`. Uses `OPENAI_API_KEY`.
- **POST/GET `/api/jitsi/generate-token`** — Jitsi JWT generation (body: roomName, userId, userName, etc.). JWT logic is stubbed; env: `JITSI_AUTH_TYPE` (e.g. `jaas` / `self-hosted`).

---

## 8. Key Features

### Fireteams & Experiences

- **Fireteams** are small groups (e.g. per cohort) with title, description, date, time, link.
- **Experiences** belong to a fireteam: title, experience description, link, agenda, exhibits; can have Jitsi meetings.
- **Meeting flow:** `meeting.service` gets or generates meeting link (Jitsi domain from `NEXT_PUBLIC_JITSI_DOMAIN`), starts/ends session, uploads recordings; recording summaries are role-based (admin/coach/client).
- **Client:** Fireteam list → experience → join meeting → evaluation.
- **Admin:** Create/edit cohorts, fireteams, experiences; manage agenda steps and exhibits; view recordings/summaries.

### AI

- **In-app chat:** `ChatComponent` (and client AI chatbot page) can call `/api/chat` (OpenAI).
- **Optional:** `ai.service.ts` for a custom AI backend when `NEXT_PUBLIC_AI_API_KEY` and `NEXT_PUBLIC_AI_API_URL` are set.

### 365-Day Journaling

- **Location:** `/client/journal`; data: `src/data/journalPrompts.json` (365 prompts), `src/data/weeklyActions.json`.
- **Tabs:** Morning Mindset, Evening Review, **Growth Prompts** (365-day), **Weekly Review**, Monthly Review.
- **Growth Prompts (365 Days of Journaling):**
  - One prompt per day from a 365-prompt set (Rossi Fox–style journal writing ideas).
  - Day is derived from calendar day-of-year or from the user’s sequential day (current day = count of growth entries + 1).
  - Entries store `prompt_number` and `day_number` via `journal.service` (`addJournal` / `updateJournal`).
  - 24-hour cooldown: next prompt available after 24h; UI shows countdown (“Next prompt available in: Xh Xm”).
  - “Another prompt” lets users pick an alternate prompt; “Next prompt” advances to the next sequential day (with confirm).
- **Weekly Review:**
  - One weekly action per week (week-of-year); 7-day cooldown and countdown to next week.
- **UI:** List/card view, edit/delete, export (JSON), view entry detail with day/prompt info for growth entries.
- **API:** `journal.service` — getJournals, addJournal, updateJournal, deleteJournal with `title`, `content`, `prompt_number`, `day_number`.

### Life Scores & Journaling (general)

- Life Score assessments (daily/whole life) and the remaining journal tabs (Morning, Evening, Monthly) are implemented in the client dashboard and use the backend via the appropriate services.

### Career Compass

- **Location:** `/client/mycareercompass` and sub-routes; client dashboard entry point.
- **Purpose:** Central place for veterans to manage job search and career transition (applications, employers, materials, interviews, research).
- **Overview (Career Progress):** Metrics for total applications, interviews scheduled, target companies, network contacts; application status (pending, accepted, rejected).
- **Sub-sections / routes:**
  - **Activity Stream** — `/client/mycareercompass/activitystream`
  - **Employers** — `/client/mycareercompass/employers`
  - **Application Management** — `/client/mycareercompass/applicationmanagement`
  - **Applied** — `/client/mycareercompass/applied`
  - **Interview Questions** — `/client/mycareercompass/interviewquestions`
  - **Target Employers** — `/client/mycareercompass/targetemployers`
  - **Research Tools** — `/client/mycareercompass/researchtools` (parent)
  - **Offer Timeline** — `/client/mycareercompass/researchtools/offertimeline`
  - **Outcomes Index** — `/client/mycareercompass/researchtools/outcomesindex`
  - **Salary Database** — `/client/mycareercompass/researchtools/salarydatabase`
  - **AFI and Job Postings** — `/client/mycareercompass/afiandjobposting`
- **Features:** Application tracking, target employer list, contacts, application materials (resume, cover letter, portfolio, references), interview prep, and research (offers, outcomes, salary). Data is currently client-side/mock; backend integration can be added for persistence.

### Education Compass

- **Location:** `/client/myeducationcompass`; client dashboard.
- **Purpose:** Education pathway progress (PLEP-aligned): program, semester, credits, GPA, modules, sessions, and assignments.
- **Features:**
  - Program overview: title (e.g. PLEP), duration, current semester, total/completed credits, GPA.
  - **Modules:** Each module has code, credits, status (completed / in-progress / upcoming), progress %, sessions (lecture/lab, date, duration, status), and assignments (due date, points, status, grade).
  - **Upcoming sessions:** Next sessions across modules with title, module, date, time, type.
  - Progress and completion tracking per module and assignment.
- **Data:** Currently in-page/mock; can be wired to programs/cohort backend for real PLEP progress.

### Task Management

- Eisenhower Matrix priorities and task CRUD via `tasks.service` and types (`Priority`, `Task`).

### Sessions (Coaching)

- Sessions have notes and resources; resources can be file uploads. Session members (clients) are assignable. Admins/coaches manage sessions; clients view/join their sessions.

### Layout & UX

- **Lenis** used for smooth scroll on the main app content.
- **DashboardMobileContext** toggles mobile sidebar state for client and coach dashboards.
- **ClientLayoutWrapper** hides Navbar/Footer/ChatComponent on login, signup, and dashboard paths listed in `excludedPaths`.

---

## 9. Environment & Configuration

### `.env.example`

```env
# WANAC API (main backend)
NEXT_PUBLIC_API_URL=

# OpenAI (transcription, summaries, chat)
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-your-key
OPENAI_API_KEY=sk-proj-your-key
NEXT_PUBLIC_OPENAI_URL=https://api.openai.com/v1
OPENAI_API_URL=https://api.openai.com/v1

# Jitsi (video meetings)
NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=

# Optional: custom AI service (ai.service.ts)
# NEXT_PUBLIC_AI_API_URL=
# NEXT_PUBLIC_AI_API_KEY=
```

For local development, copy to `.env.local` and set real values. The app uses `BASE_URL` in code (e.g. `https://wanac-api.kuzasports.com/`); override if your API base differs.

### Next.js

- **next.config.ts:** `images.unoptimized: true` (e.g. for static export or specific image usage).

---

## 10. Deployment

- **GitHub Actions:** `.github/workflows/main_wanac-web-prod.yml`
  - **Trigger:** Push to `main` or workflow_dispatch.
  - **Build:** Node 24, `npm ci`, `npm run build`, then create a zip (production deps only).
  - **Deploy:** Azure login (secrets for client-id, tenant-id, subscription-id), deploy to Azure Web App `wanac-web-prod`, slot `Production`.
- **App:** Next.js run with `npm run start` (or the start script in package.json) on the Azure Web App.

---

## 11. Development Guide

### Setup

```bash
npm install
cp .env.example .env.local   # edit with real keys/URLs
npm run dev
```

- **Dev server:** `next dev --turbopack` (port 3000 by default).
- **Build:** `npm run build`
- **Start (production):** `npm run start`
- **Lint:** `npm run lint`

### Scripts (package.json)

- `dev` — Start dev server with Turbopack
- `build` — Production build
- `start` — Run production server
- `lint` — Next.js lint
- `postinstall` — Runs `next build` after install (can be removed if not desired)

### Adding a New API Service

1. Create a file in `src/services/api/` (e.g. `mydomain.service.ts`).
2. Use `import { apiClient } from './config'` and call `apiClient.get/post/put/delete` with the correct backend path.
3. Optionally add types in `types.ts` and export from `index.ts` if you want the service in the public API surface.

### Adding a New Role or Dashboard

1. Add login redirect in `src/app/login/page.jsx` (e.g. in `dashboardPaths`).
2. Create `src/app/<role>/layout.jsx` and pages under `src/app/<role>/`.
3. Ensure protected routes check `wanacUser` / `auth_token` and redirect to `/login` when missing.

---

## Appendix: Key Files Quick Reference

| Purpose | File(s) |
|--------|--------|
| Root layout | `src/app/layout.jsx` |
| Layout wrapper (navbar, footer, chat) | `src/app/ClientLayoutWrapper.jsx` |
| Login | `src/app/login/page.jsx` |
| Homepage | `src/app/page.jsx` |
| API client & interceptors | `src/services/api/config.ts` |
| Auth (login, logout, token) | `src/services/api/auth.service.ts` |
| Shared types | `src/services/api/types.ts` |
| OpenAI chat API | `src/app/api/chat/route.js` |
| Jitsi token API | `src/app/api/jitsi/generate-token/route.js` |
| Fireteam + experience logic | `fireteam.service.ts`, `experience.service.ts`, `meeting.service.ts` |
| 365-Day Journaling (prompts, weekly) | `src/app/client/journal/page.jsx`, `src/data/journalPrompts.json`, `src/data/weeklyActions.json`, `journal.service.ts` |
| Career / Education Compass | `src/app/client/mycareercompass/`, `src/app/client/myeducationcompass/page.jsx` |
| Deployment | `.github/workflows/main_wanac-web-prod.yml` |

---

*This documentation reflects the WANAC Coaching Platform codebase as of February 2025. For backend API details, refer to the backend docs (e.g. https://wanac-api.kuzasports.com/docs if available).*
