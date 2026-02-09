"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Custom Hooks
import { useJitsiMeeting } from "../hooks/useJitsiMeeting";
import { useRecording } from "../hooks/useRecording";
import { useMeetingData } from "../hooks/useMeetingData";
import { useToast } from "../hooks/useToast";

// UI Components
import MeetingTopBar from "../components/MeetingTopBar";
import JitsiVideoContainer from "../components/JitsiVideoContainer";
import MeetingFooter from "../components/MeetingFooter";
import { ToastContainer } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

// Existing Components
import EnhancedAgendaSidebar from "../../components/EnhancedAgendaSidebar";
import Slide from "../../components/SlideComponent";
import WanacControlBar from "../../components/WanacControlBar";
import Sidebar from "../../../../../../components/dashboardcomponents/sidebar.jsx";
import AdminSidebar from "../../../../../../components/dashboardcomponents/adminsidebar";
import MeetingSummaryModal from "../../components/MeetingSummaryModal";

export default function FireteamExperienceMeeting() {
  const sessionProcessedRef = useRef(false); // Prevent multiple session processing
  // ============================================================================
  // STATE & HOOKS
  // ============================================================================

  const searchParams = useSearchParams();
  const router = useRouter();
  const isAdmin = searchParams?.get("admin") === "true";

  // UI State
  const [currentStep, setCurrentStep] = useState(0);
  const [showSlide, setShowSlide] = useState(false); // Start with video view to show Jitsi UI
  const [collapsed, setCollapsed] = useState(true); // Start collapsed by default
  const [chatMessages, setChatMessages] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [processingSession, setProcessingSession] = useState(false); // Show spinner during session processing
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [wasRecording, setWasRecording] = useState(false); // Track if recording was active during session
  const [autoStartedRecording, setAutoStartedRecording] = useState(false); // Ensure auto-start only happens once
  const [jitsiContainerId] = useState(
    () => `jitsi-container-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`}`
  );

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(isAdmin ? 'wanacAdminSidebarCollapsed' : 'wanacSidebarCollapsed');
      if (stored !== null) {
        setCollapsed(stored === 'true');
      }
    }
  }, [isAdmin]);

  // Toast notifications
  const toast = useToast();

  // Custom Hooks
  const {
    experience,
    fireteam,
    agenda,
    exhibits,
    loading: dataLoading,
    calculateTotalTime,
  } = useMeetingData(searchParams);

  const {
    jitsiApiRef,
    jitsiReady,
    participants,
    meetingStartTime,
    attendanceLog,
    loading: jitsiLoading,
    error: jitsiError,
    initializeMeeting,
    leaveMeeting,
  } = useJitsiMeeting(jitsiContainerId);

  const {
    isRecording,
    recordingBlob,
    processingRecording,
    meetingSummaries,
    toggleRecording,
    processRecording,
    setMeetingSummaries,
  } = useRecording(jitsiApiRef, jitsiReady);

  // ============================================================================
  // MEETING INITIALIZATION
  // ============================================================================

  useEffect(() => {
    const expId = searchParams?.get("id");
    const ftId = searchParams?.get("fireteamId");
    const linkParam = searchParams?.get("link");

    console.log("🔄 Experience changed - Experience ID:", expId, "Fireteam ID:", ftId);

    async function init() {
      try {
        // First, dispose of any existing Jitsi instance
        if (jitsiApiRef.current) {
          console.log("🧹 Cleaning up previous Jitsi instance...");
          try {
            jitsiApiRef.current.dispose();
            jitsiApiRef.current = null;
          } catch (err) {
            console.warn("⚠️ Error disposing Jitsi instance:", err);
          }
        }

        // Reset state for new experience
        setChatMessages([]);
        setCurrentStep(0);
        setShowSummaryModal(false);

        let meetingLink = null;

        if (linkParam) {
          meetingLink = decodeURIComponent(linkParam);
          console.log("✅ Using link from URL params for experience", expId, ":", meetingLink);
        } else if (expId) {
          meetingLink = `https://meet.jit.si/fireteam-exp-${expId}`;
          console.log("🆕 Generated meeting link for experience", expId, ":", meetingLink);
        } else if (ftId) {
          meetingLink = `https://meet.jit.si/fireteam-${ftId}`;
          console.log("🆕 Generated meeting link for fireteam", ftId, ":", meetingLink);
        } else {
          meetingLink = `https://meet.jit.si/fireteam-default-${Date.now()}`;
          console.log("🆕 Using fallback meeting link:", meetingLink);
        }

        // Parse meeting URL
        const urlObj = new URL(meetingLink);
        const domain = urlObj.hostname;
        const parts = urlObj.pathname.split("/").filter(Boolean);
        const roomName = parts[parts.length - 1] || "";

        console.log("🔍 Parsed for experience", expId, "- Domain:", domain, "Room:", roomName);

        // Show video view to ensure container is rendered
        setShowSlide(false);

        // Initialize Jitsi meeting with a small delay to ensure cleanup is complete
        await new Promise(resolve => setTimeout(resolve, 300));
        await initializeMeeting(domain, roomName);
      } catch (err) {
        console.error("❌ Meeting initialization error:", err);
      }
    }

    init();

    // Cleanup function to dispose Jitsi when component unmounts or experience changes
    return () => {
      if (jitsiApiRef.current) {
        console.log("🧹 Cleaning up Jitsi on unmount/experience change...");
        try {
          jitsiApiRef.current.dispose();
          jitsiApiRef.current = null;
        } catch (err) {
          console.warn("⚠️ Error disposing Jitsi instance:", err);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("id"), searchParams?.get("fireteamId"), searchParams?.get("link")]);

  // ============================================================================
  // VISIBILITY TOGGLE (Slide vs Video) - Now handled by CSS classes in render
  // ============================================================================

  useEffect(() => {
    console.log("🔄 View mode changed:", showSlide ? "SLIDES" : "VIDEO");
  }, [showSlide]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleNext = useCallback(() => {
    if (currentStep < agenda.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowSlide(true); // Auto-switch to slide view when navigating
    }
  }, [currentStep, agenda.length]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowSlide(true); // Auto-switch to slide view when navigating
    }
  }, [currentStep]);

  const handleSendChatMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: message,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    setChatMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleToggleRecording = useCallback(async () => {
    try {
      await toggleRecording();
      if (!isRecording) {
        // Recording is starting
        setWasRecording(true);
      }
      toast.success(isRecording ? "Recording stopped" : "Recording started");
    } catch (err) {
      toast.error(err.message || "Failed to toggle recording");
    }
  }, [toggleRecording, isRecording, toast]);

  const handleProcessRecording = useCallback(async () => {
    try {
      const userId = localStorage.getItem("user_id") || "unknown";
      const userName = localStorage.getItem("user_name") || "Participant";

      const meetingData = {
        experienceTitle: experience?.title || "Fireteam Experience",
        experienceDescription: experience?.description || experience?.experience || "",
        agenda: agenda
          .filter((a) => !a.isWaitingRoom)
          .map((a) => ({
            title: a.title,
            duration: a.duration,
          })),
        participants: participants.map((p) => ({
          id: p.id,
          name: p.name,
        })),
        duration: calculateTotalTime(),
        userId,
        userName,
        attendanceLog,
        startTime: meetingStartTime ? meetingStartTime.toISOString() : new Date().toISOString(),
      };

      toast.info("Processing recording... This may take a minute.");

      const result = await processRecording(meetingData, searchParams);

      setShowSummaryModal(true);
      toast.success("AI summary generated successfully!");
      return result;
    } catch (err) {
      toast.error(err.message || "Failed to process recording");
    }
  }, [experience, agenda, participants, calculateTotalTime, attendanceLog, meetingStartTime, processRecording, searchParams, toast]);

  const handleLeaveMeeting = useCallback(async () => {
    // Stop recording if active
    if (isRecording) {
      await handleToggleRecording();
      
      // Wait a moment for the recording blob to be processed
      // The recording blob is set asynchronously in the onstop event
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Prompt to process recording if available
    if (recordingBlob && !processingRecording) {
      setShowConfirmDialog(true);
      return;
    }

    // If we were recording during the session, show confirmation dialog
    // This ensures users can always choose to process their recording
    if (wasRecording) {
      setShowConfirmDialog(true);
      return;
    }

    leaveMeeting();
    router.push("/client/fireteam");
  }, [isRecording, recordingBlob, processingRecording, wasRecording, handleToggleRecording, leaveMeeting, router]);

  const handleConfirmProcessRecording = useCallback(async () => {
    setShowConfirmDialog(false);
    const result = await handleProcessRecording();
    leaveMeeting();
    
    const expId = searchParams?.get('id');
    const ftId = searchParams?.get('fireteamId');
    const recordingId = result?.recordingId || 'unknown';
    window.location.href = `/client/fireteam/experience/${expId}/evaluation?fireteamId=${ftId}&recordingId=${recordingId}&hasAI=true`;
  }, [handleProcessRecording, leaveMeeting, searchParams]);

  const handleCancelProcessRecording = useCallback(() => {
    setShowConfirmDialog(false);
    leaveMeeting();
    const expId = searchParams?.get('id');
    const ftId = searchParams?.get('fireteamId');
    router.push(`/client/fireteam/experience/${expId}/evaluation?fireteamId=${ftId}&hasAI=false`);
  }, [leaveMeeting, searchParams, router]);

  const handleTimerComplete = useCallback(() => {
    toast.info(`Step "${agenda[currentStep]?.title}" time is up!`);
  }, [currentStep, agenda, toast]);

  // ============================================================================
  // AUTOMATIC RECORDING START AFTER INTRODUCTION
  // ============================================================================

  useEffect(() => {
    // Auto-start recording robustly when Introduction step and Jitsi are ready
    if (
      currentStep === 1 &&
      agenda[currentStep]?.title === 'Introduction' &&
      !isRecording &&
      jitsiReady &&
      !autoStartedRecording
    ) {
      setAutoStartedRecording(true);
      setWasRecording(true); // Mark that recording will be active
      console.log('🎬 Auto-starting recording for Introduction step...');
      handleToggleRecording().catch((err) => {
        console.error('❌ Failed to auto-start recording:', err);
        toast.error('Failed to start recording automatically');
      });
    }
  }, [currentStep, agenda, isRecording, jitsiReady, handleToggleRecording, toast, autoStartedRecording]);

  // ============================================================================
  // AUTOMATIC RECORDING STOP AND AI SUMMARY GENERATION AT SESSION PROCESSING
  // ============================================================================

  useEffect(() => {
    // Auto-stop recording and start AI summary generation when reaching Session Processing step
    let cancelled = false;
    async function processSession() {
      if (sessionProcessedRef.current) return;
      sessionProcessedRef.current = true;
      setProcessingSession(true);
      try {
        // Stop recording if active
        if (isRecording) {
          console.log('🛑 Stopping recording...');
          await handleToggleRecording();
          // Wait for recordingBlob to be set (max 5s)
          let waitCount = 0;
          while (!recordingBlob && waitCount < 20 && !cancelled) {
            await new Promise(resolve => setTimeout(resolve, 250));
            waitCount++;
          }
          console.log('Recording stopped, recordingBlob ready:', !!recordingBlob);
        }
        // Give a short delay before starting session processing
        await new Promise(resolve => setTimeout(resolve, 500));
        // Start AI summary generation
        if ((wasRecording || recordingBlob) && !cancelled) {
          console.log('🤖 Starting AI summary generation...');
          toast.info('Generating AI summary... This may take a moment.');
          const result = await handleProcessRecording();
          if (result && !cancelled) {
            console.log('✅ AI summary generated successfully');
            toast.success('AI summary generated successfully!');
          }
        } else if (!cancelled) {
          console.log('⚠️ No recording to process');
          toast.info('No recording available to process');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('❌ Failed to process session:', err);
          toast.error('Failed to generate AI summary: ' + (err.message || 'Unknown error'));
        }
      } finally {
        if (!cancelled) setProcessingSession(false);
        console.log('Session Processing: End');
      }
    }
    if ((agenda[currentStep]?.title === 'Session Processing' || agenda[currentStep]?.isProcessing) && !sessionProcessedRef.current) {
      processSession();
    }
    return () => { cancelled = true; };
  }, [currentStep, agenda, isRecording, wasRecording, recordingBlob, handleToggleRecording, handleProcessRecording, toast]);

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================

  const agendaArray = useMemo(
    () => agenda.map(({ title, duration }) => [title, duration]),
    [agenda]
  );

  const currentStepDuration = useMemo(
    () => agenda[currentStep]?.duration,
    [agenda, currentStep]
  );

  const participantsForSidebar = useMemo(
    () => participants.map((p) => ({ id: p.id, name: p.name })),
    [participants]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="h-screen flex bg-gray-50" role="main">
      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onRemoveToast={toast.removeToast} />

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          title="Generate AI Summary?"
          message="Would you like to generate an AI summary of this meeting? This may take a minute."
          confirmText="Generate Summary"
          cancelText="Skip"
          onConfirm={handleConfirmProcessRecording}
          onCancel={handleCancelProcessRecording}
        />
      )}

      {/* Processing Session Overlay */}
      {processingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span className="text-lg font-semibold text-gray-700">Processing session, please wait...</span>
          </div>
        </div>
      )}

      {/* Sidebar - Admin or Regular */}
      {isAdmin ? (
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* Main Content - Flush against sidebar (sidebar is static, no margin needed) */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300 min-w-0">
        {/* Top Bar */}
        <MeetingTopBar
          isAdmin={isAdmin}
          experienceTitle={experience?.title}
          currentStep={currentStep}
          totalSteps={agenda.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          duration={currentStepDuration}
          onTimerComplete={handleTimerComplete}
          controlBarComponent={
            <WanacControlBar
              showSlide={showSlide}
              onToggleView={() => setShowSlide(!showSlide)}
              onLeaveMeeting={handleLeaveMeeting}
            />
          }
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Middle content area */}
          <section 
            className="flex-1 flex flex-col justify-center items-center p-8 relative bg-gray-100"
            aria-label="Meeting content area"
          >
            {/* Jitsi Video Container - Visibility controlled by CSS classes */}
            <div 
              className={`w-full h-full ${
                showSlide 
                  ? 'invisible absolute opacity-0 pointer-events-none' 
                  : 'visible relative opacity-100 pointer-events-auto'
              }`}
            >
              <JitsiVideoContainer
                jitsiContainerId={jitsiContainerId}
                showSlide={showSlide}
                loading={jitsiLoading}
                error={jitsiError}
              />
            </div>

            {/* Slide content */}
            {showSlide && (
              <div 
                className="w-full h-full flex items-center justify-center p-8"
                role="region"
                aria-label={`Slide ${currentStep + 1}: ${agenda[currentStep]?.title}`}
              >
                <Slide
                  step={agenda[currentStep]}
                  participants={participants}
                  experienceTitle={experience?.title || ""}
                />
              </div>
            )}
          </section>

          {/* Agenda Sidebar */}
          <EnhancedAgendaSidebar
            agenda={agendaArray}
            moduleTitle={experience?.title || "Customer Discovery"}
            moduleDescription={
              experience?.description ||
              experience?.experience ||
              "In this module, you will explore key concepts and engage with your fireteam."
            }
            currentStep={currentStep}
            onStepClick={(step) => {
              setCurrentStep(step);
              setShowSlide(true); // Show slide when clicking agenda item
            }}
            peers={participantsForSidebar}
            exhibits={exhibits}
            chatMessages={chatMessages}
            onSendMessage={handleSendChatMessage}
          />
        </div>

        {/* Footer */}
        <MeetingFooter
          currentStep={currentStep}
          agenda={agenda}
          totalTime={calculateTotalTime()}
        />
      </div>

      {/* Meeting Summary Modal */}
      {showSummaryModal && meetingSummaries && (
        <MeetingSummaryModal
          summaries={meetingSummaries}
          onClose={() => setShowSummaryModal(false)}
          userRole={isAdmin ? "admin" : "participant"}
        />
      )}
    </div>
  );
}
