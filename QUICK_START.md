# 🚀 Quick Start Guide - API Integration

## ✅ What Was Done

1. ✅ Created `meeting.service.ts` - Centralized meeting API logic
2. ✅ Updated `useRecording.js` - Now uses meeting service
3. ✅ Integrated with your WANAC API
4. ✅ Connected OpenAI for transcription & summaries

---

## 🎯 Next Steps (YOU NEED TO DO THIS)

### **Step 1: Verify Your .env.local**

Make sure you have `.env.local` in your project root with:

```env
NEXT_PUBLIC_API_URL=https://wanac-api.kuzasports.com
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si
```

### **Step 2: Run Verification Script**

```bash
node verify-setup.js
```

This will check if everything is configured correctly.

### **Step 3: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

**Important:** You MUST restart after creating/editing `.env.local`

### **Step 4: Test Meeting Flow**

1. Navigate to: `/client/fireteam/experience/[experienceid]?id=X&fireteamId=Y`
2. Join meeting (Jitsi will load)
3. Click record button
4. Stop recording after a few seconds
5. Click "Generate AI Summary"
6. Wait for processing
7. See summary modal with 3 views

---

## 🔍 How to Test Each Feature

### **Test 1: Environment Variables**

Open browser console and paste:

```javascript
console.log({
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  hasOpenAI: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  jitsiDomain: process.env.NEXT_PUBLIC_JITSI_DOMAIN
});
```

Should show:
```javascript
{
  apiUrl: "https://wanac-api.kuzasports.com",
  hasOpenAI: true,
  jitsiDomain: "meet.jit.si"
}
```

### **Test 2: Meeting Service**

In browser console:

```javascript
import { meetingService } from './src/services/api/meeting.service';

// Test token generation
console.log('Token:', meetingService.generateSecureToken());
```

### **Test 3: Recording Flow**

1. Join a meeting
2. Open browser DevTools Console
3. Click record button
4. Watch for logs:
   - `🔴 Starting recording...`
   - `✅ Local media recorder started`
5. Stop recording:
   - `🛑 Stopping recording...`
   - `✅ Recording stopped`
6. Generate AI Summary:
   - `🎙️ Starting transcription...`
   - `✅ Transcription complete`
   - `🤖 Generating AI summaries...`
   - `✅ AI summaries generated`
   - `📤 Uploading to backend...`
   - `✅ Recording uploaded successfully`

---

## 📊 API Flow Diagram

```
User Action          Frontend                 Backend               OpenAI
─────────────────────────────────────────────────────────────────────────
Start Recording  →  MediaRecorder.start()
                    (captures audio)

Stop Recording   →  MediaRecorder.stop()
                    Blob saved to state

Generate         →  openaiService
Summary              .transcribeAudio()  →                      → Whisper API
                                                                   (transcribe)
                    ← transcript text   ←                      ← 

                    openaiService
                     .generateSummaries() →                    → GPT-4o API
                                                                   (3 summaries)
                    ← summaries         ←                      ←

                    meetingService
                     .uploadRecording()  →  POST /recordings/add
                                           (file + metadata)
                    ← success           ← 

Show Modal       →  Display summaries
                    (participant/coach/admin views)
```

---

## 🐛 Common Issues & Solutions

### **Issue: "OpenAI API Error"**

**Solution:**
1. Check `.env.local` has correct key
2. Verify key starts with `sk-proj-` or `sk-`
3. Check OpenAI account has credits: https://platform.openai.com/usage

### **Issue: "Failed to upload recording"**

**Possible causes:**
- Backend endpoint doesn't exist yet
- Auth token expired
- File too large

**Check:**
```javascript
// In browser console
console.log('Token:', localStorage.getItem('auth_token'));
```

### **Issue: "Environment variables not loaded"**

**Solution:**
1. Verify `.env.local` is in project root (same level as package.json)
2. Restart dev server completely
3. Clear browser cache
4. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### **Issue: "Meeting doesn't load"**

**Check:**
1. Browser console for errors
2. Network tab for failed requests
3. Jitsi domain in `.env.local`

---

## 💰 Cost Tracking

### **OpenAI Usage Per Meeting (30 mins):**
- Whisper: 30 mins × $0.006 = $0.18
- GPT-4o: 3 summaries × $0.05 = $0.15
- **Total per meeting: ~$0.33**

### **Monthly Estimate (10 meetings):**
- **~$3.30/month**

Very affordable! Monitor usage at: https://platform.openai.com/usage

---

## 📁 Files Changed

### **New Files:**
- `src/services/api/meeting.service.ts`
- `IMPLEMENTATION_SUMMARY.md`
- `QUICK_START.md` (this file)
- `verify-setup.js`

### **Modified Files:**
- `src/app/client/fireteam/experience/hooks/useRecording.js`

---

## 🎓 Understanding the Code

### **Meeting Service (`meeting.service.ts`):**

```typescript
// Generate secure meeting link
const { meetingLink } = await meetingService.getMeetingLink(
  experienceId,
  fireteamId
);
// Returns: https://meet.jit.si/wanac-exp-123-abc-def-xyz

// Upload recording with AI summaries
await meetingService.uploadRecording(
  fireteamId,
  experienceId,
  recordingBlob,
  {
    transcript: "Meeting transcript...",
    summaries: { participant, coach, admin },
    attendance_log: [...]
  }
);
```

### **Recording Hook (`useRecording.js`):**

```javascript
// Start/stop recording
const { toggleRecording } = useRecording(jitsiApiRef, jitsiReady);

// Process with AI
const summaries = await processRecording(meetingData, searchParams);
// Returns: { participantSummary, coachSummary, adminSummary }
```

---

## ✅ Success Checklist

- [ ] `.env.local` created with all variables
- [ ] Dev server restarted
- [ ] `node verify-setup.js` passes
- [ ] Can join a meeting
- [ ] Can start/stop recording
- [ ] AI summary generates successfully
- [ ] Recording uploads to backend
- [ ] Summary modal displays correctly

---

## 🎉 You're All Set!

Once all checks pass, your meeting system is fully connected to:
- ✅ WANAC API (recordings, data)
- ✅ OpenAI (transcription, summaries)
- ✅ Jitsi (video meetings)

**Need help?** Check console logs - they're emoji-coded for easy debugging!

---

**Last Updated:** Just now
**Status:** ✅ Ready to test

