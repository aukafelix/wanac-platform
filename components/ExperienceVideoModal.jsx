import React, { useRef, useEffect, useState } from "react";
import { FiX, FiCopy, FiUsers, FiClock, FiVideo } from "react-icons/fi";
import PropTypes from "prop-types";

export default function ExperienceVideoModal({ onClose, experience, fireteam }) {
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState(null);

  useEffect(() => {
    if (experience) {
      generateMeetingRoom();
      loadJitsi();
    }
    return cleanup;
    // eslint-disable-next-line
  }, [experience]);

  const generateMeetingRoom = () => {
    const roomName = `wanac-experience-${fireTeam?.id || 'unknown'}-${experience?.id || Date.now()}-${Date.now()}`;
    const meetingUrl = `https://meet.jit.si/${roomName}`;
    
    setMeetingInfo({
      roomName,
      meetingUrl,
      meetingId: roomName,
      title: experience?.title || 'Experience Discussion',
      fireTeamName: fireTeam?.title || fireteam?.name || 'Fireteam',
      duration: experience?.duration_minutes || 60,
      agenda: experience?.agenda || []
    });
  };

  const loadJitsi = async () => {
    try {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }

      // Prevent duplicate script loading
      if (!document.querySelector('script[src="https://meet.jit.si/external_api.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;

        script.onload = () => {
          setTimeout(initializeJitsi, 100);
        };

        script.onerror = () => {
          setError('Failed to load Jitsi Meet');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } else {
        // If script is already present but API not loaded yet, wait and try again
        const checkApi = setInterval(() => {
          if (window.JitsiMeetExternalAPI) {
            clearInterval(checkApi);
            initializeJitsi();
          }
        }, 100);
        setTimeout(() => clearInterval(checkApi), 5000);
      }
    } catch (err) {
      setError('Error initializing video session');
      setIsLoading(false);
    }
  };

  const initializeJitsi = () => {
    try {
      if (jitsiContainerRef.current && meetingInfo) {
        jitsiContainerRef.current.innerHTML = '';
      }
      
      const options = {
        roomName: meetingInfo.roomName,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          enableInsecureRoomNameWarning: false,
          enableNoisyMicDetection: true,
          enableTalkWhileMuted: false,
          enableLayerSuspension: true,
          startScreenSharing: false,
          enableRemb: true,
          enableTcc: true,
          useStunTurn: true,
          enableIceRestart: true,
          enableP2P: true,
          p2p: {
            enabled: true,
            stunServers: [
              { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
            ]
          }
        },
        userInfo: {
          displayName: 'Participant'
        }
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);

      jitsiApiRef.current.addEventListener('videoConferenceLeft', onClose);
      jitsiApiRef.current.addEventListener('readyToClose', onClose);

      setIsLoading(false);
    } catch (err) {
      setError('Failed to start video session');
      setIsLoading(false);
    }
  };

  const cleanup = () => {
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.dispose();
      } catch (err) {
        console.warn('Error disposing Jitsi API:', err);
      }
    }
  };

  const copyMeetingLink = () => {
    if (meetingInfo?.meetingUrl) {
      navigator.clipboard.writeText(meetingInfo.meetingUrl);
      // You could add a toast notification here
      alert('Meeting link copied to clipboard!');
    }
  };

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-blue-900/80 backdrop-blur-sm">
        <div className="bg-white/80 shadow-2xl rounded-2xl max-w-md w-full mx-4 p-8 flex flex-col items-center border border-white/30">
          <div className="mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <FiX className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Connection Error</h3>
          <p className="text-gray-700 mb-6 text-center">{error}</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-blue-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl mx-4 rounded-2xl shadow-2xl bg-white/80 border border-white/30 flex flex-col overflow-hidden min-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700/90 to-blue-400/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl shadow">
              <FiVideo className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white drop-shadow">
                {meetingInfo?.title || 'Experience Discussion'}
              </h2>
              <p className="text-sm text-blue-100">
                {meetingInfo?.fireteamName} • {meetingInfo?.duration} minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyMeetingLink}
              className="text-white hover:bg-blue-800/40 rounded-full p-2 transition flex items-center gap-2"
              title="Copy meeting link"
            >
              <FiCopy size={20} />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-800/40 rounded-full p-2 transition"
              aria-label="Close video session modal"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Meeting Info and Agenda */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FiUsers className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Meeting Link</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={meetingInfo?.meetingUrl || ''}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                  onClick={copyMeetingLink}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Copy
                </button>
              </div>
            </div>
            {meetingInfo?.agenda && meetingInfo.agenda.length > 0 && (
              <div className="md:w-80">
                <div className="flex items-center gap-2 mb-2">
                  <FiClock className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Discussion Agenda</span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {meetingInfo.agenda.slice(0, 5).map((step, idx) => (
                    <div key={idx} className="text-xs text-gray-600 mb-1">
                      {idx + 1}. {step.title} {step.duration && `(${step.duration})`}
                    </div>
                  ))}
                  {meetingInfo.agenda.length > 5 && (
                    <div className="text-xs text-gray-500">
                      +{meetingInfo.agenda.length - 5} more steps
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Jitsi Meet Container */}
        <div className="flex-1 relative min-h-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/60 to-blue-400/30 backdrop-blur-sm z-10" aria-busy="true" aria-live="polite">
              <div className="relative w-16 h-16 mb-4">
                <span className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></span>
                <span className="absolute inset-2 rounded-full bg-white/80"></span>
                <span className="absolute inset-4 rounded-full bg-blue-200"></span>
              </div>
              <p className="text-blue-900 font-semibold text-lg">Starting discussion session...</p>
              <p className="text-blue-800 text-sm mt-2">Preparing video meeting room</p>
            </div>
          )}
          <div ref={jitsiContainerRef} className="w-full h-full min-h-[500px] rounded-b-2xl overflow-hidden" />
        </div>
      </div>
    </div>
  );
}

ExperienceVideoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    duration_minutes: PropTypes.number,
    agenda: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      duration: PropTypes.string,
      subtitle: PropTypes.string
    }))
  }),
  fireteam: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    name: PropTypes.string
  })
};









