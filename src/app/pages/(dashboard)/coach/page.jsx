// Coach Dashboard for WANAC Coaching Platform with Client Management & Messaging
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

export default function CoachDashboard() {
  return (
    <section className="min-h-screen bg-brand-blue flex">
      {/* Coach Dashboard Content */}
      <main className="flex-1 px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaCalendarAlt /> Upcoming Sessions
            </h2>
            <p className="text-brand-blue text-sm">Next session with: James Mwangi</p>
            <p className="text-brand-blue text-sm">Date: Apr 6, 2025 – 11:00AM</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
  View Calendar
</button>

          </div>

          {/* Client Management */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaUserFriends /> Clients
            </h2>
            <p className="text-brand-blue text-sm mb-4">Manage your active and past clients.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              View Clients
            </button>
          </div>

          {/* Session Notes */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaClipboardList /> Session Notes
            </h2>
            <p className="text-brand-blue text-sm mb-2">Document notes and key takeaways per client.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              Add Notes
            </button>
          </div>

          {/* Insights & Tips */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaLightbulb /> Coaching Tips
            </h2>
            <p className="italic text-brand-blue">"Try assigning a journaling task to enhance reflection."</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              View More Tips
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaChartBar /> Client Progress
            </h2>
            <p className="text-brand-blue text-sm mb-2">Monitor growth and life score trends.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              View Reports
            </button>
          </div>

          {/* Resource Library */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaBook /> Resources
            </h2>
            <p className="text-brand-blue text-sm mb-2">Upload and manage videos, guides, and materials.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              Manage Content
            </button>
          </div>

          {/* Community Management */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaUsersCog /> Community
            </h2>
            <p className="text-brand-blue text-sm mb-2">Engage and moderate group discussions.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              Go to Community
            </button>
          </div>

          {/* Feedback & Questions */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaComments /> Feedback
            </h2>
            <p className="text-brand-blue text-sm mb-2">View questions or feedback from clients.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              View Feedback
            </button>
          </div>

          {/* Messaging */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
              <FaEnvelope /> Messages
            </h2>
            <p className="text-brand-blue text-sm mb-2">Chat with clients and fellow coaches.</p>
            <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              Open Messages
            </button>
          </div>

        </div>
      </main>
    </section>
  );
}
