<!-- e127d69b-1467-479b-aafc-f7bd51314679 2a70cc75-187c-456b-8434-ccbb9cd477eb -->
# Evaluation Page Implementation

## Overview

Create a comprehensive post-meeting evaluation page with visual analytics and Bloom's Taxonomy assessments. The page will display after users complete a fireteam experience and process the recording.

## Implementation Steps

### 1. Create Mock Data Structure

**File**: `src/types/evaluation.ts`

- Define TypeScript interfaces for evaluation data
- Include ConversationMap (timeline bubbles with participant comments)
- Include GroupBalanceScore (speaking time distribution)
- Include IndividualEvaluation (Bloom's Taxonomy assessments per rubric)
- Include ParticipantData (names, colors, talk times)

### 2. Create Evaluation Page Route

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/page.jsx`

- Create new Next.js page component
- Accept URL params: experienceId, fireteamId, recordingId, hasAI (boolean)
- Fetch data from meetingService API or use basic metrics if hasAI=false
- Show loading state while data loads
- Handle error states gracefully

### 3. Build Core Evaluation Components

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/components/ConversationMap.jsx`

- Implement bubble chart visualization using Chart.js or Recharts
- X-axis: timeline in MM:SS format
- Y-axis: comments shared
- Bubble size: depth of understanding
- Color-coded by participant
- Include legend with participant names/colors

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/components/GroupBalanceScore.jsx`

- Horizontal bar chart for talk time distribution
- Show average talk time as dashed line
- Display asymmetric discussion warning if imbalanced
- Tooltip showing exact minutes per participant

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/components/IndividualEvaluation.jsx`

- Display rubric-based evaluations
- Show Bloom's Taxonomy level badges (Remembering, Understanding, Applying, Analyzing, Evaluating, Creating)
- Bullet points of participant contributions
- "More Details" expandable sections
- Evaluation summary paragraph

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/components/RoleTabView.jsx`

- Tabbed interface for client/coach/admin views
- Different data display based on selected role
- Sync with user's actual role from localStorage

### 4. Modify Recording Upload to Return Recording ID

**File**: `src/app/client/fireteam/experience/hooks/useRecording.js`

- Update `processRecording` function to capture and return recording ID from API response
- Store recording ID in component state
- Pass recording ID to redirect URL

### 5. Update End Button Redirect Logic

**File**: `src/app/client/fireteam/experience/[experienceid]/page.jsx`

Update three functions:

**In `handleConfirmProcessRecording` (line 271-276)**:

```javascript
const handleConfirmProcessRecording = useCallback(async () => {
  setShowConfirmDialog(false);
  const recordingId = await handleProcessRecording(); // Modified to return ID
  leaveMeeting();
  
  const expId = searchParams?.get('id');
  const ftId = searchParams?.get('fireteamId');
  window.location.href = `/client/fireteam/experience/${expId}/evaluation?fireteamId=${ftId}&recordingId=${recordingId}&hasAI=true`;
}, [handleProcessRecording, leaveMeeting, searchParams]);
```

**In `handleCancelProcessRecording` (line 278-282)**:

```javascript
const handleCancelProcessRecording = useCallback(() => {
  setShowConfirmDialog(false);
  leaveMeeting();
  
  const expId = searchParams?.get('id');
  const ftId = searchParams?.get('fireteamId');
  window.location.href = `/client/fireteam/experience/${expId}/evaluation?fireteamId=${ftId}&hasAI=false`;
}, [leaveMeeting, searchParams]);
```

**In `handleLeaveMeeting` (line 252-269)**:

Keep existing logic, no changes needed (already prompts for recording processing)

### 6. Create Evaluation Data Hook

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/hooks/useEvaluationData.js`

- Custom hook to fetch evaluation data
- Use meetingService.getRecordingSummaryByRole() if hasAI=true
- Generate basic metrics from attendanceLog if hasAI=false
- Return loading, error, and data states
- Include mock data fallback for development

### 7. Add Chart Library

**File**: `package.json`

- Add recharts or chart.js for visualizations
- Add necessary dependencies

### 8. Style Evaluation Page

**File**: `src/app/client/fireteam/experience/[experienceid]/evaluation/page.jsx`

- Use Tailwind CSS matching existing design system
- Responsive layout with three-column grid (desktop)
- Stack vertically on mobile
- Color-coded Bloom's Taxonomy badges
- Professional card-based layout

## Key Technical Details

- Use Next.js 13+ app router conventions
- Maintain consistency with existing color palette (navy #002147, orange, yellow)
- Implement proper error boundaries
- Add loading skeletons for better UX
- Support role-based views (client, coach, admin) in tabs
- Fall back to basic metrics if AI processing was skipped
- Store recording ID in URL params for shareability

## Files to Create

1. `src/types/evaluation.ts` - TypeScript interfaces
2. `src/app/client/fireteam/experience/[experienceid]/evaluation/page.jsx` - Main page
3. `src/app/client/fireteam/experience/[experienceid]/evaluation/components/ConversationMap.jsx`
4. `src/app/client/fireteam/experience/[experienceid]/evaluation/components/GroupBalanceScore.jsx`
5. `src/app/client/fireteam/experience/[experienceid]/evaluation/components/IndividualEvaluation.jsx`
6. `src/app/client/fireteam/experience/[experienceid]/evaluation/components/RoleTabView.jsx`
7. `src/app/client/fireteam/experience/[experienceid]/evaluation/hooks/useEvaluationData.js`

## Files to Modify

1. `src/app/client/fireteam/experience/[experienceid]/page.jsx` - Update redirect URLs
2. `src/app/client/fireteam/experience/hooks/useRecording.js` - Return recording ID
3. `package.json` - Add chart library

### To-dos

- [ ] Create evaluation TypeScript interfaces and mock data structure
- [ ] Create evaluation page route with URL params handling
- [ ] Build ConversationMap component with bubble chart visualization
- [ ] Build GroupBalanceScore component with bar chart
- [ ] Build IndividualEvaluation component with Bloom's Taxonomy
- [ ] Build RoleTabView component for client/coach/admin views
- [ ] Create useEvaluationData hook to fetch and manage data
- [ ] Modify useRecording.js to return recording ID from API
- [ ] Update End button redirect logic to evaluation page
- [ ] Add chart library dependency to package.json