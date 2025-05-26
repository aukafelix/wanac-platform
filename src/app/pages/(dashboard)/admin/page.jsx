// Admin Dashboard for WANAC Coaching Platform
import {
    FaUsers,
    FaCalendarAlt,
    FaChartPie,
    FaCogs,
    FaUserTie,
    FaClipboardCheck,
    FaBook,
    FaEnvelope,
  } from 'react-icons/fa';
  
  export default function AdminDashboard() {
    return (
      <section className="min-h-screen bg-brand-blue flex">
        {/* Admin Dashboard Content */}
        <main className="flex-1 px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
            {/* User Management */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaUsers /> Users
              </h2>
              <p className="text-brand-blue text-sm mb-2">View, edit, or remove coaches and clients.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                Manage Users
              </button>
            </div>
  
            {/* Sessions Overview */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Sessions
              </h2>
              <p className="text-brand-blue text-sm mb-2">Monitor all upcoming and past sessions.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                View Sessions
              </button>
            </div>
  
            {/* Analytics */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaChartPie /> Analytics
              </h2>
              <p className="text-brand-blue text-sm mb-2">Platform usage, engagement, and growth stats.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                View Reports
              </button>
            </div>
  
            {/* Coaches Directory */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaUserTie /> Coaches
              </h2>
              <p className="text-brand-blue text-sm mb-2">Manage coach profiles and activity.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                View Coaches
              </button>
            </div>
  
            {/* Feedback & Reports */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaClipboardCheck /> Feedback
              </h2>
              <p className="text-brand-blue text-sm mb-2">Review session feedback from clients.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                View Feedback
              </button>
            </div>
  
            {/* Resources Management */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaBook /> Resources
              </h2>
              <p className="text-brand-blue text-sm mb-2">Upload or update coaching resources.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                Manage Library
              </button>
            </div>
  
            {/* Messages & Announcements */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaEnvelope /> Announcements
              </h2>
              <p className="text-brand-blue text-sm mb-2">Send platform-wide updates or emails.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                Send Message
              </button>
            </div>
  
            {/* System Settings */}
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
              <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                <FaCogs /> Settings
              </h2>
              <p className="text-brand-blue text-sm mb-2">Platform settings and configurations.</p>
              <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                Open Settings
              </button>
            </div>
  
          </div>
        </main>
      </section>
    );
  }
  