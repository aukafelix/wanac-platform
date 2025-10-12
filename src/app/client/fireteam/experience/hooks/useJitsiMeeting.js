import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage Jitsi meeting lifecycle
 * Handles initialization, participant tracking, and events
 */
export function useJitsiMeeting(jitsiContainerId) {
  const jitsiApiRef = useRef(null);
  const [jitsiReady, setJitsiReady] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Update participants list from Jitsi
   */
  const updateParticipants = () => {
    if (!jitsiApiRef.current) return;

    try {
      const participantsInfo = jitsiApiRef.current.getParticipantsInfo();
      console.log('📋 Participants info:', participantsInfo);

      const participantsList = participantsInfo.map((p) => ({
        id: p.participantId,
        name: p.displayName || p.formattedDisplayName || 'Anonymous',
        avatarUrl: p.avatarURL || null,
        speaking: false,
      }));

      setParticipants(participantsList);
      console.log('✅ Updated participants:', participantsList);
    } catch (err) {
      console.error('❌ Failed to get participants:', err);
    }
  };

  /**
   * Load Jitsi External API script
   */
  const loadJitsiExternalApi = (domain) => {
    return new Promise((resolve, reject) => {
      const scriptSrc = `https://${domain}/external_api.js`;
      console.log('📥 Loading Jitsi script from:', scriptSrc);

      // Check if script already exists
      if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        console.log('📋 Script already exists, checking if API is available...');
        if (window.JitsiMeetExternalAPI) {
          console.log('✅ Jitsi API already available');
          return resolve(true);
        }

        // Wait for API to become available
        const check = setInterval(() => {
          if (window.JitsiMeetExternalAPI) {
            console.log('✅ Jitsi API became available');
            clearInterval(check);
            resolve(true);
          }
        }, 50);

        setTimeout(() => {
          clearInterval(check);
          if (window.JitsiMeetExternalAPI) {
            console.log('✅ Jitsi API available after timeout');
            resolve(true);
          } else {
            console.log('❌ Jitsi API not available after timeout');
            reject(new Error('Jitsi API not available.'));
          }
        }, 3000);
        return;
      }

      // Create new script element
      console.log('🔄 Creating new script element...');
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('📦 Script loaded successfully');
        setTimeout(() => {
          if (window.JitsiMeetExternalAPI) {
            console.log('✅ Jitsi API ready after script load');
            resolve(true);
          } else {
            console.log('❌ Jitsi API not ready after script load');
            reject(new Error('Jitsi API not ready after script load'));
          }
        }, 100);
      };

      script.onerror = (e) => {
        console.error('❌ Failed to load Jitsi script:', e);
        reject(new Error('Failed to load Jitsi External API'));
      };

      document.head.appendChild(script);
      console.log('📤 Script element added to head');
    });
  };

  /**
   * Initialize Jitsi meeting
   */
  const startJitsi = (domain, roomName) => {
    try {
      console.log('🎬 Starting Jitsi meeting with domain:', domain, 'room:', roomName);

      const containerElement = document.getElementById(jitsiContainerId);
      if (!containerElement) {
        console.log('❌ Container element not found with ID:', jitsiContainerId);
        setError('Meeting container not found. Please refresh the page.');
        setLoading(false);
        return;
      }

      console.log('✅ Found container element:', containerElement);

      if (!window.JitsiMeetExternalAPI) {
        console.log('❌ Jitsi API not available');
        setError('Jitsi API not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      // Clear container
      containerElement.innerHTML = '';
      console.log('🧹 Container cleared, creating Jitsi instance...');

      // Jitsi configuration options
      const options = {
        roomName,
        width: '100%',
        height: '100%',
        parentNode: containerElement,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          
          // Disable prejoin to avoid moderator issues
          prejoinPageEnabled: false,
          
          disableDeepLinking: true,
          enableWelcomePage: false,
          
          // Enable full Jitsi toolbar with all buttons
          toolbarButtons: [
            'microphone',
            'camera',
            'closedcaptions',
            'desktop',
            'embedmeeting',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'profile',
            'chat',
            'recording',
            'livestreaming',
            'etherpad',
            'sharedvideo',
            'shareaudio',
            'settings',
            'raisehand',
            'videoquality',
            'filmstrip',
            'invite',
            'feedback',
            'stats',
            'shortcuts',
            'tileview',
            'select-background',
            'download',
            'help',
            'mute-everyone',
            'mute-video-everyone',
            'security',
          ],
          
          hideConferenceSubject: false, // Show conference subject
          hideConferenceTimer: false, // Show meeting timer
          notifications: [], // Enable all Jitsi notifications
          filmstrip: {
            enabled: true,
            disableStageFilmstrip: false,
          },
          tileView: {
            numberOfVisibleTiles: 25,
          },
          disabledSounds: ['ASKED_UNMUTE', 'INCOME_MSG', 'LIVE_STREAMING_ON', 'LIVE_STREAMING_OFF'],
          enableNoisyMicDetection: true,
          enableNoiseSupression: true,
          disableAudioLevels: false,
          startAudioOnly: false,
          constraints: {
            video: {
              height: { ideal: 720, max: 1080, min: 360 },
              width: { ideal: 1280, max: 1920, min: 640 },
              frameRate: { ideal: 30, max: 30 },
            },
          },
          resolution: 720,
          enableLayerSuspension: true,
          useStunTurn: true,
          enableIceRestart: true,
          p2p: {
            enabled: true,
            stunServers: [
              { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' },
              { urls: 'stun:stun.l.google.com:19302' },
            ],
          },
          startScreenSharing: false,
          enableInsecureRoomNameWarning: false,
          disableReactions: false,
          disablePolls: false,
          enableClosePage: false,
          fileRecordingsEnabled: true,
          liveStreamingEnabled: false,
          
          // DISABLE LOBBY/MODERATOR REQUIREMENT
          enableLobby: false,
          enableLobbyChat: false,
          requireDisplayName: false,
          
          // Security - Allow anyone to join without waiting
          disableModeratorIndicator: false,
          moderatorRights: {
            local: true, // Give moderator rights to first user
          },
          
          defaultLocalDisplayName: 'You',
          defaultRemoteDisplayName: 'Participant',
          defaultLogoUrl: '',
        },
        interfaceConfigOverwrite: {
          APP_NAME: 'WANAC Meeting',
          NATIVE_APP_NAME: 'WANAC Meeting',
          PROVIDER_NAME: 'WANAC Platform',
          
          // Watermarks (keep Jitsi watermark on free tier)
          SHOW_JITSI_WATERMARK: true,
          SHOW_WATERMARK_FOR_GUESTS: true,
          SHOW_BRAND_WATERMARK: false,
          
          // Disable promotional content
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          MOBILE_APP_PROMO: false,
          
          // Welcome page
          GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
          DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
          DISPLAY_WELCOME_FOOTER: false,
          
          // UI Settings
          HIDE_INVITE_MORE_HEADER: false, // Allow invites
          SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
          VIDEO_LAYOUT_FIT: 'both',
          FILM_STRIP_MAX_HEIGHT: 120,
          TILE_VIEW_MAX_COLUMNS: 5,
          VERTICAL_FILMSTRIP: true,
          
          // Toolbar always visible settings
          TOOLBAR_ALWAYS_VISIBLE: false, // Auto-hide when not in use
          TOOLBAR_TIMEOUT: 4000,
          
          // Recent list
          RECENT_LIST_ENABLED: false,
        },
        userInfo: {
          displayName: 'Participant',
        },
      };

      console.log('🏗️ Creating Jitsi API instance...');
      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
      console.log('✅ Jitsi API instance created successfully');

      setLoading(false);

      // Setup event listeners
      jitsiApiRef.current.addEventListener('videoConferenceJoined', () => {
        console.log('✅ Video conference joined - API is ready');
        setJitsiReady(true);
        setMeetingStartTime(new Date());
        updateParticipants();

        // Log local user attendance
        setAttendanceLog((prev) => [
          ...prev,
          {
            participantId: 'local',
            name: 'You',
            joinedAt: new Date().toISOString(),
            leftAt: null,
          },
        ]);
      });

      jitsiApiRef.current.addEventListener('meetingJoined', () => {
        console.log('✅ Meeting joined - API is ready');
        setJitsiReady(true);
        updateParticipants();
      });

      jitsiApiRef.current.addEventListener('readyToClose', () => {
        console.log('⚠️ Jitsi ready to close');
        setJitsiReady(false);
        setParticipants([]);
      });

      jitsiApiRef.current.addEventListener('videoConferenceLeft', () => {
        console.log('❌ Video conference left');
        setJitsiReady(false);
        setParticipants([]);
      });

      jitsiApiRef.current.addEventListener('error', (error) => {
        console.error('❌ Jitsi error:', error);
        setJitsiReady(false);
      });

      jitsiApiRef.current.addEventListener('participantJoined', (participant) => {
        console.log('👤 Participant joined:', participant);
        updateParticipants();

        // Log participant attendance
        setAttendanceLog((prev) => [
          ...prev,
          {
            participantId: participant.id,
            name: participant.displayName || 'Anonymous',
            joinedAt: new Date().toISOString(),
            leftAt: null,
          },
        ]);
      });

      jitsiApiRef.current.addEventListener('participantLeft', (participant) => {
        console.log('👋 Participant left:', participant);
        updateParticipants();

        // Update attendance log with leave time
        setAttendanceLog((prev) =>
          prev.map((entry) =>
            entry.participantId === participant.id && !entry.leftAt
              ? { ...entry, leftAt: new Date().toISOString() }
              : entry
          )
        );
      });

      jitsiApiRef.current.addEventListener('displayNameChange', (event) => {
        console.log('✏️ Display name changed:', event);
        updateParticipants();
      });

      // Fallback: Set ready after timeout
      setTimeout(() => {
        if (!jitsiReady && jitsiApiRef.current) {
          console.log('⏰ Fallback: Setting Jitsi ready after timeout');
          setJitsiReady(true);
        }
      }, 5000);

      // Update participants after delay
      setTimeout(() => {
        if (jitsiApiRef.current) {
          console.log('⏱️ Timeout - updating participants');
          updateParticipants();
        }
      }, 2000);
    } catch (e) {
      console.error('❌ Failed to start meeting:', e);
      setError('Failed to start meeting. Please try again.');
      setLoading(false);
    }
  };

  /**
   * Initialize meeting with domain and room
   */
  const initializeMeeting = async (domain, roomName) => {
    // Dispose existing instance if any
    if (jitsiApiRef.current) {
      console.log('🧹 Disposing existing Jitsi instance before initializing new meeting...');
      try {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      } catch (err) {
        console.warn('⚠️ Error disposing existing Jitsi instance:', err);
      }
    }

    // Reset all state
    setJitsiReady(false);
    setParticipants([]);
    setMeetingStartTime(null);
    setAttendanceLog([]);
    setLoading(true);
    setError('');

    try {
      await loadJitsiExternalApi(domain);
      
      // Wait for container with retry logic
      setTimeout(() => {
        let retryCount = 0;
        const maxRetries = 50;

        const waitForContainer = () => {
          const containerElement = document.getElementById(jitsiContainerId);
          if (containerElement) {
            console.log('✅ Container found, starting Jitsi...');
            startJitsi(domain, roomName);
          } else if (retryCount < maxRetries) {
            retryCount++;
            console.log(`⏳ Waiting for container... (attempt ${retryCount}/${maxRetries})`);
            setTimeout(waitForContainer, 100);
          } else {
            console.error('❌ Container not found after maximum retries');
            setError('Failed to initialize meeting container. Please refresh the page.');
            setLoading(false);
          }
        };

        waitForContainer();
      }, 200);
    } catch (err) {
      console.error('❌ Failed to initialize meeting:', err);
      setError('Failed to initialize meeting.');
      setLoading(false);
    }
  };

  /**
   * Leave meeting and cleanup
   */
  const leaveMeeting = () => {
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.executeCommand('hangup');
      } catch (err) {
        console.error('Failed to leave meeting:', err);
      }
    }
  };

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch {}
      }
    };
  }, []);

  return {
    jitsiApiRef,
    jitsiReady,
    participants,
    meetingStartTime,
    attendanceLog,
    loading,
    error,
    initializeMeeting,
    leaveMeeting,
  };
}

