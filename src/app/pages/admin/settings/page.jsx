"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../../../../components/dashboardcomponents/adminsidebar";
import { FaCogs, FaRegBell, FaUserShield, FaComments, FaRobot, FaCreditCard, FaUsers, FaBook, FaCalendarAlt, FaShieldAlt, FaUniversity } from "react-icons/fa";

export default function AdminSettings() {
  // Placeholder state for toggles/inputs
  const [settings, setSettings] = useState({
    orgName: "WANAC Coaching Platform",
    contactEmail: "admin@wanac.org",
    enableRegistration: true,
    defaultUserRole: "Client",
    passwordMinLength: 8,
    wanacPrograms: {
      PLCA: true,
      PLEP: true,
      PPC: true,
      CPPC: true,
      Vetrepreneurship: true,
    },
    sessionDuration: 60,
    enableBooking: true,
    maxSessionsPerWeek: 3,
    emailNotifications: true,
    smsNotifications: false,
    aiAssistant: true,
    aiInsights: true,
    communityForum: true,
    chatFeature: true,
    require2FA: false,
    privacyPolicy: "https://wanac.org/privacy",
    enablePayments: false,
    stripeKey: "",
    subscriptionPlans: "Basic, Premium, Pro",
  });
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("wanacPrograms.")) {
      const prog = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        wanacPrograms: { ...prev.wanacPrograms, [prog]: checked },
      }));
    } else if (type === "checkbox") {
      setSettings((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
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
        <main className="flex-1 h-0 overflow-y-auto p-8 ml-16 md:ml-56">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#002147] mb-2 flex items-center gap-2">
              <FaCogs className="text-blue-600" /> Admin Settings
            </h1>
            <p className="text-gray-600">Manage platform settings and configurations here.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-8 max-w-3xl space-y-8">
            {/* Platform Branding & Info */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaUniversity /> Platform Info</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Organization Name</label>
                <input type="text" name="orgName" value={settings.orgName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
            </section>

            {/* User Management */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaUsers /> User Management</h2>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="enableRegistration" checked={settings.enableRegistration} onChange={handleChange} />
                <span>Enable new user registrations</span>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Default User Role</label>
                <select name="defaultUserRole" value={settings.defaultUserRole} onChange={handleChange} className="border rounded px-2 py-1">
                  <option value="Client">Client</option>
                  <option value="Coach">Coach</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Password Minimum Length</label>
                <input type="number" name="passwordMinLength" value={settings.passwordMinLength} min={6} max={32} onChange={handleChange} className="border rounded px-2 py-1 w-24" />
              </div>
            </section>

            {/* Program & Service Settings */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaBook /> WANAC Programs</h2>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(settings.wanacPrograms).map(([prog, enabled]) => (
                  <label key={prog} className="flex items-center gap-2">
                    <input type="checkbox" name={`wanacPrograms.${prog}`} checked={enabled} onChange={handleChange} />
                    {prog}
                  </label>
                ))}
              </div>
            </section>

            {/* Session & Booking */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaCalendarAlt /> Session & Booking</h2>
              <div className="mb-2 flex items-center gap-2">
                <input type="checkbox" name="enableBooking" checked={settings.enableBooking} onChange={handleChange} />
                <span>Enable session booking</span>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Default Session Duration (minutes)</label>
                <input type="number" name="sessionDuration" value={settings.sessionDuration} min={15} max={180} onChange={handleChange} className="border rounded px-2 py-1 w-24" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Max Sessions Per User/Week</label>
                <input type="number" name="maxSessionsPerWeek" value={settings.maxSessionsPerWeek} min={1} max={10} onChange={handleChange} className="border rounded px-2 py-1 w-24" />
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaRegBell /> Notifications</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} /> Email
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="smsNotifications" checked={settings.smsNotifications} onChange={handleChange} /> SMS
                </label>
              </div>
            </section>

            {/* AI Assistant */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaRobot /> AI Assistant</h2>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="aiAssistant" checked={settings.aiAssistant} onChange={handleChange} />
                <span>Enable AI Assistant features</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="aiInsights" checked={settings.aiInsights} onChange={handleChange} />
                <span>Enable AI Insights for users</span>
              </div>
            </section>

            {/* Community & Chat */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaComments /> Community & Chat</h2>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="communityForum" checked={settings.communityForum} onChange={handleChange} />
                <span>Enable community forums</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="chatFeature" checked={settings.chatFeature} onChange={handleChange} />
                <span>Enable chat features</span>
              </div>
            </section>

            {/* Security & Privacy */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaShieldAlt /> Security & Privacy</h2>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="require2FA" checked={settings.require2FA} onChange={handleChange} />
                <span>Require 2FA for admins</span>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Privacy Policy Link</label>
                <input type="url" name="privacyPolicy" value={settings.privacyPolicy} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
            </section>

            {/* Payment & Subscription */}
            <section>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#002147]"><FaCreditCard /> Payment & Subscription</h2>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" name="enablePayments" checked={settings.enablePayments} onChange={handleChange} />
                <span>Enable payments</span>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Stripe API Key</label>
                <input type="text" name="stripeKey" value={settings.stripeKey} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Subscription Plans (comma separated)</label>
                <input type="text" name="subscriptionPlans" value={settings.subscriptionPlans} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
