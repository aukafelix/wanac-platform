"use client";
import React, { useState } from "react";
import { FaUserPlus, FaCopy } from "react-icons/fa";

export default function LiveSessionPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  // Generate a unique Jitsi meeting link on each page load
  const uniqueRoom = `wanac-room-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
  const meetingLink = `https://meet.jit.si/${uniqueRoom}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied");
  };

  const handleSendInvite = () => {
    alert(`Invite sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6">
        {/* Top header with meeting name */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">Meeting ready</h2>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors min-h-[44px] shrink-0"
          >
            <FaCopy className="text-gray-600" />
            Copy joining info
          </button>
        </div>

        {/* Meeting link display */}
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-sm">Or share this meeting link with others you want in the meeting</p>
          <input
            type="text"
            value={meetingLink}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Invite section */}
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Add people or email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-700"
          />
          <button
            onClick={handleSendInvite}
            disabled={!inviteEmail}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg text-white font-medium transition-colors ${
              inviteEmail ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            <FaUserPlus />
            Send
          </button>
        </div>

        {/* Video iframe preview */}
        <div className="rounded-xl overflow-hidden border border-gray-200 min-h-[280px] sm:min-h-[400px] h-[50vh] sm:h-[500px] w-full relative">
          <iframe
            id="jitsi-iframe"
            title="Video Call"
            src={meetingLink}
            allow="camera; microphone; fullscreen"
            className="w-full h-full"
            style={{ border: 0 }}
          />
          <button
            onClick={() => {
              const iframe = document.getElementById('jitsi-iframe');
              if (iframe && iframe.requestFullscreen) {
                iframe.requestFullscreen();
              } else if (iframe && iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
              } else if (iframe && iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
              } else if (iframe && iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
              }
            }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 px-3 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors z-10 min-h-[44px]"
          >
            View Full Screen
          </button>
        </div>
      </div>
    </div>
  );
}
