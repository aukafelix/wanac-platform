"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { profileService } from '../../../services/api/profile.service';

export default function AccountSettingsPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [subscription, setSubscription] = useState({ plan: 'Basic', renewalDate: '2024-12-31', status: 'Active' });
  const [subSaving, setSubSaving] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState("");

  const [notificationPrefs, setNotificationPrefs] = useState({ email: true, sms: false, push: false });
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [notifError, setNotifError] = useState("");

  useEffect(() => {
    // Get user from localStorage for topbar
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
    // Fetch profile from API
    profileService.getProfile()
      .then((data) => {
        setProfile({
          name: data?.name ?? '',
          email: data?.email ?? '',
          role: data?.role ?? '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  // Auto-dismiss profile success/error messages
  useEffect(() => {
    if (!success && !error) return;
    const t = setTimeout(() => {
      setSuccess(false);
      setError("");
    }, 4000);
    return () => clearTimeout(t);
  }, [success, error]);

  // Auto-dismiss subscription success/error messages
  useEffect(() => {
    if (!subSuccess && !subError) return;
    const t = setTimeout(() => {
      setSubSuccess(false);
      setSubError("");
    }, 4000);
    return () => clearTimeout(t);
  }, [subSuccess, subError]);

  // Auto-dismiss notification success/error messages
  useEffect(() => {
    if (!notifSuccess && !notifError) return;
    const t = setTimeout(() => {
      setNotifSuccess(false);
      setNotifError("");
    }, 4000);
    return () => clearTimeout(t);
  }, [notifSuccess, notifError]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await profileService.updateProfile(profile);
      setSuccess(true);
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubscriptionChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const handleSubscriptionSave = async (e) => {
    e.preventDefault();
    setSubSaving(true);
    setSubError("");
    setSubSuccess(false);
    // Mock save delay
    setTimeout(() => {
      setSubSuccess(true);
      setSubSaving(false);
    }, 1000);
  };

  const handleNotifChange = (e) => {
    setNotificationPrefs({ ...notificationPrefs, [e.target.name]: e.target.checked });
  };

  const handleNotifSave = async (e) => {
    e.preventDefault();
    setNotifSaving(true);
    setNotifError("");
    setNotifSuccess(false);
    // Mock save delay
    setTimeout(() => {
      setNotifSuccess(true);
      setNotifSaving(false);
    }, 1000);
  };

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-8">
              <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-none">
                <h1 className="text-2xl font-bold mb-2 text-primary">Account Settings</h1>
                <p className="text-gray-600 mb-6">View and update your account information below.</p>
                {loading ? (
                  <div className="text-center text-gray-500">Loading...</div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={profile.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100"
                        disabled
                        aria-label="Role (read-only)"
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">Profile updated successfully!</div>}
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                )}
              </section>

              {/* Subscription/Membership Management */}
              <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-none">
                <h2 className="text-xl font-bold mb-2 text-primary">Subscription / Membership</h2>
                <form onSubmit={handleSubscriptionSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                    <select
                      name="plan"
                      value={subscription.plan}
                      onChange={handleSubscriptionChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Pro">Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Date</label>
                    <input
                      type="date"
                      name="renewalDate"
                      value={subscription.renewalDate}
                      onChange={handleSubscriptionChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={subscription.status}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                    />
                  </div>
                  {subError && <div className="text-red-500 text-sm">{subError}</div>}
                  {subSuccess && <div className="text-green-600 text-sm">Subscription updated successfully!</div>}
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                    disabled={subSaving}
                  >
                    {subSaving ? "Saving..." : "Save Subscription"}
                  </button>
                </form>
              </section>

              {/* Notification Preferences */}
              <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-none">
                <h2 className="text-xl font-bold mb-2 text-primary">Notification Preferences</h2>
                <form onSubmit={handleNotifSave} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="email"
                      name="email"
                      checked={notificationPrefs.email}
                      onChange={handleNotifChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Notifications</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="sms"
                      name="sms"
                      checked={notificationPrefs.sms}
                      onChange={handleNotifChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="sms" className="block text-sm font-medium text-gray-700">SMS Notifications</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="push"
                      name="push"
                      checked={notificationPrefs.push}
                      onChange={handleNotifChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="push" className="block text-sm font-medium text-gray-700">Push Notifications</label>
                  </div>
                  {notifError && <div className="text-red-500 text-sm">{notifError}</div>}
                  {notifSuccess && <div className="text-green-600 text-sm">Preferences updated successfully!</div>}
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                    disabled={notifSaving}
                  >
                    {notifSaving ? "Saving..." : "Save Preferences"}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
