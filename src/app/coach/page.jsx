'use client';
// Coach Dashboard for WANAC Coaching Platform with Client Management & Messaging
import { useState } from 'react';
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
} from 'react-icons/fa';
import CoachSidebar from '../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../components/dashboardcomponents/clienttopbar';
import ScheduleSessionModal from '../../../components/dashboardcomponents/ScheduleSessionModal';

// Simple Modal Component
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
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
      className={`flex-1 min-w-[160px] p-4 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] flex flex-col items-start gap-2 ${colorClasses[color]}`}
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

  // Mock stats
  const stats = [
    { label: 'Clients', value: 12 },
    { label: 'Upcoming Sessions', value: 3 },
    { label: 'Messages', value: 5 },
  ];

  return (
    <div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={coachUser} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-2 md:px-8 py-6 bg-muted">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                {/* Welcome Section */}
                <section className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md animate-fadeIn">
                  <div>
                    <h2
                      className="text-2xl md:text-3xl font-bold mb-1 tracking-tight text-heading"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Welcome Back, Coach!
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">Manage your clients, sessions, and resources here.</p>
                  </div>
                  <img
                    src="/dashboard-illustration.svg"
                    alt="Dashboard"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain hidden md:block drop-shadow-lg"
                  />
                </section>
                {/* Quick Actions Row */}
                <section className="flex flex-col md:flex-row gap-4">
                  <QuickActionCard
                    icon={FaCalendarAlt}
                    title="Schedule Session"
                    description="Book a new session with a client"
                    onClick={() => setShowScheduleModal(true)}
                    color="primary"
                  />
                  <QuickActionCard
                    icon={FaClipboardList}
                    title="Add Notes"
                    description="Document session notes"
                    onClick={() => setOpenModal('notes')}
                    color="secondary"
                  />
                  <QuickActionCard
                    icon={FaBook}
                    title="Manage Content"
                    description="Upload resources and guides"
                    onClick={() => setOpenModal('content')}
                    color="accent"
                  />
                  <QuickActionCard
                    icon={FaUserFriends}
                    title="View Clients"
                    description="See all your clients"
                    onClick={() => alert('View Clients (not implemented)')}
                    color="warning"
                  />
                </section>
                {/* Content Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Upcoming Sessions */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-heading"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaCalendarAlt className="text-primary" />
                      Upcoming Sessions
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4 py-3 bg-primary/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">One-on-One with James Mwangi</p>
                            <p className="text-sm text-gray-600">Apr 6, 2025 – 11:00AM</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-800">Virtual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 text-primary hover:underline text-sm font-medium transition-colors duration-150">
                      View Calendar →
                    </button>
                  </div>
                  {/* Client Progress */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-warning"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaChartBar className="text-warning" />
                      Client Progress
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span className="capitalize font-medium text-gray-700">James Mwangi</span>
                          <span className="text-gray-600">8/10</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-warning rounded-full transition-all duration-300" style={{ width: '80%' }} />
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 text-warning hover:underline text-sm font-medium transition-colors duration-150">
                      View Reports →
                    </button>
                  </div>
                  {/* Community Management */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaUsersCog className="text-accent" />
                      Community
                    </h3>
                    <p className="text-brand-blue text-sm mb-2">Engage and moderate group discussions.</p>
                    <button className="mt-4 text-accent hover:underline text-sm font-medium transition-colors duration-150">
                      Go to Community →
                    </button>
                  </div>
                  {/* Feedback & Messages */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <FaComments className="text-primary" />
                      Feedback & Messages
                    </h3>
                    <p className="text-brand-blue text-sm mb-2">View questions, feedback, and chat with clients.</p>
                    <button className="mt-4 text-primary hover:underline text-sm font-medium transition-colors duration-150">
                      Open Messages →
                    </button>
                  </div>
                </section>
              </div>
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
      </div>
    </div>
  );
}
