"use client";
import React, { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import { FaCalendar, FaVideo, FaMicrophone, FaUpload, FaRobot, FaBookOpen, FaInfoCircle } from 'react-icons/fa';
import SessionRecorder from "./SessionRecorder";
import FileUpload from "./FileUpload";
import { sessionsService } from '../../../../services/api/sessions.service';
import { useRouter } from 'next/navigation';

export default function SessionPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]); // Start with empty
  const [liveSession, setLiveSession] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Fetch sessions for this user
        sessionsService.getSessions().then((data) => {
          // Use the correct API response structure
          const sessionArray = data?.sessions?.data || [];
          setUpcomingSessions(sessionArray);
        });
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleBookSession = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSession = {
      id: upcomingSessions.length + 1,
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      status: "Scheduled",
      link: form.link?.value || "https://meet.jit.si/wanac-demo-room",
      resources: [], // Could be extended to allow resource input
      notes: form.notes?.value || "",
    };
    setUpcomingSessions([...upcomingSessions, newSession]);
    setShowBooking(false);
  };

  const router = useRouter();

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-2 md:px-8 py-6 bg-gray-50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Welcome & Instructions */}
            <section className="col-span-1 md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
              <FaInfoCircle className="text-primary text-2xl" />
              <div>
                <h1 className="text-xl font-bold mb-1">Welcome to Your Sessions</h1>
                <p className="text-gray-600 text-sm"> Join, record, and review your coaching sessions. Summaries, and actionable insights.</p>
              </div>
            </section>

            {/* Upcoming Sessions */}
            <section className="col-span-1 md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendar className="text-primary" />
                <h2 className="text-lg font-semibold text-primary">Upcoming Sessions</h2>
              </div>
              {upcomingSessions.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming sessions.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingSessions.map((session) => {
                    // Determine if user is a coach for this session
                    const isCoach = (user && ((session.coach && session.coach.user_id === user.id) || (session.coach_id && session.coach_id === user.id)));
                    return (
                      <div
                        key={session.id}
                        className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded cursor-pointer hover:bg-primary/10 transition"
                        onClick={() => {
                          const url = `/coach/sessions/fullviewsessio/${session.id}` + (isCoach ? '' : '?readonly=true');
                          router.push(url);
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{session.title}</p>
                            <p className="text-sm text-gray-600">Status: {session.status}</p>
                            <p className="text-sm text-gray-600 mt-1">Notes: {session.notes || "-"}</p>
                            {session.resources && session.resources.length > 0 && (
                              <div className="mt-1">
                                <span className="text-xs font-semibold text-gray-700">Resources:</span>
                                <ul className="list-disc list-inside text-xs text-blue-700">
                                  {session.resources.map((res, idx) => (
                                    <li key={idx}>
                                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">{res.name}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="text-right flex flex-col items-end gap-1">
                            <p className="text-sm font-semibold text-gray-800">{session.date}</p>
                            <p className="text-sm text-gray-600">{session.time}</p>
                            {session.session_link && (
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  window.open(session.session_link, '_blank');
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors w-max mt-1 text-xs text-center"
                                style={{ display: 'inline-block' }}
                              >
                                Join Meeting
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Live Video Meeting */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <FaVideo className="text-primary" />
                <h2 className="text-lg font-semibold text-primary">Live One-on-One Video Meeting</h2>
              </div>
              <button
                onClick={() => setLiveSession(!liveSession)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors w-max mb-4"
              >
                {liveSession ? "Close Video Section" : "Start Live Video Meeting"}
              </button>
              {liveSession && (
                <div className="border border-gray-200 rounded-lg p-4 mt-2">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Send an Invite</h3>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                          style={{padding: '0.5rem 0.75rem', border: '1px solid #d1d5db'}}
                        />
                        <button
                          onClick={() => {
                            alert(`Invite sent to ${inviteEmail}`);
                            setInviteEmail("");
                          }}
                          className="px-3 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                          disabled={!inviteEmail}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Meeting Link</h3>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="https://meet.jit.si/wanac-demo-room"
                          readOnly
                          className="flex-1 bg-gray-50 rounded-md border-gray-300"
                          style={{padding: '0.5rem 0.75rem', border: '1px solid #d1d5db'}}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("https://meet.jit.si/wanac-demo-room");
                            alert("Link copied to clipboard");
                          }}
                          className="px-3 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                  <iframe
                    title="Live Video Meeting"
                    src="https://meet.jit.si/wanac-demo-room"
                    width="100%"
                    height="400"
                    allow="camera; microphone; fullscreen"
                    className="rounded-md"
                    style={{ border: 0 }}
                  />
                </div>
              )}
            </section>
            
          </div>
        </main>
      </div>
    </div>
  );
}