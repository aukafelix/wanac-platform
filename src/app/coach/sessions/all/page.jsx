"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoachSidebar from "../../../../../components/dashboardcomponents/CoachSidebar";
import ClientTopbar from "../../../../../components/dashboardcomponents/clienttopbar";
import { FaCalendar, FaInfoCircle, FaSpinner } from "react-icons/fa";
import { sessionsService } from "../../../../services/api/sessions.service";
import { normalizeSessions } from "../../../../lib/sessions";

export default function AllCoachSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [user, setUser] = useState({ name: "Coach" });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
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
      setLoading(true);
      setFetchError("");
      try {
        const response = await sessionsService.getSessions();
        setSessions(normalizeSessions(response));
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setFetchError("Could not load sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen h-screen flex bg-gray-50 font-body overflow-x-hidden">
      <CoachSidebar />
      <div className="flex-1 flex flex-col h-full transition-all duration-300 min-h-0">
        <ClientTopbar user={user || { name: "Coach" }} />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-gray-50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
              <FaInfoCircle className="text-[#002147] text-2xl shrink-0" />
              <div>
                <h1 className="text-xl font-bold mb-1 text-[#002147]">All Coaching Sessions</h1>
                <p className="text-gray-600 text-sm">Below is a list of all your scheduled, past, and upcoming coaching sessions.</p>
              </div>
            </section>
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendar className="text-[#002147]" />
                <h2 className="text-lg font-semibold text-[#002147]">All Sessions</h2>
              </div>
              <button
                type="button"
                className="text-[#002147] hover:text-orange-500 underline text-sm font-medium w-max mb-4 transition-colors"
                onClick={() => router.push("/coach/sessions")}
              >
                ← Back to Dashboard
              </button>
              {loading ? (
                <div className="flex items-center gap-2 py-6 text-gray-500 text-sm">
                  <FaSpinner className="animate-spin" />
                  Loading sessions…
                </div>
              ) : fetchError ? (
                <p className="text-amber-700 text-sm py-4">{fetchError}</p>
              ) : sessions.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">No sessions found.</p>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border-l-4 border-[#002147] pl-4 py-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/coach/sessions/fullviewsession/${session.id}`)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800">{session.title}</p>
                          <p className="text-sm text-gray-600 mt-0.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {session.status}
                            </span>
                          </p>
                          {session.link && (
                            <a
                              href={session.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs mt-1 inline-block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Join Meeting
                            </a>
                          )}
                          <button
                            type="button"
                            className="text-[#002147] text-xs font-medium mt-2 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/coach/sessions/fullviewsession/${session.id}`);
                            }}
                          >
                            View details →
                          </button>
                        </div>
                        <div className="text-right shrink-0">
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