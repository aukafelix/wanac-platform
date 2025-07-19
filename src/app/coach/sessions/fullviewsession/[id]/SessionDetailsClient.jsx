"use client";
import React from "react";
import { FaCalendarAlt, FaLink, FaCheckCircle } from 'react-icons/fa';

export default function SessionDetailsClient({ session }) {
  if (!session) return <div className="p-8">Session not found.</div>;

  // Format date/time if available
  const dateObj = session.scheduled_at ? new Date(session.scheduled_at) : (session.date ? new Date(session.date) : null);
  const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const timeStr = dateObj ? dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';
  const duration = session.duration || 'N/A';

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              {session.title || 'Session Title'}
            </h1>
            <p className="text-gray-600 max-w-2xl">{session.description || 'No description provided.'}</p>
          </div>
          {session.session_link && (
            <button
              className="mt-4 md:mt-0 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium flex items-center gap-2"
              onClick={() => window.open(session.session_link, "_blank")}
            >
              <FaCheckCircle /> Join Session
            </button>
          )}
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start border border-gray-200">
            <div className="flex items-center gap-2 mb-2 text-blue-600"><FaCalendarAlt /> Scheduled</div>
            <div className="font-semibold text-lg">{dateStr}</div>
            <div className="text-gray-500 text-sm">{timeStr} &bull; {duration}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start border border-gray-200">
            <div className="flex items-center gap-2 mb-2 text-emerald-600"><FaLink /> Session Link</div>
            <div className="font-semibold text-lg text-green-700">{session.session_link ? 'Ready to Join' : 'N/A'}</div>
            <div className="text-gray-500 text-sm break-all">{session.session_link || 'N/A'}</div>
          </div>
        </div>
        {/* Show all available session fields for debugging/development */}
        <div className="bg-gray-50 rounded-lg shadow p-4 border border-gray-200 mt-8">
          <div className="font-semibold mb-2">Session Data (Debug):</div>
          <pre className="text-xs text-gray-700 overflow-x-auto">{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
} 