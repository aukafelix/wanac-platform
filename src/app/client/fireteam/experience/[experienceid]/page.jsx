"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import EnhancedAgendaSidebar from "../../components/EnhancedAgendaSidebar";
import Slide from "../../components/SlideComponent";
import EnhancedMeetingControls from "../../components/EnhancedMeetingControls";
import AgendaTimer from "../../components/AgendaTimer";
import Sidebar from "../../../../../../components/dashboardcomponents/sidebar.jsx";
import AdminSidebar from "../../../../../../components/dashboardcomponents/adminsidebar";
import { experienceService } from "../../../../../services/api/experience.service";
import { fireteamService } from "../../../../../services/api/fireteam.service";

export default function FireteamExperienceMeeting() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [experience, setExperience] = useState(null);
  const [fireteam, setFireteam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetingError, setMeetingError] = useState("");
  const [jitsiReady, setJitsiReady] = useState(false);
  const [agenda, setAgenda] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [exhibits, setExhibits] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [meetingStartTime, setMeetingStartTime] = useState(null);

  const searchParams = useSearchParams();
  
  // Check if user is accessing as admin
  const isAdmin = searchParams?.get("admin") === "true";

  // Jitsi refs - using direct DOM approach
  const jitsiApiRef = useRef(null);
  const [jitsiContainerId] = useState(() => `jitsi-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  const handleNext = () => {
    if (currentStep < agenda.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate total session time from agenda durations
  const calculateTotalTime = () => {
    let totalMinutes = 0;
    
    agenda.forEach(item => {
      const duration = item.duration;
      
      // Skip items with "—" or no duration
      if (!duration || duration === "—" || duration === "-") {
        return;
      }
      
      // Parse duration string (e.g., "5 mins", "10 min", "45 minutes")
      const match = duration.match(/(\d+)/);
      if (match) {
        totalMinutes += parseInt(match[1], 10);
      }
    });
    
    if (totalMinutes === 0) {
      return "—";
    }
    
    // Format as hours and minutes if >= 60 mins
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    
    return `${totalMinutes} mins`;
  };

  // Ensure Jitsi meeting continues running when switching views
  useEffect(() => {
    console.log('🔄 View mode changed:', showSlide ? 'SLIDES' : 'VIDEO');
    
    const container = document.getElementById(jitsiContainerId);
    if (container && jitsiApiRef.current) {
      console.log('✅ Jitsi container and API are available during view switch');
      
      if (showSlide) {
        console.log('📋 Switching to slides - Jitsi continues running in background');
        container.style.visibility = 'hidden';
        container.style.position = 'absolute';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
      } else {
        console.log('📹 Switching to video - Jitsi becomes visible');
        container.style.visibility = 'visible';
        container.style.position = 'relative';
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
      }
    }
  }, [showSlide, jitsiContainerId]);

  // Cleanup Jitsi on unmount
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch {}
      }
    };
  }, []);

  // Start meeting immediately and load data in background
  useEffect(() => {
    const expId = searchParams?.get("id");
    const ftId = searchParams?.get("fireteamId");

    async function initializeMeeting() {
      try {
        console.log("🚀 Starting meeting initialization...");
        setLoading(true);
        setMeetingError("");

        let meetingLink = null;
        
        const linkParam = searchParams?.get("link");
        console.log("🔗 Link param:", linkParam);
        
        if (linkParam) {
          meetingLink = decodeURIComponent(linkParam);
          console.log("Using link from URL params:", meetingLink);
        } else {
          if (expId) {
            console.log("Creating meeting link for experience ID:", expId);
            meetingLink = `https://meet.jit.si/fireteam-exp-${expId}`;
            console.log("🆕 Using meeting link:", meetingLink);
          } else if (ftId) {
            console.log("Creating meeting link for fireteam ID:", ftId);
            meetingLink = `https://meet.jit.si/fireteam-${ftId}`;
            console.log("🆕 Using meeting link:", meetingLink);
          } else {
            console.log("❌ No experience or fireteam ID found in URL params");
            meetingLink = `https://meet.jit.si/fireteam-default-${Date.now()}`;
            console.log("🆕 Using fallback meeting link:", meetingLink);
          }
        }

        if (!meetingLink) {
          console.log("❌ No meeting link found");
          setMeetingError("Meeting link not found for this experience.");
          setLoading(false);
          return;
        }

        // Parse meeting URL
        let domain = "";
        let roomName = "";
        try {
          const urlObj = new URL(meetingLink);
          domain = urlObj.hostname;
          const parts = urlObj.pathname.split("/").filter(Boolean);
          roomName = parts[parts.length - 1] || "";
          console.log("🔍 Parsed URL - Domain:", domain, "Room:", roomName);
        } catch (e) {
          console.error("❌ Invalid meeting link URL:", e);
          setMeetingError("Invalid meeting link URL.");
          setLoading(false);
          return;
        }

        if (!domain || !roomName) {
          console.log("❌ Missing domain or room name");
          setMeetingError("Invalid meeting link details.");
          setLoading(false);
          return;
        }

        // Start meeting immediately
        console.log("🎯 Loading Jitsi API for domain:", domain);
        await loadJitsiExternalApi(domain);
        console.log("✅ Jitsi API loaded, starting meeting...");
        
        setLoading(false);
        
        // Wait for container to be available in DOM before starting Jitsi
        let retryCount = 0;
        const maxRetries = 50; // Max 5 seconds (50 * 100ms)
        
        const waitForContainer = () => {
          const containerElement = document.getElementById(jitsiContainerId);
          if (containerElement) {
            console.log("✅ Container found, starting Jitsi...");
            startJitsi(domain, roomName);
          } else if (retryCount < maxRetries) {
            retryCount++;
            console.log(`⏳ Waiting for container to be available... (attempt ${retryCount}/${maxRetries})`);
            setTimeout(waitForContainer, 100);
          } else {
            console.error("❌ Container not found after maximum retries");
            setMeetingError("Failed to initialize meeting container. Please refresh the page.");
          }
        };
        
        // Start checking for container after a brief delay to allow React to render
        setTimeout(waitForContainer, 50);
        
        // Set up default agenda while meeting starts
        const defaultAgenda = [
          {
            title: "Waiting Room",
            subtitle: "Welcome to your Fireteam Experience",
            duration: "—",
            isWaitingRoom: true
          },
          {
            title: "Session Starting",
            subtitle: "Loading session details...",
            duration: "5 mins"
          }
        ];
        setAgenda(defaultAgenda);
        
        // Show the meeting view immediately
        setShowSlide(false);
        
      } catch (err) {
        setMeetingError("Failed to initialize meeting.");
        setLoading(false);
      }
    }

    // Load experience and fireteam data in background (non-blocking)
    async function loadBackgroundData() {
      try {
        const expId = searchParams?.get("id");
        const ftId = searchParams?.get("fireteamId");
        
        let exp = null;
        let ft = null;
        
        if (ftId) {
          try {
            const fireteamData = await fireteamService.getFireteam(ftId);
            console.log("Fireteam data received:", fireteamData);
            
            ft = fireteamData.fireTeam || fireteamData;
            
            if (expId && ft) {
              const experiences = Array.isArray(ft.experiences) ? ft.experiences : [];
              const targetId = parseInt(expId);
              exp = experiences.find(x => x.id === targetId);
              
              console.log("Found experience from fireteam:", exp);
              
              if (!exp) {
                console.warn("Experience not found in fireteam data");
              }
            }
          } catch (err) {
            console.error("Error fetching fireteam:", err);
          }
        }

        setExperience(exp || null);
        setFireteam(ft || null);

        // Extract and normalize agenda from experience
        if (exp) {
          const agendaSource = exp.agenda || exp.agenda_steps || [];
          const normalizedAgenda = Array.isArray(agendaSource) 
            ? agendaSource.map(step => ({
                title: step.title || 'Untitled Step',
                subtitle: step.subtitle || step.title || 'Untitled Step',
                duration: step.duration || '5 mins',
              }))
            : [];
          
          console.log("Loaded agenda from experience:", normalizedAgenda);
          
          const waitingRoom = {
            title: "Waiting Room",
            subtitle: "Welcome to your Fireteam Experience",
            duration: "—",
            isWaitingRoom: true
          };
          
          const finalAgenda = [waitingRoom, ...normalizedAgenda];
          
          if (normalizedAgenda.length === 0) {
            console.log("No agenda found, using default with waiting room");
            finalAgenda.push({
              title: "Session Started",
              subtitle: "Main discussion",
              duration: "45 mins"
            });
          }
          
          console.log("Final agenda with waiting room:", finalAgenda);
          setAgenda(finalAgenda);

          // Load exhibits if available
          if (exp.exhibits && Array.isArray(exp.exhibits)) {
            setExhibits(exp.exhibits);
          } else {
            // Default exhibits
            setExhibits([
              {
                id: 1,
                title: "Session Guide",
                type: "pdf",
                url: "/documents/session-guide.pdf",
                description: "Complete guide for this session"
              },
              {
                id: 2,
                title: "Resource Materials",
                type: "link",
                url: "https://example.com/resources",
                description: "Additional learning resources"
              }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to load background data:", err);
      }
    }

    initializeMeeting();
    loadBackgroundData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function loadJitsiExternalApi(domain) {
    return new Promise((resolve, reject) => {
      const scriptSrc = `https://${domain}/external_api.js`;
      console.log("📥 Loading Jitsi script from:", scriptSrc);
      
      if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        console.log("📋 Script already exists, checking if API is available...");
        if (window.JitsiMeetExternalAPI) {
          console.log("✅ Jitsi API already available");
          return resolve(true);
        }
        const check = setInterval(() => {
          if (window.JitsiMeetExternalAPI) {
            console.log("✅ Jitsi API became available");
            clearInterval(check);
            resolve(true);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(check);
          if (window.JitsiMeetExternalAPI) {
            console.log("✅ Jitsi API available after timeout");
            resolve(true);
          } else {
            console.log("❌ Jitsi API not available after timeout");
            reject(new Error("Jitsi API not available."));
          }
        }, 3000);
        return;
      }

      console.log("🔄 Creating new script element...");
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        console.log("📦 Script loaded successfully");
        setTimeout(() => {
          if (window.JitsiMeetExternalAPI) {
            console.log("✅ Jitsi API ready after script load");
            resolve(true);
          } else {
            console.log("❌ Jitsi API not ready after script load");
            reject(new Error("Jitsi API not ready after script load"));
          }
        }, 100);
      };
      s.onerror = (e) => {
        console.error("❌ Failed to load Jitsi script:", e);
        reject(new Error("Failed to load Jitsi External API"));
      };
      
      document.head.appendChild(s);
      console.log("📤 Script element added to head");
    });
  }

  function startJitsi(domain, roomName) {
    try {
      console.log("🎬 Starting Jitsi meeting with domain:", domain, "room:", roomName);
      
      const containerElement = document.getElementById(jitsiContainerId);
      if (!containerElement) {
        console.log("❌ Container element not found with ID:", jitsiContainerId);
        setMeetingError("Meeting container not found. Please refresh the page.");
        setLoading(false);
        return;
      }
      
      console.log("✅ Found container element:", containerElement);
      
      if (!window.JitsiMeetExternalAPI) {
        console.log("❌ Jitsi API not available");
        setMeetingError("Jitsi API not loaded. Please refresh the page.");
        setLoading(false);
        return;
      }
      
      containerElement.innerHTML = "";
      console.log("🧹 Container cleared, creating Jitsi instance...");

      const options = {
        roomName,
        width: "100%",
        height: "100%",
        parentNode: containerElement,
        configOverwrite: {
          // Audio/Video Settings
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          
          // UI Customization - Remove Jitsi Branding
          disableDeepLinking: true,
          enableWelcomePage: false,
          toolbarButtons: [],
          hideConferenceSubject: true,
          notifications: [],
          
          // Filmstrip & Layout
          filmstrip: { 
            enabled: true,
            disableStageFilmstrip: false,
          },
          tileView: {
            numberOfVisibleTiles: 25,
          },
          
          // Audio Enhancements
          disabledSounds: ["ASKED_UNMUTE", "INCOME_MSG", "LIVE_STREAMING_ON", "LIVE_STREAMING_OFF"],
          enableNoisyMicDetection: true,
          enableNoiseSupression: true,
          disableAudioLevels: false,
          startAudioOnly: false,
          
          // Video Quality
          constraints: {
            video: {
              height: { ideal: 720, max: 1080, min: 360 },
              width: { ideal: 1280, max: 1920, min: 640 },
              frameRate: { ideal: 30, max: 30 }
            }
          },
          resolution: 720,
          
          // Connection & Performance
          enableLayerSuspension: true,
          useStunTurn: true,
          enableIceRestart: true,
          p2p: {
            enabled: true,
            stunServers: [
              { urls: "stun:meet-jit-si-turnrelay.jitsi.net:443" },
              { urls: "stun:stun.l.google.com:19302" }
            ],
          },
          
          // Features
          startScreenSharing: false,
          enableInsecureRoomNameWarning: false,
          disableReactions: false,
          disablePolls: false,
          enableClosePage: false,
          
          // Recording & Streaming
          fileRecordingsEnabled: true,
          liveStreamingEnabled: false,
          
          // Moderation
          enableLobby: false,
          
          // Display Names
          defaultLocalDisplayName: "You",
          defaultRemoteDisplayName: "Participant",
          
          // BRANDING REMOVAL - Complete white-labeling
          defaultLogoUrl: '', // Remove Jitsi logo
          defaultLocalDisplayName: 'You',
          defaultRemoteDisplayName: 'Participant',
        },
        interfaceConfigOverwrite: {
          // COMPLETE BRANDING REMOVAL
          APP_NAME: 'WANAC Platform',
          NATIVE_APP_NAME: 'WANAC Platform',
          PROVIDER_NAME: 'WANAC',
          
          // Hide all Jitsi branding
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: false,
          JITSI_WATERMARK_LINK: '',
          BRAND_WATERMARK_LINK: '',
          
          // Hide Jitsi promotional content
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          MOBILE_APP_PROMO: false,
          
          // Welcome page settings
          GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
          DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
          DISPLAY_WELCOME_FOOTER: false,
          
          // UI Customization
          HIDE_INVITE_MORE_HEADER: true,
          TOOLBAR_BUTTONS: [],
          SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile'],
          VIDEO_LAYOUT_FIT: 'both',
          FILM_STRIP_MAX_HEIGHT: 120,
          TILE_VIEW_MAX_COLUMNS: 5,
          VERTICAL_FILMSTRIP: true,
          
          // Remove default logo
          DEFAULT_LOGO_URL: '',
          DEFAULT_WELCOME_PAGE_LOGO_URL: '',
        },
        userInfo: {
          displayName: "Participant",
        },
      };

      console.log("🏗️ Creating Jitsi API instance...");
      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
      console.log("✅ Jitsi API instance created successfully");
      
      // Function to update participants list
      const updateParticipants = () => {
        if (!jitsiApiRef.current) return;
        
        try {
          const participantsInfo = jitsiApiRef.current.getParticipantsInfo();
          console.log("Participants info:", participantsInfo);
          
          const participantsList = participantsInfo.map(p => ({
            id: p.participantId,
            name: p.displayName || p.formattedDisplayName || 'Anonymous',
            avatarUrl: p.avatarURL || null,
            speaking: false,
          }));
          
          setParticipants(participantsList);
          console.log("Updated participants:", participantsList);
        } catch (err) {
          console.error("Failed to get participants:", err);
        }
      };
      
      setLoading(false);

      jitsiApiRef.current.addEventListener("videoConferenceJoined", () => {
        console.log("✅ Jitsi conference joined - API is ready");
        setJitsiReady(true);
        setMeetingStartTime(new Date());
        updateParticipants();
        
        // Log local user attendance
        setAttendanceLog(prev => [...prev, {
          participantId: 'local',
          name: 'You',
          joinedAt: new Date().toISOString(),
          leftAt: null
        }]);
      });

      jitsiApiRef.current.addEventListener("meetingJoined", () => {
        console.log("✅ Jitsi meeting joined - API is ready");
        setJitsiReady(true);
        updateParticipants();
      });

      jitsiApiRef.current.addEventListener("readyToClose", () => {
        console.log("⚠️ Jitsi ready to close");
        setJitsiReady(false);
        setParticipants([]);
      });

      jitsiApiRef.current.addEventListener("videoConferenceLeft", () => {
        console.log("❌ Jitsi conference left");
        setJitsiReady(false);
        setParticipants([]);
      });

      jitsiApiRef.current.addEventListener("error", (error) => {
        console.error("❌ Jitsi error:", error);
        setJitsiReady(false);
      });

      setTimeout(() => {
        if (!jitsiReady && jitsiApiRef.current) {
          console.log("⏰ Fallback: Setting Jitsi ready after timeout");
          setJitsiReady(true);
        }
      }, 5000);

      jitsiApiRef.current.addEventListener("participantJoined", (participant) => {
        console.log("Participant joined:", participant);
        updateParticipants();
        
        // Log participant attendance
        setAttendanceLog(prev => [...prev, {
          participantId: participant.id,
          name: participant.displayName || 'Anonymous',
          joinedAt: new Date().toISOString(),
          leftAt: null
        }]);
      });

      jitsiApiRef.current.addEventListener("participantLeft", (participant) => {
        console.log("Participant left:", participant);
        updateParticipants();
        
        // Update attendance log with leave time
        setAttendanceLog(prev => prev.map(entry => 
          entry.participantId === participant.id && !entry.leftAt
            ? { ...entry, leftAt: new Date().toISOString() }
            : entry
        ));
      });

      jitsiApiRef.current.addEventListener("displayNameChange", (event) => {
        console.log("Display name changed:", event);
        updateParticipants();
      });

      setTimeout(() => {
        if (jitsiApiRef.current) {
          console.log("Timeout - updating participants");
          updateParticipants();
        }
      }, 2000);

    } catch (e) {
      console.error("Failed to start meeting:", e);
      setMeetingError("Failed to start meeting.");
      setLoading(false);
    }
  }

  // Handle sending chat messages
  const handleSendChatMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: message,
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    setChatMessages(prev => [...prev, newMessage]);
    
    // TODO: Send message through Jitsi chat or backend
    // if (jitsiApiRef.current) {
    //   jitsiApiRef.current.executeCommand('sendChatMessage', message);
    // }
  };

  // Handle recording toggle
  const handleToggleRecording = () => {
    if (!jitsiApiRef?.current || !jitsiReady) return;

    try {
      if (isRecording) {
        jitsiApiRef.current.executeCommand('stopRecording', 'file');
        setIsRecording(false);
      } else {
        jitsiApiRef.current.executeCommand('startRecording', {
          mode: 'file',
          shouldShare: false
        });
        setIsRecording(true);
      }
    } catch (err) {
      console.error('Failed to toggle recording:', err);
    }
  };

  // Handle timer completion
  const handleTimerComplete = () => {
    console.log('Timer completed for step:', currentStep);
    // Optionally auto-advance to next step
    // handleNext();
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - Admin or Regular based on access level */}
      {isAdmin ? (
        <AdminSidebar />
      ) : (
        <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-full transition-all duration-300 ${isAdmin ? 'ml-16 md:ml-56' : ''}`}>
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
          <div>
            <h2 className="text-lg font-semibold">
              Fireteam Learning Experience
              {isAdmin && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                  Admin View
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-500">{experience?.title || "Loading..."}</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            <button 
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50" 
              onClick={handleNext}
              disabled={currentStep >= agenda.length - 1}
            >
              Next Slide →
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Agenda Timer - Fixed position */}
          <div className="absolute top-20 left-8 z-10">
            <AgendaTimer
              duration={agenda[currentStep]?.duration}
              isActive={true}
              onTimeUp={handleTimerComplete}
              stepTitle={agenda[currentStep]?.title || "Current Step"}
            />
          </div>

          {/* Middle content area - shows either slides or video participants */}
          <section className="flex-1 flex flex-col justify-center items-center p-8 relative bg-gray-100">
            {/* Always-running Jitsi container (hidden when showing slides) */}
            <div 
              id={jitsiContainerId}
              className={`w-full h-full rounded-lg overflow-hidden bg-gray-900 shadow-2xl ${
                showSlide ? 'absolute top-0 left-0 opacity-0 pointer-events-none' : ''
              }`}
              style={{
                visibility: showSlide ? 'hidden' : 'visible',
                position: showSlide ? 'absolute' : 'relative'
              }}
            />
            
            {/* Loading overlay when meeting is starting */}
            {loading && !showSlide && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
                  <p className="text-white">Launching meeting...</p>
                  <p className="text-gray-400 text-sm mt-2">This should only take a moment</p>
                </div>
              </div>
            )}
            
            {/* Error overlay */}
            {meetingError && !showSlide && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg border border-red-300 z-10">
                {meetingError}
              </div>
            )}
            
            {/* Slide content - shows on top when active */}
            {showSlide && (
              <div className="w-full h-full flex items-center justify-center p-8">
                <Slide 
                  step={agenda[currentStep]} 
                  participants={participants}
                  experienceTitle={experience?.title || ""}
                />
              </div>
            )}
            
            {/* Meeting Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full">
              <EnhancedMeetingControls
                jitsiApiRef={jitsiApiRef}
                jitsiReady={jitsiReady}
                isRecording={isRecording}
                onToggleRecording={handleToggleRecording}
                currentLayout={showSlide ? 'slide' : 'grid'}
                onLeave={() => {
                  if (jitsiApiRef.current) {
                    try {
                      jitsiApiRef.current.executeCommand('hangup');
                    } catch (err) {
                      console.error('Failed to leave meeting:', err);
                    }
                  }
                  window.location.href = '/client/fireteam';
                }}
                onLogout={() => {
                  if (jitsiApiRef.current) {
                    try {
                      jitsiApiRef.current.dispose();
                      jitsiApiRef.current = null;
                    } catch (err) {
                      console.error('Failed to dispose Jitsi:', err);
                    }
                  }
                  window.location.href = '/login';
                }}
                isManager={true}
                onToggleLayout={() => setShowSlide((v) => !v)}
              />
            </div>
          </section>
          
          {/* Enhanced Agenda Sidebar with Chat, Agendas, and Exhibits */}
          <EnhancedAgendaSidebar
            agenda={agenda.map(({ title, duration }) => [title, duration])}
            moduleTitle={experience?.title || "Customer Discovery"}
            moduleDescription={experience?.description || experience?.experience || "In this module, you will explore key concepts and engage with your fireteam."}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            peers={participants}
            exhibits={exhibits}
            chatMessages={chatMessages}
            onSendMessage={handleSendChatMessage}
          />
        </div>
        
        {/* Footer */}
        <footer className="p-4 border-t bg-white text-xs text-gray-500 flex justify-between items-center">
          <div>
            <span className="font-medium">Step {currentStep + 1} of {agenda.length}</span>
            {agenda[currentStep] && (
              <span className="ml-4">{agenda[currentStep].title}</span>
            )}
          </div>
          <div>
            Total Session Time:
            <span className="ml-2 text-black font-medium">{calculateTotalTime()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

