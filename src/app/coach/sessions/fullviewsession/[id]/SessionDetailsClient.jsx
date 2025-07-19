"use client";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaLink,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaFileDownload,
  FaPlus,
  FaStickyNote,
  FaTimes
} from "react-icons/fa";
import { sessionsService } from "../../../../../services/api/sessions.service";
import CoachSidebar from "../../../../../../components/dashboardcomponents/CoachSidebar";
import ClientTopbar from "../../../../../../components/dashboardcomponents/clienttopbar";

export default function SessionDetailsClient({ sessionId }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await sessionsService.getSession(sessionId);
        setSession(data.session)
      } catch (err) {
        console.error("Failed to fetch session", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div className="p-8">Loading session...</div>;
  if (!session) return <div className="p-8">Session not found.</div>;

  const dateObj = session.scheduled_at ? new Date(session.scheduled_at) : null;
  const dateStr = dateObj?.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = dateObj?.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex min-h-screen bg-white">
      <CoachSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ClientTopbar user={{ name: "Coach" }} />
        <main className="flex-1 px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {session.title}
                </h1>
                <p className="text-gray-600 max-w-xl">
                  {session.description || "No description provided."}
                </p>
              </div>
              {session.session_link && (
                <button
                  className="mt-4 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                  onClick={() => window.open(session.session_link, "_blank")}
                >
                  <FaCheckCircle /> Join Session
                </button>
              )}
            </div>

            {/* Session Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border p-4 shadow-sm bg-white">
                <div className="text-blue-600 flex items-center gap-2 font-medium">
                  <FaCalendarAlt /> Scheduled
                </div>
                <div className="text-lg font-semibold text-gray-800 mt-2">
                  {dateStr || "N/A"}
                </div>
                <div className="text-sm text-gray-500">{timeStr} • 90 minutes</div>
              </div>
              <div className="rounded-xl border p-4 shadow-sm bg-white">
                <div className="text-green-600 flex items-center gap-2 font-medium">
                  <FaUser /> Participants
                </div>
                <div className="text-lg font-semibold text-gray-800 mt-2">
                  {session.session_members?.length || 0} Members
                </div>
                <div className="text-sm text-gray-500">All confirmed</div>
              </div>
              <div className="rounded-xl border p-4 shadow-sm bg-white">
                <div className="text-emerald-600 flex items-center gap-2 font-medium">
                  <FaLink /> Session Link
                </div>
                <div className="text-lg font-semibold text-green-700 mt-2">
                  {session.session_link ? "Ready to Join" : "N/A"}
                </div>
                <div className="text-sm text-gray-500 break-all">
                  {session.session_link || "No link available"}
                </div>
              </div>
            </div>

            {/* Participants */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  Session Participants
                </h2>
                <button className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 flex items-center gap-1" onClick={() => setShowAddParticipant(true)}>
                  <FaPlus /> Add Participant
                </button>
              </div>
              <div className="space-y-2">
                {session.session_members?.map((member, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border rounded-lg px-4 py-3 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.client?.user?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.client?.user?.email}
                      </div>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Confirmed
                    </span>
                  </div>
                ))}
                {session.session_members?.length === 0 && (
                  <p className="text-sm text-gray-500">No participants yet.</p>
                )}
              </div>
            </section>

            {/* Resources */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  Session Resources
                </h2>
                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-1" onClick={() => setShowAddResource(true)}>
                  <FaPlus /> Add Resource
                </button>
              </div>
              <div className="space-y-2">
                {session.session_resources?.map((res, i) => (
                  <div
                    key={i}
                    className="bg-white border rounded-lg px-4 py-3 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{res.name}</div>
                      <div className="text-sm text-gray-500">{res.description}</div>
                    </div>
                    <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      <FaFileDownload /> Download
                    </button>
                  </div>
                ))}
                {session.session_resources?.length === 0 && (
                  <p className="text-sm text-gray-500">No resources yet.</p>
                )}
              </div>
            </section>

            {/* Notes */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Session Notes</h2>
              <textarea
                placeholder="Enter your session observations, participant feedback, or action items here..."
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 resize-none focus:outline-none focus:ring focus:ring-blue-100"
                rows={4}
              />
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4">
                + Add Note
              </button>

              <div className="space-y-3">
                {session.session_notes?.map((note, i) => (
                  <div key={i} className="bg-yellow-100 rounded-lg p-4 shadow-sm">
                    <div className="text-gray-800">{note.note}</div>
                    <div className="text-xs text-gray-600 mt-2">
                      <FaStickyNote className="inline mr-1" />
                      {new Date(note.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
                {session.session_notes?.length === 0 && (
                  <p className="text-sm text-gray-500">No notes yet.</p>
                )}
              </div>
            </section>

            {/* AI Summary */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Summary</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="text-gray-800">
                  {/* Mock AI summary data */}
                  <p><strong>Key Points:</strong> The session focused on goal setting, progress review, and identifying new action items for the upcoming week.</p>
                  <p><strong>Sentiment:</strong> Positive and engaged participation from all members.</p>
                  <p><strong>Action Items:</strong> Each participant to submit a weekly progress update and review shared resources before the next session.</p>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <span>Generated by AI </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Add Participant Modal */}
      {showAddParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAddParticipant(false)}>
              <FaTimes />
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Participant</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Participant Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" placeholder="Email Address" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddParticipant(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAddResource(false)}>
              <FaTimes />
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Resource</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">File Upload</label>
                <input type="file" className="w-full" disabled />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddResource(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
