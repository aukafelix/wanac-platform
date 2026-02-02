'use client';
// Coach Dashboard for WANAC Coaching Platform with Client Management & Messaging
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaUserFriends,
  FaCalendarAlt,
  FaClipboardList,
  FaLightbulb,
  FaChartBar,
  FaBook,
  FaUsersCog,
  FaComments,
  FaEnvelope,
  FaFire,
  FaUsers,
  FaChartLine,
  FaClock,
  FaTimes,
  FaPaperPlane,
} from 'react-icons/fa';
import CoachSidebar from '../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../components/dashboardcomponents/clienttopbar';
import ScheduleSessionModal from '../../../components/dashboardcomponents/ScheduleSessionModal';
import { sessionsService } from '../../services/api/sessions.service';

// Simple Modal Component
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white rounded-t-xl sm:rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Chat Modal Component
function ChatModal({ isOpen, onClose, client }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      text: "Chat session started. You can now communicate with your client.",
      time: "10:30 AM",
      isCoach: true
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCoach: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-2xl max-h-[85vh] sm:max-h-[600px] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002147] to-[#003875] p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FaComments className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Client Chat</h3>
              <p className="text-white/80 text-xs">{client?.name || 'Discussion'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            aria-label="Close chat"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCoach ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isCoach
                    ? 'bg-[#002147] text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-semibold text-xs ${msg.isCoach ? 'text-white' : 'text-[#002147]'}`}>
                    {msg.sender}
                  </span>
                  <span className={`text-[9px] ${msg.isCoach ? 'text-white/70' : 'text-gray-500'}`}>
                    {msg.time}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                message.trim()
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FaPaperPlane className="text-xs" />
              Send
            </button>
          </form>
          <p className="text-[9px] text-gray-500 mt-2">
            Professional communication with your clients
          </p>
        </div>
      </div>
    </div>
  );
}

// Quick Action Card for Coach
function QuickActionCard({ icon: Icon, title, description, onClick, color }) {
  const colorClasses = {
    primary: 'bg-[#002147]/10 text-[#002147] border-[#002147]/20 hover:bg-[#002147]/20',
    secondary: 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200',
    accent: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-0 p-3 sm:p-4 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] md:hover:scale-[1.02] flex flex-col items-start gap-2 ${colorClasses[color]}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <Icon className="text-2xl mb-1" />
      <h3 className="text-base font-semibold mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
      <p className="text-xs opacity-80">{description}</p>
    </button>
  );
}

