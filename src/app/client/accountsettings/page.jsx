"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaBell,
  FaBriefcase,
  FaShieldAlt,
  FaChevronRight,
  FaPencilAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Sidebar from "../../../../components/dashboardcomponents/sidebar";
import ClientTopbar from "../../../../components/dashboardcomponents/clienttopbar";
import { profileService } from "../../../services/api/profile.service";

const SETTINGS_TABS = [
  { id: "profile", label: "Edit Profile", icon: FaUser },
  { id: "notifications", label: "Notifications", icon: FaBell },
  { id: "plan", label: "Choose Plan", icon: FaBriefcase },
  { id: "password", label: "Password & Security", icon: FaShieldAlt },
];

const DEFAULT_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  password: "",
};

function parseName(fullName) {
  if (!fullName || typeof fullName !== "string") return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export default function AccountSettingsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ ...DEFAULT_PROFILE });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    push: false,
  });
  const [subscription, setSubscription] = useState({
    plan: "Basic",
    renewalDate: "2024-12-31",
    status: "Active",
  });

  useEffect(() => {
    const userData = localStorage.getItem("wanacUser");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        const { firstName, lastName } = parseName(parsed?.name);
        setProfile((p) => ({
          ...p,
          firstName: firstName || p.firstName,
          lastName: lastName || p.lastName,
          email: parsed?.email ?? p.email,
          phone: parsed?.phone ?? p.phone,
          address: parsed?.address ?? p.address,
          city: parsed?.city ?? p.city,
          state: parsed?.state ?? p.state,
          zipCode: parsed?.zipCode ?? p.zipCode,
          country: parsed?.country ?? p.country,
        }));
      } catch {
        setUser(null);
      }
    }
    profileService
      .getProfile()
      .then((data) => {
        const { firstName, lastName } = parseName(data?.name);
        setProfile((p) => ({
          ...p,
          firstName: firstName || p.firstName,
          lastName: lastName || p.lastName,
          email: data?.email ?? p.email,
          phone: data?.phone ?? p.phone,
          address: data?.address ?? p.address,
          city: data?.city ?? p.city,
          state: data?.state ?? p.state,
          zipCode: data?.zipCode ?? p.zipCode,
          country: data?.country ?? p.country,
        }));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!success && !error) return;
    const t = setTimeout(() => {
      setSuccess(false);
      setError("");
    }, 4000);
    return () => clearTimeout(t);
  }, [success, error]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const payload = {
      name: [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() || profile.firstName || profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      city: profile.city || undefined,
      state: profile.state || undefined,
      zipCode: profile.zipCode || undefined,
      country: profile.country || undefined,
    };
    if (profile.password && profile.password.trim()) {
      payload.password = profile.password.trim();
    }
    try {
      const updated = await profileService.updateProfile(payload);
      const stored = localStorage.getItem("wanacUser");
      const existingUser = stored ? JSON.parse(stored) : null;
      const nextUser = existingUser
        ? { ...existingUser, ...updated, name: payload.name, email: payload.email, phone: payload.phone, address: payload.address, city: payload.city, state: payload.state, zipCode: payload.zipCode, country: payload.country }
        : { ...updated, ...payload };
      localStorage.setItem("wanacUser", JSON.stringify(nextUser));
      setUser(nextUser);
      setSuccess(true);
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (typeof err?.message === "string" ? err.message : null);
      setError(apiMessage ? String(apiMessage) : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const profileImage = user?.profile_image || user?.profilePic || null;
  const initials = [profile.firstName, profile.lastName]
    .map((s) => (s && s[0]) || "")
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="h-screen flex bg-white font-body">
      <Sidebar
        className="w-56 bg-white border-r border-gray-200"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 min-w-0 flex flex-col h-full transition-all duration-300">
        <ClientTopbar user={user} />
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-6 py-3 bg-gray-50 min-w-0">
          <div className="max-w-4xl flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left: Settings nav */}
            <nav className="w-full md:w-56 flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <ul className="p-1">
                {SETTINGS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-colors ${
                          isActive
                            ? "bg-blue-50 text-[#002147] font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="text-lg text-gray-500 shrink-0" />
                        <span className="flex-1">{tab.label}</span>
                        {isActive && (
                          <FaChevronRight className="text-sm text-[#002147] shrink-0" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Content */}
            <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              {activeTab === "profile" && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
                  {loading ? (
                    <div className="text-center text-gray-500 py-8">Loading...</div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Profile picture */}
                      <div className="flex justify-start">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                            {profileImage ? (
                              <img
                                src={profileImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl font-semibold text-gray-500">
                                {initials}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shadow hover:bg-[#003875] transition-colors"
                            aria-label="Edit profile picture"
                          >
                            <FaPencilAlt className="text-xs" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          placeholder="e.g. 661-724-7734"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          placeholder="Street address"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                            placeholder="e.g. New York"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Zip code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={handleChange}
                            placeholder="e.g. 11357"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={profile.country}
                          onChange={handleChange}
                          placeholder="e.g. United States"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={profile.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <FaEyeSlash className="text-sm" />
                            ) : (
                              <FaEye className="text-sm" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Enter a new password only if you want to change it.
                        </p>
                      </div>

                      {error && (
                        <div className="text-red-600 text-sm">{error}</div>
                      )}
                      {success && (
                        <div className="text-green-600 text-sm">
                          Profile updated successfully!
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#002147] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-[#003875] transition disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </form>
                  )}
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Notifications
                  </h1>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.email}
                        onChange={(e) =>
                          setNotificationPrefs((p) => ({
                            ...p,
                            email: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-[#002147] rounded border-gray-300"
                      />
                      <span className="text-gray-700">Email notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.sms}
                        onChange={(e) =>
                          setNotificationPrefs((p) => ({
                            ...p,
                            sms: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-[#002147] rounded border-gray-300"
                      />
                      <span className="text-gray-700">SMS notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.push}
                        onChange={(e) =>
                          setNotificationPrefs((p) => ({
                            ...p,
                            push: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-[#002147] rounded border-gray-300"
                      />
                      <span className="text-gray-700">Push notifications</span>
                    </label>
                  </div>
                </>
              )}

              {activeTab === "plan" && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Choose Plan
                  </h1>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan
                      </label>
                      <select
                        value={subscription.plan}
                        onChange={(e) =>
                          setSubscription((s) => ({
                            ...s,
                            plan: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Pro">Pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Renewal Date
                      </label>
                      <input
                        type="date"
                        value={subscription.renewalDate}
                        onChange={(e) =>
                          setSubscription((s) => ({
                            ...s,
                            renewalDate: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Status: {subscription.status}
                    </p>
                  </div>
                </>
              )}

              {activeTab === "password" && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Password & Security
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Change your password or manage security settings here. Use
                    the Edit Profile tab to set a new password, or use the
                    forgot-password flow from the login page.
                  </p>
                  <a
                    href="/client/accountsettings"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("profile");
                    }}
                    className="text-[#002147] font-medium hover:underline"
                  >
                    Go to Edit Profile to change password →
                  </a>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
