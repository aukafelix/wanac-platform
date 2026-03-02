"use client";
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import {
  FaCalendar,
  FaVideo,
  FaInfoCircle,
  FaSpinner,
  FaMicrophone,
  FaUpload,
} from "react-icons/fa";
import SessionRecorder from "./SessionRecorder";
import FileUpload from "./FileUpload";
import { sessionsService } from "../../../services/api/sessions.service";
import { useRouter } from "next/navigation";

function normalizeSessions(raw) {
  const list = Array.isArray(raw) ? raw : raw?.sessions?.data ?? raw?.data ?? [];
  if (!Array.isArray(list)) return [];
  return list.map((session) => {
    const at = session.scheduled_at || session.date;
    const d = at ? new Date(at) : new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return {
      ...session,
      time,
      date,
      link: session.session_link || session.meeting_link || "",
      notes: session.description || "",
      status: session.status || "Scheduled",
    };
  });
}

// Use the same Jitsi domain as the rest of the app
const JITSI_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.jit.si";

export default function SessionPage() {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [liveSession, setLiveSession] = useState(false);
  const [showRecordUpload, setShowRecordUpload] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
    const fetchSessions = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const data = await sessionsService.getSessions();
        setUpcomingSessions(normalizeSessions(data));
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setFetchError("Could not load sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const meetingLink = `https://${JITSI_DOMAIN}/wanac-demo-room`;

  const initializeJitsi = () => {
    if (typeof window === "undefined") return;
    if (!liveSession) return;
    if (!jitsiContainerRef.current || !window.JitsiMeetExternalAPI) return;

    try {
      // Clear any previous instance
      jitsiContainerRef.current.innerHTML = "";

      const url = new URL(meetingLink);
      const domain = url.hostname;
      const pathParts = url.pathname.split("/").filter(Boolean);
      const roomName = pathParts[pathParts.length - 1] || "";

      const options = {
        roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        userInfo: {
          displayName: user?.name || "Participant",
        },
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to start Jitsi meeting:", err);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!liveSession) {
      // Dispose when closing live session
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn("Error disposing Jitsi API:", err);
        }
        jitsiApiRef.current = null;
      }
      return;
    }

    const scriptSrc = `https://${JITSI_DOMAIN}/external_api.js`;

    const ensureInitialized = () => {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
      }
    };

    if (window.JitsiMeetExternalAPI) {
      initializeJitsi();
    } else {
      let script = document.querySelector(`script[src="${scriptSrc}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => {
          setTimeout(ensureInitialized, 100);
        };
        script.onerror = () => {
          // eslint-disable-next-line no-console
          console.error("Failed to load Jitsi External API script");
        };
        document.head.appendChild(script);
      } else {
        const checkApi = setInterval(() => {
          if (window.JitsiMeetExternalAPI) {
            clearInterval(checkApi);
            initializeJitsi();
          }
        }, 100);
        setTimeout(() => clearInterval(checkApi), 5000);
      }
    }

    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn("Error disposing Jitsi API:", err);
        }
        jitsiApiRef.current = null;
      }
    };
    // We intentionally depend on liveSession and meetingLink
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSession]);

  return (
    <div className="h-screen flex bg-gray-50 font-body">
      <Sidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col h-full min-h-0 transition-all duration-300">
        <ClientTopbar user={user} />
        <main className="flex-1 min-h-0 overflow-y-auto px-2 md:px-8 py-6 bg-gray-50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Welcome */}
            <section className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
              <FaInfoCircle className="text-[#002147] text-2xl shrink-0" />
              <div>
                <h1 className="text-xl font-bold mb-1 text-[#002147]">Welcome to Your Sessions</h1>
                <p className="text-gray-600 text-sm">
                  Join, record, and review your coaching sessions. Get summaries and actionable insights.
                </p>
              </div>
            </section>

            {/* Upcoming Sessions */}
            <section className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-[#002147]" />
                <h2 className="text-lg font-semibold text-[#002147]">Upcoming Sessions</h2>
              </div>
              {loading ? (
                <div className="flex items-center gap-2 py-6 text-gray-500 text-sm">
                  <FaSpinner className="animate-spin" />
                  Loading sessions…
                </div>
              ) : fetchError ? (
                <p className="text-amber-700 text-sm py-2">{fetchError}</p>
              ) : upcomingSessions.length === 0 ? (
                <p className="text-gray-500 text-sm py-2">
                  No upcoming sessions. Your coach will add sessions you can join here.
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingSessions.map((session) => {
                    const joinUrl = session.link || session.session_link;
                    const isCoach =
                      user &&
                      ((session.coach && session.coach.user_id === user.id) ||
                        (session.coach_id && session.coach_id === user.id));
                    return (
                      <div
                        key={session.id}
                        className="border-l-4 border-[#002147] pl-4 py-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => {
                          if (isCoach) {
                            router.push(`/coach/sessions/fullviewsession/${session.id}`);
                          } else {
                            router.push(`/client/session/${session.id}`);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800">{session.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              {session.status}
                            </span>
                            {session.notes && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{session.notes}</p>
                            )}
                            {session.resources && session.resources.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs font-semibold text-gray-700">Resources:</span>
                                <ul className="list-disc list-inside text-xs text-blue-700 mt-0.5">
                                  {session.resources.map((res, idx) => (
                                    <li key={idx}>
                                      <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-blue-900"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {res.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="text-right shrink-0 flex flex-col items-end gap-1">
                            <p className="text-sm font-semibold text-gray-800">{session.date}</p>
                            <p className="text-sm text-gray-600">{session.time}</p>
                            {joinUrl && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(joinUrl, "_blank");
                                }}
                                className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors mt-1"
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

            {/* Record or Upload Session */}
            

            {/* Live Video Meeting */}
            <section className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FaVideo className="text-[#002147]" />
                <h2 className="text-lg font-semibold text-[#002147]">Live One-on-One Video Meeting</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Start or join a live video meeting with your coach.
              </p>
              <button
                type="button"
                onClick={() => setLiveSession(!liveSession)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors w-max text-sm"
              >
                {liveSession ? "Close Video" : "Start Live Video Meeting"}
              </button>
              {liveSession && (
                <div className="border border-gray-200 rounded-lg p-4 mt-2 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Send invite</label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#002147] focus:ring-1 focus:ring-[#002147]/20 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (inviteEmail) {
                              alert(`Invite sent to ${inviteEmail}`);
                              setInviteEmail("");
                            }
                          }}
                          className="px-3 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                          disabled={!inviteEmail}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meeting link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={meetingLink}
                          readOnly
                          className="flex-1 bg-gray-50 rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            alert("Link copied to clipboard");
                          }}
                          className="px-3 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors text-sm shrink-0"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border-0 w-full h-[400px] overflow-hidden">
                    <div
                      ref={jitsiContainerRef}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}