"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaCalendar, FaVideo, FaRobot, FaBookOpen } from 'react-icons/fa';
import { sessionsService } from '../../../services/api/sessions.service';

export default function CoachSessionsPage() {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const router = useRouter();
  // Ensure user is always defined
  const [user, setUser] = useState({ name: "Coach" });
  const [showBooking, setShowBooking] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser({ name: "Coach" });
      }
    } else {
      setUser({ name: "Coach" });
    }
    
    // Set min date for booking form (client only)
    setMinDate(new Date().toISOString().split('T')[0]);
    // Fetch existing sessions
    const fetchSessions = async () => {
      try {
        const response = await sessionsService.getSessions(); // Axios/Fetch response
        const sessions = response.sessions.data; 
        console.log(sessions);
    
        setUpcomingSessions(
          sessions.map(session => {
            const d = new Date(session.scheduled_at);
            const pad = n => n.toString().padStart(2, '0');
            const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
            return {
              ...session,
              time,
              date,
              link: session.session_link || '',
              resources: session.resources || '',
              notes: session.description || '',
              status: session.status || 'Scheduled'
            };
          })
        );
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    
    fetchSessions();
  }, []);

  const handleBookSession = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const notes = form.notes.value;
    const date = form.date.value;
    const formatted = date.toLocaleString('sv-SE', { hour12: false }).replace(' ', 'T');


    try {
      // Generate a unique Jitsi meeting link using the session title
      const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') .replace(/(^-|-$)/g, '') : 'session';
      const randomString = Math.random().toString(36).substring(2, 8);
      // Combine date and time into ISO string for scheduled_at
      const scheduled_at = formatted;

      const sessionData = {
        title: title || `Session`,
        description: notes || '',
        scheduled_at,

      };

      const newSession = await sessionsService.addSession(sessionData);

      setUpcomingSessions([...upcomingSessions, {
        ...newSession,
        title: title || `Session`,
        notes,
        status: "Scheduled"
      }]);

      setShowBooking(false);
      setSuccessMessage("Session scheduled successfully!");
      form.reset();

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      // After 1 second, navigate to the session detail/edit page
      setTimeout(() => {
        if (newSession.id) {
          router.push(`/pages/coach/sessions/${newSession.id}`);
        }
      }, 1000);
    } catch (error) {
      console.error('Error booking session:', error);
      alert('Failed to book session. Please try again.');
    }
  };

  return (
    <div className="h-screen flex bg-white font-body">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full min-h-0 transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: "Coach" }} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto px-3 md:px-4 py-2 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1 space-y-2">
                {/* Header Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-lg p-3 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h1 className="text-lg font-bold text-white mb-1">Coaching Sessions Dashboard</h1>
                    <p className="text-white/90 text-xs">Manage, book, join, and review your coaching sessions</p>
              </div>
            </section>

            {/* All Scheduled Meetings */}
                <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FaCalendar className="text-orange-500 text-sm" />
                    <h2 className="text-sm font-semibold text-[#002147]">Scheduled Sessions</h2>
              </div>
              {upcomingSessions.length === 0 ? (
                    <p className="text-gray-500 text-xs">No sessions scheduled yet.</p>
              ) : (
                    <div className="space-y-2">
                  {(upcomingSessions.slice(0, 2)).map((session) => (
                    <div
                      key={session.id}
                          className="border-l-4 border-[#002147] pl-3 py-2 bg-blue-50/50 rounded hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                      onClick={() => router.push(`/coach/sessions/fullviewsession/${session.id}`)}
                    >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-xs">{session.title}</p>
                          {session.link && (
                              <a
                                href={session.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-[10px] mt-0.5 inline-block underline"
                                onClick={e => e.stopPropagation()}
                              >
                                Join Meeting
                              </a>
                              )}
                        </div>
                        <div className="text-right">
                              <p className="text-[10px] font-semibold text-gray-900">{session.date}</p>
                              <p className="text-[10px] text-gray-600">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/coach/sessions/fullviewsession/${session.id}`);
                          }}
                          className="px-3 py-1 bg-[#002147] text-white rounded text-[10px] font-medium hover:bg-[#003875] transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                  {upcomingSessions.length > 2 && (
                      <button
                          className="mt-2 text-[#002147] hover:text-orange-500 text-xs font-semibold transition-colors duration-150 flex items-center gap-1 group"
                        onClick={() => router.push("/coach/sessions/all")}
                      >
                          View All Sessions
                          <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                      </button>
                      )}
                    </div>
                  )}
                </section>

                {/* Schedule a Session */}
                <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FaBookOpen className="text-orange-500 text-sm" />
                    <h2 className="text-sm font-semibold text-[#002147]">Schedule a Session</h2>
                  </div>
                  
                  {successMessage && !showBooking && (
                    <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded text-green-800 text-xs flex items-center gap-1">
                      <span>✓</span>
                      {successMessage}
                    </div>
                  )}

                  <button
                    className="px-4 py-1.5 bg-orange-500 text-white rounded text-xs font-medium hover:bg-orange-600 transition-colors"
                    onClick={() => {
                      setShowBooking(!showBooking);
                      if (!showBooking) setSuccessMessage("");
                    }}
                  >
                    {showBooking ? "Cancel" : "+ Schedule New Session"}
                  </button>
                  
                  {showBooking && (
                    <form
                      onSubmit={handleBookSession}
                      className="mt-3 bg-gray-50 border border-gray-200 rounded p-3"
                    >
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Session Title
                          </label>
                          <input
                            name="title"
                            placeholder="Enter session title"
                            required
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-[#002147] focus:ring-1 focus:ring-[#002147]/20 focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            name="notes"
                            placeholder="Add session description (optional)"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-[#002147] focus:ring-1 focus:ring-[#002147]/20 focus:outline-none transition-all"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Date & Time
                          </label>
                          <input
                            name="date"
                            type="datetime-local"
                            required
                            min={minDate}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-[#002147] focus:ring-1 focus:ring-[#002147]/20 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#002147] text-white rounded text-xs font-medium hover:bg-[#003875] transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowBooking(false)}
                          className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </section>
                {/* Live Video Meeting & AI Insights - Combined in grid */}
                <div className="grid grid-cols-2 gap-2">
                  <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FaVideo className="text-blue-500 text-sm" />
                      <h2 className="text-sm font-semibold text-[#002147]">Live Video</h2>
                    </div>
                    <p className="text-gray-600 text-[10px] mb-2">
                      Start a live video session
                    </p>
                    <button
                      onClick={() => router.push("/pages/coach/sessions/live-session")}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors w-full"
                    >
                      Start Meeting
                    </button>
                  </section>

                  <section className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FaRobot className="text-purple-500 text-sm" />
                      <h2 className="text-sm font-semibold text-[#002147]">AI Insights</h2>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded p-2">
                      <p className="text-gray-700 text-[10px]">
                        Upload recordings for AI-generated transcripts and insights
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
