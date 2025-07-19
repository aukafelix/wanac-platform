"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoachSidebar from '../../../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../../../components/dashboardcomponents/clienttopbar';
import { FaCalendar, FaInfoCircle } from 'react-icons/fa';
import { sessionsService } from '../../../../../services/api/sessions.service';

export default function AllCoachSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState({ name: "Coach" });
  const router = useRouter();

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
    const fetchSessions = async () => {
      try {
        const sessions = await sessionsService.getSessions();
        setSessions(sessions.map(session => {
          const d = new Date(session.date);
          const pad = n => n.toString().padStart(2, '0');
          const date = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
          const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
          return {
            ...session,
            time,
            date,
            link: session.meeting_link || '',
            resources: session.resources || '',
            notes: session.description || '',
            status: session.status || 'Scheduled'
          };
        }));
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user || { name: "Coach" }} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-2 md:px-8 py-6 bg-gray-50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
            <section className="col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
              <FaInfoCircle className="text-primary text-2xl" />
              <div>
                <h1 className="text-xl font-bold mb-1">All Coaching Sessions</h1>
                <p className="text-gray-600 text-sm">Below is a list of all your scheduled, past, and upcoming coaching sessions.</p>
              </div>
            </section>
            <section className="col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendar className="text-primary" />
                <h2 className="text-lg font-semibold text-primary">All Sessions</h2>
              </div>
              <button
                className="text-blue-600 underline text-sm font-medium w-max mb-4"
                onClick={() => router.push("/pages/coach/sessions")}
              >
                &larr; Back to Dashboard
              </button>
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-sm">No sessions found.</p>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{session.title}</p>
                          <p className="text-sm text-gray-600">Status: {session.status}</p>
                          {session.link && (
                            <div className="mt-1">
                              <label className="text-xs text-gray-500">Meeting Link</label>
                              <input
                                type="text"
                                value={session.link}
                                readOnly
                                className="block w-full text-xs bg-gray-100 border border-gray-300 rounded px-2 py-1 mt-1 text-blue-700 cursor-pointer focus:outline-none"
                                onFocus={e => e.target.select()}
                                onClick={e => e.target.select()}
                              />
                              <a
                                href={session.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-xs mt-1 inline-block"
                              >
                                Join Meeting
                              </a>
                            </div>
                          )}
                          {session.resources && (
                            <div className="mt-1">
                              <label className="text-xs text-gray-500">Resources</label>
                              <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-1 mt-1 break-words">{session.resources}</div>
                            </div>
                          )}
                          {session.notes && (
                            <div className="mt-1">
                              <label className="text-xs text-gray-500">Notes</label>
                              <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-1 mt-1 break-words">{session.notes}</div>
                            </div>
                          )}
                          {session.files && session.files.length > 0 && (
                            <div className="mt-1">
                              <label className="text-xs text-gray-500">Files</label>
                              <ul className="text-xs mt-1">
                                {session.files.map((file, idx) => (
                                  <li key={idx}>
                                    <a href={file.url} download={file.name} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{file.name}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">{session.date}</p>
                          <p className="text-sm text-gray-600">{session.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 