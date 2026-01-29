# WANAC Coaching Platform - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Running the Application](#running-the-application)
7. [API Integration](#api-integration)
8. [User Roles & Dashboards](#user-roles--dashboards)
9. [Core Features](#core-features)
10. [Components Overview](#components-overview)
11. [Services](#services)
12. [Authentication](#authentication)
13. [Environment Variables](#environment-variables)
14. [Deployment](#deployment)
15. [Development Guidelines](#development-guidelines)

---

## Project Overview

**WANAC Coaching Platform** is a comprehensive Next.js web application designed to support U.S. veterans in their transition from military service. The platform provides:

- **AI-powered coaching insights** leveraging OpenAI API
- **Interactive Life Score assessments** for whole-life evaluation
- **Eisenhower Matrix-based task management** for priority organization
- **Journaling and self-reflection** with guided prompts
- **Secure session scheduling** and session management
- **Community engagement** features for veterans and coaches
- **Video conferencing** via Jitsi Meet integration
- **Multiple user roles** (Client, Coach, Admin)

**Target Users:** U.S. veterans, coaches, and administrators managing the coaching ecosystem.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15.2.4 with React 19
- **Styling:** Tailwind CSS 4.1.4, PostCSS 4.1.4
- **UI Components:** Material-UI (MUI) 7.3.1, Headless UI, Radix UI
- **State Management:** React Context API
- **Form Handling:** React Hook Form, Yup validation
- **HTTP Client:** Axios 1.9.0
- **Authentication:** Google OAuth (@react-oauth/google), JWT via localStorage
- **Real-time:** Socket.io integration via chat components
- **Video Conferencing:** Jitsi Meet integration
- **3D Graphics:** Three.js (@react-three/fiber, @react-three/drei)
- **Animations:** Framer Motion 12.6.2
- **Icons:** React Icons, Lucide React
- **Charts:** Recharts 2.15.3
- **Drag & Drop:** @hello-pangea/dnd 18.0.1
- **Calendar:** React Day Picker 9.8.1
- **Notifications:** React Hot Toast 2.5.2

### Backend (External)
- **API:** RESTful API hosted at `https://wanac-api.kuzasports.com/`
- **Authentication:** JWT tokens via Bearer scheme
- **Integrations:** Google Calendar API, OpenAI API, Jitsi Meet

### Database
- **Primary:** MySQL (hosted on backend server)

### Deployment
- **Frontend Hosting:** Vercel (configured for Next.js)
- **Backend Hosting:** DigitalOcean/AWS
- **Version Control:** GitHub with GitFlow strategy
- **CI/CD:** GitHub Actions
- **Containerization:** Docker

---

## Project Structure

```
wanac-platform/
├── public/                    # Static assets
│   ├── jitsi-custom.css      # Jitsi customization
│   └── executivestaff/        # Staff images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.jsx          # Landing page
│   │   ├── layout.jsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── fonts.css         # Font definitions
│   │   ├── responsive-utils.css
│   │   ├── metadata.js       # SEO metadata
│   │   ├── admin/            # Admin dashboard pages
│   │   │   ├── page.jsx
│   │   │   ├── analytics/
│   │   │   ├── announcement/
│   │   │   ├── announcements/
│   │   │   ├── cohortmanagement/
│   │   │   ├── community/
│   │   │   ├── fireteammanagement/
│   │   │   ├── manageclients/
│   │   │   ├── managecoaches/
│   │   │   ├── manageusers/
│   │   │   ├── messages/
│   │   │   ├── programmanagement/
│   │   │   ├── sessions/
│   │   │   └── settings/
│   │   ├── client/           # Client dashboard pages
│   │   │   ├── accountsettings/
│   │   │   ├── aichatbot/
│   │   │   ├── aiinsights/
│   │   │   ├── calendar/
│   │   │   ├── community/
│   │   │   ├── dashboard/
│   │   │   ├── fireteam/
│   │   │   ├── journal/
│   │   │   ├── lifescores/
│   │   │   ├── mycareercompass/
│   │   │   ├── myeducationcompass/
│   │   │   ├── session/
│   │   │   ├── students/
│   │   │   ├── taskmanagement/
│   │   │   └── ...
│   │   ├── coach/            # Coach dashboard pages
│   │   ├── login/            # Authentication pages
│   │   ├── signup/           # Registration pages
│   │   ├── pages/            # Public pages
│   │   ├── api/              # Next.js API routes
│   │   │   ├── chat/         # OpenAI chat endpoint
│   │   │   └── jitsi/        # Jitsi JWT generation
│   │   └── ClientLayoutWrapper.jsx
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── dashboardcomponents/
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── CoachSidebar.jsx
│   │   │   ├── clienttopbar.jsx
│   │   │   ├── AIChatbot.jsx
│   │   │   ├── Journal.jsx
│   │   │   ├── LifeScores.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── FireteamManagement.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── VideoSessionModal.jsx
│   │   │   ├── ScheduleSessionModal.jsx
│   │   │   ├── WeeklyActionCard.jsx
│   │   │   ├── JournalingTipsPanel.jsx
│   │   │   ├── GuidedPromptCard.jsx
│   │   │   ├── JournalModeToggle.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── community.jsx
│   │   │   ├── widgets/
│   │   │   │   ├── CalendarWidget.jsx
│   │   │   │   ├── CommunityFeedWidget.jsx
│   │   │   │   └── TimeWidget.jsx
│   │   │   └── ...
│   │   ├── Navbar.jsx        # Main navigation
│   │   ├── Footer.jsx        # Footer component
│   │   ├── ChatComponent.jsx
│   │   ├── ChatComponentV2.jsx
│   │   ├── AIAssistantDemo.jsx
│   │   ├── ClassCard.jsx
│   │   ├── ExperienceCard.jsx
│   │   ├── CommunityChat.jsx
│   │   ├── CommunitySnapshot.jsx
│   │   └── ... (modal and card components)
│   ├── services/             # API services
│   │   ├── api/
│   │   │   ├── config.ts     # Axios configuration
│   │   │   ├── auth.service.ts
│   │   │   ├── profile.service.ts
│   │   │   ├── sessions.service.ts
│   │   │   ├── tasks.service.ts
│   │   │   ├── habits.service.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── journal.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── cohort.service.ts
│   │   │   ├── programs.service.ts
│   │   │   ├── experience.service.ts
│   │   │   ├── types.ts      # TypeScript interfaces
│   │   │   └── index.ts
│   │   └── ...
│   ├── lib/                  # Utilities & helpers
│   │   ├── utils.ts          # General utilities
│   │   ├── jitsi.utils.ts    # Jitsi utilities
│   │   ├── error.ts          # Error handling
│   │   ├── journalPrompts.ts # Guided journal prompts
│   │   └── weeklyActions.ts  # Weekly action data
│   ├── hooks/                # Custom React hooks
│   │   └── useGuidedJournalState.js
│   ├── types/                # TypeScript type definitions
│   │   └── evaluation.ts
│   └── pages/                # Legacy pages (if any)
├── components/               # Legacy components root
│   ├── communities/
│   ├── dashboardcomponents/  # Dashboard-specific components
│   └── ...
├── lib/                      # Legacy lib folder
│   ├── journalPrompts.ts
│   └── weeklyActions.ts
├── hooks/                    # Legacy hooks
│   └── useGuidedJournalState.js
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── components.json           # Component metadata
├── package.json              # Dependencies
├── LICENSE                   # MIT License
└── README.md                 # Project readme
```

---

## Features

### 1. **User Authentication & Authorization**
- Multi-role authentication (Client, Coach, Admin)
- Google OAuth integration
- JWT-based session management
- Secure password reset and forgot password flows
- Role-based access control (RBAC)

### 2. **Client Dashboard**
- **Personal Dashboard:** Overview of sessions, upcoming events, and key metrics
- **AI Chatbot:** Integrated OpenAI-powered coaching assistant
- **Journal:** Guided journaling with AI-suggested prompts
- **Life Scores:** Comprehensive assessment across multiple life dimensions
- **Task Management:** Eisenhower Matrix-based priority organization
- **Session Booking:** Schedule 1:1 sessions with coaches
- **Community:** Engage with other veterans and coaches
- **Messages:** In-app messaging system
- **Calendar:** View and manage appointments
- **Career Compass:** Career development guidance
- **Education Compass:** Educational resources and planning
- **Fireteam Management:** Group-based engagement features
- **My Coaches:** View and interact with assigned coaches
- **Library:** Access to resources and training materials
- **AI Insights:** Data-driven coaching recommendations

### 3. **Coach Dashboard**
- **Client Management:** View and manage assigned clients
- **Session Management:** Schedule and conduct sessions
- **Coaching Notes:** Document session outcomes and notes
- **Progress Tracking:** Monitor client's life score improvements
- **Resource Sharing:** Share materials and resources
- **Messages:** Client communication
- **Calendar:** Appointment management
- **Availability:** Set working hours and availability

### 4. **Admin Dashboard**
- **User Management:** Manage clients, coaches, and admins
- **Cohort Management:** Organize users into cohorts
- **Program Management:** Create and manage coaching programs
- **Session Management:** Oversee all sessions
- **Announcements:** Send platform-wide announcements
- **Community Management:** Moderate community discussions
- **Fireteam Management:** Manage team formations
- **Analytics:** View platform usage and metrics
- **Settings:** System configuration
- **Messages:** Admin communication system

### 5. **Video Conferencing**
- **Jitsi Meet Integration:** Secure, self-hosted video sessions
- **JWT Token Generation:** Authenticated access to meeting rooms
- **Multiple Authentication Options:** JaaS (Jitsi as a Service) or Self-Hosted
- **Session Recording:** Optional recording capabilities
- **Participant Controls:** Mute, camera control, screen sharing

### 6. **AI-Powered Features**
- **OpenAI Integration:** ChatGPT-powered coaching assistant
- **Journaling Prompts:** AI-suggested reflection questions
- **AI Insights:** Data-driven coaching recommendations
- **Behavioral Insights:** Pattern recognition from journal entries

### 7. **Community Features**
- **Community Posts:** Share experiences and advice
- **Comments & Discussions:** Engage with posts
- **Community Snapshot:** Highlight trending topics
- **Community Chat:** Real-time messaging

### 8. **Calendar & Scheduling**
- **Google Calendar Integration:** Sync availability
- **Session Booking:** Easy appointment scheduling
- **Availability Management:** Set working hours
- **Calendar Widget:** Quick view of upcoming events

### 9. **Responsive Design**
- Mobile-first approach
- Tailwind CSS responsive utilities
- Mobile navigation
- Touch-friendly interface

---

## Installation & Setup

### Prerequisites
- **Node.js:** v18 or higher
- **npm:** v9 or higher (or yarn)
- **Git:** For version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/wanac-platform.git
cd wanac-platform
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://wanac-api.kuzasports.com/
NEXT_PUBLIC_AI_API_URL=https://your-ai-api-url/
NEXT_PUBLIC_AI_API_KEY=your-ai-api-key

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Jitsi Configuration
NEXT_PUBLIC_JITSI_URL=https://meet.jit.si
JITSI_AUTH_TYPE=none  # Set to 'jaas' or 'self-hosted' when ready
# JAAS_APP_ID=your-jaas-app-id
# JAAS_PRIVATE_KEY=your-jaas-private-key
# JAAS_KID=your-jaas-kid

# Analytics (if applicable)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Other
NEXT_PUBLIC_APP_NAME=WANAC Coaching Platform
NODE_ENV=development
```

### Step 4: Verify Setup

```bash
npm run verify-setup
# or run the verify script
node verify-setup.js
```

---

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:3000` with hot-reload enabled.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Turbopack Mode (Experimental)
The development server uses Turbopack by default for faster builds:
```bash
npm run dev --turbopack
```

---

## API Integration

### Base Configuration
All API calls are configured through [src/services/api/config.ts](src/services/api/config.ts):

```typescript
const BASE_URL = 'https://wanac-api.kuzasports.com/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});
```

### Authentication
- **Method:** JWT Bearer token
- **Storage:** `localStorage` under key `auth_token`
- **Auto-Injection:** Interceptors automatically add token to all requests
- **Expiration Handling:** 401 responses redirect to login

### Available API Services

#### 1. **Authentication Service** (`auth.service.ts`)
```typescript
authService.register(data)        // User registration
authService.login(data)           // User login
authService.resetPassword(data)   // Reset password
authService.forgotPassword(data)  // Forgot password
authService.updatePassword(data)  // Update password
authService.logout()              // Clear auth token
```

#### 2. **Profile Service** (`profile.service.ts`)
```typescript
profileService.getProfile()       // Get user profile
profileService.updateProfile()    // Update user info
```

#### 3. **Sessions Service** (`sessions.service.ts`)
```typescript
sessionsService.getSessions()     // Get all sessions
sessionsService.getSession(id)    // Get specific session
sessionsService.addSession(data)  // Create new session
sessionsService.updateSession()   // Update session
sessionsService.deleteSession()   // Cancel/delete session
```

#### 4. **Tasks Service** (`tasks.service.ts`)
```typescript
tasksService.getTasks()           // Eisenhower Matrix tasks
tasksService.addTask(data)        // Create task
tasksService.updateTask()         // Update task
tasksService.deleteTask()         // Delete task
```

#### 5. **Journal Service** (`journal.service.ts`)
```typescript
journalService.getJournals()      // Get journal entries
journalService.addJournal(data)   // Create new entry
journalService.updateJournal()    // Update entry
journalService.deleteJournal()    // Delete entry
```

#### 6. **Habits Service** (`habits.service.ts`)
```typescript
habitsService.addDailyHabit()     // Track daily habits
habitsService.updateDailyHabit()  // Update habit
habitsService.getDailyHabitsHistory()
habitsService.addWholeLifeAssessment()
habitsService.getWholeLifeHistory()
```

#### 7. **AI Service** (`ai.service.ts`)
```typescript
aiService.callAIService(payload)  // Call OpenAI API
```

#### 8. **Notifications Service** (`notification.service.ts`)
```typescript
notificationService.sendNotification()
notificationService.getNotifications()
notificationService.markAsRead()
notificationService.deleteNotification()
```

#### 9. **Cohort Service** (`cohort.service.ts`)
```typescript
cohortService.getCohorts()        // Get all cohorts
cohortService.getCoaches()        // Get coach list
cohortService.addCohortMember()   // Add member to cohort
```

#### 10. **Programs Service** (`programs.service.ts`)
```typescript
ProgramsService.getAll()          // Get all programs
ProgramsService.getById()         // Get specific program
ProgramsService.create()          // Create new program
ProgramsService.update()          // Update program
ProgramsService.delete()          // Delete program
ProgramsService.addUnit()         // Add unit to program
```

### API Endpoints Structure
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/update-password

GET    /api/v1/sessions
POST   /api/v1/sessions/add
PUT    /api/v1/sessions/update/{id}
DELETE /api/v1/sessions/delete/{id}

GET    /api/v1/journals
POST   /api/v1/journals/add
PUT    /api/v1/journals/{id}
DELETE /api/v1/journals/{id}

GET    /api/v1/tasks
POST   /api/v1/tasks/add
PUT    /api/v1/tasks/{id}
DELETE /api/v1/tasks/{id}

GET    /api/v1/cohorts
POST   /api/v1/programs/cohort-member/add

GET    /api/v1/coaches
GET    /api/v1/programs
POST   /api/v1/programs/add
PUT    /api/v1/programs/update/{id}
DELETE /api/v1/programs/delete/{id}
```

---

## User Roles & Dashboards

### 1. **Client Role**
**Path:** `/client/dashboard`

**Features:**
- View assigned coaches
- Book and manage sessions
- Daily journaling with prompts
- Track life scores and metrics
- AI chatbot assistance
- Task management (Eisenhower Matrix)
- Community participation
- Message coaches and peers
- Access resources and library
- Career and education compass tools

**Key Components:**
- [DashboardSidebar.jsx](components/dashboardcomponents/DashboardSidebar.jsx)
- [clienttopbar.jsx](components/dashboardcomponents/clienttopbar.jsx)
- [Journal.jsx](components/dashboardcomponents/Journal.jsx)
- [LifeScores.jsx](components/dashboardcomponents/LifeScores.jsx)
- [AIChatbot.jsx](components/dashboardcomponents/AIChatbot.jsx)

### 2. **Coach Role**
**Path:** `/coach`

**Features:**
- View assigned clients
- Schedule coaching sessions
- Document session notes
- Track client progress
- Share resources
- Manage availability and calendar
- Message clients
- Generate coaching reports

**Key Components:**
- [CoachSidebar.jsx](components/dashboardcomponents/CoachSidebar.jsx)
- [ScheduleSessionModal.jsx](components/dashboardcomponents/ScheduleSessionModal.jsx)
- [VideoSessionModal.jsx](components/dashboardcomponents/VideoSessionModal.jsx)

### 3. **Admin Role**
**Path:** `/admin`

**Features:**
- Manage all users (clients, coaches, admins)
- Create and manage programs
- Organize cohorts
- Monitor all sessions
- Send announcements
- Moderate community content
- Manage fireteams
- View analytics and reports
- Configure platform settings

**Key Components:**
- [adminsidebar.jsx](components/dashboardcomponents/adminsidebar.jsx)
- Role management interfaces
- Analytics and reporting tools

---

## Core Features

### 1. **Journaling System**
**Location:** [lib/journalPrompts.ts](lib/journalPrompts.ts)

Features:
- Guided journaling prompts
- AI-suggested reflections
- Custom entries
- Journal history
- Search and filter
- Privacy controls

**Used by:**
- [Journal.jsx](components/dashboardcomponents/Journal.jsx)
- [JournalModeToggle.jsx](components/dashboardcomponents/JournalModeToggle.jsx)
- [JournalingTipsPanel.jsx](components/dashboardcomponents/JournalingTipsPanel.jsx)
- [GuidedPromptCard.jsx](components/dashboardcomponents/GuidedPromptCard.jsx)

### 2. **Life Score Assessment**
**Location:** [components/dashboardcomponents/LifeScores.jsx](components/dashboardcomponents/LifeScores.jsx)

Dimensions evaluated:
- Career/Work
- Relationships
- Health & Wellness
- Financial
- Personal Growth
- Community Engagement
- Mental Health
- Spiritual Well-being

### 3. **Task Management (Eisenhower Matrix)**
**Location:** [components/dashboardcomponents/](components/dashboardcomponents/)

Matrix Quadrants:
- **Urgent & Important** (Do First)
- **Not Urgent & Important** (Schedule)
- **Urgent & Not Important** (Delegate)
- **Not Urgent & Not Important** (Eliminate)

**Weekly Actions:**
- [lib/weeklyActions.ts](lib/weeklyActions.ts)
- [WeeklyActionCard.jsx](components/dashboardcomponents/WeeklyActionCard.jsx)

### 4. **Video Sessions**
**Location:** [components/dashboardcomponents/VideoSessionModal.jsx](components/dashboardcomponents/VideoSessionModal.jsx)

**API Routes:**
- [src/app/api/jitsi/generate-token/route.js](src/app/api/jitsi/generate-token/route.js)

**Features:**
- Secure JWT-authenticated rooms
- Support for JaaS and Self-Hosted Jitsi
- Moderator controls
- Session recording (optional)
- Participant management

### 5. **AI Chatbot**
**Location:** [components/dashboardcomponents/AIChatbot.jsx](components/dashboardcomponents/AIChatbot.jsx)

**API Integration:**
- OpenAI Chat Completions API
- [src/app/api/chat/route.js](src/app/api/chat/route.js)
- Real-time streaming responses

### 6. **Community Features**
**Location:** [components/CommunityChat.jsx](components/CommunityChat.jsx), [components/CommunitySnapshot.jsx](components/CommunitySnapshot.jsx)

**Features:**
- Create and share posts
- Comment and discuss
- Community feed
- Trending topics
- User profiles

### 7. **Messaging System**
**Location:** [components/dashboardcomponents/Messages.jsx](components/dashboardcomponents/Messages.jsx)

**Features:**
- Direct messaging
- Message history
- Read receipts
- File sharing

---

## Components Overview

### Layout Components
- **[Navbar.jsx](components/Navbar.jsx)** - Main navigation bar with role-based menu
- **[Footer.jsx](components/Footer.jsx)** - Platform footer with links and newsletter signup
- **[ClientLayoutWrapper.jsx](src/app/ClientLayoutWrapper.jsx)** - Layout wrapper for client pages

### Dashboard Components
- **[DashboardSidebar.jsx](components/dashboardcomponents/DashboardSidebar.jsx)** - Client sidebar navigation
- **[adminSidebar.jsx](components/dashboardcomponents/adminsidebar.jsx)** - Admin sidebar navigation
- **[CoachSidebar.jsx](components/dashboardcomponents/CoachSidebar.jsx)** - Coach sidebar navigation
- **[clienttopbar.jsx](components/dashboardcomponents/clienttopbar.jsx)** - Top bar for client dashboard

### Feature Components
- **[Journal.jsx](components/dashboardcomponents/Journal.jsx)** - Journaling interface
- **[LifeScores.jsx](components/dashboardcomponents/LifeScores.jsx)** - Life score assessment
- **[AIChatbot.jsx](components/dashboardcomponents/AIChatbot.jsx)** - AI assistant chat
- **[Messages.jsx](components/dashboardcomponents/Messages.jsx)** - Messaging system
- **[Bookings.jsx](components/dashboardcomponents/Bookings.jsx)** - Session bookings view
- **[FireteamManagement.jsx](components/dashboardcomponents/FireteamManagement.jsx)** - Fireteam management
- **[Discover.jsx](components/dashboardcomponents/Discover.jsx)** - Discovery/recommendation engine
- **[Library.jsx](components/dashboardcomponents/Library.jsx)** - Resource library
- **[Settings.jsx](components/dashboardcomponents/Settings.jsx)** - User settings

### Modal Components
- **[VideoSessionModal.jsx](components/dashboardcomponents/VideoSessionModal.jsx)** - Jitsi video session
- **[ScheduleSessionModal.jsx](components/dashboardcomponents/ScheduleSessionModal.jsx)** - Book session
- **[AddExperienceModal.jsx](components/AddExperienceModal.jsx)** - Add experience
- **[EditExperienceModal.jsx](components/EditExperienceModal.jsx)** - Edit experience
- **[ExperienceVideoModal.jsx](components/ExperienceVideoModal.jsx)** - Experience video player
- **[AddClassModal.jsx](components/AddClassModal.jsx)** - Add class

### Card Components
- **[ClassCard.jsx](components/ClassCard.jsx)** - Class/course display
- **[ExperienceCard.jsx](components/ExperienceCard.jsx)** - Experience display
- **[WeeklyActionCard.jsx](components/dashboardcomponents/WeeklyActionCard.jsx)** - Weekly action item
- **[GuidedPromptCard.jsx](components/dashboardcomponents/GuidedPromptCard.jsx)** - Journal prompt

### Chat & Community
- **[ChatComponent.jsx](components/ChatComponent.jsx)** - Chat interface (v1)
- **[ChatComponentV2.jsx](components/ChatComponentV2.jsx)** - Chat interface (v2)
- **[AIAssistantDemo.jsx](components/AIAssistantDemo.jsx)** - AI demo component
- **[CommunityChat.jsx](components/CommunityChat.jsx)** - Community messaging
- **[CommunitySnapshot.jsx](components/CommunitySnapshot.jsx)** - Community highlights

### Widgets
- **[CalendarWidget.jsx](components/dashboardcomponents/widgets/CalendarWidget.jsx)** - Calendar view
- **[CommunityFeedWidget.jsx](components/dashboardcomponents/widgets/CommunityFeedWidget.jsx)** - Feed widget
- **[TimeWidget.jsx](components/dashboardcomponents/widgets/TimeWidget.jsx)** - Time display

### Page Components
- **[LifeScorePreview.jsx](components/LifeScorePreview.jsx)** - Life score overview
- **[SessionBookingPreview.jsx](components/SessionBookingPreview.jsx)** - Booking preview
- **[GuidedBoardingIntro.jsx](components/GuidedBoardingIntro.jsx)** - Onboarding intro
- **[infographicWheel.jsx](components/infographicWheel.jsx)** - Data visualization wheel

---

## Services

All services are located in [src/services/api/](src/services/api/) with centralized configuration.

### Service Pattern
```typescript
export const serviceName = {
  async methodName(params: Type): Promise<ReturnType> {
    const response = await apiClient.get|post|put|delete('/endpoint', params);
    return response.data;
  }
};
```

### Error Handling
- Automatic 401 redirect to login on unauthorized access
- Axios interceptors for global error handling
- Toast notifications for user feedback

### Types
TypeScript interfaces defined in [src/services/api/types.ts](src/services/api/types.ts):

```typescript
// Auth Types
RegisterRequest
LoginRequest
ResetPasswordRequest
ForgotPasswordRequest
AuthResponse
Profile

// Session Types
Session
SessionNote
SessionResource

// Task Types
Task
Priority (Eisenhower Matrix quadrants)

// Post Types
Post
Comment
```

---

## Authentication

### Login Flow
1. User enters email, password, and user type (client/coach/admin)
2. POST to `/api/v1/auth/login`
3. Backend returns JWT token and user data
4. Token stored in `localStorage` under key `auth_token`
5. User redirected to appropriate dashboard
6. Token auto-injected in all subsequent requests via interceptor

**Location:** [src/app/login/page.jsx](src/app/login/page.jsx)

### Registration Flow
1. User fills registration form with personal info
2. Selects role (client/coach/admin)
3. POST to `/api/v1/auth/register`
4. Validation on both client and server sides
5. User can immediately log in with new credentials

**Location:** [src/app/signup/page.jsx](src/app/signup/page.jsx)

### Google OAuth
**Files:**
- [src/pages/api/auth/google.js](src/pages/api/auth/google.js) - Initiate OAuth
- [src/pages/api/auth/callback/google.js](src/pages/api/auth/callback/google.js) - Handle callback

**Flow:**
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. OAuth callback returns tokens
4. Tokens stored and used for future requests

### Session Management
- **Storage:** JWT token in `localStorage`
- **Expiration:** Handled by backend
- **Refresh:** Auto-redirect to login on 401 response
- **Logout:** Clear token from localStorage

---

## Environment Variables

### Required for Development

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://wanac-api.kuzasports.com/` |
| `NEXT_PUBLIC_AI_API_URL` | AI service base URL | `https://your-ai-api.com/` |
| `NEXT_PUBLIC_AI_API_KEY` | AI service API key | `sk-...` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | `GOCSPX-...` |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `http://localhost:3000/api/auth/callback/google` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

### Optional for Features

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_JITSI_URL` | Jitsi server URL | `https://meet.jit.si` |
| `JITSI_AUTH_TYPE` | `none`, `jaas`, or `self-hosted` | `none` |
| `JAAS_APP_ID` | JaaS app ID (if using JaaS) | - |
| `JAAS_PRIVATE_KEY` | JaaS private key | - |
| `JAAS_KID` | JaaS key ID | - |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | - |
| `NEXT_PUBLIC_APP_NAME` | App display name | `WANAC Coaching Platform` |

### Development vs Production

**.env.local** (Development):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/
NODE_ENV=development
```

**.env.production** (Production):
```env
NEXT_PUBLIC_API_URL=https://wanac-api.kuzasports.com/
NODE_ENV=production
```

---

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required variables
   - Separate values for preview/production if needed

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Auto-Deployment**
   - Vercel automatically deploys on push to `main` branch
   - Preview deployments for pull requests

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build & Run:**
```bash
docker build -t wanac-platform:latest .
docker run -p 3000:3000 --env-file .env.production wanac-platform:latest
```

### Manual Deployment (AWS/DigitalOcean)

1. **SSH into server**
2. **Clone repository**
   ```bash
   git clone https://github.com/your-org/wanac-platform.git
   ```
3. **Install dependencies**
   ```bash
   cd wanac-platform
   npm install
   ```
4. **Set environment variables**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```
5. **Build**
   ```bash
   npm run build
   ```
6. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "wanac" -- start
   pm2 save
   ```
7. **Configure Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Development Guidelines

### Code Structure
- **Components:** Functional components with hooks
- **Services:** Axios-based API service layer
- **State:** React Context API (minimal Redux)
- **Styling:** Utility-first Tailwind CSS
- **TypeScript:** Used for services and type definitions

### Naming Conventions
- **Components:** PascalCase (e.g., `Dashboard.jsx`)
- **Services:** camelCase (e.g., `authService.ts`)
- **Functions:** camelCase (e.g., `handleSubmit()`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `Z_INDEX`)
- **Variables:** camelCase (e.g., `userData`)

### File Organization
```
Feature/
├── index.jsx           # Main component
├── Component.module.css # Styles (if needed)
├── hooks/              # Feature-specific hooks
├── utils/              # Feature utilities
└── types.ts            # Feature types
```

### Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/user-story-description
   ```

2. **Make changes**
   ```bash
   git add .
   git commit -m "feat: add user story description"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/user-story-description
   ```

4. **Commit Message Format**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Code style
   - `refactor:` Code refactoring
   - `test:` Tests
   - `chore:` Build/dependency updates

### Development Checklist
- [ ] Features work on mobile and desktop
- [ ] No console errors or warnings
- [ ] API error handling implemented
- [ ] Loading states shown
- [ ] Error messages are user-friendly
- [ ] Accessibility standards met (WCAG)
- [ ] Unit tests written (if applicable)
- [ ] Code reviewed by team member
- [ ] Documented in commit message

### Testing
```bash
# Run tests (if configured)
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Common Issues & Solutions

**Issue:** "Cannot find module" error
```bash
npm install
npm run dev
```

**Issue:** API calls failing with CORS error
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend CORS configuration
- Ensure request includes proper headers

**Issue:** Authentication token not persisting
- Check if cookies are enabled
- Verify `localStorage` is accessible (not in iframe)
- Check Network tab in DevTools for Set-Cookie headers

**Issue:** Jitsi video not working
- Verify `NEXT_PUBLIC_JITSI_URL` is accessible
- Check JWT token generation endpoint
- Ensure `JITSI_AUTH_TYPE` environment variable is set

### Performance Optimization
- Use `next/image` for image optimization
- Implement code splitting with dynamic imports
- Optimize bundle size with webpack analysis
- Use React.memo for expensive components
- Implement virtualization for long lists
- Cache API responses where appropriate

---

## Contributing

1. Follow the development guidelines above
2. Ensure code passes linting: `npm run lint`
3. Write meaningful commit messages
4. Test changes thoroughly before submitting PR
5. Update documentation if adding new features
6. Request review from team members

---

## Support & Resources

- **Documentation:** See JITSI_JWT_GUIDE.md for Jitsi setup
- **Issues:** Report bugs in GitHub Issues
- **Discussion:** Use GitHub Discussions for questions
- **Backend API:** Refer to backend documentation

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Last Updated:** January 27, 2026
**Project Version:** 0.1.0
**Maintained by:** WANAC Development Team
