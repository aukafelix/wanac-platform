import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaRegHandPaper, FaPhoneSlash, FaShieldAlt, FaSignOutAlt, FaThLarge } from 'react-icons/fa';

export default function MeetControlBar({ onLeave, onLogout, isManager, onToggleLayout }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenOn, setScreenOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg px-8 py-3 border border-gray-200 mt-6 w-full max-w-3xl mx-auto">
      {/* Shield (Meeting Manager) flush left */}
      <div className="flex-shrink-0">
        {isManager && (
          <span className="text-xl text-gray-500" aria-label="Meeting Manager" title="Meeting Manager">
            <FaShieldAlt />
          </span>
        )}
      </div>
      {/* Controls centered */}
      <div className="flex flex-1 justify-center items-center gap-6">
        {/* Mic */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={() => setMicOn((v) => !v)}
          aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
          title={micOn ? 'Mute microphone' : 'Unmute microphone'}
        >
          {micOn ? (
            <FaMicrophone className="text-gray-500" />
          ) : (
            <FaMicrophoneSlash className="text-red-500" />
          )}
        </button>
        {/* Camera */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={() => setCamOn((v) => !v)}
          aria-label={camOn ? 'Turn off camera' : 'Turn on camera'}
          title={camOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {camOn ? (
            <FaVideo className="text-gray-500" />
          ) : (
            <FaVideoSlash className="text-red-500" />
          )}
        </button>
        {/* Screen Share */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={() => setScreenOn((v) => !v)}
          aria-label={screenOn ? 'Stop screen sharing' : 'Start screen sharing'}
          title={screenOn ? 'Stop screen sharing' : 'Start screen sharing'}
        >
          <FaDesktop className="text-gray-500" />
        </button>
        {/* Layout Toggle */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={onToggleLayout}
          aria-label="Toggle layout"
          title="Toggle layout"
        >
          <FaThLarge className="text-gray-500" />
        </button>
        {/* Hand Raise */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={() => setHandRaised((v) => !v)}
          aria-label={handRaised ? 'Lower hand' : 'Raise hand'}
          title={handRaised ? 'Lower hand' : 'Raise hand'}
        >
          <FaRegHandPaper className="text-gray-500" />
        </button>
        {/* Leave */}
        <button
          className="focus:outline-none text-xl p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          onClick={onLeave}
          aria-label="Leave call"
          title="Leave call"
        >
          <FaPhoneSlash />
        </button>
      </div>
      {/* Logout flush right */}
      <div className="flex-shrink-0">
        <button
          className="focus:outline-none text-xl p-2 rounded-full transition"
          onClick={onLogout}
          aria-label="Logout"
          title="Logout"
        >
          <FaSignOutAlt className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}