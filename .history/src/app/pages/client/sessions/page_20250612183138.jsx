"use client";
import { useState, useEffect } from "react";
import { Video, Star } from "lucide-react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import dynamic from "next/dynamic";

const mockSessions = [
  {
    id: 1,
    title: "Career Guidance Session",
    date: "2025-06-15",
    time: "10:00 AM",
    type: "Group",
    coach: "Coach Smith",
  },
  {
    id: 2,
    title: "One-on-One Mentorship",
    date: "2025-06-16",
    time: "2:00 PM",
    type: "1:1",
    coach: "Coach Johnson",
  },
];

// Dynamically import react-simple-peer or your video component if you have one
const VideoSessionModal = dynamic(
  () => import("../../../../../components/dashboardcomponents/VideoSessionModal"),
  { ssr: false, loading: () => null }
);

export default function SessionsPage() {
  const [starting, setStarting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleStartSession = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none">
                  <h1 className="text-2xl font-bold mb-4 text-primary">Upcoming Sessions</h1>
                  <p className="text-gray-600 mb-6">View and manage your scheduled coaching sessions.</p>
                  
                  <div className="space-y-4 mb-8">
                    {mockSessions.length === 0 ? (
                      <p className="text-gray-500 text-sm">No sessions scheduled yet.</p>
                    ) : (
                      mockSessions.map((session) => (
                        <div
                          key={session.id}
                          className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <div className="font-semibold text-gray-800">{session.title}</div>
                            <div className="text-sm text-gray-500">
                              with {session.coach} • {session.date} • {session.time} • {session.type}
                            </div>
                          </div>
                          {session.type === "1:1" && (
                            <button
                              onClick={handleStartSession}
                              disabled={starting}
                              className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                              <Video size={16} />
                              Start 1:1
                            </button>
                          )}
                          {/* Start Session button for all sessions */}
                          <button
                            onClick={handleStartSession}
                            disabled={starting}
                            className="flex items-center gap-1 px-3 py-1 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                          >
                            <Video size={16} />
                            Start Session
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleStartSession}
                        disabled={starting}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
                      >
                        <Video size={18} />
                        Start a One-on-One Video Session
                      </button>
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
                      >
                        <Star size={18} />
                        Schedule New Session
                      </button>
                    </div>
                  </div>
                </section>
              </div>
              
              {/* Right Sidebar - Can be added later if needed */}
              <div className="lg:w-80 space-y-4">
                {/* Empty widget area */}
              </div>
            </div>
          </div>
        </main>
        {/* Video Session Modal */}
        {showVideo && (
          <VideoSessionModal onClose={handleCloseVideo} />
        )}
      </div>
    </div>
  );
}