export default function CoachDashboard() {
  // Mock coach user for the topbar
  const coachUser = { name: 'Coach' };
  // Modal state
  const [openModal, setOpenModal] = useState(null); // 'notes' | 'content' | null
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await sessionsService.getSessions();
        const sessions = response.data || response.sessions?.data || [];
        setUpcomingSessions(
          sessions
            .filter(session => session.status === 'Scheduled' || session.status === 'Upcoming' || session.status === 'Pending')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5)
        );
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setError("Failed to load sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Enhanced stats
  const stats = {
    totalClients: 12,
    upcomingSessions: upcomingSessions.length,
    completedSessions: 45,
    pendingMessages: 5
  };

  return (
    <div className="min-h-screen h-screen flex bg-white font-body text-foreground overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={coachUser} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-6 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content */}
              <div className="flex-1 space-y-3">
                {/* Header Section */}
                <section className="bg-gradient-to-br from-[#002147] to-[#003875] rounded-xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="/veterancommunity.png" 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <FaUsersCog className="text-orange-500" />
                      Coach Dashboard
                    </h1>
                    <p className="text-white/90 text-xs">Manage your clients, sessions, and coaching resources</p>
                  </div>
                </section>

                {/* Error Message */}
                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span>⚠</span>
                      {error}
                    </span>
                    <button 
                      onClick={() => window.location.reload()}
                      className="text-red-600 hover:text-red-800 underline font-semibold"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <FaUsers className="text-purple-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Clients</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.totalClients}</p>
                    <p className="text-[9px] text-gray-500">Active</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <FaCalendarAlt className="text-blue-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Upcoming</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.upcomingSessions}</p>
                    <p className="text-[9px] text-gray-500">Sessions</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-green-100 rounded-lg">
                        <FaChartLine className="text-green-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Completed</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.completedSessions}</p>
                    <p className="text-[9px] text-gray-500">Sessions</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <FaEnvelope className="text-orange-500 text-sm" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">Messages</span>
                    </div>
                    <p className="text-xl font-bold text-[#002147]">{stats.pendingMessages}</p>
                    <p className="text-[9px] text-gray-500">Pending</p>
                  </div>
                </div>
                {/* Quick Actions Row */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <QuickActionCard
                    icon={FaCalendarAlt}
                    title="Schedule Session"
                    description="Book a new session"
                    onClick={() => setShowScheduleModal(true)}
                    color="primary"
                  />
                  <QuickActionCard
                    icon={FaClipboardList}
                    title="Add Notes"
                    description="Document sessions"
                    onClick={() => setOpenModal('notes')}
                    color="secondary"
                  />
                  <QuickActionCard
                    icon={FaBook}
                    title="Manage Fireteams"
                    description="Manage resources"
                    onClick={() => window.location.href = '/admin/fireteammanagement?role=coach'}
                    color="accent"
                  />
                  <QuickActionCard
                    icon={FaComments}
                    title="Messages"
                    description="Chat with clients"
                    onClick={() => setChatModalOpen(true)}
                    color="warning"
                  />
                </section>
                {/* Upcoming Sessions Table */}
                {loading ? (
                  <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147] mx-auto mb-3"></div>
                    <p className="text-gray-600 text-xs">Loading sessions...</p>
                  </section>
                ) : (
                  <section className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="mb-2">
                      <h3 className="text-sm font-semibold text-[#002147] flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        Upcoming Sessions
                      </h3>
                      <p className="text-[10px] text-gray-600">
                        {upcomingSessions.length} {upcomingSessions.length === 1 ? 'session' : 'sessions'} scheduled
                      </p>
                    </div>
                    {/* Mobile card layout */}
                    <div className="md:hidden space-y-2">
                      {upcomingSessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <FaCalendarAlt className="h-10 w-10 text-gray-300 mb-2" />
                          <p className="text-gray-500 font-semibold text-sm mb-1">No Upcoming Sessions</p>
                          <p className="text-gray-400 text-xs">Schedule a new session to get started.</p>
                        </div>
                      ) : upcomingSessions.map(session => (
                        <div
                          key={session.id}
                          className="border border-gray-200 rounded-lg p-3 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{session.title || 'Session'}</p>
                              <p className="text-xs text-gray-500">ID: {session.id}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 shrink-0">
                              {session.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                            <span>{new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            <span>{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span>{session.mode || 'Virtual'}</span>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => { setSelectedClient({ name: session.title }); setChatModalOpen(true); }}
                              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 rounded text-white text-xs"
                            >
                              <FaComments className="text-xs" /> Chat
                            </button>
                            <button
                              onClick={() => alert('View session details')}
                              className="flex-1 py-1.5 text-[#002147] font-semibold text-xs border border-[#002147] rounded hover:bg-[#002147] hover:text-white transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto -mx-1 px-1">
                      <table className="w-full min-w-[600px] text-left">
                        <thead>
                          <tr className="text-[10px] text-gray-600 border-b-2 border-gray-200 bg-gray-50">
                            <th className="py-2 px-3 font-semibold">Client/Title</th>
                            <th className="px-3 font-semibold">Date</th>
                            <th className="px-3 font-semibold">Time</th>
                            <th className="px-3 font-semibold">Mode</th>
                            <th className="px-3 font-semibold">Status</th>
                            <th className="px-3 font-semibold text-center">Chat</th>
                            <th className="px-3 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingSessions.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="py-8 text-center">
                                <div className="flex flex-col items-center justify-center">
                                  <FaCalendarAlt className="h-12 w-12 text-gray-300 mb-2" />
                                  <p className="text-gray-500 font-semibold text-sm mb-1">
                                    No Upcoming Sessions
                                  </p>
                                  <p className="text-gray-400 text-[10px]">
                                    Schedule a new session to get started.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            upcomingSessions.map(session => (
                              <tr key={session.id} className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 transition-colors group">
                                <td className="py-3 px-3 align-middle">
                                  <div className="font-semibold text-[11px] text-gray-900">{session.title || 'Session'}</div>
                                  <div className="text-[9px] text-gray-500">ID: {session.id}</div>
                                </td>
                                <td className="px-3 align-middle">
                                  <div className="font-semibold text-[11px] text-gray-900">
                                    {new Date(session.date).toLocaleDateString('en-GB', { 
                                      day: '2-digit', 
                                      month: 'short', 
                                      year: 'numeric' 
                                    })}
                                  </div>
                                </td>
                                <td className="px-3 align-middle">
                                  <div className="font-semibold text-[11px] text-gray-900">
                                    {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </td>
                                <td className="px-3 align-middle text-[11px] text-gray-700">
                                  {session.mode || 'Virtual'}
                                </td>
                                <td className="px-3 align-middle">
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700">
                                    {session.status}
                                  </span>
                                </td>
                                <td className="px-3 align-middle text-center">
                                  <button
                                    onClick={() => {
                                      setSelectedClient({ name: session.title });
                                      setChatModalOpen(true);
                                    }}
                                    className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full transition-all hover:scale-110"
                                    title="Open Chat"
                                  >
                                    <FaComments className="text-white text-xs" />
                                  </button>
                                </td>
                                <td className="px-3 align-middle">
                                  <button
                                    className="text-[11px] text-[#002147] font-bold hover:text-orange-500 group-hover:underline transition-colors flex items-center gap-1"
                                    onClick={() => alert('View session details')}
                                  >
                                    View
                                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
              </div>

              {/* Right Sidebar */}
              <aside className="lg:w-64 space-y-3">
                {/* Quick Info Card */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-4 text-white">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FaUsersCog />
                    Coaching Excellence
                  </h3>
                  <p className="text-[10px] text-white/90 mb-3 leading-relaxed">
                    As a WANAC coach, you play a vital role in guiding veterans through their professional development journey.
                  </p>
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Schedule 1-on-1 sessions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Lead group fireteam experiences</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Provide personalized feedback</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>Track client progress</span>
                    </div>
                  </div>
                </div>

                {/* Coaching Tips Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-500" />
                    Best Practices
                  </h3>
                  <div className="space-y-2 text-[10px] text-gray-700">
                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>Prepare thoroughly for each session</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>Listen actively and empathetically</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>Set clear, achievable goals</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                      <span className="text-orange-500 font-bold">4.</span>
                      <span>Follow up consistently</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                  <h3 className="text-sm font-semibold text-[#002147] mb-3">Quick Links</h3>
                  <div className="space-y-2 text-[11px]">
                    <a href="/admin/fireteammanagement?role=coach" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700 hover:text-[#002147]">
                      <FaFire className="text-orange-500" />
                      <span>Fireteam Management</span>
                    </a>
                    <a href="/admin/community" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700 hover:text-[#002147]">
                      <FaUsers className="text-purple-500" />
                      <span>Community</span>
                    </a>
                    <button onClick={() => setOpenModal('notes')} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700 hover:text-[#002147] w-full text-left">
                      <FaClipboardList className="text-blue-500" />
                      <span>Session Notes</span>
                    </button>
                    <button onClick={() => setChatModalOpen(true)} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700 hover:text-[#002147] w-full text-left">
                      <FaComments className="text-green-500" />
                      <span>Messages</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
        {/* Modals */}
        <Modal
          open={openModal === 'notes'}
          onClose={() => setOpenModal(null)}
          title="Add Session Notes"
        >
          <form className="flex flex-col gap-3">
            <textarea className="border rounded p-2 min-h-[80px]" placeholder="Write your notes here..." />
            <button type="button" className="bg-brand-navy text-white px-4 py-2 rounded hover:bg-orange-500 transition">Save Notes</button>
          </form>
        </Modal>
        <Modal
          open={openModal === 'content'}
          onClose={() => setOpenModal(null)}
          title="Manage Resources"
        >
          <form className="flex flex-col gap-3">
            <input type="file" className="border rounded p-2" />
            <button type="button" className="bg-brand-navy text-white px-4 py-2 rounded hover:bg-orange-500 transition">Upload</button>
          </form>
        </Modal>
        {showScheduleModal && (
          <ScheduleSessionModal
            onClose={() => setShowScheduleModal(false)}
            onSubmit={data => {
              console.log('Scheduled session:', data);
              // TODO: Integrate with backend or state
            }}
          />
        )}
        {/* Chat Modal */}
        <ChatModal 
          isOpen={chatModalOpen} 
          onClose={() => {
            setChatModalOpen(false);
            setSelectedClient(null);
          }}
          client={selectedClient}
        />
      </div>
    </div>
  );
}
