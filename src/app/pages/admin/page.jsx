"use client";
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
  FaUserShield,
  FaUserEdit,
} from 'react-icons/fa';
import Sidebar from '../../../../components/dashboardcomponents/adminsidebar';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/dashboardcomponents/adminsidebar';
  
export default function AdminDashboard() {
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

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <nav className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded transition">
              <FaUserShield className="text-2xl text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user ? user.name : 'Admin'}</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                {/* Welcome Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-none">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1 tracking-tight">
                      Welcome Back{user?.name ? `, ${user.name}` : ''}!
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">Admin control panel for WANAC platform.</p>
                  </div>
                  <img
                    src="/dashboard-illustration.svg"
                    alt="Dashboard"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain hidden md:block"
                  />
                </section>

                {/* Quick Actions Row */}
                <section className="flex flex-col md:flex-row gap-4">
                  <AdminQuickActionCard
                    icon={FaUsers}
                    title="Manage Users"
                    description="View, edit, or remove users"
                    color="primary"
                  />
                  <AdminQuickActionCard
                    icon={FaUserTie}
                    title="Manage Coaches"
                    description="Control coach services and profiles"
                    color="secondary"
                  />
                  <AdminQuickActionCard
                    icon={FaUserEdit}
                    title="Manage Clients"
                    description="Control client services and profiles"
                    color="accent"
                  />
                  <AdminQuickActionCard
                    icon={FaCalendarAlt}
                    title="Sessions"
                    description="Monitor all sessions"
                    color="warning"
                  />
                  <AdminQuickActionCard
                    icon={FaChartPie}
                    title="Analytics"
                    description="View platform analytics"
                    color="primary"
                  />
                </section>

                {/* Content Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* User Management */}
                  <AdminCard
                    icon={FaUsers}
                    title="User Management"
                    description="View, edit, or remove coaches and clients."
                    buttonText="Manage Users"
                  />
                  {/* Coach Services Control */}
                  <AdminCard
                    icon={FaUserTie}
                    title="Coach Services"
                    description="Enable, disable, or update coach services."
                    buttonText="Control Coaches"
                  />
                  {/* Client Services Control */}
                  <AdminCard
                    icon={FaUserEdit}
                    title="Client Services"
                    description="Enable, disable, or update client services."
                    buttonText="Control Clients"
                  />
                  {/* Sessions Overview */}
                  <AdminCard
                    icon={FaCalendarAlt}
                    title="Sessions Overview"
                    description="Monitor all upcoming and past sessions."
                    buttonText="View Sessions"
                  />
                  {/* Analytics */}
                  <AdminCard
                    icon={FaChartPie}
                    title="Analytics"
                    description="Platform usage, engagement, and growth stats."
                    buttonText="View Reports"
                  />
                  {/* Feedback & Reports */}
                  <AdminCard
                    icon={FaClipboardCheck}
                    title="Feedback"
                    description="Review session feedback from clients."
                    buttonText="View Feedback"
                  />
                  {/* Resources Management */}
                  <AdminCard
                    icon={FaBook}
                    title="Resources"
                    description="Upload or update coaching resources."
                    buttonText="Manage Library"
                  />
                  {/* Announcements */}
                  <AdminCard
                    icon={FaEnvelope}
                    title="Announcements"
                    description="Send platform-wide updates or emails."
                    buttonText="Send Message"
                  />
                  {/* System Settings */}
                  <AdminCard
                    icon={FaCogs}
                    title="Settings"
                    description="Platform settings and configurations."
                    buttonText="Open Settings"
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Quick Action Card for Admin
function AdminQuickActionCard({ icon: Icon, title, description, color }) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20',
    warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
  };
  return (
    <div
      className={`flex-1 min-w-[180px] p-5 rounded-lg border transition-all duration-200 shadow-none hover:shadow-sm transform hover:scale-[1.01] flex flex-col items-start gap-2 ${colorClasses[color]}`}
    >
      <Icon className="text-2xl mb-1" />
      <h3 className="text-base font-semibold mb-0.5">{title}</h3>
      <p className="text-xs opacity-80">{description}</p>
    </div>
  );
}

// Card for Admin Content Grid
function AdminCard({ icon: Icon, title, description, buttonText }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-transform duration-300 flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
        <Icon /> {title}
      </h2>
      <p className="text-brand-blue text-sm mb-2">{description}</p>
      <button className="mt-4 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
        {buttonText}
      </button>
    </div>
  );
}
  